var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here 
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	//is User LoggedIn
	//otherwise redirect , if not then redirect
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
			req,flash("error" , "Campground not found!");
			res.redirect("back");
		}else{
			//does user own the campground
			if(foundCampground.author.id.equals(req.user._id)){//builtin equals method is usewd bcz second is string and second is mongoose object 
				next();	
			}
			else{
				req,flash("error" , "You dont have the permissions to do that");
				res.redirect("back");
			}	
		}
	});
	}else{
		req.flash("error", "you need to be logged in to do that ");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	//is User LoggedIn
	//otherwise redirect , if not then redirect
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			//does user own the comment
			if(foundComment.author.id.equals(req.user._id)){
				//builtin equals method is usewd bcz second is string and second is mongoose object 
				next();	
			}else{
				req,flash("error" , "You dont have the permission to do that!");
				res.redirect("back");
			}	
		}
	});
	}else{
		req,flash("error" , "You need to be logged in to do that !");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that ");
	res.redirect("/login");
}


module.exports = middlewareObj;