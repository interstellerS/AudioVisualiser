/*globals document */

function SvgBar (opts) {
	if (!(this instanceof SvgBar)){
      return new SvgBar(opts);
	}
	if(!opts || (typeof opts.height === 'undefined' )|| (typeof opts.index === 'undefined')){
		throw new Error('option object should be valid') ;
	}

	this.index = opts.index ;
	this.height = opts.height ;
}

SvgBar.prototype.generateSvgDom = function (){
	// TODO remove magic numbers 
	var rect = document.createElementNS(SvgBar.NS, 'rect');
	rect.setAttributeNS(null, 'x', this.index * 40 );
	rect.setAttributeNS(null, 'y', 400 - this.height);
	rect.setAttributeNS(null, 'height', this.height);
	rect.setAttributeNS(null, 'width', '30');
	rect.setAttributeNS(null, 'fill', '#3498db');
	rect.setAttributeNS(null, 'id', 'rect' + this.index);

	return rect ;
};
// TODO make NS visible by all svg constructors .
SvgBar.NS = "http://www.w3.org/2000/svg" ;