const mongoose=require('mongoose');
var BlogSchema=mongoose.Schema({
	topic:String,
	writer:String,
	date:String,
	like:{type:Number,default:0},
	content:String,
	tags:[String],
},{collection:'myblog'});

module.exports=mongoose.model('Blog', BlogSchema, 'myblogs');