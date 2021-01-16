// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm(){
	var topic=document.blogform.topic.value;
	var tags=document.blogform.tags.value;
	var content=document.blogform.content.value;
	var key=document.blogform.tagadd.value;


	var contentErr=topicErr=true;
	if(topic=="" && key=="")
		printError("topicErr","Please provide a meaningful topic");
	else
		topicErr=false;
	if(content=="" && key=="")
		printError("contentErr","Please write some meaningful content here");
	else
		contentErr=false;


	if(topicErr || contentErr)
		return false;
	return true;
}