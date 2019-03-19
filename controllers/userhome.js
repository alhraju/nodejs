var express 		 = require('express');
var userModel        = require.main.require('./model/user-model');
var requestModel     = require.main.require('./model/request-model');
var contentModel     = require.main.require('./model/content-model');
var router 			 = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		userModel.get(req.session.uid, function(data){
			req.session.un = data.name;
			//console.log('Name: '+req.session.un);
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	userModel.get(req.session.uid, function(data){
		res.render('userhome/index', data);
})});

router.get('/content', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('userhome/content', data);
	});
});

router.get('/request', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('userhome/request', data);
	});
});

router.post("/request", function(req, res){

	var request = {
		name: req.body.name,
		type: req.body.type
	};
	requestModel.insert(request, function(status){

		if(status){
			res.redirect('/userhome/request');
		}else{
			res.redirect('/userhome');
		}
	});
});

router.get('/search', function(req, res){
	
		var data = {
			name: req.session.un
		};
		res.render('userhome/search', data);
});


router.post('/search', function(req, res){

	var d = req.body;
	if(d.sel == "1")
	{
		contentModel.getAllMatched(d.txt, function(results){
			console.log(results);
			var data = {
				uList: results
			};
			res.render('userhome/search1', data);
		});
	}
	else
	{
		contentModel.getAllMatched(d.txt, function(results){
	
			var data = {
				uList: results
			};
			res.render('userhome/search1', data);
		});
	}
});

module.exports = router;






