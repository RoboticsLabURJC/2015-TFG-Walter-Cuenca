

var socket=io.connect("192.168.0.157:8181");
//var socket=io.connect("localhost:8181");
var listplayers;
var myPacman;
var CounterPacman;
var _message;
var x = false;

var GameArea = {
	//añadir properGame
	/************************/
	/* Elementos del juego  */
	/************************/
	//list_obstaculos,
	//list_cocos,
	/* variables para dibujar escenario */
	//properGame,
	time:'00'+':'+'00'+':'+'00',
	img_loose:new Image(),
	img_win:new Image(),
	image:new Image(),
  timeStart:0,
	timeEnd:0,
	myPing:0,
	/*  */
	
	State_Game:null,

	 /* OK */
  start : function() {
  	this.img_loose.src ='./public/imagenes/game_over.jpeg';
  	this.img_win.src = './public/imagenes/game_win.jpg';
  	this.image.src = './public/imagenes/pacman_fruit.png';
    this.canvas=document.getElementById('escena'),
    this.contexto = this.canvas.getContext("2d");
    //this.AudioGame =  document.getElementById('musica');
    //this.AudioDied = document.getElementById('hitPacman');
    //this.AudioEat = document.getElementById('eating');
    //this.start_crono = true;
  },

	time_ClientServer : function(start,end){ // OK : FUNCION 
		/* los tiempos estan dados en milisegundos */
		this.myPing = (end-start)/1000;
	},

	/* dibujamos la forma del scenario */ //OK
	drawShape_scene: function(shape){
		this.contexto.save();
		this.contexto.beginPath();
			for (var i = 0; i < shape.length; i++) {
				var elemento = shape[i];
				for (var propiedad in elemento){
					var x = elemento[propiedad];
					if(x.moveTo){
						this.contexto.moveTo(this.properGame.hCuad*x.moveTo[0],this.properGame.hCuad*x.moveTo[1]);
					}else if(x.lineTo){
						this.contexto.lineTo(x.lineTo[0]*this.properGame.hCuad,this.properGame.hCuad*x.lineTo[1]);
					}
				}
			}
	  	this.contexto.strokeStyle = 'blue';
			this.contexto.lineWidth = 2;
			this.contexto.stroke();
		this.contexto.restore();
	},

 	hitObject : function(player){
		/* obstaculos  */
		var hitt = false;
		for(var i = 0;i<this.list_obstaculos.length;i++){
			var obstaculo = this.list_obstaculos[i];
			/* coordenadas de los obstaculos y del pacman */
			//-->1.Obtaculo
			var Aobstaculo = {x:obstaculo.x,y:obstaculo.y};
			var Bobstaculo = {x:obstaculo.x+obstaculo.width,y:obstaculo.y};
			var Cobstaculo = {x:obstaculo.x,y:obstaculo.y+obstaculo.height};
			var Dobstaculo = {x:obstaculo.x+obstaculo.width,y:obstaculo.y+obstaculo.height};
			//-->2.Pacman
			var Apac = {x:player.x,y:player.y};
			var Bpac = {x:player.x+0.9,y:player.y};
			var Cpac = {x:player.x,y:player.y+0.9};
			var Dpac = {x:player.x+0.9,y:player.y+0.9};
				
			///1.Coordenada A
			if(Apac.x > Aobstaculo.x  && Apac.x < Bobstaculo.x &&
				Apac.y >  Aobstaculo.y && Apac.y < Cobstaculo.y){
				hitt = true;
				break
			}
			//2.Coordenda B
			if(Bpac.x  >  Aobstaculo.x  && Bpac.x < Bobstaculo.x &&
				Bpac.y >  Aobstaculo.y && Bpac.y < Cobstaculo.y){
				hitt = true;
				break
			//3.Coordenada C
			}
			if(Cpac.x >  Aobstaculo.x && Cpac.x < Bobstaculo.x && 
				Cpac.y >  Aobstaculo.y && Cpac.y < Cobstaculo.y){
				hitt = true;
				break
			}
			//4.Coordenada D
			if(Dpac.x >   Aobstaculo.x && Dpac.x < Bobstaculo.x &&
				Dpac.y  >  Aobstaculo.y && Dpac.y <  Cobstaculo.y){
				hitt= true;
				break
			}
		}
		return hitt;
	},

	hitt_counter: function(player){
		var hitt_counter = false;
		if(player.x < 1 || player.x > this.properGame.nFila){
			hitt_counter = true;
		}else if(player.y < 1 || player.y > this.properGame.nColum){
			hitt_counter = true;
		}
		return hitt_counter;
	},

	eatCoco: function(player) {
		/* cocos  */
		var positionCoco = -1;
		for(var i=0;i<this.list_cocos.length;i++){
			var coco = this.list_cocos[i];
				//--->1.Pacman
			var Apac = {x:player.x,y:player.y};
			var Bpac = {x:player.x+0.99,y:player.y};
			var Cpac = {x:player.x,y:player.y+0.99};
			var Dpac = {x:player.x+0.99,y:player.y+0.99};
			/*
				comprobamos que el coco este dentro de 
				las coordenadas de nuestro pacman
			 */
			if (coco.x+0.5 > Apac.x && coco.x+0.5 < Bpac.x && 
				coco.y+0.5 > Apac.y && coco.y+0.5 < Cpac.y ){
				console.log(this.list_cocos[i])
				this.list_cocos.splice(i,1);
				positionCoco = i;
				/* tenemos que pasar el marcador */
				break;
			}
		}
		return positionCoco;
	},

	 /* rejilla del juego */
	drawGrid: function() {
  	for(var i=0;i<19+1 ;i++){
			for(var j=0;j<18+4;j++){
	 			this.contexto.strokeStyle='white';
	 			this.contexto.strokeRect(i*40,j*40,40,40);
	 		}
	 	}
	},

	drawObstacle: function(){
		this.contexto.save();
		for (var i = 0; i < this.list_obstaculos.length-5; i++) {
			var elemento = this.list_obstaculos[i];
			roundedRect(this.contexto,elemento.x*40,elemento.y*40,elemento.width*40,elemento.height*40,10);
		}
		this.contexto.restore();
	},

/* dibujamos los cocos del scenario */  //OK
	drawCocos: function(){
		this.contexto.save();
		if(this.list_cocos.length > 0){
			for(var i=0;i<this.list_cocos.length;i++){
				var elemento = this.list_cocos[i];
				this.contexto.fillStyle = 'yellow';
				this.contexto.beginPath();
				this.contexto.arc((elemento.x*40)+20,(elemento.y*40)+20,elemento.radio,0,(Math.PI/180),true);
				this.contexto.fill();
			}
		}	
		this.contexto.restore();
	},

	/* dibujamos a nuestro pacman */  //OK
	drawPlayers: function(infoUser){
		this.contexto.save();
		if(infoUser.typePacman == 1){
			this.contexto.drawImage(this.image,320,0,32,32,infoUser.x*40,infoUser.y*40,35,35);
		}else{
			this.contexto.drawImage(this.imageCounter,0,0,128,128,infoUser.x*40,infoUser.y*40,35,35);
		}
		this.contexto.restore();		            
	},

	time_game: function(){
		this.contexto.save();
			this.contexto.font = "30px BDCartoonShoutRegular";	
			roundedRect(this.contexto,8*40,20*40,5*40,1*40,10);
			this.contexto.fillStyle = "#00FA9A";
			this.contexto.fillText(this.time,8.75*40,20.80*40);
		this.contexto.restore();
	},

	score_user: function(Myposition,Counterposition){
		this.contexto.save();
			this.contexto.globalAlpha = 0.6;
			this.contexto.fillStyle = "white";
			this.contexto.font = "20px BDCartoonShoutRegular";
			this.contexto.fillText('My score:'+Myposition.score,1*40,20.1*40);
			this.contexto.fillText('Counter score:'+Counterposition.score,14*40,20.1*40);
		this.contexto.restore();
	},

	lose_game: function(){
		this.contexto.save();
			this.contexto.globalAlpha = 0.6;	
			this.contexto.drawImage(this.img_loose,0,0,this.canvas.width,this.canvas.height);
		this.contexto.restore();
	},


	win_game: function(){
		var finish = false;
		this.contexto.globalAlpha = 0.7;
	 	this.contexto.save();
		this.contexto.drawImage(this.img_win,0,0,this.canvas.width,this.canvas.height);
		this.contexto.restore();
	},

	drawGhost: function(info){
	},
}

