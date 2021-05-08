var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seed");
require('dotenv').config();
var commentRoutes    = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),	
	authRoutes       = require("./routes/index");

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASEURL, {
	//mongoose.connect('mongodb+srv://yelpCampTrial:<neubin@123>@cluster2.se7uh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false // louli here, I added this line to remove a deprecation warning, you can remove this comment after reading it (:
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParse.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"));
app.use(flash());
//seed the databnase
//seedDB();

//////////////////////////////////////Passport Configuration/////////////////////////////////////////////////////////////

app.use(require("express-session")({
	secret:"its the secret to hod on",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/landingPage",function(req,res){
	res.render("landing")
});

app.get("/Contact",function(req,res){
	
	res.render("contact")
});

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error=req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);


app.listen(process.env.PORT ||3000,process.env.IP,function(){
	console.log("deploying example app has been started");
});