const express=require('express');
const path=   require('path');
const app=express();

app.use(express.static(path.join(__dirname, "public")));


var array=[
{head:"#F95700FF",body:"#00A4CCFF"},
{head:"#00203FFF",body:"#ADEFD1FF"},
{head:"#00539CFF",body:"#EEA47FFF"},
{head:"#101820FF",body:"#FEE715FF"},
{head:"#101820FF",body:"#F2AA4CFF"},
{head:"#3C1053FF",body:"#DF6589FF"}
];


app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname+'/views/main.html'));
});

app.listen(3000,()=>{
	console.log("server started");
})