/* 
	FUNCIONES CONECTIVIDAD 
*/

//1.
socket.on('pong',function(date){
	var f = new Date();
	GameArea.timeEnd = f.getTime();
	/* en cada  envio tendremos que calcular el ping que tenemos cuando juguemos  */
	GameArea.time_ClientServer(GameArea.timeStart,GameArea.timeEnd);
	console.log('wwwwe')
	console.log('My_Ping:'+GameArea.myPing+'s');
});

//2.
/* creamos un evento para que no  puedan existir nombres duplicados    */
socket.on('reject_name',function(info){
	console.log('El nombre ya existe... Porfavor seleccione otro para poder continuar');
	console.log(info);
	/* activamos el input para que el usuario acceda con otro nombre  */
	$('#player').attr('disabled',false);
});

/* 
	Esperamos la recepcion del mensaje OK 
	--> estamos dentro de la sala de juego 
*/
//2.
socket.on('CreateConnection',function(id,listUser){
	listplayers = listUser;
	myPacman = new Player(id);
	console.log('Su identificador es:'+ myPacman.id);
	console.log('Los usuarios dentro de la sala:');
	console.log(listUser);
	for (var i = 0; i < listUser.length; i++) {
		console.log(listUser[i]);
		var player = listUser[i];
		$('.list-group').append('<li id=user_'+i+' class=list-group-item>'+player.user+'</li>');
		$('#user_'+i).click(function(){requestGame(this)});
	}	
});

