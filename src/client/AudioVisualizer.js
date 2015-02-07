/*globals HTMLAudioElement, Audio,AudioContext, webkitAudioContext , requestAnimationFrame , SvgBarChart , document , window , Uint8Array*/

var toString = Object.prototype.toString ;

function AudioVisualizer (opts) {

	
  this.init(opts) ;
}

AudioVisualizer.prototype.init = function(opts) {
  if (opts instanceof HTMLAudioElement) {
    this.audio = opts ;
  }

	// if opts is string construct audio element tag
    if (toString.call(opts) === '[object String]') {
      this.createAudioElement(opts) ;
    }
};

AudioVisualizer.prototype.isAudioPresent = function() {
  return this.audio && this.audio instanceof HTMLAudioElement ;
};

AudioVisualizer.prototype.createAudioElement = function(url) {
  var audio = new Audio();
  audio.src = url;
  audio.id = 'myAudioSample' ;
  this.audio = audio ;
};

AudioVisualizer.prototype.setupNodes = function() {
  var AudioContextInitilisze = AudioContext || webkitAudioContext  ;
	var context = new AudioContextInitilisze();

  var analyser = context.createAnalyser() ;
  analyser.smoothingTimeConstant = 0.8 ;
  analyser.fftSize = 32;

  var sourceNode = context.createMediaElementSource(this.audio);
  sourceNode.connect(analyser);
  analyser.connect(context.destination);

  this.analyser = analyser ;
};

AudioVisualizer.prototype.startVisualisation = function() {
	this.audio.play();
	this.repaint() ;
};

AudioVisualizer.prototype.repaint = function() {
	var array =  new Uint8Array(this.analyser.frequencyBinCount);
	this.analyser.getByteFrequencyData(array);
	this.audioAnimation = requestAnimationFrame(this.repaint.bind(this));

  var options = {data : array , width : window.innerWidth } ;
  var svgBarChart = new SvgBarChart(options) ; 
  var finalSvg = svgBarChart.generateSvgDom() ;

  var div = document.getElementById('visualisationDiv') ;
  div.innerHTML = '';
  div.appendChild(finalSvg) ;

};