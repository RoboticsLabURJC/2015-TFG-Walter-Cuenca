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
var list_user = [];
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
		console.log(numClients);
		if(numClients == 0){
			/*
			Primer usuario del que recibiremos el streaming
			*/
			console.log('Usuario que dara el streaming');
			socket.username = name;
			socket.room = name_room;
			socket.join(name_room);
			var user = {username:name,id:socket.id};
			list_user.push(user);
			socket.emit('CreateStream',socket.id);
		}else{
			/*
			Usuarios que pediran streaming del primer usuario
			*/
			console.log('Nuevo usuario conectado');
			socket.username = name;
			socket.room = name_room;
			socket.join(name_room);
			socket.emit('JoinStream',socket.id);
			var user = {username:name,id:socket.id};
			list_user.push(user);
			//enviamos un mensaje al creador del streaming sobre el nuevo usuario
			var id_creador = list_user[0].id
			console.log(id_creador);
			io.sockets.socket(id_creador).emit('New_Joined', socket.id);
		}
  });

  /*
	Tratamos a donde a que nodo tenemos que enviar el mensaje
	cuando se el servidor reenvia.
	*/
  socket.on('message',function(message){
  	/* Esto es lo que enviamos en un mensaje
		var message = {
			id_origen:my_id,
			id_destino:id,
			msg:sessionDescription
		};
		*/
	console.log('Reenvio de mensaje al nodo destino.');	
	console.log(message)
	io.sockets.socket(message.id_destino).emit('message', message);
  });

});

/*
 Podemos establecer dentro de cada socket elementos como:
 	*name --> socket.username
 	*room --> socket.room
 	*para unirnos  --> socket.join(name_room)
 	*
*/