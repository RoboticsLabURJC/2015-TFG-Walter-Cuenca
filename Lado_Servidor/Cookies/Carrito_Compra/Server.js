
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
  console.log("=== Primera conexion ===");
  res.sendFile(__dirname + '/index.html');
});

app.get('/clear', function(req, res){
 	res.clearCookie('luis');
 	res.clearCookie('walter');
	res.clearCookie('juan');
 	res.sendFile(__dirname + '/index.html');
});
  
app.post('/',urlencodedParser,function(req,res){
	console.log(req.cookies);
  console.log("=== El usuario añade producto  ===");
  for(elemento in req.body){
  	contenido = elemento;
  }
 console.log(contenido);

  console.log(req.body);
  var contenido = JSON.parse(contenido);
  console.log(contenido);
  var user = contenido[0].user;
  var info_user = {src:contenido[0].src,name_libro:contenido[0].name_libro};
  console.log(user);
  console.log(info_user);
  //buscamos el usuario para refrescar el contenido de nuestro carrito

  var value_old = req.cookies[user];
  console.log(value_old);
  if(value_old == null){
    console.log("=== El usuario 0 productos  ===");
    var list = [];
    list.push(info_user);
    ///revisar con lo encontrado del parser de NODEJS-COOKIES
    //res.cookie(user,JSON.stringify(list));
    var lis = cookieParser.JSONCookies("{juan:pedro}");
    //ar value = cookieParser.JSONCookies(req.cookies["walter"]);

    //res.cookie(user,JSON.stringify(list));
    cookieParser(res.cookie(user,JSON.stringify(list)));
    console.log(req.cookies);

   // cookieParser.signedCookies(res.cookies, secret)

   
    res.sendFile(__dirname + '/index.html');
  }else{
    console.log("=== El usuario añade mas productos a los antiguos  ===");
    console.log(value_old);
    value_old = JSON.parse(value_old);
    value_old.push(info_user);
    console.log(value_old);
    res.cookie(user,JSON.stringify(value_old));
    res.sendFile(__dirname + '/index.html');
  }
});
  
//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
 	console.log('listening on *:3000');
});
