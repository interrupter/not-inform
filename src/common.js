/**
 * @module not-inform/CommonInform
 * Common class with some usefull functions
 */

const log = require('not-log')(module);

class CommonInform{
	constructor(){
		return this;
	}

	/**
	* common key-val adder
	* @param {string|Symbol} domain property name
	* @param {any} key key name
	* @param {any} val key value
	*/

	__add(domain, key, val){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].set(key, val);
		}
	}

	/**
	* common val-by-key remover
	* @param {string|Symbol} domain property name
	* @param {any} key key name
	*/

	__remove(domain, key){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].delete(key);
		}
	}

	/**
	* common pause target object by key
	* @param {string|Symbol} domain property name
	* @param {any} key key name
	*/
	__pause(domain, key){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].get(key).pause();
		}
	}

	/**
	* common resume target object by key
	* @param {string|Symbol} domain property name
	* @param {any} key key name
	*/
	__resume(domain, key){
		if (this[domain] && typeof this[domain] == 'object' && this[domain].constructor == Map){
			this[domain].get(key).resume();
		}
	}


	/**
	* Loader for common classes like not-inform-[domain]-[what]
	* @param {string} domain name of domain
	* @param {string} what name of sub-domain
	* @return {object|false}
	*/

	__getClass(domain, what){
		try{
			return require('not-inform-' + domain + '-' + what).getClass();
		}catch(e){
			//!TODO move to report
			log && log.error('while accessing: not-inform-' + domain + '-' + what) && log.error(e);
			return false;
		}
	}

	/**
	* Initialization of common module class
	* @param {string} domain name of domain
	* @param {object} options options of module
	* @return {object|false}
	*/

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
