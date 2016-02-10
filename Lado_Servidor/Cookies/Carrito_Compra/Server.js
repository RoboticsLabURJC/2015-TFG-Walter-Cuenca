
var app = require('express')();
var http = require('http').Server(app);
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
  console.log("=== Primera conexion ===");
  res.sendFile(__dirname + '/index.html');
}
  
app.post('/',function(req,res){
  console.log("=== El usuario añade producto  ===");
  var user = req.body.user;
  var info_user = {src:req.body.scr,name_libro:req.body.name_libro};
  //buscamos el usuario para refrescar el contenido de nuestro carrito
  var value_old = req.cookies(user);
  if(value_old == 'indefined'){
    console.log("=== El usuario 0 productos  ===");
    var list = [];
    list.push(info_user);
    ///revisar con lo encontrado del parser de NODEJS-COOKIES
    req.cookies(user,JSON.stringfy([list]));
    res.End();
  }else{
    console.log("=== El usuario añade mas productos a los antiguos  ===");
    value_old = JSON.parse(value_old);
    value_old.push(info_user);
    req.cookies(user,JSON.stringfy([list]));
    res.End();
  }
});
  
//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
 	console.log('listening on *:3000');
});
