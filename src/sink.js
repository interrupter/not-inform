const CommonInform = require('./common.js');
const log = require('not-log')(module);
const SYM_RULE = Symbol('rule');

class Sink extends CommonInform{
	constructor(options){
		this[SYM_RULE] 	= 	new Map();
		if (options){
			this.options = options;
			this.init();
		}
		return this;
	}

	init(){
		if (this.options && this.options.rules && this.options.rules.length){
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
		return this[SYN_RULE];
	}

}

module.exports = Sink;
