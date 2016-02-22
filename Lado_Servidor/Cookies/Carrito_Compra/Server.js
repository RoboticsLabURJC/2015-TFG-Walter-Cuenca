
var express=require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

///cargar imagenes de forma static ---> el path que se utiliza es /imagenes/[name_img]

app.use(express.static('public'));

app.use(cookieParser()); //-->necesario para el parser el cookie 
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//////////////////////////////////////////
// Entrega pagina inicial con productos //
//////////////////////////////////////////

app.get('/', function(req, res){
  console.log("=== Se ha conectado un Browser ===");
  res.sendFile(__dirname + '/index.html');
});

/////////////////////////////////////
// Limpiar el valor de las cookies //
/////////////////////////////////////

app.get('/clear', function(req, res){
 	res.clearCookie('walter');
 	res.clearCookie('manuel');
	res.clearCookie('franja');
 	res.sendFile(__dirname + '/index.html');
});

/////////////////////////////////////////////
// El usuario añade productos para comprar //
////////////////////////////////////////////
  
app.post('/',urlencodedParser,function(req,res){
	console.log("====================================");
	console.log("=== El usuario realiza la compra ===");
	console.log("====================================");
	var user = req.body.user;
	console.log(">>>> lista compra de "+user+":");
	var carrito=JSON.parse(req.cookies[user]);
	var compra = carrito.carrito;
	for(var i=0;i < compra.length;i++){
		var item  = compra[i].compra;
		console.log(">> libro:"+item.libro+";Unidades:"+item.cantidad);
	}
	console.log("====");
	res.clearCookie(user);
	console.log(">> Eliminamos en contenido de la cookie de "+user);
	res.sendFile(__dirname + '/Index_Respuesta.html');
});
  

http.listen(3000, function(){
 	console.log('listening on *:3000');
});
