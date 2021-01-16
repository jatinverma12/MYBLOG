const mongoose=require('mongoose');
var TagSchema=mongoose.Schema({
	topic:String
},{collection:'mytag'});

module.exports={TagSchema};