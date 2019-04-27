var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
		{
			name:"Captain marvel",
			image:"https://wsswired.com/wp-content/uploads/2019/02/Captain_Marvel_EW_Textless_Cover.jpg",
			description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			name:"Iron Man",
			image:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Robert_Downey_Jr._as_Iron_Man_in_Avengers_Infinity_War.jpg/220px-Robert_Downey_Jr._as_Iron_Man_in_Avengers_Infinity_War.jpg",
			description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			name:"Steve Roggers",
			image:"https://cdn.shopify.com/s/files/1/1081/9170/products/Hot-Toys-Infinity-War-Captain-America-002_1024x1024.jpg?v=1527523065",
			description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

		}
]


function seedDB(){
	//remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
	
		//add new campgrounds
		data.forEach(function(seed){
			 Campground.create(seed,function(err,campground){
			 	if(err){
			 		console.log(err);
			 	}else{
			 		console.log("added a campground");
			 		//add the comment
			 		Comment.create({
			 			text:"Marvel is love , marvel is awesome",
			 			author:"Arpit Bhasin"
			 		},function(err,comment){
			 			if(err){
			 				console.log(err);
			 			}else{
			 				campground.comments.push(comment);
			 				campground.save();
			 				console.log("new comment created ");
			 			}
			 		});
			 	}
			 });
		});
	}); 


}

module.exports = seedDB;