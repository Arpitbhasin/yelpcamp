
var express 	= require("express");
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoose 	= require("mongoose");
var Campground 	= require("./models/campground"); 
var seedDB 		= require("./seeds");
var Comment 	= require("./models/comment");
var passport 	= require("passport");
var LocalStrategy = require("passport-local");
var User 		= require("./models/user");
var methodOverride = require("method-override");
var flash		= require("connect-flash");


//requiring routes
var commentRoutes 		= require("./routes/comments");
var campgroundRoutes	= require("./routes/campgrounds");
var indexRoutes			= require("./routes/index");	

mongoose.connect("mongodb://localhost/yelp_camp_v10",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));	//to connect the stylesheet,drname is just to display the current directory
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();	//seed the database 


//Passport Congiguration
app.use(require("express-session")({
	secret:"This is the secret message use to decoding",
	resave:false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//authenticate() is inbuilt method that comes with passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to pass the currentUser data to every single page 
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success"); 
	next();	//to actually move to the next user 
});



app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);	//in all the routes that are defined under campgrounds will be appendeds by /campground
											//every router will begin with /campgrounds

app.listen(3000,function(){
	console.log("YelpCamp Server is started");
});