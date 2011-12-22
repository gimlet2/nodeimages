var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var Image = module.exports = new Schema({
	name	 : String	
  ,	content  : Buffer
  , type	 : String
});

var ImageModel = exports.model  = mongoose.model('Image', Image);



exports.get = function(id, fn){
  ImageModel.findById(id, function(err, doc) {
		checkError(err, doc, fn);
  });
};

exports.getAll = function(fn) {
	ImageModel.find({}, function(err, doc) {
		checkError(err, doc, fn);
	});
}

