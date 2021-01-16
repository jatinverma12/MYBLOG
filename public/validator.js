// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm(){
	var topic=document.blogform.topic.value;
	var tags=document.blogform.tags.value;
	var content=document.blogform.content.value;
	var key=document.blogform.tagadd.value;

	if(topic=="" && key=="")
		printError("topicErr","Please provide a meaningful topic");
	if(content=="" && key=="")
		printError("contentErr","Please write some meaningful content here");
}