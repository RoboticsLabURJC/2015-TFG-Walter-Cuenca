var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

//lo utulizamos para peticiones POST a nuestro servidor.
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
  res.sendFile(__dirname + '/init.html');
});

//enviamos el formulario get
app.get('/form_get',function(req,res){
	res.sendFile(__dirname + '/form.html');	
});

//procesamos el contenido del formulario relleno.
app.get('/process_get',function(req,res){
	var info_user = {name:req.query.first_name,
					last_name:req.query.last_name};
	 console.log(info_user);
	 //esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	 res.end(JSON.stringify(info_user));	 
});

app.get('/form_post',function(req,res){
	res.sendFile(__dirname + '/form2.html');
});

//procesamos el contenido del formulario relleno.
app.post('/process_post',urlencodedParser,function(req,res){
	var info_user = {name:req.body.first_name,
					last_name:req.body.last_name};
	 console.log(info_user);
	 //esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	 res.end(JSON.stringify(info_user));
});

//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
