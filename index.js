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
const  passport  =  require("passport");
const LocalStrategy         =  require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose");
const User                  =  require("./Schema/user");




app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());


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

app.get('/nb',isLoggedIn,(req,res)=>{
	Tag.find({},function(err,data){
		res.send(NewBlog(data,req.user));
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

app.get('/blog/:id',isLoggedIn,(req,res)=>{
	Blog.find({_id:req.params.id},(err,data)=>{
		res.send(BlogTemp(data[0]));
	})
})

app.get('/blog/:id/edit',isLoggedIn,(req,res)=>{
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


app.get("/userprofile" ,isLoggedIn,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
    })
});


app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(3000,()=>{
	console.log("server started");
});