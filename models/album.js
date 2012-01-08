var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;
var fs = require('fs');

// require model
var Image = require('./image.js');
var ImageModel = mongoose.model('Image', Image);

// model
var Album = exports = module.exports = new Schema({
	_id		 : ObjectId
  , name     : String
  , owner	 : String
  , tezis    : String
  , isNew	 : Boolean
  , isBest	 : Boolean
  , isPublic : Boolean
  , images	 : [Image]
});

var AlbumModel = exports.model  = mongoose.model('Album', Album);


// get album
exports.get = function(id, fn){
  AlbumModel.findById(id, function(err, doc) {
		checkError(err, doc, fn);
	});
};

exports.getAll = function(req, fn) {
	AlbumModel.find({owner: req.session.user._id}, function(err, doc) {
		checkError(err, doc, fn);
	});
}

checkError = function(err, doc, fn) {
		if(err == null) {
			fn(doc);
		} else {
			fn(null);
  			console.log(err);
		}
}

exports.create = function(req, fn) {
	var album = new AlbumModel();
		album.name = req.body.albumName;
		album.tezis = req.body.albumTezis;
		album.owner = req.session.user._id;
		album.isPublic = false;
		album.isNew = true;
		album.isBest = false;
		album.save(function(err) {
			checkError(err, null, fn);
		});
}

exports.addPhoto = function(albumId, filename, file, res) {

	exports.get(albumId, function(album) {
		if(album == null) {
			console.log('Album not found');
		} else {
			var image = new ImageModel();
			image.name = filename;
			image.type = file.type;
			image.content = fs.readFileSync(file.path);
			if (album.images == null) {
				album.images = {};
			}
			album.images.push(image);
			album.isNew = false;
			album.save(function(err) {
				console.log(err);
				res.redirect('/admin/'+albumId);		
			});

		}
	});
}

