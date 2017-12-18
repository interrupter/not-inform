const Rule = require('../index.js').Rule,
	Sink = require('../index.js').Sink,
	expect = require("chai").expect;

describe("Sink", function() {
	describe("construct", function() {
		it("simple", function() {
			let sink = ()=>{ new Sink({
				type: "test",
				meet: "any"
			});};
			expect(sink).to.not.throw(Error);
		});

		it("no options", function() {
			let sink = ()=>{ new Sink();};
			expect(sink).to.not.throw(Error);
		});

		it("empty options", function() {
			let sink = ()=>{ new Sink({});};
			expect(sink).to.not.throw(Error);
		});

		it("empty rules", function() {
			let sink = ()=>{ new Sink({ rules:[]});};
			expect(sink).to.not.throw(Error);
		});

		it("rule module not exists", function() {
			let sink = ()=>{ new Sink({ rules:{ 1: {type:'yoga'}}});};
			expect(sink).to.not.throw(Error);
		});
	});

	describe("__testAll", function() {
		it("one rule", function() {
			let sink =  new Sink({
					type: "test",
					meet: "all"
				}),
				rule = new Rule({});
			sink.addRule('test',rule);
			expect(sink.test({}, false)).to.be.true;
		});

		it("one from many", function() {
			let sink = new Sink({
				type: "test",
				meet: "all"
			});
			sink.addRule('test',new Rule({}));
			sink.addRule('test1',new Rule({default: false}));
			sink.addRule('test3',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.false;
		});

		it("none from many", function() {
			let sink = new Sink({
				type: "test",
				meet: "all"
			});
			sink.addRule('test',new Rule({default: false}));
			sink.addRule('test1',new Rule({default: false}));
			sink.addRule('test3',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.false;
		});

		it("none from one", function() {
			let sink = new Sink({
				type: "test",
				meet: "all"
			});
			sink.addRule('test',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.false;
		});

		it("all from many", function() {
			let sink = new Sink({
				type: "test",
				meet: "all"
			});
			sink.addRule('test1', new Rule({default: true}));
			sink.addRule('test2', new Rule({default: true}));
			sink.addRule('test3', new Rule({default: true}));
			sink.addRule('test4', new Rule({default: true}));
			expect(sink.test({}, false)).to.be.true;
		});
	});

	describe("__testAny", function() {
		it("one rule", function() {
			let sink = new Sink({
				type: "test",
				meet: "any"
			});
			sink.addRule('test',new Rule({}));
			expect(sink.test({}, false)).to.be.true;
		});

		it("one from many", function() {
			let sink = new Sink({
				type: "test",
				meet: "any"
			});
			sink.addRule('test',new Rule({}));
			sink.addRule('test1',new Rule({default: false}));
			sink.addRule('test3',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.true;
		});

		it("none from many", function() {
			let sink = new Sink({
				type: "test",
				meet: "any"
			});
			sink.addRule('test',new Rule({default: false}));
			sink.addRule('test1',new Rule({default: false}));
			sink.addRule('test3',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.false;
		});

		it("none from one", function() {
			let sink = new Sink({
				type: "test",
				meet: "any"
			});
			sink.addRule('test',new Rule({default: false}));
			expect(sink.test({}, false)).to.be.false;
		});
	});

});
