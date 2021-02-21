/**
 * @module not-inform/inform
 */
const MODULE_NAME = require('../package.json').name;
const CommonInform = require('./common.js');
const SYM_SINK = Symbol('sink');
const log = require('not-log')(module, MODULE_NAME);
const notNode = require('not-node');

class Inform extends CommonInform {
	constructor(){
		super();
		this[SYM_SINK] 	= 	new Map();
		const App = notNode.Application;
		App.on(`module:${MODULE_NAME}:options:updated`, this.reinit.bind(this));
		this.loadConfig()
			.then(this.init.bind(this))
			.catch();
		return this;
	}

	async loadConfig(){
		try{
			const App = notNode.Application;
			this.options = await App.getModel('Options').readModuleOptions(MODULE_NAME);
			if(typeof this.options === 'undefined' || this.options === null){
				this.options = {};
			}
		}catch(e){
			log.error(e);
		}
	}

	init(){
		if (this.options && this.options.sinks && Object.keys(this.options.sinks).length){
			for(let i in this.options.sinks){
				let newSink = this.initSink(this.options.sinks[i]);
				if (newSink){
					this.addSink(i, newSink);
				}
			}
		}
		log.log('initialized');
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
		if (this.options && this.options.sinks && Object.keys(this.options.sinks).length){
			for(let i in this.options.sinks){
				this.removeSink(i);
			}
		}
	}

	reinit(){
		log.log('reinit');
		this.reset();
		return this.loadConfig()
			.then(this.init.bind(this))
			.catch();
	}
}

module.exports = Inform;
