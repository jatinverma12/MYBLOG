const header=require('./header.js');
const User=require('../Schema/user.js');


function show(str){
  result="";
  result+=str.slice(0,100) + "...<span id='more'>" + str.slice(100) + "</span>"
  return result;
}

module.exports=(data,users,currentUser)=>{

  var head=header(currentUser);
  var final="";
  var author="";
  var result="";
  for(var i=0;i<data.length;i+=3)
  {
      
      console.log(users[i]);
      result='<div class="row">\n<div class="card md-12 lg-6 xl-4">\n<div class="card-body">\n';
      result+='<h3 class="card-title">' + `${data[i].topic}` + '</h3>\n';
      result+= '<h7 class="card-subtitle mb-2">Written By- ' + `${users[i]}` +'</h7>\n';
      result+='<h4 class="card-text">' + show(`${data[i].content}`) +'</h4>\n';
      result+='<h8>'+ `${data[i].date}` +'</h8>\n';
      result+=`<a href=/blog/` + `${data[i]._id}` + `  class='btn btn-lg btn-success'>Read More</a>\n`;
      result+='</div>\n</div>\n';
      
      


      if(i+1 < data.length)
      {
        
         result+='<div class="card md-12 lg-6 xl-4">\n<div class="card-body">\n';
        result+='<h3 class="card-title">' + `${data[i+1].topic}` + '</h3>\n';
        result+= '<h7 class="card-subtitle mb-2">Written By-' + `${users[i+1]}` +'</h7>\n';
        result+='<h4 class="card-text">' + show(`${data[i+1].content}`) +'</h4>\n';
        result+='<h8>'+ `${data[i+1].date}` +'</h8>\n';
        result+=`<a href=/blog/` + `${data[i+1]._id}` + `  class='btn btn-lg btn-success'>Read More</a>\n`;
        result+='</div>\n</div>\n';
        
       

      }

    
       if(i+2 < data.length)
      {
        
          result+='<div class="card md-12 lg-6 xl-4">\n<div class="card-body">\n';
        result+='<h3 class="card-title">' + `${data[i+2].topic}` + '</h3>\n';
        result+= '<h7 class="card-subtitle mb-2">Written By-' + `${users[i+2]}` +'</h7>\n';
        result+='<h4 class="card-text">' + show(`${data[i+2].content}`) +'</h4>\n';
        result+='<h8>'+ `${data[i+2].date}` +'</h8>\n';
        result+=`<a href=/blog/` + `${data[i+2]._id}` + `  class='btn btn-lg btn-success'>Read More</a>\n`;
        result+='</div>\n</div>\n';
        
      

      }

       final+=result + '</div>\n';

  
  }


  return `<!DOCTYPE html>
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
<div class="container-fluid">
    <form>
      <input type="text" id="fname" name="fname" placeholder="Search">
    </form>

  ${final}



</div>
  <script src="/main.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>`
}