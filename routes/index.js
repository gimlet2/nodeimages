
// auth form
var auth = require('../auth.js');
// models
var user = require('../models/user.js');
var album = require('../models/album.js');
var image = require('../models/image.js');

/*
 * GET home page.
 */
exports.index = function(req, res) {
	res.render('index', { title: 'Express', layout: 'main'  });
};

/*
 * GET admin album page
 */
exports.admin = function(req, res) {
	userFromSession = {username: req.session.username, password: req.session.password};
	auth(userFromSession, user, req, res, adminWithoutAuth, exports.accessForbiden);
}

/*
 * GET admin image page
 */
exports.adminimage = function(req, res){
    userFromSession = {username: req.session.username, password: req.session.password};
    auth(userFromSession, user, req, res, adminImagePage, exports.accessForbiden);
}

/*
 * GET about page
 */
exports.about = function(req, res) {
	res.render('about', { layout: 'main', title: 'About me' });
};

/*
 * admin album page
 */
adminWithoutAuth = function(req, res) {
	album.getAll(req, function(albumsList) {
		res.render('admin', { layout: 'main', title: 'Admin album page', albums: albumsList});
	});
	
};

/*
 * admin images page
 */
adminImagePage = function(req, res){
    var albumId = req.params.albumId;
    album.get(albumId, function(albumResult){
        var imagesList = albumResult.images;
        res.render('adminimage',{layout:'main', title: 'Admin images page', albumId: albumId, images: imagesList});
    })
}

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
	console.log(req.body);
	album.addPhoto(req.body.albumId, req.body.filename, req.files.file, res);
}

exports.createAlbum = function(req, res) {
	album.create(req, function() {
		res.redirect('/admin');
	});
}

exports.image = function(req, res) {
	album.get(req.params.albumId, function(albumResult) {
		img = albumResult.images.id(req.params.id);
		res.writeHead(200, {"Content-Type": img.type});
    	res.write(img.content, "binary");
	    res.end();
	});
}
