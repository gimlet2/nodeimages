
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


var app = module.exports = express.createServer(
	express.cookieParser(),
	express.session({ secret: 'GFTYUrtyfygfT^&**uyhgiugiuyg67fyt' })
);

app.register('html', require('ejs'));

// DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images');

// var user = require('./models/user.js');
//user.get('admin', function(result) {
//	if(result.length == 0) {
//		user.create('admin', 'admin123', null);
//	}
//});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.is('an image', function(req){
      return 0 == req.headers['content-type'].indexOf('image');
});

// Routes

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/admin', routes.admin);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);

app.post('/upload', routes.doUpload);
app.post('/album', routes.createAlbum);



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
