var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//lo utulizamos para peticiones POST a nuestro servidor.
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//lo utulizamos para peticiones POST a nuestro servidor.
//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Calculador_json.html');
});


app.post('/',urlencodedParser,function(req,res){
	var info_user = {num1:req.body.num1,num2:req.body.num2,operacion:req.body.operacion};
	var num_1 = parseInt(info_user.num1);
	var num_2 = parseInt(info_user.num2);
	var resultado = operacion(num_1,num_2,info_user.operacion);
	//console.log(add);
	 //esto muestra en la pantalla del navegador la informacion de nuestro usuario.
	res.end(JSON.stringify(resultado));
});

function operacion(num1,num2,operacion){
	if(operacion == "suma"){
		return num1+num2;
	}else if (operacion == "resta"){
		return num1-num2;
		console.log(num1-num2);
	}else if(operacion == "producto"){
		return num1*num2;
	}else {
		if(num2 == 0){
			return 0;
		}else{
			return num1/num2;
		}	
	}
}

//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
