
/*
 * GET home page.
 */
 
var auth = require('../auth.js');
var user = require('../models/user.js');

exports.index = function(req, res) {
  res.render('index', { title: 'Express', layout: 'main'  });
};

exports.about = function(req, res) {
	userFromSession = {username: req.session.username, password: req.session.password};
	auth(userFromSession, user, req, res, aboutWithouAuth, exports.accessForbiden);
};

aboutWithouAuth = function(req, res) {
	res.render('about', { layout: 'main', title: 'About me' });
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
	res.redirect('/about');
}