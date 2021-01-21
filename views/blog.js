
const header=require('./header.js');
module.exports=(blog,checkuser,currentUser)=>{
  
  var but=""

  if(checkuser.username===currentUser.username)
  {
    but=`<a id="edit" class="btn btn-sm btn-warning" href='/blog/${blog._id}/edit'>Edit</a>
    <form id="delete" style="display:inline; margin:0" method="POST" action="/blog/${blog._id}/delete?_method=DELETE">
      <button class="btn btn-sm btn-danger">
                  Delete
      </button>
    </form>`
  }
  var head=header(currentUser);
	var tags="<h4>";
	for(x of blog.tags)
	{
		tags+=` #${x}`
	}
	tags+='</h4>'
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
     ${head}
    </ul>
    

  </div>
</nav>

<div class="jumbotron jumbotron-fluid">
    <h1 class="display-4">BLOG SITE</h1>
    <div style="margin-left: 1rem;" id ="ct" class="btn btn-sm btn-primary">ChangeTheme</div>
    <a class="btn btn-sm btn-success" href="/nb">Add Blog</a>
</div>
<hr>
<div class="container" style="background-color: #ffe5b4;">

	<h1 class="display-1" style="margin-bottom:0">${blog.topic}<h1/>
	<h5>By ${checkuser.username}</h5>
	<h5>${blog.date}</h5>
	<br>
	<h3>${blog.content}</h3>
	<h4 class="tags">${tags}</h4>
	<div class="actions">
		${but}
		<a class="btn btn-sm btn-success" href="">Comment</a>
		<a class="btn btn-sm btn-primary" href="">Like ${blog.like}</a>
	</div>

</div>

 <script src="/main.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>


	`


}