/* 
	Recibimos informacion cada vez que un usuario nuevo se conecte
*/
socket.on('New_Joined',function(id){
	console.log('El nuevo usuario que se ha conectado es:'+id);
});

/* 
	obtenemos el reloj del servidor (SINCRONIZACION)  ---> no lo utilizamos
*/
socket.on('Response_ElementGame',function(elementsGame){
	/* Cargamos la propiedades del juego */
	console.log(elementsGame)
	GameArea.shape_1 = elementsGame.shape_1;
	GameArea.shape_2 = elementsGame.shape_2;
	GameArea.list_obstaculos=elementsGame.obstaculos;
	GameArea.list_cocos=elementsGame.cocos;
	GameArea.properGame=elementsGame.properGame;

	//1.
	myPacman.setMyghostposition(elementsGame.myInfo.fantasma);
	CounterPacman.setCounterGhostposition(elementsGame.myInfo.fantasma);
	delete elementsGame.myInfo.fantasma;
	myPacman.setMyPosition(elementsGame.myInfo);
	CounterPacman.setCounterposition(elementsGame.myInfo);

	//2.
	CounterPacman.setMyghostposition(elementsGame.counterInfo.fantasma);
	myPacman.setCounterGhostposition(elementsGame.counterInfo.fantasma);
	delete elementsGame.counterInfo.fantasma;
	CounterPacman.setMyPosition(elementsGame.counterInfo);
	myPacman.setCounterposition(elementsGame.counterInfo);



	console.log('myObjeto')
	console.log(myPacman)
	console.log('CounterObjeto')
	console.log(CounterPacman)

	DrawScene(); ///---------->
	console.log('Time FinisH')
	var f = new Date();
	var time = f.getTime();
  console.log(time);
	socket.emit('Finish_InitFrame');
});

