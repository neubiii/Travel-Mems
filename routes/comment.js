/////////////////////////////////////////////////////COMMENTS ROUTES/////////////////////////////////////////////////////////////////

var express = require("express");
var router = express.Router({mergeParams:true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			 
			res.render("new",{campground:campground});
		}
	})
	
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					//add username and id to comment 
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
					
				}
			})
		}
	})
});

//edit the comments//

router.get("/campgrounds/:id/comments/:comment_id/editComm",middleware.checkCommentAuth,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back")
		}
		else{
		res.render("editComm",{campground_id:req.params.id,comment:foundComment})	
		}
	})
	
})

//update the comment with the edit one//

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentAuth, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})



//comment delete or remove///

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentAuth, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back")
		}
		else{
			req.flash("success","Comment Deleted")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
});


//middleware for authorisation//



module.exports=router;

