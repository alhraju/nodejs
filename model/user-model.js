var db = require('./db');


module.exports = {

	get: function(userId, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql = "select * from user where id=? and password=?";
		db.getResults(sql, [user.id, user.password], function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	}




}