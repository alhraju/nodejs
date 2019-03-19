var db = require('./db');


module.exports = {
	
	

	insert: function(user, callback){
		var sql = "insert into user values(null, '"+ user.name+"', '"+ user.password+"', '"+ user.email+"', '"+ user.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	}


}