function DrawScene(){
	GameArea.canvas.width=(GameArea.properGame.nFila+2)*GameArea.properGame.wCuad;
	GameArea.canvas.height=(GameArea.properGame.nColum+4)*GameArea.properGame.hCuad;
	$('#pnCanvas').show();
	UpdateGame();
}


/*
	Activamos las teclas del juego para que se muevan
*/ 
socket.on('ReadyGame',function(){
	console.log('Time ReadyGame')
	var f = new Date();
	var time = f.getTime();
  console.log(time);
  console.log(f.toTimeString());
  setTimeout(function(){
  	console.log('DESPUES DE 3MIN')
  	var d = new Date();
		var n = d.toTimeString();
		console.log(n);
		x = true;
		GameArea.frame = setInterval(UpdateGame,1000/60);
  },3000);
});

/* 
	Actualizar la posicion del contrario
*/
socket.on('NewPos_Counter',function(newPosition){
	console.log('update posicion del contrario')
	CounterPacman.myposition = newPosition;
});

/* 
	update cocos del contrario
*/
socket.on('UpdateCocos_Player',function(cocoPosition){
	console.log('update lista cocos');
	console.log(GameArea.list_cocos[cocoPosition]);
	GameArea.list_cocos.splice(cocoPosition,1);
});


socket.on('NewPos_Ghost',function(fantasmas,timers,scores){
	//var fantasma = Myposition.fantasma;
	console.log(scores)
	console.log(timers);
	console.log('Update Ghost')
	GameArea.time = timers
	console.log(fantasmas)
	for (var i = 0; i < fantasmas.length; i++) {
		ghost = fantasmas[i];
		core = scores[i];
		console.log(ghost)
		if(ghost.id == myPacman.id && core.id == myPacman.id){
			/* propio */
			myPacman.myGhost.x = ghost.x;
			myPacman.myGhost.y = ghost.y;
			myPacman.score = core.score;			
			console.log('my puntuacion:'+ core.score);
		}else{
			CounterPacman.myGhost.x = ghost.x;
			CounterPacman.myGhost.y = ghost.y;
			CounterPacman.score = core.score;
			console.log('contrario puntuacion:'+ core.score );
		}
	}
});

/*
	CAPTURA POR PARTE DEL FANTASMA
*/
socket.on('State_Game',function(msg){
	console.log(msg);
	GameArea.State_Game = msg;
});

/*
	CAPTURA POR PARTE DEL FANTASMA
*/
socket.on('GameWinner',function(userwiner){
	console.log(msg);
	GameArea.State_Game = userwiner;
});


/* 
	Recibimos una peticion de partida  
*/
socket.on('message',function(message){
	if(message.typeMsg == 'Init'){
		console.log('Un usuario quier jugar una partida contigo');
		console.log(message);
		_message = message
		$('#peti').text(message.texto);
		/* 
			hacemos visible el bloque de aceptar la peticion
		*/
		$('#myModal').modal('show')
	}else if (message.typeMsg == 'replayInit') {
		console.log(message);
		if(message.texto == 'si'){
			/* 
				pasamos ha establecer un conducto 
				bidireccional de envio de datos 
			*/
			console.log('El usuario ha aceptado la partida');
			$('#escena').show();
			CounterPacman = new Player(message.idOrigen);
			console.log('my_id: '+myPacman.id);
			console.log('counter_id: '+CounterPacman.id);
			//otherId=message.idOrigen //-->
			/* 
				enviamos un mensaje al servidor para obtener el contenido 
			*/
			socket.emit('Request_ElementGame',CounterPacman.id);
		}else{
			/* si no quieren relizar una partida activamos el evento para contactar
				con otro usuario 
			*/
			$('li').on('click',function(){requestGame(this)});
			console.log('El usuario no aceptado la partida');
		}
		console.log(message);
	}	
});



