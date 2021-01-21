const mongoose=require('mongoose');
var BlogSchema=mongoose.Schema({
	topic:String,
	writer:{type: mongoose.Schema.Types.ObjectId,  ref: 'User'},
	date:String,
	like:{type:Number,default:0},
	content:String,
	tags:[String],
},{collection:'myblog'});

module.exports=mongoose.model('Blog', BlogSchema, 'myblogs');