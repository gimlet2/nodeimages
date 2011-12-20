
var auth = require('../auth.js');
var user = require('../models/user.js');
var album = require('../models/album.js');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Express', layout: 'main'  });
};

exports.admin = function(req, res) {
	userFromSession = {username: req.session.username, password: req.session.password};
	auth(userFromSession, user, req, res, adminWithoutAuth, exports.accessForbiden);
}

exports.about = function(req, res) {
	res.render('about', { layout: 'main', title: 'About me' });
};

adminWithoutAuth = function(req, res) {
	res.render('admin', { layout: 'main', title: 'Admin page' });
};

exports.accessForbiden = function(req,res){
	res.redirect('/login');
};

exports.login = function(req, res) {
	res.render('login', {title: 'Login page', layout: 'main'});
};

exports.error = function(req, res) {
	res.render('error', {layout: 'main', title: 'Error page'});
};

exports.doLogin = function(req, res) {
	req.session.username = req.body.username;
	req.session.password = req.body.password;
	res.redirect('/admin');
}

exports.doUpload = function(req, res) {
	album.addPhoto(req.body.albumId, req.files.file, res);
}