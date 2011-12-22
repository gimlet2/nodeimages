var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var Image = exports.Image = module.exports = new Schema({
	content  : Buffer
  , type	 : String
});

var ImageModel = exports.model  = mongoose.model('Image', Image);



exports.get = function(id, fn){
  ImageModel.findById(id, function(err, doc) {
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