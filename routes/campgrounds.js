var express 	= require("express");
var router 		= express.Router();
var Campground = require("../models/campground");
var middleware =require("../middleware");	//no need to write /index.js express automatically exports filename index.js


//INDEX - show all campgrounds
router.get("/",function(req,res){
	
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

router.post("/",middleware.isLoggedIn,function(req,res){
	//res.send("You are in post campgrounds route");
	//console.log("You are in post campgrounds route");

	//get data from form and add to campground array 
	var name = req.body.name;																								
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
			id:req.user._id,
			username: req.user.username 
	};
	var newCampgrounds = {name : name,price : price , image: image, description:desc, author:author} ;
	//campgrounds.push(newCampgrounds);

	//create a new campground and save to DB
	Campground.create(newCampgrounds,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

// SHOW- show more info about one campground 
router.get("/:id" , function(req,res){
	//find the campground with provided id
	//.populate and .exec will associate the comment to to the object id 
	
		Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
			if(err){
				console.log(err);
			}else{
				//console.log(foundCampground);
				res.render("campgrounds/show",{campground:foundCampground});		
			}
		});
	//res.send("this will be our show page one day");
	
});

//EDIT Campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.render("campgrounds/edit",{campground:foundCampground});			
		}
	});	
});	


//UPDATE Campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct route
	//redirewct on show page 
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DELETE Campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;