
module.exports = function(user, model, req, res, sucess, deny) {
	
	model.get(user.username ,function (doc){
  		if(doc.password == user.password) {
  			sucess(req, res);
  		} else {
  			deny(req, res);
  		}
	});

}