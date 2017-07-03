var app = require('express')();
//PAQUETES NECESARIOS PARA PODER REALIZAR EL PARSEO DEL XML
var xml2js = require('xml2js');
var xmldoc = require('xmldoc');

var http = require('http').Server(app);
var bodyParser = require('body-parser');


//lo utulizamos para peticiones POST a nuestro servidor.
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//constestara cuando realicemos un get y devuleve un html con contenigo

app.get('/', function(req, res){
	console.log("===Se ha conectado un browser===");
  	res.sendFile(__dirname + '/Calculador_XML.html');
});

//contestamos a las peticiones POST que se envian SERVER

app.post("/",urlencodedParser,function(req,res){
	var parser = new xml2js.Parser();	
	console.log("===Se ha ejecutado AJAX===");
	for(item in req.body){
		var _xml = item;
	}
	console.log("===Presentamos contenido XML en el server==");
	var xml = new xmldoc.XmlDocument(_xml);
	console.log(xml);
	var items = [];
	parser.parseString(xml, function (err, result){
		var parametros = result['parametros'];
		for(item in parametros){
			items.push(String(parametros[item]));
		}
	});
	console.log("===Valores de los tags del XML===");
	console.log(items);
	var resultado = operacion(items[0],items[1],items[2]);
	console.log("===Resultado de la operacion===");
	console.log(resultado);
	console.log("===Enviamos el resultado en formato XML===")
	var xmlServer = creatXML(resultado);
	console.log(xmlServer);
	res.send(String(xmlServer));
});


function operacion(num1,num2,operacion){
	num1 = parseInt(num1);
	num2 = parseInt(num2);
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

function creatXML(resultado){
 	var _xmlServer = "<respuesta>";
 	_xmlServer = _xmlServer + "<resultado>" + String(resultado) + "</resultado>";
 	_xmlServer = _xmlServer +"</respuesta>";
 	return  new xmldoc.XmlDocument(_xmlServer);
}

//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
  console.log('listening on *:3000');
});