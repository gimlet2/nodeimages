
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

// TODO: registrationform
// Initialize super user.
//var user = require('./models/user.js');
//user.get('admin', function(result) {
//	if(result == null) {
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

// TODO: WTF?
app.is('an image', function(req){
      return 0 == req.headers['content-type'].indexOf('image');
});

// Routes
// TODO: admin->:username
// group get
app.get('/', routes.index); // homepage
app.get('/about', routes.about); // about project
app.get('/admin', routes.admin); // admin album
app.get('/admin/:albumId', routes.adminimage); // admin image
app.get('/login', routes.login); // login form
app.get('/image/:albumId/:id', routes.image); // show image

// group post
app.post('/login', routes.doLogin); // auth
app.post('/upload', routes.doUpload); // upload image
app.post('/album', routes.createAlbum); // create album

// group delete
//app.post('/album/:albumId/delete', routes.deleteAlbum); // delete album
app.del('/album/:albumId', routes.deleteAlbum); 

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

