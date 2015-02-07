var express = require('express');

var pub = __dirname + '/../../public' ;
var views = __dirname + '/views' ;
var src = __dirname + '/../client' ;
var specs = __dirname + '/../../specs/client' ;

var app = express();
app.use(express.static(pub));
app.use(express.static(src));
app.use(express.static(specs));

app.set('views', views);
app.set('view engine', 'jade');


app.get('/', function(req, res){
  res.send('music');
});



app.get('/testJade', function(req, res){
  res.render('testJade');
});

app.get('/audioVisualizer', function(req, res){
  res.render('visualizer');
});

app.get('/testSvg', function(req, res){
  res.render('testSvg');
});

app.listen(3000) ;

module.exports = app;
