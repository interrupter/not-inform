/**
 * @module not-inform/inform
 */
const config = require('not-config').readerForModule('inform');
const CommonInform = require('./common.js');
const SYM_SINK = Symbol('sink');

class Inform extends CommonInform {
	constructor(){
		super();
		this[SYM_SINK] 	= 	new Map();
		this.loadConfig();
		this.init();
		return this;
	}

	loadConfig(){
		this.options = config.get();
	}

	init(){
		if (this.options.sinks && Object.keys(this.options.sinks).length){
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
		for(const [key, sinkInst] of this[SYM_SINK].entries()){
			sinkInst.test(data, true, key);
		}
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
