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
const BlogTemp=require('./views/blog.js');
const EditTemp=require('./views/edit.js');
var methodOverride=require("method-override");




app.use(methodOverride("_method"));
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

app.get('/blog/:id',(req,res)=>{
	Blog.find({_id:req.params.id},(err,data)=>{
		res.send(BlogTemp(data[0]));
	})
})

app.get('/blog/:id/edit',(req,res)=>{
	Blog.find({_id:req.params.id},(err,data)=>{


		Tag.find({},function(err,tags){
		res.send(EditTemp(data[0],tags));
	})
		
	})
});

app.put('/blog/:id/edit',(req,res)=>{

	if(req.body.tagadd=="")
	{
		Blog.find({_id:req.params.id},(err,data)=>{
		
			var blog=data[0];
			blog.topic=req.body.topic;
			blog.content=req.body.content;
			blog.tags=req.body.tags;


				Blog.findByIdAndUpdate(req.params.id,blog,function(err,updatedblog){
				if(err){
					console.log(err);
				}else{
			
				res.redirect("/blog/" + req.params.id);
			
				}
				});
		
	});
	}
	else{
		var respond=req.body.tagadd.split(',');

		new Promise(function(resolve,reject){
			for(x of respond)
			{
				var k=new Tag({topic:x});
				k.save((err,data)=>{
				if(err)
					console.log(err);
				else
					console.log("done");
					});

			}
			resolve();
			
		}).then(()=>{
			res.redirect('/blog/'+req.params.id+'/edit');

		}).catch(()=>{
			console.log("error");
		});
	}

});

app.delete('/blog/:id/delete',(req,res)=>{
	Blog.findByIdAndDelete(req.params.id,(err)=>{
		if(err)
			console.log(err);
		else
			{console.log("deletion done");
				res.redirect('/');
			}
	});
});

app.listen(3000,()=>{
	console.log("server started");
});