/* FUNCIONES AUXILIARES */

/*
	Buscamos el id del cliente destino
*/
function seekID(name){
	var id;
	console.log(name)
	for (var i = 0; i < listplayers.length; i++) {
		if(listplayers[i].user == name){
			id=listplayers[i].id;
			break
		}
	}
	return id;
}

/* 
	Realizaremos la peticion para establecer una partida 
*/
function requestGame(elemento){
	console.log(elemento);
	var text=$('#player').val()+': Jugamos una partida ??';
	console.log(text);
	var destino = seekID($(elemento).text());
	console.log(destino);
	/* pasamos a buscar la info necesaria del envio */
	var message = {
		'typeMsg':'Init',
		'idOrigen':myPacman.id,
		'texto':text,
		'idDestino':destino
	}
	console.log('Enviamos una peticion de partida.');
	socket.emit('message',message)
	$('li').off('click');
}

/* 
	funcion que envia la contestacion a la creacion de la partida  //-- ok
*/
function replayGame(contesta){
	console.log(contesta);
	/* una ves selecciona  ocultamos el panel */
	$('#myModal').modal('hide')
	/* si acepatamos la partida el contenido del juego tiene que ser visible */		
	/* componemos el mensaje de respues y lo enviamos*/
	var message = {
		'typeMsg':'replayInit',
		'idOrigen':myPacman.id,
		'texto':contesta,
		'idDestino':_message.idOrigen
	};
	/* componemos el mensaje de contestacion  */
	console.log(message);
	socket.emit('message',message)
	if(contesta == 'si'){
		/* activariamos el canvas para que sea visible */
		console.log(_message)
		$('#escena').show();
		CounterPacman = new Player(_message.idOrigen)
		//otherId=_message.idOrigen;
		console.log('id_My: '+myPacman.id)
		console.log('id_Counter: '+CounterPacman.id);
		//console.log(myId)
		/* 
			enviamos mensaje para obtener los parametros iniciales del juego --> le pasamos el valor del id del otro jugador 
		*/
		socket.emit('Request_ElementGame',CounterPacman.id);
	}
}

/* funcion para la actualizacion del contenido cada n tiempo */
function UpdateGame(){
	//console.log('bxle');
	GameArea.contexto.save();
	GameArea.contexto.clearRect(0,0,GameArea.canvas.width,GameArea.canvas.height);
	/* dibujamos el grid */
	GameArea.drawGrid();
	GameArea.time_game();
	/* dibujamos el borde del juego */
	GameArea.drawShape_scene(GameArea.shape_1);
	GameArea.drawShape_scene(GameArea.shape_2);
	/* dibujamos los obstaculos */
	GameArea.drawObstacle();
	/* dibujamos los cocos */
	GameArea.drawCocos();
	GameArea.score_user(myPacman,CounterPacman);
			/* nuestros elementos */
	myPacman.drawImage();
	CounterPacman.drawImage();
	myPacman.drawGhost();
	CounterPacman.drawGhost();
	/* los valores del rivalcc*/ 			
	if(GameArea.State_Game == 'OK'){
		GameArea.win_game();
		clearInterval(GameArea.frame);
	}else if(GameArea.State_Game == 'KO'){
		GameArea.lose_game();
		clearInterval(GameArea.frame);
	}
	GameArea.contexto.restore();
}



/* Funcion para dibujar los bordes circulares de los rectangulos.*/
function roundedRect(ctx,x,y,width,height,radius){
	ctx.fillStyle ='blue';
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(x,y+radius);
	ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
	ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y+radius);
	ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y);
	ctx.quadraticCurveTo(x,y,x,y+radius);
	ctx.stroke();
}

	document.addEventListener("keydown", NextPosPacman, false);

