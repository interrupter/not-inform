/**
 * @module not-inform/CommonInform
 */

const log = require('not-log')(module);

class CommonInform{
	constructor(){
		return this;
	}

	__add(domain, key, val){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].set(key, val);
		}
	}

	__remove(domain, key){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].delete(key);
		}
	}

	__pause(domain, what){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].get(what).pause();
		}
	}

	__resume(domain, what){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].get(what).resume();
		}
	}

	__getClass(domain, what){
		try{
			return require('not-inform-'+domain+'-'+what);
		}catch(e){
			//!TODO move to report
			log && log.error(e);
			return false;
		}
	}

	__init(domain, options){
		if (options && options.type){
			let Class = this.__getClass(domain, options.type);
			if (Class){
				return new Class(options);
			}
		}
		return false;
	}
}

module.exports = CommonInform;
