var static = require('node-static');
var http = require('http');
// Create a node-static server instance
var file = new(static.Server)();
var colors = require('colors') 
var fs = require('fs');

// We use the http moduleÕs createServer function and
// rely on our instance of node-static to serve the files
var app = http.createServer(function (req, res) {
  file.serve(req, res);

}).listen(8181);

console.log('Servidor escuchando en el puerto:8181');
/*
	Funcion de intercambio entre los usuarios
*/
var listRooom=[{'name':'streaming','state':''}];

var io = require('socket.io').listen(app);
// Let's start managing connections... 
io.sockets.on('connection', function (socket){
	console.log('Se ha establecido una conexion con un browser.');

	/* enviamos la informacion sobre las ROOMS disponibles */
	socket.on('infoRoom',function() {
		console.log('Recibimos un mensaje InfoRoom.');
		console.log('Enviamos un mensaje ReplayInfoRoom:');
		socket.emit('ReplayInfoRoom',listRooom);

	});


	/*
	Primer mensaje que se recibir siempre ue un navegador 
	se conecte.
	*/
	socket.on('stablish_connection',function(name,room){
		console.log('Recibimos un mensaje stablish_connection.'.red);
		console.log(colors.red('**user: %s'),name)
		console.log(colors.red('**room: %s'),room)
		/* si no existe rooms */
		if(!getRoom(room)){
			setRoom(room,'');
		};

		var numClients = io.sockets.clients(room).length;
		console.log(colors.red('Comprobacion numero de clientes: %s'),numClients);
		if(numClients < 3){
			/*
			Tenemos que enviar dos tipos de mensajes a cada
			usuario 
			1.Conectar elementos
			2.Usuarios anteriores al nuevo enviar une mensaje para envien sus
				ofertas al nuevo usuario.
			*/
			socket.username = name;
			socket.room =room;
			socket.join(room);
			socket.emit('CreateStream',socket.id); //-->enviamos un mensaje para conectar el video+micro y que sepa su id
			socket.broadcast.to(room).emit('New_Joined',socket.id); //-->enviamos a todos los clientes excepto al nuevo.
		}else{
			/* emitimos un reject por el nombre del sala o nummero de personas esta completo */
			socket.emit('RejectStream',socket.id); //-->enviamos un mensaje para conectar el video+micro y que sepa su id
		}
	});
  /*
	Tratamos a donde a que nodo tenemos que enviar el mensaje
	cuando se el servidor reenvia.
	*/
  socket.on('message',function(message){
  	//seguimos utuilizando esto para el envio envio de session
  	/* Esto es lo que enviamos en un mensaje
		var message = {
			id_origen:my_id,
			id_destino:id,
			msg:sessionDescription
		};
		*/
	console.log('Reenvio de mensaje al nodo destino.');	
	console.log(message)
	io.sockets.socket(message.id_dest).emit('message', message);
  });

});


function writeLog(ListMessages) {
/* escribimos en fichero los mensajes como forma de LOG */
	fs.writeFile('./Chatlog.txt', JSON.stringify(ListMessages), function(err) {
		if( err ){
		  console.log( err );
		}else{
		  console.log('Se ha escrito correctamente');
		}
	});
}

function getRoom(nameRoom){
	var existe = false;
	for (var i = 0; i < listRooom.length; i++) {
		var room = listRooom[i];
		if (room.name == nameRoom){
			existe = true;
			break
		}
	}
	return existe;
}

function setRoom(nameRoom,state){
	var room = {'name':nameRoom,'state':state}
	listRooom.push(room);
}
/*
 Podemos establecer dentro de cada socket elementos como:
 	*name --> socket.username
 	*room --> socket.room
 	*para unirnos  --> socket.join(name_room)
 	*
*/