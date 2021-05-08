var express = require("express");
var router = express.Router();
 var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
	res.render("landing");
});


///Authentication Routes////////

router.get("/login",function(req,res){
	res.render("login");
});
router.get("/register",function(req,res){
	res.render("register");
});

//Sign up logic///

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
	req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Travel Mems "+user.username);
			res.redirect("/memories");
		});
	})
});

///Login Routes///

router.get("/login",function(req,res){
	res.render("login");
});

///Login Logic///
//app.post("/destination",middleware,callback)//
router.post("/login",passport.authenticate("local",
		{
	successRedirect:"/memories",
	failureRedirect:"/login"
}),function(req,res){	
});

//Logout Routes///

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You have sucessfully logged out of your account");
	res.redirect("/")
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;