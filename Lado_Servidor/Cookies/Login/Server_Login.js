var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
//lo utulizamos para peticiones POST a nuestro servidor.
var urlencodedParser = bodyParser.urlencoded({ extended: false })


////////////////////////////////////////
// Entrega pagina inicial para logear //
////////////////////////////////////////

app.get('/', function(req, res){
	console.log("=== Se ha conectado un browser ===");
	console.log(req.cookies);
  	res.sendFile(__dirname + '/Login.html');
});

/////////////////////////////////////
// Limpiar el valor de las cookies //
/////////////////////////////////////

app.get('/clearcookie', function(req, res){
	res.clearCookie("walter");
	res.clearCookie("user1");
	res.clearCookie("juan");
	res.clearCookie("luis");
	res.clearCookie("[object Object]");
	res.sendFile(__dirname + '/Login.html');
});


///////////////////////////////////
// Comienza el login del Usuario //
///////////////////////////////////

app.post("/login",urlencodedParser,function(req,res){
	var info_user = {names:req.body.first_name,
					last_name:req.body.last_name};
	var cookie = req.cookies;
	if(String(cookie["user1"]) == 'undefined'){
		console.log("=== Req.cookies esta vacio ===");
		res.cookie("user1",JSON.stringify(info_user),{encode: String});
		console.log("añadido nuevo Usuario");
		res.sendFile(__dirname + '/Login.html');
	}else{
		console.log("===  Req.cookies con contenido ===");
		var seek = seek_user(cookie,info_user);
		if(seek == true){
			console.log("=== Usuario dentro de la Cookie ===");
			res.sendFile(__dirname + '/Login.html');
			//res.sendFile(__dirname + '/Old_User.html');
		}else{
			console.log("=== Usuario no existente en la Cookie ===");
			var user = set_cookie(info_user,cookie);
			res.cookie(user,JSON.stringify(info_user),{encode: String});
			console.log("añadido nuevo Usuario");
			res.sendFile(__dirname + '/Login.html');
		}                               
	}	
});

///////////////////////////////////////////////
// Funciones auxiliares para tratar el login //
///////////////////////////////////////////////


function set_cookie(info_user,cookies){
	var contador = 0;
	for(user in cookies){
		 contador = contador + 1;
	}
	contador = contador+1;
	return "user"+contador;
}



function seek_user(cookies,info_user){
	var lleno = false;
	for(user in cookies){
		console.log(cookies[user]);
		if(cookies[user] == (info_user)){
			lleno= true;
		}
	}
	return lleno;
}


///////////////////////////////////
// Comienza el login del Usuario //
///////////////////////////////////

http.listen(3000, function(){
  console.log('listening on *:3000');
});