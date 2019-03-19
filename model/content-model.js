var db = require('./db');


module.exports = {

	get: function(userId, callback){
		var sql = "select * from content where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	
	getAll: function(callback){
		var sql = "select * from content";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	getAllMatched: function(txt, callback){
		var sql = "SELECT * FROM content WHERE name LIKE '"+txt+"%'";
		console.log(sql);
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(user, callback){
		var sql = "insert into content values(null, '"+ user.name+"', '"+ user.file+"', '"+ user.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	},

	delete: function(content, callback){
		var sql = "delete from content where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}


}