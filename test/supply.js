const Supply = require('../index.js').Supply,
	expect = require("chai").expect;

describe("Supply", function() {
	describe("construct", function() {
		it("simple", function() {
			let rule = new Supply({});
			expect(rule).to.be.ok;
		});
	});

	describe("message", function() {
		it("ok", function() {
			let rule = new Supply({});
			expect(rule.message.bind(rule,'happy')).to.not.throw(Error);
		});
	});

});
