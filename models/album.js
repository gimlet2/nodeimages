var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;
var fs = require('fs');

var Image = require('./image.js');
var ImageModel = mongoose.model('Image', Image);

var Album = exports = module.exports = new Schema({
	_id		 : ObjectId
  , name     : String
  , tezis    : String
  , isNew	 : Boolean
  , isBest	 : Boolean
  , images	 : [Image]
});

var AlbumModel = exports.model  = mongoose.model('Album', Album);



exports.get = function(id, fn){
  AlbumModel.findById(id, function(err, doc) {
		checkError(err, doc, fn);
	});
};

exports.getAll = function(fn) {
	AlbumModel.find({}, function(err, doc) {
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

exports.create = function(name, tezis, fn) {
	var album = new AlbumModel();
		album.name = name;
		album.tezis = tezis;

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
				res.redirect('/admin');		
			});

		}
	});

}