
module.exports = function(user, model, req, res, sucess, deny) {
	
	model.get(user.username ,function (doc){
  		if(doc != null && doc.password == user.password) {
  			req.session.user = doc;
  			sucess(req, res);
  		} else {
  			deny(req, res);
  		}
	});

}