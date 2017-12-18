const CommonInform = require('../src/common.js'),
	expect = require("chai").expect;

describe("CommonInform", function() {
	describe("construct", function() {
		it("simple", function() {
			let inform = new CommonInform({});
			expect(inform).to.be.ok;
		});
	});

	describe("__add", function() {
		it("domain exists, val is ok", function() {
			let inform = new CommonInform({});
			inform.rules = new Map();
			let f = function(){inform.__add('rules', 'key', 'val');};
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(inform.rules.get('key')).to.be.equal('val');
		});

		it("domain is not exists, val is ok", function() {
			let inform = new CommonInform({});
			inform.rules = new Map();
			let f = function(){inform.__add('rules1', 'key', 'val');};
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.false;
			expect(inform.rules.get('key')).to.be.undefined;
		});
	});

	describe("__remove", function() {
		it("domain exists, val is ok", function() {
			let inform = new CommonInform({});
			inform.rules = new Map();
			inform.rules.set('key', 'val');
			let f = function(){ inform.__remove('rules', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.false;
			expect(inform.rules.get('key')).to.be.undefined;
		});

		it("domain is exists, key is not", function() {
			let inform = new CommonInform({});
			inform.rules = new Map();
			inform.rules.set('key', 'val');
			let f = function(){ inform.__remove('rules', 'key1'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(inform.rules.has('key1')).to.be.false;
			expect(inform.rules.get('key')).to.be.equal('val');
		});

		it("domain is not exists, val is ok", function() {
			let inform = new CommonInform({});
			inform.rules = new Map();
			inform.rules.set('key', 'val');
			let f = function(){ inform.__remove('rules1', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(inform.rules.has('key1')).to.be.false;
			expect(inform.rules.get('key')).to.be.equal('val');
		});
	});

	describe("__pause", function() {
		it("domain exists, val is ok", function() {
			let inform = new CommonInform({}),
				paused = false;
			inform.rules = new Map();
			inform.rules.set('key', {pause: () => {
				paused = true;
			}});
			let f = function(){ inform.__pause('rules', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(paused).to.be.true;
		});

		it("domain is exists, key is not", function() {
			let inform = new CommonInform({}),
				paused = false;
			inform.rules = new Map();
			inform.rules.set('key', {pause: () => {
				paused = true;
			}});
			let f = function(){ inform.__pause('rules', 'key1'); };
			expect(f).to.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(inform.rules.has('key1')).to.be.false;
			expect(paused).to.be.false;
		});

		it("domain is not exists, key is not", function() {
			let inform = new CommonInform({}),
				paused = false;
			inform.rules = new Map();
			inform.rules.set('key', {pause: () => {
				paused = true;
			}});
			let f = function(){ inform.__pause('rules1', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(paused).to.be.false;
		});
	});

	describe("__resume", function() {
		it("domain exists, val is ok", function() {
			let inform = new CommonInform({}),
				paused = true;
			inform.rules = new Map();
			inform.rules.set('key', {resume: () => {
				paused = false;
			}});
			let f = function(){ inform.__resume('rules', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(paused).to.be.false;
		});

		it("domain exists, key is not", function() {
			let inform = new CommonInform({}),
				paused = true;
			inform.rules = new Map();
			inform.rules.set('key', {resume: () => {
				paused = false;
			}});
			let f = function(){ inform.__resume('rules', 'key1'); };
			expect(f).to.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(inform.rules.has('key1')).to.be.false;
			expect(paused).to.be.true;
		});

		it("domain is not exists, key is not", function() {
			let inform = new CommonInform({}),
				paused = true;
			inform.rules = new Map();
			inform.rules.set('key', {resume: () => {
				paused = false;
			}});
			let f = function(){ inform.__resume('rules1', 'key'); };
			expect(f).to.not.throw(Error);
			expect(inform.rules.has('key')).to.be.true;
			expect(paused).to.be.true;
		});
	});

	describe("__getClass", function() {
		it("sink - email", function() {
			let inform = new CommonInform({}),
			 	f = function(){
					inform.__getClass('sink', 'email');
				};
			expect(f).to.not.throw(Error);
		});
		it("sunken - email, not exists", function() {
			let inform = new CommonInform({}),
			 	f = function(){
					inform.__getClass('sunken', 'email');
				};
			expect(f).to.not.throw(Error);
		});
	});

	describe("__init", function() {
		it("no options", function() {
			let inform = new CommonInform({});
			expect(inform.__init('sink')).to.be.false;
		});

		it("empty options", function() {
			let inform = new CommonInform({});
			expect(inform.__init('sink', {})).to.be.false;
		});

		it("type not exists", function() {
			let inform = new CommonInform({});
			expect(inform.__init('sink', {type: 'milk'})).to.be.false;
		});

		it("domain and type not exists", function() {
			let inform = new CommonInform({});
			expect(inform.__init('solt', {type: 'milk'})).to.be.false;
		});

		it("domain and type exists", function() {
			let inform = new CommonInform({});
			expect(inform.__init('sink', {type: 'email'})).to.be.ok;
		});
	});
});
