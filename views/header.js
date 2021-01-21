module.exports=(user)=>{
	if(!user)
		return "<li class='nav-item active'><a style='color:white' class='nav-link active' href='/''>Home</a></li><li class='nav-item'><a style='color:white' class='nav-link' href='/register'>SignUp</a></li><li class='nav-item'><a style='color:white' class='nav-link' href='/login'>SignIn</a></li>"
	else
		return `<span class='nav-link' style="color:white;display:inline;">Logged in as ${user.username}</span><a style='color:white' class='nav-link active' href='/logout''> Logout</a>`
}