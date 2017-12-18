class Rule{
	constructor(options){
		this.options = options;
		return this;
	}

	/**
	* Should be redefined in children classes
	* @param {object} message message data object
	* @param {object} options options from rule setup
	* @return {boolean} if check passed
	*/
	criteria(){
		return true;
	}

	test(data){
		return (this.criteria(message, this.options));
	}
}

module.exports = Rule;
