var mysql = require('mysql');
///////////////////////////////
///creamos la base de datos///
//////////////////////////////

var conection = mysql.createConnection({
  host     : 'localhost',
  user     : 'walter',
  password : 'walter',
  database : 'ejemplo'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});
