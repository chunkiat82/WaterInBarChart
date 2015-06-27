var assert = require("assert")
var WaterBarChart = require("../WaterBarChart.js")

describe('WaterBarChart()', function() {
  var tests = [
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1}], expected: 6},
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1}], expected: 7},
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:4,w:1},{h:4,w:1},{h:3,w:1}], expected:6},
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:7,w:1}], expected: 19},
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:4,w:1},{h:3,w:1},{h:4,w:1},{h:7,w:1}] , expected: 20},
    {args: [{h:3,w:1},{h:4,w:1},{h:5,w:1},{h:6,w:1},{h:3,w:1},{h:3,w:1},{h:4,w:1}], expected: 8}
  ];

  tests.forEach(function(test) {
    it('correctly calculates ' + test.args.length + ' args', function() {
      var res = new WaterBarChart(test.args).calculateWater();
      assert.equal(res, test.expected);
    });
  });
});
