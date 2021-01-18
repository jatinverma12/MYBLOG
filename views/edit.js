
module.exports=(data,tags)=>{
	result="";
	for(x of tags){
		result=result+ "<option>" + x.topic + "</option>\n";
	}
	return `

	<!DOCTYPE html>
<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/main.css" type="text/css">
	<title>MyBlog</title>
</head>
<body>
	
	<nav class="navbar navbar-expand-lg navbar-light">
  <div class="navbar-brand"></div>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
  	<ul class="navbar-nav ml-auto" >
  		<li class="nav-item active">
        <a style="color:white" class="nav-link" href="#">Home</a>
      	</li>

      <li class="nav-item">
        <a style="color:white" class="nav-link" href="#">SignUp</a>
      </li>

      <li class="nav-item">
        <a style="color:white" class="nav-link" href="#">SignIn</a>
      </li>
  	</ul>
    

  </div>
</nav>

<div class="jumbotron jumbotron-fluid">
    <h1 class="display-4">BLOG SITE</h1>
    <div style="margin-left: 1rem;" id ="ct" class="btn btn-sm btn-primary">ChangeTheme</div>
</div>
<hr>

<div class="container-fluid">
  <form method="POST" action="/blog/${data._id}/edit?_method=PUT" name="blogform" onsubmit="return validateForm()">
    <div class="form-group">
      <label>Topic</label>
      <input type="text" class="form-control"  name="topic" value='${data.topic}' placeholder="Topic">
      <div class="error" id="topicErr"></div>
    </div>
    <div class="form-group">
      <label >Your Name</label>
      <input type="text" class="form-control" name="writer" value='${data.writer}' placeholder="Your Name">
    </div>
    
    <div class="form-group">
      <label >Add Tag(s)</label>
      <select multiple class="form-control" name="tags">

        ${result}
      </select>
    </div>
    <div class="form-group">
      <label >Content</label>
      <textarea class="form-control" name="content"  rows="8">${data.content}</textarea>
      <div class="error" id="contentErr"></div>
    </div>
    <div class="form-group" id="tagadd">
      <label >Add Tags </label>
      <textarea class="form-control" name ="tagadd" placeholder="Insert tags you want to add separated with commas" name="content" rows="3" ></textarea>
    </div>
    <button class="btn-sm btn-success" type="submit">Submit</button>
    <button id="ab" class="btn-sm btn-primary" type="button">Add more Tag</button>
  </form>
</div>
<script src="/main.js"></script>
<script src="/validator.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>

	`
}
