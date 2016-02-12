
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
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
 	res.clearCookie('luis');
 	res.clearCookie('walter');
	res.clearCookie('juan');
 	res.sendFile(__dirname + '/index.html');
});


/////////////////////////////////////////////
// El usuario añade productos para comprar //
////////////////////////////////////////////

  
app.post('/',urlencodedParser,function(req,res){
  console.log("=== El usuario añade producto  ===");
  for(elemento in req.body){
  	contenido = elemento;
  }
  contenido = JSON.parse(contenido);
  var user = contenido[0].user;
  var info_user = {src:contenido[0].src,name_libro:contenido[0].name_libro};
  console.log("info_user");
  console.log(user);
  console.log(info_user);
  //buscamos el usuario para refrescar el contenido de nuestro carri
  console.log("Old Content:");
  var value_old = req.cookies[user];
  console.log(value_old);
  if(value_old == null){
    console.log("=== El usuario 0 productos  ===");
    var list = [];
    list.push(info_user);
    res.cookie(user,JSON.stringify(list),{encode: String});
    res.sendFile(__dirname + '/index.html');
  }else{
    console.log("=== El usuario añade mas productos a los antiguos  ===");
    value_old = JSON.parse(value_old);
    value_old.push(info_user);
    console.log("New Content:");
    console.log(value_old);
    res.cookie(user,JSON.stringify(value_old),{encode: String});
    res.sendFile(__dirname + '/index.html');
  }
});
  

http.listen(3000, function(){
 	console.log('listening on *:3000');
});
