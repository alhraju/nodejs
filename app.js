//DECLARATION
var express  		= require('express');
var login 			= require('./controllers/login');
var registration 	= require('./controllers/registration');
var adminhome 		= require('./controllers/adminhome');
var modaratorhome 	= require('./controllers/modaratorhome');
var userhome 	    = require('./controllers/userhome');
var logout 			= require('./controllers/logout');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'smsnodejs', saveUninitialized: true, resave: false}));
app.use('/login', login);
app.use('/registration', registration);
app.use('/adminhome', adminhome);
app.use('/modaratorhome', modaratorhome);
app.use('/userhome', userhome);
app.use('/logout', logout);
app.use('/resource', express.static('resource'));

//ROUTES
app.get('/', (req, res)=> res.send('index page'));


//SERVER STARTUP
app.listen(4000, function(){
	console.log('server started at 4000...');
});
