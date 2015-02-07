/*globals describe, beforeEach, afterEach , it */
var server = require('../../src/server/server')
  , assert = require("assert")
  , request = require('supertest')
  , fs = require('fs')
  , join = require('path').join 
  , should = require('should')
  , cheerio = require('cheerio') ;


var exressApp = server ;

describe('server', function () {

  beforeEach(function(){
    var path = join(__dirname , '../..' , 'public',  'toto.txt') ;
    fs.writeFileSync(path, 'youpi');
  }) ;
  afterEach(function(){
    // runs after each test in this block
  });

  it('should return status ok', function(done){
    request(exressApp)
      .get('/')
      .expect(200)
      .expect('music',done);
  });

  it('should serve static files correctly', function(done){
    request(exressApp)
      .get('/toto.txt')
      .expect(200, done) ;
  });

  it('should render Jade files correctly', function(done){
    request(exressApp)
      .get('/testJade')
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        var $ = cheerio.load(res.text);
        $('h1').text().should.equal('jade is working');
       done();
     });
  });

  it('the mp3 static file should be accessable ', function(done){
    request(exressApp)
      .get('/audio/tokyo.mp3')
      .expect('Content-Type', 'audio/mpeg')
      .expect(200, done) ;
  });

  it('the css static file should be accessable ', function(done){
    request(exressApp)
      .get('/styles/style.css')
      .expect(200, done) ;
  });


  it('should return a html page with an embeded audio file and a button to start visualization', function(done){
   request(exressApp)
      .get('/audioVisualizer')
      .expect(200, done)
      .end(function (err, res) {
        should.not.exist(err);
        var $ = cheerio.load(res.text);
        assert.equal($('#myAudioSample').attr('src') , '/audio/tokyo.mp3') ;
       done();
     });
  });

  it('should serve static files in js sources folder ', function(done){
    request(exressApp)
      .get('/AudioVisualizer.js')
      .expect(200, done) ;
  });

  it('should serve static files in specs sources folder ', function(done){
    request(exressApp)
      .get('/testSvg.js')
      .expect(200, done) ;
  });

  it('should serve styles files ', function(done){
    request(exressApp)
      .get('/styles/style.css')
      .expect(200, done) ;
  });
});
