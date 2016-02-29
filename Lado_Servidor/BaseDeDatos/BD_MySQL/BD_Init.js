var mysql = require('mysql');

////////////////////////////////////////////////////
/// Palabras que  se crearan para el diccionario ///
///////////////////////////////////////////////////
var list_palabras = ['acariciar','abeja','atacar',"atar",
					'bajar','bajamos','banca','bancada',
					'cantante','cama','camerino',"camion",
					'diariamente','diamante','diario','dia',
					'juan','vikingo','lado','mercado','nata',
					'frio','gato','perro','persona'];

//////////////////////
/// BASE DE DATOS ///
/////////////////////


// >>> Nos conectamos a nuestra base de datos en mysql
var connection = mysql.createConnection({
  host     : "127.0.0.1",
  port: 3306,
  password : "lunita69",
  user     : "root",
  database : "diccionario"
});

// >>> Comprobamos la conexion con  nuestra base de datos en mysql
connection.connect(function(err){
	if(!err){
	    console.log("Database is connected ... nn");    
	}else{
	    console.log("Error connecting database ... nn");    
	}
});


// >>> Truncamos la tabla para no duplicar contenido de nuestra base de datos 
connection.query('truncate table diccionario_tbl',function(err,result){
	if(!err){
		console.log("truncate is OK ... nn");    
	}else{
		console.log("Error truncate ... nn");    
	}
});

// >>> Insertamos elementos en nuestra tabla
for(var i=0;i<list_palabras.length;i++){
	var palabra = list_palabras[i];
	console.log(palabra);
	connection.query('INSERT INTO diccionario_tbl set palabra = ?',[palabra],function(err,result){ 
		if(!err){
		    console.log("Insert....OK");    
		}else{
		    console.log("Insert....Error");    
		}
	});
}

connection.end();
