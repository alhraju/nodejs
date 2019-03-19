var express 	   = require('express');
var modaratorModel = require.main.require('./model/modarator-model');
var contentModel   = require.main.require('./model/content-model');
var requestModel   = require.main.require('./model/request-model');
var router 		   = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		modaratorModel.get(req.session.uid, function(data){
			req.session.un = data.name;
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	modaratorModel.get(req.session.uid, function(data){
		res.render('modaratorhome/index', data);
})});



router.get('/content', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('modaratorhome/content', data);
	});
});

router.post("/content", function(req, res){

	var content = {
		name: req.body.name.trim().toUpperCase(),
		cls: req.body.cls
	};
	
	contentModel.insert(content, function(status){

		if(status){
			res.redirect('/modaratorhome');
		}else{
			res.redirect('/modaratorhome/content');
		}
	});
});

router.get('/request', function(req, res){

	requestModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('modaratorhome/request', data);
	});
});

router.get('/profile', function(req, res){

	modaratorModel.get(req.session.uid, function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('modaratorhome/profile', data);
	});
});

router.get('/delete/:id', function(req, res){

	contentModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('modaratorhome/delete', result);
		}else{
			res.redirect('/modaratorhome/content');
		}
	});
});

router.post('/delete/:id', function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		type: req.body.type
	};

	contentModel.delete(user, function(status){

		if(status){
			res.redirect('/modaratorhome/delete:'+req.params.id);
		}else{
			res.redirect('/modaratorhome/content');
		}
	});
});


router.get('/addcontent', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('modaratorhome/addcontent', data);
	});
});

router.post("/addcontent", function(req, res){

	var request = {
		name: req.body.name,
		file: req.body.file,
		type: req.body.type
	};
	contentModel.insert(request, function(status){

		if(status){
			res.redirect('/modaratorhome/addcontent');
		}else{
			res.redirect('/modaratorhome');
		}
	});
});

module.exports = router;






