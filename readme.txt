
dependencies
	npm install body-parser ejs express mongoose request --save
	npm install passport passport-local passport-local-mongoose express-session --save 
	npm install method-override --save
	npm install -g  nodemon 	 

# yelpCamp

#initial Setup
	*Add landing page  
	*Add campground page that lists all campgrounds

Each campgrounds has 
	*name 
	*image

#layout and basic styling 
	*create our header and footer partials 
	*Add in bootstrap

#Creating New Campground
	*Setup new Campground POST route
	*Add in body-parser
	*Setup route to show form
	*Add basic unstyled form

#style campground page 
	*Add a better header/title
	*Make campgronds display in a grid

#style the navbar and Form
	*Add a navbar to all template 
	*style the new campground form	 	 

#add mongoose 
	*install and configure mongoose
	*setup campground model
	*use campgrounds model inside our routes

#Show page
	*Add description for our campground model
	*Show db.cllection.drop
	*Add a show/route template

#refactor mongoose code 
	*create a model directory
	*use module.exports
	*require everything correctly

#Add seeds file
	*Add a seed.js file 
	*Run the seeds file everytime the server starts

# Add the comment model
	*Make our errors go away 
	*Display comment on campground show page

#style show page
	*display comment nicely
	*add sidebar to showpage	 

#finish styling showpage 
	*Add public directory
	*Add custom stylesheet

#Auth Pt-1 Add User Model
	*Install all the packages needed for auth 
	*Define User Model	

#Auth Pt-2 Register
	*Configure Passport
	*Add Register Routes 
	*Add Register Template 

#Auth Pt-3 Login
	*Add login routes
	*add logijn template 

#Auth Pt-4 Logout/navbar 
	*Add logout route
	*Prevent user from not adding comment if not signed in
	*Add Links to navbar 

#Auth pt-5 Show hide links
	*Show/ hide auth correctly

#Refactor the routes
	*Use express router to organise all the route 


#Users + Comments
	*Associate users and comment
	*Save author's name to the comment automatically
	
#Users + Campgrounds
	*Prevent an unauthorised user to creating a campground
	*Save username+id to newly created campground

#Editing Campgrounds
	*Add Method-Overide
	*Add Edit Route for Campgrounds
	*Add Link to edit Page
	*Add Update Route
	*Fix $set Problem

# Deleting Campgrounds
	*Add Destroy Route
	*Add Delete Button

#Authorization(permissions)
	*User can edit only his/her campgrounds
	*User can delete only his/her campgrounds
	*Hide/Show edit and delete buttons

#Editing Comments
	*Add Edit route for commnets 
	*Add Edit button
	*Add update route 
#Deleting Comments 
	*Add destroy route
	*Add delete button

Campground Destroy Route: /campground/:id	
Comment Destroy Route:	  /campgrounds/:id/comments/:comment_id	

#Authorization Pt2 :Comments 
	*User can only edit his/her comments 
	*User can only delete his/her comments		 
	*Hide/show edit and delete buttons
	*refactor middleware 

#Adding in flashes 
	*demo working verson
	*Install and configure connect-flash
	*Add bootstrap alerts to header
	

RESTFUL Routes
name 		url							verb	desc
=================================================================
INDEX 		/campground					GET		Display a list of all campground
NEW 		/campground/new 			GET		Displays a form to add new campground
CREATE 		/campground					POST	Add new campground to DB
SHOW 		/campground/:id 			GET 	Shows info about one campground

NEW  		campgrounds/:id/comments/new GET	
CREATE 		campgrounds/:id/comments	POST	
