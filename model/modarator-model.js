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
	getAll: function(callback){
		var sql = "select * from user where type='m'";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(user, callback){
		var sql = "insert into user values(null, '"+ user.name+"', '"+ user.password+"', '"+ user.email+"', '"+ user.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	},
	
	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}