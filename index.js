const express=require('express');
const path=   require('path');
const app=express();
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const Blog=require('./Schema/blog.js');
const {TagSchema}=require('./Schema/tag.js');
const Tag=mongoose.model("Tag",TagSchema);
const NewBlog=require('./public/nb.js');
const Home=require('./views/Home.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://gargisingh:gargisingh@gettingstarted.c5fxr.mongodb.net/myblog?retryWrites=true&w=majority",{
  useUnifiedTopology:true,
  useNewUrlParser:true
}).then(()=>{
  console.log("connected to DB!");
}).catch(err=>{
  console.log(err);
});




 
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
	Blog.find({},function(err,data){
		res.send(Home(data));
	});
	
});

app.get('/nb',(req,res)=>{
	Tag.find({},function(err,data){
		res.send(NewBlog(data));
	})
});

app.post('/nb',(req,res)=>{

	if(req.body.tagadd=="")
	{
		var today = new Date();
		var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes();
		var dateTime = date+' '+time;
		var data={
			...req.body,
			date:dateTime

		}

		var d=new Blog(data);
		d.save((err,data)=>{
			if(err)
				console.log(err);
			else
				console.log("done");
		});
		res.redirect('/');
	}

	else
	{
		var respond=req.body.tagadd.split(',');
		for(x of respond)
		{
			var k=new Tag({topic:x});
			k.save((err,data)=>{
			if(err)
				console.log(err);
			else
				console.log("done");});
		}
		
		res.redirect('/nb');
	}
});

app.listen(3000,()=>{
	console.log("server started");
});