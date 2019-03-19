var express = require('express');
var registrationModel = require.main.require('./model/registration-model');
var router = express.Router();

//ROUTES
router.get('/', function(req, res){
	res.render('registration/index');
});


router.post("/", function(req, res){

	var user = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type
	};
	registrationModel.insert(user, function(status){

		if(status){
			res.redirect('/registration');
		}else{
			res.redirect('/login');
		}
	});
});
		

module.exports = router;






