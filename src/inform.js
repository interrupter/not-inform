/**
 * @module not-inform/inform
 */
const CommonInform = require('./common.js');
const SYM_SINK = Symbol('sink');
const log = require('not-log')(module, 'not-inform');
const notNode = require('not-node');

class Inform extends CommonInform {
	constructor(){
		super();
		this[SYM_SINK] 	= 	new Map();
		const App = notNode.Application;
		App.on(`module:${moduleName}:options:updated`, this.reinit.bind(this));
		this.loadConfig()
			.then(this.init.bind(this))
			.catch();
		return this;
	}

	async loadConfig(){
		try{
			const App = notNode.Application;
			this.options = await App.getModel('Options').readModuleOptions('not-inform');
			log.log(this.options);
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

	reset(){
		if (this.options.sinks && Object.keys(this.options.sinks).length){
			for(let i in this.options.sinks){
				this.removeSink(i);
			}
		}
	}

	reinit(){
		this.reset();
		return this.loadConfig()
			.then(this.init.bind(this))
			.catch();
	}
}

module.exports = Inform;
