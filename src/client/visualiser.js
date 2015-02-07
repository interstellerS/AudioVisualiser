/*globals document HTMLAudioElement, Audio,AudioContext, AudioVisualizer , webkitAudioContext , requestAnimationFrame , SvgBarChart , document , window , Uint8Array*/
var audioElem = document.getElementById('myAudioSample');
var audioVisualizer = new AudioVisualizer(audioElem) ;
audioVisualizer.setupNodes() ;
audioElem.onplay = function(e) {
	audioVisualizer.startVisualisation() ; 
};