var mongodb = require('mongodb');
var express = require("express");
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var colors = require('colors');

//////////////////////////////
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

////////////////////////////////////
/// Establecer conecccion con BD ///
////////////////////////////////////

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var collection;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

// Use connect method to connect to the Server
console.log(colors.debug("============================================"));
console.log(colors.debug("=== Estableciendo conecccion con mongoDB ==="));
console.log(colors.debug("============================================"));
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(('Unable to connect to the mongoDB server. Error:', err).error);
  } else {
    //HURRAY!! We are connected. :)
    collection=db.collection("mycollection");
    console.log('Connection established to', url);
    }
});

///////////////////////////////////////////
/// Peticiones que se hacen al servidor ///
///////////////////////////////////////////

// >> Enviamos pagina inicial
app.get("/",function(req,res){
  console.log(colors.debug("=================================="));
  console.log(colors.debug("=== Se ha conectado un Browser ==="));
  console.log(colors.debug("=================================="));
	console.log(">>>Enviamos:"+ '/index.html');
	res.sendFile(__dirname + '/index.html');
});

app.post("/",urlencodedParser,function(req,res){
  console.log(colors.debug("====================================="));
  console.log(colors.debug("=== Recibido el contenido de ajax ==="));
  console.log(colors.debug("====================================="));
  var palabra=req.body.palabra;
  console.log('   >>> palabra:'+palabra);
  console.log(colors.debug("=== Realizamos un find en mongoDB ==="));
  collection.find({"name" : {$regex : ".*"+palabra+".*"}}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log("   >>> Palabras encontradas:");
        for(var i=0;i<result.length;i++){
          console.log(result[i].name);
        }
        res.send(JSON.stringify({palabras:result}));
        console.log("   >>> Enviamos contenido al navegador.");
      } else {
        console.log(colors.error('No document(s) found with defined "find" criteria!'));
      }
    });
});

app.listen(3000);