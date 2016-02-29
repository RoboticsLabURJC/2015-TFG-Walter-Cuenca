var mysql = require('mysql');
var express = require("express");
var http = require('http').Server(app);
var bodyParser = require('body-parser');

//////////////////////////////
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

////////////////////////////////////
/// Establecer conecccion con BD ///
////////////////////////////////////

var connection = mysql.createConnection({
  host     : "127.0.0.1",
  port: 3306,
  password : "lunita69",
  user     : "root",
  database : "diccionario"
});

connection.connect(function(err){
	if(!err){
	    console.log("Database is connected ... localhost:3306");    
	}else{
	    console.log("Error connecting database ... nn");    
	}
});

///////////////////////////////////////////
/// Peticiones que se hacen al servidor ///
///////////////////////////////////////////

// >> Enviamos pagina inicial
app.get("/",function(req,res){
	console.log("=== Se ha conectado un Browser ===");
	res.sendFile(__dirname + '/index.html');
});

// >> Tratamos el envio de palabras por ajax
app.post("/",urlencodedParser,function(req,res){
	console.log("=== Recivido el contenido de ajax ===");
	var palabra = req.body.palabra;
	console.log('>>> palabra:'+palabra);
	palabra = palabra+"%";
	connection.query('SELECT * from diccionario_tbl where palabra like ?',[palabra], function(err, rows, fields) {
  	if (!err){
    	var items_BD = rows;
    	var list=[];
    	console.log("=== Enviamos palabras encontradas ===");
    	for(item in items_BD){

    		console.log('>>> send:'+ rows[item].palabra);
    		list.push(rows[item].palabra);
    	}
    	var obj_list = {palabras:list};
    	res.send(JSON.stringify(obj_list));
  	}else{
    	console.log('Error while performing Query.');
  		}
	});
});

app.listen(3000);