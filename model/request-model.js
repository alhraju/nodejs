var db = require('./db');


module.exports = {
	
	getAll: function(callback){
		var sql = "select * from request";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(request, callback){
		var sql = "insert into request values(null, '"+ request.name+"', '"+ request.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	}

}