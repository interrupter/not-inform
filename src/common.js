/**
 * @module not-inform/CommonInform
 */

const notPath = require('not-path'),
	log = require('not-log')(this),
	lowerCase = require('lower-case');


class CommonInform{
	constructor(){
		return this;
	}

	__add(domain, what){
		if (this[domain] && typeof this[domain] == 'object'){
			this[domain].add(what);
		}
	}

	__remove(domain, what){
		if (this[domain] && typeof this[domain] == 'object'){
			this[domain].remove(what);
		}
	}

	__pause(domain, what){

	}

	__resume(domain, what){

	}

	__getClass(domain, what){
		try{
			return require('not-inform-'+domain+'-'+what);
		}catch(e){
			//!TODO move to report
			log && log.error(e);
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
