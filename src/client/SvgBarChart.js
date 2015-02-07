/*globals SvgBar , document  */
function SvgBarChart (opts) {

  if (!(this instanceof SvgBarChart)){
      return new SvgBarChart(opts);
  }
  if(!opts || !opts.data){
    throw new Error('option object should be valid') ;
  }

  this.height = opts.height || 300 ;
  this.width = opts.width || 300 ;
  this.bars = [] ;

  for (var i = 0; i < opts.data.length; i++) {
    var value = opts.data[i] ;
    var bar = new SvgBar({index : i , height : value}) ;
    this.bars[i] = bar ;
  }
}

SvgBarChart.prototype.generateSvgDom = function (){
	var svg = document.createElementNS(SvgBarChart.NS, "svg");

	svg.setAttributeNS (null, "viewBox", "0 0 " + this.width + " " + this.height);
    svg.setAttributeNS (null, "width", this.width);
    svg.setAttributeNS (null, "height", this.height);

    for (var i = 0; i < this.bars.length; i++) {
      var bar = this.bars[i] ;
      var svgBar = bar.generateSvgDom() ;
      svg.appendChild(svgBar) ;
    }

	return svg ; 
};

SvgBarChart.prototype.getNumBars = function (){
	return this.bars.length ;
};

SvgBarChart.prototype.getBarAt = function (index){
	return this.bars[index] ;
};

SvgBarChart.NS = "http://www.w3.org/2000/svg" ;
