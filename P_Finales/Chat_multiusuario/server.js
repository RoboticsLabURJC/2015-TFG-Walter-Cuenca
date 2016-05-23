var static = require('node-static');
var http = require('http');
// Create a node-static server instance
var file = new(static.Server)();

// We use the http moduleÕs createServer function and
// rely on our instance of node-static to serve the files
var app = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8181);

/*
	Funcion de intercambio entre los usuarios
*/
var name_room = 'streaming';
var io = require('socket.io').listen(app);
// Let's start managing connections... 
io.sockets.on('connection', function (socket){
	console.log('Se ha establecido la conexion.');
	console.log(socket.id);
	/*
	Primer mensaje que se recibir siempre ue un navegador 
	se conecte.
	*/
	socket.on('stablish_connection',function(name){
		var numClients = io.sockets.clients(name_room).length;
		console.log('Numero de clientes:'+numClients);
		/*
			Tenemos que enviar dos tipos de mensajes a cada
			usuario 
			1.Conectar elementos
			2.Usuarios anteriores al nuevo enviar une mensaje para envien sus
				ofertas al nuevo usuario.
		*/
		socket.username = name;
		socket.room = name_room;
		socket.join(name_room);

		socket.emit('CreateStream',socket.id); //-->enviamos un mensaje para conectar el video+micro y que sepa su id

		socket.broadcast.to(name_room).emit('New_Joined',socket.id); //-->enviamos a todos los clientes excepto al nuevo.
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

/*
 Podemos establecer dentro de cada socket elementos como:
 	*name --> socket.username
 	*room --> socket.room
 	*para unirnos  --> socket.join(name_room)
 	*
*/