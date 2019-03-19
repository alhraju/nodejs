var express 	   = require('express');
var adminModel     = require.main.require('./model/admin-model');
var modaratorModel = require.main.require('./model/modarator-model');
var contentModel   = require.main.require('./model/content-model');
var requestModel   = require.main.require('./model/request-model');
var router         = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		adminModel.get(req.session.uid, function(data){
			req.session.un = data.name;
			//console.log('Name: '+req.session.un);
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	adminModel.get(req.session.uid, function(data){
		res.render('adminhome/index', data);
})});


router.get('/modarator', function(req, res){

	modaratorModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/modarator', data);
	});
});

router.post("/modarator", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	modaratorModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/adminhome/modarator');
		}else{
			res.redirect('/adminhome/modarator');
		}
	});
});

router.get('/content', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/content', data);
	});
});

router.post("/content", function(req, res){

	var content = {
		name: req.body.name.trim().toUpperCase(),
		cls: req.body.cls
	};

	contentModel.insert(content, function(status){

		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome/content');
		}
	});
});

router.get('/request', function(req, res){

	requestModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/request', data);
	});
});

router.get('/profile', function(req, res){

	adminModel.get(req.session.uid, function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/profile', data);
	});
});


router.get('/delete/:id', function(req, res){

	modaratorModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('adminhome/delete', result);
		}else{
			res.redirect('/adminhome/modarator');
		}
	});

});

router.post('/delete/:id', function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	modaratorModel.delete(user, function(status){

		if(status){
			res.redirect('/adminhome/delete:'+req.params.id);
		}else{
			res.redirect('/adminhome/modarator');
		}
	});
});

router.get('/contentdelete/:id', function(req, res){

	contentModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('adminhome/contentdelete', result);
		}else{
			res.redirect('/adminhome/content');
		}
	});
});

router.post('/contentdelete/:id', function(req, res){

	var content = {
		id: req.params.id,
		name: req.body.name,
		type: req.body.type
	};

	contentModel.delete(content, function(status){

		if(status){
			res.redirect('/adminhome/contentdelete:'+req.params.id);
		}else{
			res.redirect('/adminhome/content');
		}
	});
});

router.get('/addmodarator', function(req, res){

	modaratorModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/addmodarator', data);
	});
});

router.post("/addmodarator", function(req, res){

	var request = {
		name: req.body.name,
		type: req.body.type
	};
	modaratorModel.insert(request, function(status){

		if(status){
			res.redirect('/adminhome/addmodarator');
		}else{
			res.redirect('/adminhome');
		}
	});
});

router.get('/addcontent', function(req, res){

	contentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/addcontent', data);
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
			res.redirect('/adminhome/addcontent');
		}else{
			res.redirect('/adminhome');
		}
	});
});


module.exports = router;






