var array=[
{head:"#F95700FF",body:"#00A4CCFF"},
{head:"#00203FFF",body:"#ADEFD1FF"},
{head:"#101820FF",body:"#FEE715FF"},
{head:"#3C1053FF",body:"#DF6589FF"},
{head:"#990011FF",body:"#FCF6F5FF"},
{head:"#2C5F2DFF",body:"#FFE77AFF"}
];

document.querySelector('#ct').addEventListener('click',function(event){
  var index=Math.floor(Math.random()*array.length);
  var h=array[index].head;
  var b=array[index].body;



  document.querySelector('body').style.backgroundColor=b;
  document.querySelector('html').style.backgroundColor=b;
   document.querySelector('.navbar').style.backgroundColor=h;
   document.querySelector('.navbar-brand').style.backgroundColor=b;
  document.querySelector('.jumbotron').style.backgroundColor=h;
  document.querySelector('.jumbotron').style.color=b;

  document.querySelector('input').style.backgroundColor=b;
  document.querySelectorAll('.card').forEach((item,index)=>{
    item.style.backgroundColor=h;
    item.style.color=b;
  });
  alert(h);


});