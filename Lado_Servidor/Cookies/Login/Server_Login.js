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
	console.log("==================================");
	console.log("=== Se ha conectado un browser ===");
	console.log("==================================");
	var cookie = req.cookies;
	if(Object.keys(cookie).length != 0){
		console.log(" >>> Usuario reconocido");
		console.log( req.cookies);
		res.sendFile(__dirname + '/Index_Bienvenida.html');
	}else{
		//tenemos un usuario nuevo he enviamos el login para guardarlo
		console.log(" >>> Nuevo Usuario ");
		res.sendFile(__dirname + '/Login.html');
	}

});

/////////////////////////////////////
// Limpiar el valor de las cookies //
/////////////////////////////////////

app.get('/clearcookie', function(req, res){
	res.clearCookie("user");
	res.sendFile(__dirname + '/Login.html');
});


///////////////////////////////////
// Comienza el login del Usuario //
///////////////////////////////////

app.post("/login",urlencodedParser,function(req,res){
	console.log("======================================");
	console.log("=== Procesando el formulario lleno ===");
	console.log("======================================");
	var d = new Date();
	var hora = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	var fecha = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear();
	var info_user = {names:req.body.first_name,
					last_name:req.body.last_name,
					correo:req.body.email,
					num_visitas:1,
					Fecha:hora};

	var cookie = req.cookies;
	console.log(" >>> Cookie Vacia");
	console.log(cookie);
	console.log(" >>> Añadimos a la cookie a: " + info_user.names);
	res.cookie('user',JSON.stringify(info_user),{encode: String});
	console.log(req.cookies);
	res.sendFile(__dirname + '/Index_Bienvenida.html');

});


///////////////////////////////////
// Comienza el login del Usuario //
///////////////////////////////////

http.listen(3000, function(){
  console.log('listening on *:3000');
});
