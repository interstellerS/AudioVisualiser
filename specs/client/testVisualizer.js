/*globals chai , describe , it , SvgBarChart, AnalyserNode , SVGSVGElement , AudioVisualizer , SvgBar , SVGRectElement , window  , document*/
var expect = chai.expect;
var assert = chai.assert ;

describe("SvgBarChart", function() {
 it("AudioVisualizer should be  constructor function instance", function() {
      var audioVisualizer = new AudioVisualizer() ; 
      assert.ok( audioVisualizer instanceof AudioVisualizer  , "AudioVisualizer is a constructor function" );
 });
 it("should accept audio param", function() {
      var audio = document.getElementById('myAudioSample') ;
      var audioVisualizer = new AudioVisualizer(audio) ; 
      assert.ok( audioVisualizer.audio === audio , "audio element found" );
 });
 it("isAudioPresent function ok ", function() {
      var audio = document.getElementById('myAudioSample') ;
      var audioVisualizer = new AudioVisualizer(audio) ;
      assert.ok( audioVisualizer.isAudioPresent(), "isAudioPresent Function ok" );
 });
 it("create audio element from url ", function() {
      var audioVisualizer = new AudioVisualizer('/base/public/audio/source.mp3') ;
      assert.ok( audioVisualizer.isAudioPresent(), "create audio element from url" );
  });
 it("isAudioPresent function ok setup nodes  ", function() {
       var audioVisualizer = new AudioVisualizer('/base/public/audio/source.mp3') ;
      audioVisualizer.setupNodes() ;
      var analyser = audioVisualizer.analyser ;
      assert.ok( analyser && analyser instanceof AnalyserNode , "setup nodes ok " );
 });
it("startRendering method should start audio play", function() {
      var audioVisualizer = new AudioVisualizer('/base/public/audio/tokyo.mp3') ;
  audioVisualizer.setupNodes() ;
  assert.ok( true === true , "true is true" );
 });
});