var app = require('express')();
var http = require('http').Server(app);
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//constestara cuando realicemos un get y devuleve un html con contenigo
app.get('/', function(req, res){
	var cookie = req.cookies;
	if(cookie["user"] == null){
		console.log("primera conexion");
		var d = new Date();
		var hora = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
		var fecha = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear();
		res.cookie("user", "hora:"+hora+",fecha:"+fecha);
		res.sendFile(__dirname + '/prueba.html');
	}else{
		console.log("Informacion usuario:")
		console.log(req.cookies);
		var d = new Date();
			var hora = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
			var fecha = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear();
		console.log("La fecha actual es =>"+ "hora:"+hora+" fecha:"+fecha);
		res.sendFile(__dirname + '/prueba.html');
	}
});

app.get('/cookie',function(req, res){
    res.cookie(cookie_name , 'cookie_value');
 	res.sendFile(__dirname + '/prueba.html');
});

app.get('/clearcookie',function(req, res){
    res.clearCookie('user');
    res.clearCookie('undefined');
    res.send('Cookie deleted');
});

//este es el puerto en el cual escuchara las conexiones que se establecen
http.listen(3000, function(){
 	console.log('listening on *:3000');
});
