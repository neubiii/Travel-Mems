//all the middlewares goes here...
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundAuth = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","cmpground not found");
			res.redirect("back");
		}
		else{
			 if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
			if(foundCampground.author.id.equals(req.user._id)){
			next();
			}
			else{
				req.flash("error","Sorry you have no permission to do that");
				res.redirect("back");
			}
			
		}
	})
}
	else{
		req.flash("error","you have to login to do that")
		res.redirect("back")
	}
}

middlewareObj.checkCommentAuth = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error","sorry,campground not found");
			res.redirect("back");
		}
		else{
			// if (!foundCampground) {                   when i add these statements it shows in terminal that foundCampground is not defined
              //      req.flash("error", "Item not found.");
                ///    return res.redirect("back");
               // }
		
			if(foundComment.author.id.equals(req.user._id)){
			 return next();
			}
			else{
				req.flash("error","Sorry,you have no permission to do that");
				res.redirect("back");
			}
			
		}
	})
}
	else{
		req.flash("error","Sorry,you have to be logged in to do that");
		res.redirect("back")
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Sorry,you have to be logged in to do that");
	res.redirect("/login");
}


module.exports = middlewareObj;