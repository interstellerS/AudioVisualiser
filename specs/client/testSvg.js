/*globals chai , describe , it , SvgBarChart, SVGSVGElement , SvgBar , SVGRectElement , window  , document*/
var expect = chai.expect;
var assert = chai.assert ;
// Uint8Array[16]
var arrayData = [178, 164, 135, 117, 102, 92, 77, 49, 67, 74, 58, 33, 0, 0, 0, 0] ;

describe("SvgBarChart", function() {
 it("should be  constructor function instance", function() {
      var svgBarChart = new SvgBarChart({data : arrayData }) ; 
      assert.instanceOf(svgBarChart, SvgBarChart, 'type is OK');
 });
});