var static = require('node-static');
var http = require('http');
/* modulo con los objetos del juego  */
var misc = require('./public/js/astar.js');
var Game = require('./public/js/CoreServer.js'); 
var file = new(static.Server)();
// Create a node-static server instance

//var fs = require('fs');
//require('node-import');
//require('x-date') ;

// We use the http moduleÕs createServer function and
// rely on our instance of node-static to serve the files
var app = http.createServer(function (req, res) {
  file.serve(req, res);
  console.log('Server listinig 8181');
}).listen(8181);

/*
	Funcion de intercambio entre los usuarios
	 	*de momento se va a crear una sola sala de jeugo
*/
var list_user=[];

var io = require('socket.io').listen(app);

/* posiciones iniciales */
var player1 = new Game.Player(5,15,1,1,1);
var player2 = new Game.Player(14,15,2,18,1);
player1.path = CreatePath(player1.info,player1.info.fantasma);
player2.path = CreatePath(player2.info,player2.info.fantasma);

/* intervalo de refresco */
var frameInterval = 100;


/* variable info 2 user */
var cooordiar = 0;

// Let's start managing connections... 
io.sockets.on('connection', function (socket){
	console.log('Se ha establecido la conexion.');
	console.log(socket.id);
	socket.on('ping',function(){	//----> PRIMER RECEPCION
		/* calculamso el tiempo 
		que tardara el servidor
		en recibir la peticion */
		console.log('recibimos ping.....');
		console.log('.....envimos pong');
		socket.emit('pong');
	});

	/*
		Primer mensaje que se recibir siempre ue un navegador 
		se conecte.
	*/
	socket.on('stablish_connection',function(name){
		var numClients = io.sockets.clients(Game.name_room).length;
		console.log('Numero de clientes:'+numClients);
		/*
			Tenemos que enviar dos tipos de mensajes a cada
			usuario 
			1.Conectar elementos
			2.Usuarios anteriores al nuevo enviar une mensaje para envien sus
				ofertas al nuevo usuario.
		*/
		/* antes de reenviar la lista de usuarios tenemos que enviar el contenido */
		 /* 1.Comprobamos que todo vaya bien */
		 var existeName = seekUser(name);
		 console.log(existeName);
		 console.log(name);
		 console.log(list_user);
		 if(existeName){
		 		/* Comunicamos que ese nombre ya existe */
		 		var txt = 'El nombre ya existe en esta sala';
		 		socket.emit('reject_name',txt); //-->enviamos un mensaje para conectar el video+micro y que sepa su id
		 }else{
		 		/* Comunicamos que puede entrar en la sala con ese nombre*/
		 		/* enviamos CreateStream:
					* socket.id : id de conexion actual
					* list_user : lista de usuarios
		 		*/
				socket.emit('CreateConnection',socket.id,list_user); 
				/* pasamos a guardar el contenido con el nuevo usuario */
				socket.username = name;
				socket.room = Game.name_room;
				socket.join(Game.name_room);
				if(list_user.length == 0){

					var user = {'user':name,'room':Game.name_room,'id':socket.id,'posGame':player1.info,'pos':1,'score':0};
				}else{
					var user = {'user':name,'room':Game.name_room,'id':socket.id,'posGame':player2.info,'pos':2,'score':0};
				}
				list_user.push(user);
				/* enviamos New_Joined : (otros jugadores excepto el nuevo)
					* socket.id : id de conexion actual
				*/
				socket.broadcast.to(Game.name_room).emit('New_Joined',socket.id);
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
			io.sockets.socket(message.idDestino).emit('message', message);
  });


  /* 
  	Enviamos la informacion del inciio dlel juego 
  */
  socket.on('Request_ElementGame',function(otherId){
  	console.log('2222')
  	/* Obtenemos la posicion  */
  	var myInfo = getInfoUser(socket.id)
  	var counterInfo = getInfoUser(otherId);
  	var element = {
  		'shape_1':Game.shape_1,
  		'shape_2':Game.shape_2,
  		'cocos':Game.list_cocos,
  		'obstaculos':Game.list_obstaculos,
  		'properGame':Game.properGame,
  		'myInfo':myInfo,
  		'counterInfo':counterInfo
  	}
  	console.log('wwewewewew');
		socket.emit('Response_ElementGame',element);
  });

  /* 
  	El cliente termino de dibujar la escena ::: REVISAR
  */
  socket.on('Finish_InitFrame',function(){
  	var f = new Date();
		var timeStart = f.getTime();
  	console.log(socket.id);
  	console.log(timeStart);
  	cooordiar +=1;
  	if(cooordiar == 2){
  		console.log('ENVIO');
  		console.log(timeStart);
  		//socket.emit('ReadyGame');
  		io.sockets.in(Game.name_room).emit('ReadyGame');
  		setTimeout(function(){
  			Game._timer = setInterval(UpdateGhost,800);
  			CronoTime();
  		},3000)
  	}
  });

  /*
		Actualizacion de la posicion del jugador que envia 
		la peticion : revisar
  */
  socket.on('UpdatePosition_Player',function(newPosition){
  	setPosition_User(socket.id,newPosition);
  	/* obtenemos  */
  	console.log(newPosition)
  	if(newPosition.numPasos == 1 || newPosition.numPasos == -1){
  		/* Update el camino del fantasma */
  		for (var i = 0; i < list_user.length; i++) {
  			var user = list_user[i];
  			if(user.id == socket.id){
  				var myInfo = getInfoUser(socket.id)
  				//var graph =  new misc.Graph(map);
					/* posicion inicial del fantasma */

					console.log(myInfo)
					//var start = graph.grid[myInfo.fantasma.x][myInfo.fantasma.y];
					/* posicion donde esta el pacman de cada jugador */
					//var end = graph.grid[myInfo.x][myInfo.y];
					/* lista de todos los nodos para llegar hasta el final */
					if (user.pos == 1) {
						player1.path = CreatePath(myInfo,myInfo.fantasma);
						//;misc.astar.search(graph,start,end,false);
					}else{
						player2.path = CreatePath(myInfo,myInfo.fantasma);
						//result2 = misc.astar.search(graph,start,end,false);
					}
				console.log('update caminio')
  			}
  		}
  	}
  	socket.broadcast.to(Game.name_room).emit('NewPos_Counter',newPosition);
  });

  /*
		El jugador a comido un coco actualizamos el contenido
		para el otro jugador
  */
  socket.on('UpdateCocos',function(cocoPosition){
  	console.log(cocoPosition)
    Game.list_cocos.splice(cocoPosition,1);
  	socket.broadcast.to(Game.name_room).emit('UpdateCocos_Player',cocoPosition);
  	/* update la puntuacion del jugador */
  	setScore_User(socket.id,4);
  	if(Game.list_cocos.length == 0){
  		console.log('emitimos la finalizacion del juego');
  		ganador = gameFinish();
  		io.sockets.in(Game.name_room).emit('GameWinner',ganador);
  	}
  });

});
	
/***********************************************
****** FUNCIONES AUXILIARES PARA EL JUEGO ******
***********************************************/


function CronoTime(){
	var auxSecond = Game.seconds;
	var auxMin = Game.min;
	var auxHoras = Game.horas;

	Game.seconds += 1;
	if(auxSecond < 10){
		auxSecond='0'+Game.seconds;
	}else{
		auxSecond=Game.seconds;
	}

	if(Game.seconds > 59){
		Game.min +=1
		Game.seconds=0;
	}

	if(auxMin < 10){
		auxMin='0'+ Game.min;
	}else{
		auxSecond = Game.min;
	}

	if(Game.min > 59){
		Game.horas +=1
		Game.min=0;
	}

	if(auxHoras < 10){
		auxHoras='0'+Game.horas;
	}else{
		auxHoras=Game.horas;
	}

	Game.time=auxHoras+':'+auxMin+':'+auxSecond
	setTimeout(CronoTime,1000);
}

function CapturaPacman(player,ghost){
	/* coordenadas de los obstaculos y del pacman */
	var hitt = false;
	//-->1.Obtaculo
	var Aghost= {x:ghost.x,y:ghost.y};
	var Bghost = {x:ghost.x+1,y:ghost.y};
	var Cghost = {x:ghost.x,y:ghost.y+1};
	var Dghost = {x:ghost.x+1,y:ghost.y+1};
	//-->2.Pacman
	var Apac = {x:player.x,y:player.y};
	var Bpac = {x:player.x+0.9,y:player.y};
	var Cpac = {x:player.x,y:player.y+0.9};
	var Dpac = {x:player.x+0.9,y:player.y+0.9};
	///1.Coordenada A
	if(Apac.x > Aghost.x  && Apac.x < Bghost.x &&
			Apac.y >  Aghost.y && Apac.y < Cghost.y){
		hitt = true;
	}
	//2.Coordenda B
	if(Bpac.x  >  Aghost.x  && Bpac.x < Bghost.x &&
			Bpac.y >  Aghost.y && Bpac.y < Cghost.y){
			hitt = true;
	}
	//3.Coordenada C
	if(Cpac.x >  Aghost.x && Cpac.x < Bghost.x && 
			Cpac.y >  Aghost.y && Cpac.y < Cghost.y){
			hitt = true;
	}
	//4.Coordenada D
	if(Dpac.x >   Aghost.x && Dpac.x < Bghost.x &&
			Dpac.y  >  Aghost.y && Dpac.y <  Cghost.y){
			hitt= true;
	}
	return hitt;
}


function CreatePath(player,ghost){
	/* sacamos el siguiente path del elemtento 1 */
	var graph =  new misc.Graph(Game.map);
	/* posicion inicial del fantasma */
	var start = graph.grid[ghost.x][ghost.y];
	/* posicion donde esta el pacman de cada jugador */
	var end = graph.grid[player.x][player.y];
	return misc.astar.search(graph,start,end,false);
}

function playerHitGhost(player){
  var hitGhost = CapturaPacman(player.info,player.info.fantasma);
  return hitGhost
}

/*
	Update seccion
*/
function UpdateGhost(){
	var fantasmas = [];
 	var scores=[]
  /*  */
  var hitGhost1 = playerHitGhost(player1); //true
  var hitGhost2 = playerHitGhost(player2); // o true

	if (!hitGhost1 && !hitGhost2){
		//console.log('wwwewewewew')
		//console.log(player1.path[0])
		var coordGhost={'x':player1.path[0].x,'y':player1.path[0].y};
  	setGhost_User(list_user[0].id,coordGhost);
  	coordGhost={'x':player2.path[0].x,'y':player2.path[0].y};
  	setGhost_User(list_user[1].id,coordGhost);
  	fantasmas.push({'id':list_user[0].id,'x':player1.path[0].x,'y':player1.path[0].y});
  	scores.push({'id':list_user[0].id,'score':list_user[0].score});
  	player1.path.splice(0,1);
  	fantasmas.push({'id':list_user[1].id,'x':player2.path[0].x,'y':player2.path[0].y});
  	scores.push({'id':list_user[1].id,'score':list_user[1].score});
  	player2.path.splice(0,1);
  	io.sockets.in(Game.name_room).emit('NewPos_Ghost',fantasmas,Game.time,scores);
  }

  if (hitGhost1 || hitGhost2){
  	var msgPlayer1 = (hitGhost1 === true ) ? 'KO' : 'OK';
  	var msgPlayer2 = (hitGhost2 === true ) ? 'KO' : 'OK';
  	io.sockets.socket(list_user[0].id).emit('State_Game', msgPlayer1);
  	io.sockets.socket(list_user[1].id).emit('State_Game', msgPlayer2);
  	clearInterval(Game._timer);
  }
	//console.log('ola');     
}

/* 
	Devuelve si existe un usuario dentro del juego
*/

function seekUser(name){ //----> OK
	var existe = false;
	for (var i = 0; i < list_user.length; i++) {
		if (name == list_user[i].user){
			return existe = true;
			break
		}
	}
	return existe	
}

/* 
 Devulve la posicion de un usuario 
*/
function getInfoUser(name){  // a traves del id saco la informacion
	var valueUser;
	for (var i = 0; i < list_user.length; i++) {
		if(name == list_user[i].id){
			valueUser=list_user[i].posGame;
			break
		}
	}
	return valueUser;
}

/* 
 seteamos la posicion de un usuario 
*/
function setPosition_User(id,newPos){
	for (var i = 0; i < list_user.length; i++) {
		if(id == list_user[i].id){
			list_user[i].posGame.x = newPos.x;
			list_user[i].posGame.y = newPos.y;
			list_user[i].posGame.paso = newPos.pasos;
			break
		}
	}
}

/* 
 seteamos la posicion de un usuario 
*/
function setGhost_User(id,newPos){
	for (var i = 0; i < list_user.length; i++) {
		if(id == list_user[i].id){
			list_user[i].posGame.fantasma.x = newPos.x;
			list_user[i].posGame.fantasma.y = newPos.y;
			break
		}
	}
}

/* 
 seteamos la posicion de un usuario 
*/
function setScore_User(id,newScore){
	for (var i = 0; i < list_user.length; i++) {
		if(id == list_user[i].id){
			list_user[i].score += newScore;
			break
		}
	}
}

/* 
	de momento solo comprobamos que no existan mas cocos en juego 
*/
function gameFinish() {
	var ganador = 0;
	if(list_user[0].score > list_user[1].score){
		ganador = 1;
	}else if(list_user[0].score < list_user[1].score){
		ganador = 2;
	}
	return ganador;
}


/* FUNCION PARA REALIZAR EL SEGUIMIENTO DEL PACMAN POR LOS FANTASMAS */

/*
 Podemos establecer dentro de cada socket elementos como:
 	*name --> socket.username
 	*room --> socket.room
 	*para unirnos  --> socket.join(name_room)
 	*
*/