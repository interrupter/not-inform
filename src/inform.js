/**
 * @module not-inform/inform
 */
const config = require('not-config').readerForModule('inform');
const CommonInform = require('./common.js');
const SYM_SUPPLY = Symbol('supply');
const SYM_SINK = Symbol('sink');
const SYM_QUEE = Symbol('quee');

class Inform extends CommonInform {
	constructor(){
		this[SYM_SUPPLY] = 	new Set([]);
		this[SYM_SINK] 	= 	new Map();
		this[SYM_QUEE] 	= 	[];
		this.loadConfig();
		this.init();
		return this;
	}

	loadConfig(){
		this.options = config.get();
	}

	init(){
		if (this.options.sinks && this.options.sinks.length){
			for(let i in this.options.sinks){
				let newSink = this.initSink(this.options.sinks[i]);
				if (newSink){
					this.addSink(i, newSink);
				}
			}
		}
	}

	initSink(options){
		return this.__init('sink', options);
	}

	now(data){
		for(let t of this[SYM_RULE]){
			if( t.test(data) ){
				t.deliver(data);
			}
		}
	}

	timeout(data){

	}

	addSupply(){
		this.__add(SYM_SUPPLY, ...arguments);
	}

	removeSupply(){
		this.__remove(SYM_SUPPLY, ...arguments);
	}

	pauseSupply(){
		this.__pause(SYM_SUPPLY, ...arguments);
	}

	resumeSupply(){
		this.__resume(SYM_SUPPLY, ...arguments);
	}

	addSink(){
		this.__add(SYM_SINK, ...arguments);
	}

	removeSink(){
		this.__remove(SYM_SINK, ...arguments);
	}

	pauseSink(){
		this.__pause(SYM_SINK, ...arguments);
	}

	resumeSink(){
		this.__resume(SYM_SINK, ...arguments);
	}


}

module.exports = Inform;
