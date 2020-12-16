const CommonInform = require('./common.js');
const SYM_RULE = Symbol('rule');

class Sink extends CommonInform{
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

}

module.exports = Sink;
