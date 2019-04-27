var express 	= require("express");
var router 		= express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment 	= require("../models/comment");
var middleware =require("../middleware");	//no need to write /index.js express automatically exports filename index.js


//******************************************************
//	Comment Routes
//******************************************************
router.get("/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}else{
			res.render("comments/new",{campground:campground});
		}
	});
});
//create 
router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup campground using id 
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}else{
			//create new comment
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error" , "Somenthing went wrong!!");
					console.log(err);
				}else{
					//connect new comment to campground
					//redirect campground show page

					//add username and id to the comment
					comment.author._id = req.user._id;
					comment.author.username = req.user.username;
					// save the comment 
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success" , "Successfully added comment!");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
			

		}
	});
	 
});

//Comment Edit Route 
router.get("/:comment_id/edit",middleware.isLoggedIn,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id , comment:foundComment});
		}
	})	
});

//comment update 
router.put("/:comment_id",middleware.isLoggedIn,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);	//as id is appended with commentRoutes 
		}
	});
});

//comment delete route
router.delete("/:comment_id",middleware.isLoggedIn,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			req.flash("success" , "comment Deleted !");
			res.redirect("/campgrounds/"+req.params.id); 
		}
	});
}) ;




module.exports = router;