/*  */
function NextPosPacman(e){
	var newCoord = {'x':0,'y':0};
	if(x){
		var pas = 0;
		newCoord.x = myPacman.myposition.x;
		newCoord.y = myPacman.myposition.y;
		if(e.code == 'ArrowDown'){
			newCoord.y += 0.5;
			pas += 0.5;
		}else if(e.code == 'ArrowUp'){
			newCoord.y += -0.5;
			pas += -0.5;
		}else if(e.code == 'ArrowRight'){
			newCoord.x += 0.5;
			pas += 0.5;
		}else if (e.code == 'ArrowLeft'){
			newCoord.x += -0.5;
			pas += -0.5;
		}
		/* Comprobamos si hay golpe */
		var HitContor = GameArea.hitt_counter(newCoord);
		if(!HitContor){
			var HitObstacle = GameArea.hitObject(newCoord);
			if(!HitObstacle){
				myPacman.myposition.x = newCoord.x; 
				myPacman.myposition.y = newCoord.y;
				myPacman.myposition.numPasos += pas;
				console.log(myPacman.myposition);
				socket.emit('UpdatePosition_Player',myPacman.myposition);
				if(myPacman.myposition.numPasos == 1 || myPacman.myposition.numPasos == -1){
					myPacman.myposition.numPasos = 0;
				}
				var eat = GameArea.eatCoco(myPacman.myposition);
				if(eat >= 0){
					socket.emit('UpdateCocos',eat);
				}
			}
		}
	}
}

/*  */
function loads(){
	GameArea.start();
	//contexto=mycanvas.getContext('2d');
	/* conocemos el ping que tendremos 
	en los envios lag  */
	var f = new Date();
	GameArea.timeStart = f.getTime();
	socket.emit('ping'); //----> PRIMER ENVIO
}

/* 
	Emitimos un mensaje Conexion en la sala 
	 *Se produce al introducir el nombre
*/
function sendConnection(){
	//enviamos el establecimiento de coneccion
	console.log('Send stablish_connection');
	console.log($('#player').val())
	socket.emit('stablish_connection',$('#player').val());
	/* desactivamos el nombre para que no se pueda cambiar  */
	$('#player').attr('disabled',true);
}


function Player(id){
	this.id=id;
	this.myposition;
	this.myGhost;
	this.counterposition;
	this.CounterGhost;
	this.score=0;
	this.imageCounter = new Image();
	this.image = new Image();
	this.image.src='./public/imagenes/chompersprites.png'
	this.imageCounter.src='./public/imagenes/PacmanCounter.png'


	this.drawImage = function(){
		GameArea.contexto.save();
		//console.log(this.myposition)
		if(this.myposition.typePacman == 1){
			GameArea.contexto.drawImage(this.image,320,0,32,32,this.myposition.x*40,this.myposition.y*40,35,35);
		}else{
			GameArea.contexto.drawImage(this.imageCounter,0,0,128,128,this.myposition.x*40,this.myposition.y*40,35,35);
		}
	GameArea.contexto.restore();
	}

	/*
		Dibujamos los fantasmas
	*/
	this.drawGhost = function(){
		GameArea.contexto.save();
			GameArea.contexto.drawImage(this.image,0,0,32,32,this.myGhost.x*40,this.myGhost.y*40,35,35);
			GameArea.contexto.drawImage(this.image,0,0,32,32,this.CounterGhost.x*40,this.CounterGhost.y*40,35,35);
		GameArea.contexto.restore();
	}

	this.setMyPosition = function(position){
		this.myposition=position;
	}
	this.setCounterposition = function(position){
		this.counterposition=position;
	}
	this.setMyghostposition = function(position){
		this.myGhost=position;
	}
	this.setCounterGhostposition = function(position){
		this.CounterGhost=position;
	}
	this.setScore = function(scores){
		this.score=scores;
	}
	this.Pacman = function(type){
		this.typePacman=type;
	}
}
