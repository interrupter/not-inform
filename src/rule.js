class Rule{
	constructor(options){
		this.options = options;
		return this;
	}

	/**
	* Should be redefined in children classes
	* @param {object} message message data object
	* @return {boolean} if check passed
	*/
	criteria(){
		if (this.options && this.options.hasOwnProperty('default')){
			return this.options.default;
		}else{
			return true;
		}
	}

	test(data){
		return this.criteria(data);
	}
}

module.exports = Rule;
