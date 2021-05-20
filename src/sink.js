const CommonInform = require('./common.js');
const SYM_RULE = Symbol('rule');
const notNode = require('not-node');
const log = require('not-log')(module, 'notInformSink');


const RECIPIENTS_BATCH_LIMIT = 100;		//items to retrieve at once
const BATCHING_INTERVAL = 60;					//seconds to wait between deployin next batch

class Sink extends CommonInform{
	static RECIPIENTS_BATCH_LIMIT = RECIPIENTS_BATCH_LIMIT;
	static BATCHING_INTERVAL = BATCHING_INTERVAL;
	constructor(options){
		super(options);
		this.OPT_ANY = 'any';
		this.OPT_ALL = 'all';
		this[SYM_RULE] 	= 	new Map();
		if (options){
			this.options = options;
			this.init();
		}
		return this;
	}

	init(){
		if (this.options && this.options.rules && (typeof this.options.rules === 'object') && Object.keys(this.options.rules).length){
			for(let i in this.options.rules){
				let newRule = this.initRule(this.options.rules[i]);
				if (newRule){
					this.addRule(i, newRule);
				}
			}
		}
	}

	initRule(options){
		return this.__init('rule', options);
	}

	addRule(){
		this.__add(SYM_RULE, ...arguments);
	}

	removeRule(){
		this.__remove(SYM_RULE, ...arguments);
	}

	pauseRule(){
		this.__pause(SYM_RULE, ...arguments);
	}

	resumeRule(){
		this.__resume(SYM_RULE, ...arguments);
	}

	getRules(){
		return this[SYM_RULE];
	}

	test(message, autodeploy = true){
		let result = false;
		if (this.getRules().size){
			switch(this.options.meet){
			case this.OPT_ALL: 	result = this.__testAll(message);	break;
			case this.OPT_ANY:
			default: 						result = this.__testAny(message);
			}
			if (result && autodeploy){
				if (result === true){
					this.deploy(message);
				}else{
					this.deploy(message, result);
				}
			}
		}
		return result;
	}

	/**
	* Should be overriden by children
	* @param {object} message complex object containing all sorts of data
	* @param {object} rule options for active rule
	*/
	deploy(message, rule = null){
		return {message, rule};
	}

	__testAll(message){
		let result = true;
		for(let [key,rule] of this.getRules().entries()){
			if(!rule.test(message) && key ){
				return false;
			}
		}
		return result;
	}

	__testAny(message){
		let result = false;
		for(let [key,rule] of this.getRules().entries()){
			if(rule.test(message) && key){
				return rule;
			}
		}
		return result;
	}

	extractRecipient(rule){
		return rule.recipient;
	}

	extendFilter(target, src){
		if(src){
			if(src.modelName && src.filter){
				Object.assign(target.filter, {...src.filter});
				target.modelName =  src.modelName;
			}else{
				Object.assign(target.filter, {...src});
			}
		}
		return target;
	}

	getRecipientsFilter(message, rule){
		const target = {
			modelName: 	'User',
			filter: {}
		},
			recipientRule = this.extractRecipient(rule),
			recipientMessage = this.extractRecipient(message);
		this.extendFilter(target, recipientRule);
		this.extendFilter(target, recipientMessage);
		return target;
	}

	/**
	*	{object} filter = {
	*		{string} modelName,
	*		{object} filter
	*	}
	*/
	findRecipients(target){
		const model = notNode.Application.getModel(target.modelName);
		if(model){
			//doing only one batch
			return model.list(0, this.RECIPIENTS_BATCH_LIMIT, {}, target.filter);
		}else{
			log.error(`target.modelName (${target.modelName}) is not exists`);
		}
		return Promise.resolve([]);
	}

	async deployCycle(message, rule){
		const recipientsFilter = this.getRecipientsFilter(message, rule);
		const recipients = await this.findRecipients(recipientsFilter);
		if(recipients.length){
			for(let index in recipients){
				try{
					let recipient = recipients[index];
					await this.deployOne({
						message,
						rule,
						recipient,
						recipientsFilter,
						index
					});
				}catch(e){
					log.error(`deployOne is failed`, e);
				}
			}
		}
	}

}

module.exports = Sink;
