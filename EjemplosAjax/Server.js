var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//lo utulizamos para peticiones POST a nuestro servidor.
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//lo utulizamos para peticiones POST a nuestro servidor.
//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Add_Ajax.html');
});



app.get('/operaciones', function(req, res){
	console.log("WWWww");
  res.sendFile(__dirname + '/operaciones.json');
});

app.post('/',urlencodedParser,function(req,res){
	var info_user = {num1:req.body.num1,num2:req.body.num2};
	var num_1 = parseInt(info_user.num1);
	var num_2 = parseInt(info_user.num2);
	 console.log(info_user);
	 console.log(num_1);
	 console.log(num_2);
	var add = num_1+num_2;
	console.log(add);
	 //esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	res.end(JSON.stringify(add));
});

//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
