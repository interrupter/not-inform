/**
 * @module not-inform/inform
 */
const config = require('not-config').readerForModule('inform');
const CommonInform = require('./common.js');
const SYM_SINK = Symbol('sink');
const log = require('not-log')(module, 'not-inform');
const App = require('noe-node').Application;

class Inform extends CommonInform {
	constructor(){
		super();
		this[SYM_SINK] 	= 	new Map();
		this.loadConfig()
			.then(()=> this.init())
			.catch();
		return this;
	}

	async loadConfig(){
		try{
			this.options = App.getModel('Options').readerForModule('not-inform');
		}catch(e){
			log.error(e);
		}
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
