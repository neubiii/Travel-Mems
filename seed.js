const mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// var data = [{name:"Hills View",image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publis"},
// {name:"Darkest bounty",image:"https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publis"}]


function seedDB(){
	
	//remove campground
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("datas removed");
	}
	});
		//create campground
// 		data.forEach(function(seed){
// 	Campground.create(seed,function(err,campground){
// 			if(err){
// 		console.log(err);
// 			   }
// 		else{
// 			console.log("added campground");
// 			//add comment
			
// 			Comment.create({
// 				text:"this absolutly creepyy",
// 				author:"sucker"
// 			},function(err,comment){
// 				if(err){
// 					console.log(err);
// 				}
// 				else{
// 					campground.comments.push(comment);
// 					campground.save();
// 					console.log("comment added");
// 				}
				
// 			})
			
// 		}
// 		});
// 		});
		
			
		
		
// });
}




module.exports = seedDB;