var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var Image = exports.Image = new Schema({
	content  : Buffer
  , type	 : String
});

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

exports.addPhoto = function(albumId, file, res) {
	console.log(file);
	res.redirect('/about');
}