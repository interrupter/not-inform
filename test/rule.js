const Rule = require('../index.js').Rule,
	expect = require("chai").expect;

describe("Rule", function() {
	describe("construct", function() {
		it("simple", function() {
			let rule = new Rule({});
			expect(rule).to.be.ok;
		});
	});

	describe("criteria", function() {
		it("ok", function() {
			let rule = new Rule({});
			expect(rule.criteria()).to.be.ok;
		});
	});

	describe("test", function() {
		it("ok", function() {
			let rule = new Rule({});
			expect(rule.test()).to.be.ok;
		});
	});
});
