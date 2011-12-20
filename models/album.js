var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;



var Album = exports = module.exports = new Schema({
    name     : String
  , tezis    : String
  , isNew	 : Boolean
  , isBest	 : Boolean
});

var AlbumModel = exports.model  = mongoose.model('Album', Album);



exports.get = function(id, fn){
  AlbumModel.findOne({ 'aid': id}, function(err, doc) {
  		if(err == null) {
  			fn(doc);
  		} else {
  			fn(null);
  			console.log(err);
  		}
  });
};

exports.create = function(username, pass, fn) {
	var user = new AlbumModel();
		user.username = username;
		user.password = pass;

		user.save(function(err) {
			console.log(err);
		});
//		fn(user);
}

exports.addPhoto = function(albumId, file, res) {
	console.log(file);
	res.redirect('/about');
}