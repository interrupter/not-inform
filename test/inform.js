const expect = require("chai").expect,
	path = require('path'),
	Inform = require('../index.js').Inform;

describe("inform", function() {
	describe("good init", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'good.config.json'));
		});
		it("simple", function() {
			let inform,
			 	f = ()=>{
					inform = new Inform();
				};
			expect(f).to.not.throw(Error);
		});
	});

	describe("bad init", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'bad.config.json'));
		});
		it("simple", function() {
			let inform,
			 	f = ()=>{
					inform = new Inform();
				};
			expect(f).to.not.throw(Error);
		});
	});

	describe("remove sink", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'good.config.json'));
		});
		it("remove", function() {
			let inform = new Inform(),
				f = ()=>{inform.removeSink('reports');};
			expect(f).to.not.throw(Error);
		});
	});

	describe("pause sink", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'good.config.json'));
		});
		it("pause", function() {
			let inform = new Inform(),
				f = ()=>{inform.pauseSink('reports');};
			expect(f).to.throw(Error);
		});
	});

	describe("resume sink", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'good.config.json'));
		});
		it("resume", function() {
			let inform = new Inform(),
				f = ()=>{inform.resumeSink('reports');};
			expect(f).to.throw(Error);
		});
	});


	describe("now", function() {
		before(()=>{
			require('not-config').init(path.join(__dirname, 'good.config.json'));
		});
		it("now", function() {
			let inform = new Inform(),
				f = ()=>{inform.now({tags: ['report'], data: 'some text'});};
			expect(f).to.not.throw(Error);
		});
	});
});
