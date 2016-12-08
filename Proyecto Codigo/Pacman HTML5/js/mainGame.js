

var map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1],
	[0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1],
	[0,1,1,1,0,1,1,1,0,0,0,1,0,1,1,1,0,1,1],
	[0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1],
	[0,1,1,1,0,1,1,1,0,0,0,1,0,1,1,1,0,1,1],
	[0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1],
	[0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
	[0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1],
	[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,1],
	[0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];


var graph = new Graph(map);

/* mismas coordenadas */
var Pac = new Pacman(12, 11, 12, 11);

var G_blinky = new Ghost(1,1,'blinky',500,0);
var G_clyde = new Ghost(12,10,'clyde',1000,12);
var G_speedy = new Ghost(10,10,'speedy',1500,20);
var G_inky  = new Ghost(11,10,'inky',1500,2000);

var list_Ghost = [];
list_Ghost.push(G_blinky);
list_Ghost.push(G_clyde);
list_Ghost.push(G_speedy);
list_Ghost.push(G_inky);


var GameArea = {
	value_cuad : 40,
	filas:19,
	columnas:18,
	canvas : document.createElement("canvas"),
	image :new Image(),
	img_loose : new Image(),
	img_win : new Image(),
	/* time */
  seconds : 0,
  min : 0,
  horas :0,
	time : '00'+':'+'00'+':'+'00',
	/* state game */
	state : 0,
	score :0,
	start_crono : false,
	lifePlayer : 1,
	
	/* formas del escenario */

	shape_1 : [
		[{'moveTo':[0.75,8.75]},{'lineTo':[4.75,8.75]},
		{'lineTo':[4.75,6.25]},{'lineTo':[0.75,6.25]}, 
		{'lineTo':[0.75,0.75]},

		{'lineTo':[10.25,0.75]},{'lineTo':[10.25,2.75]},
		{'lineTo':[10.75,2.75]}, 

		{'lineTo':[10.75,0.75]},{'lineTo':[20.25,0.75]},
		{'lineTo':[20.25,6.25]},{'lineTo':[16.25,6.25]},
		{'lineTo':[16.25,8.75]},{'lineTo':[20.25,8.75]} ],

		[ {'moveTo':[20.25,10.25]},{'lineTo':[16.25,10.25]},
		{'lineTo':[16.25,12.75]},{'lineTo':[20.25,12.75]}, 
		{'lineTo':[20.25,19.25]},{'lineTo':[0.75,19.25]}, 
		{'lineTo':[0.75,12.75]},{'lineTo':[4.75,12.75]},
		{'lineTo':[4.75,10.25]},{'lineTo':[0.75,10.25]}] 
	],

	shape_2 : [
		[{'lineTo':[10,3]},{'lineTo':[10,3]},
		{'lineTo':[11,3]},{'lineTo':[11,1]}, 
		{'lineTo':[20,1]},{'lineTo':[20,6]},
		{'lineTo':[16,6]},{'lineTo':[16,9]}, 
		{'lineTo':[20.25,9]}],

		[{'moveTo':[20.25,10]},{'lineTo':[16,10]},
		{'lineTo':[16,13]},{'lineTo':[20,13]},
		{'lineTo':[20,19]},{'lineTo':[1,19]},
		{'lineTo':[1,13]},{'lineTo':[5,13]},
		{'lineTo':[5,10]},{'lineTo':[0.75,10]}],

		[{'moveTo':[0.75,9]},{'lineTo':[5,9]},
		{'lineTo':[5,6]},{'lineTo':[1,6]},
		{'lineTo':[1,1]},{'lineTo':[10,1]},
		{'lineTo':[10,1]},{'lineTo':[10,3]}]
	],

	/* obstaculos/doits */
	list_cocos : [
		{x:1,y:1,radio:4},
		{x:2,y:1,radio:4},
		{x:3,y:1,radio:4},
		{x:4,y:1,radio:4},
		{x:5,y:1,radio:4},
		{x:6,y:1,radio:4},
		{x:7,y:1,radio:4},
		{x:8,y:1,radio:4},
		{x:9,y:1,radio:4},
		{x:11,y:1,radio:4},
		{x:12,y:1,radio:4},
		{x:13,y:1,radio:4},
		{x:14,y:1,radio:4},
		{x:15,y:1,radio:4},
		{x:16,y:1,radio:4},
		{x:17,y:1,radio:4},
		{x:18,y:1,radio:4},
		{x:19,y:1,radio:4},
		{x:5,y:1,radio:4},
		{x:9,y:1,radio:4},
		{x:11,y:1,radio:4},
		{x:15,y:1,radio:4},
		{x:1,y:2,radio:4},
		{x:5,y:2,radio:4},
		{x:9,y:2,radio:4},
		{x:11,y:2,radio:4},
		{x:15,y:2,radio:4},
		{x:19,y:2,radio:4},
		{x:1,y:3,radio:4},
		{x:2,y:3,radio:4},
		{x:3,y:3,radio:4},
		{x:4,y:3,radio:4},
		{x:5,y:3,radio:4},
		{x:6,y:3,radio:4},
		{x:7,y:3,radio:4},
		{x:8,y:3,radio:4},
		{x:9,y:3,radio:4},
		{x:11,y:3,radio:4},
		{x:12,y:3,radio:4},
		{x:13,y:3,radio:4},
		{x:14,y:3,radio:4},
		{x:15,y:3,radio:4},
		{x:16,y:3,radio:4},
		{x:17,y:3,radio:4},
		{x:18,y:3,radio:4},
		{x:19,y:3,radio:4},
		{x:1,y:4,radio:4},
		{x:5,y:4,radio:4},
		{x:7,y:4,radio:4},
		{x:13,y:4,radio:4},
		{x:15,y:4,radio:4},
		{x:19,y:4,radio:4},
		{x:1,y:5,radio:4},
		{x:2,y:5,radio:4},
		{x:3,y:5,radio:4},
		{x:4,y:5,radio:4},
		{x:5,y:5,radio:4},
		{x:7,y:5,radio:4},
		{x:8,y:5,radio:4},
		{x:9,y:5,radio:4},
		{x:10,y:5,radio:4},
		{x:11,y:5,radio:4},
		{x:12,y:5,radio:4},
		{x:13,y:5,radio:4},
		{x:15,y:5,radio:4},
		{x:16,y:5,radio:4},
		{x:17,y:5,radio:4},
		{x:18,y:5,radio:4},
		{x:19,y:5,radio:4},
		{x:1,y:13,radio:4},
		{x:2,y:13,radio:4},
		{x:3,y:13,radio:4},
		{x:4,y:13,radio:4},
		{x:5,y:13,radio:4},
		{x:6,y:13,radio:4},
		{x:7,y:13,radio:4},
		{x:8,y:13,radio:4},
		{x:9,y:13,radio:4},
		{x:11,y:13,radio:4},
		{x:12,y:13,radio:4},
		{x:13,y:13,radio:4},
		{x:14,y:13,radio:4},
		{x:15,y:13,radio:4},
		{x:16,y:13,radio:4},
		{x:17,y:13,radio:4},
		{x:18,y:13,radio:4},
		{x:19,y:13,radio:4},
		{x:1,y:14,radio:4},
		{x:3,y:14,radio:4},
		{x:5,y:14,radio:4},
		{x:9,y:14,radio:4},
		{x:11,y:14,radio:4},
		{x:15,y:14,radio:4},
		{x:17,y:14,radio:4},
		{x:19,y:14,radio:4},
		{x:1,y:15,radio:4},
		{x:2,y:15,radio:4},
		{x:3,y:15,radio:4},
		{x:5,y:15,radio:4},
		{x:6,y:15,radio:4},
		{x:7,y:15,radio:4},
		{x:8,y:15,radio:4},
		{x:9,y:15,radio:4},
		{x:10,y:15,radio:4},
		{x:11,y:15,radio:4},
		{x:12,y:15,radio:4},
		{x:13,y:15,radio:4},
		{x:14,y:15,radio:4},
		{x:15,y:15,radio:4},
		{x:17,y:15,radio:4},
		{x:18,y:15,radio:4},
		{x:19,y:15,radio:4},
		{x:1,y:16,radio:4},
		{x:3,y:16,radio:4},
		{x:4,y:16,radio:4},
		{x:5,y:16,radio:4},
		{x:7,y:16,radio:4},
		{x:13,y:16,radio:4},
		{x:15,y:16,radio:4},
		{x:16,y:16,radio:4},
		{x:17,y:16,radio:4},
		{x:19,y:16,radio:4},
		{x:1,y:17,radio:4},
		{x:3,y:17,radio:4},
		{x:5,y:17,radio:4},
		{x:7,y:17,radio:4},
		{x:8,y:17,radio:4},
		{x:9,y:17,radio:4},
		{x:11,y:17,radio:4},
		{x:12,y:17,radio:4},
		{x:13,y:17,radio:4},
		{x:15,y:17,radio:4},
		{x:17,y:17,radio:4},
		{x:19,y:17,radio:4},
		{x:1,y:18,radio:4},
		{x:2,y:18,radio:4},
		{x:3,y:18,radio:4},
		{x:4,y:18,radio:4},
		{x:5,y:18,radio:4},
		{x:6,y:18,radio:4},
		{x:7,y:18,radio:4},
		{x:8,y:18,radio:4},
		{x:9,y:18,radio:4},
		{x:10,y:18,radio:4},
		{x:11,y:18,radio:4},
		{x:12,y:18,radio:4},
		{x:13,y:18,radio:4},
		{x:14,y:18,radio:4},
		{x:15,y:18,radio:4},
		{x:16,y:18,radio:4},
		{x:17,y:18,radio:4},
		{x:18,y:18,radio:4},
		{x:19,y:18,radio:4},
		{x:19,y:18,radio:4},
		{x:5,y:6,radio:4},
		{x:5,y:7,radio:4},
		{x:5,y:8,radio:4},
		{x:5,y:9,radio:4},
		{x:5,y:10,radio:4},
		{x:5,y:11,radio:4},
		{x:5,y:12,radio:4},
		{x:15,y:6,radio:4},
		{x:15,y:7,radio:4},
		{x:15,y:8,radio:4},
		{x:15,y:9,radio:4},
		{x:15,y:10,radio:4},
		{x:15,y:11,radio:4},
		{x:15,y:12,radio:4},
	],

	list_obstaculos : [
		{x:2,y:2,width:3,height:1},
		{x:6,y:2,width:3,height:1},
		{x:2,y:4,width:3,height:1},
		{x:6,y:4,width:1,height:5},
		{x:8,y:6,width:1,height:1},
		{x:8,y:4,width:5,height:1},
		{x:10,y:6,width:1,height:1},
		{x:14,y:4,width:1,height:5},
		{x:12,y:6,width:1,height:1},
		{x:8,y:8,width:5,height:3},
		{x:6,y:10,width:1,height:3},
		{x:14,y:10,width:1,height:3},
		{x:8,y:12,width:5,height:1},
		{x:10,y:14,width:1,height:1},
		{x:8,y:16,width:5,height:1},
		{x:10,y:17,width:1,height:1},
		{x:6,y:14,width:3,height:1},
		{x:12,y:14,width:3,height:1},
		{x:2,y:14,width:1,height:1},
		{x:4,y:14,width:1,height:2},
		{x:2,y:16,width:1,height:2},
		{x:4,y:17,width:1,height:1},
		{x:6,y:16,width:1,height:2},
		{x:16,y:14,width:1,height:2},
		{x:18,y:14,width:1,height:1},
		{x:18,y:16,width:1,height:2},
		{x:16,y:17,width:1,height:1},
		{x:14,y:16,width:1,height:2},
		{x:12,y:2,width:3,height:1},
		{x:16,y:2,width:3,height:1},
		{x:16,y:4,width:3,height:1},
		/* rectangulos especiales */
		{x:10,y:1,width:1,height:2},
		{x:16,y:6,width:4,height:3},
		{x:16,y:10,width:4,height:3},
		{x:1,y:6,width:4,height:3},
		{x:1,y:10,width:4,height:3}
	],

	/** parametros fruta **/
	lisPosFruit :[ 
		{'x':10,'y':3,'pos':0},
		{'x':10,'y':5,'pos':1},
		{'x':10,'y':11,'pos':2},
		{'x':7,'y':9,'pos':3}
	],

	fruit : {
		'x':0,
		'y':0,
		'posElemen':0,
		'width':74.7,
		'height':99
	},
  
  /* OK */
  start : function() {
  	this.img_loose.src ='imagenes/game_over.jpeg';
  	this.img_win.src = 'imagenes/game_win.jpg';
  	this.image.src = 'imagenes/pacman_fruit.png';
    this.canvas.width = this.value_cuad*(this.filas+2);
    this.canvas.height = this.value_cuad*(this.columnas+4);
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[2]);
    this.AudioGame =  document.getElementById('musica');
    this.AudioDied = document.getElementById('hitPacman');
    this.AudioEat = document.getElementById('eating');
    this.start_crono = true;
  },

  addEvent : function(){
  	document.addEventListener("click", PosMouseClick, false);
		document.addEventListener("keydown", NextPosPacman, false);	
  },

  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop : function() {
    clearInterval(this.interval);
  },

  /* OK */
  grid	: function(){
  	this.context.save();
  	for(var i=0;i<19 +1 ;i++){
			for(var j=0;j<18 +4;j++){
					this.context.strokeStyle="white";
					this.context.strokeRect(i*this.value_cuad,j*this.value_cuad, this.value_cuad, this.value_cuad);
			}
		}
		this.context.restore();
  },

  shape_scene : function(shape){
		this.context.save();
			this.context.beginPath();
			for (var i = 0; i < shape.length; i++) {
				var elemento = shape[i];
				for (var propiedad in elemento){
					var x = elemento[propiedad];
					if(x.moveTo){
						this.context.moveTo(this.value_cuad*x.moveTo[0],this.value_cuad*x.moveTo[1]);
					}else if(x.lineTo){
						this.context.lineTo(x.lineTo[0]*this.value_cuad,this.value_cuad*x.lineTo[1]);
					}
				}
			}
	  	this.context.strokeStyle = 'blue';
			this.context.lineWidth = 2;
			this.context.stroke();
		this.context.restore();
	},

	draw_doits : function(){
		this.context.save();
		if(this.list_cocos.length > 0){
			for(var i=0;i<this.list_cocos.length;i++){
				var elemento = this.list_cocos[i];
				this.context.fillStyle = 'white';
				this.context.beginPath();
					this.context.arc((elemento.x*40)+20,(elemento.y*40)+20,elemento.radio,0,(Math.PI/180),true);
				this.context.fill();
			}
		}	
		this.context.restore();
	},

	draw_obstacles : function(){
		this.context.save();
			for(var i=0;i<this.list_obstaculos.length-5;i++){
				this.context.beginPath();
				var elemento = this.list_obstaculos[i];
				roundedRect(this.context,elemento.x*40,elemento.y*40,elemento.width*40,elemento.height*40,10)
			}
		this.context.restore();
	},

	initButton : function(){
			this.context.globalAlpha = 0.9;
			this.context.save();
				roundedRect(this.context,8*40,20*40,5*40,1*40,10);
				this.context.fillStyle = "#00FA9A";
				this.context.font = "30px BDCartoonShoutRegular";
				this.context.fillText('Play',9.5*40,20.80*40);
			this.context.restore();
	},

	/* ko */
	win_game : function(){
		var finish = false;
		if(this.list_cocos == 0){
			this.context.globalAlpha = 0.9;
	 			this.context.save();
	 			/* cargamos la imgen que ha ganado */
				this.context.drawImage(this.img_win,0,0,this.canvas.width,this.canvas.height);
				/* rectangulo para determinar si queremos guardar info */	
				roundedRect(this.context,this.canvas.width/2-(4*40),13*40,8*40,1.5*40,10);
				/* Escribimos por pantalla el mensaje */
				this.context.fillStyle = "#00FA9A";
				this.context.font = "30px BDCartoonShoutRegular";
				this.context.fillText('Save Score',this.canvas.width/2-(2.5*40),14*40);
			this.context.restore();
			finish = true;
		}
		return
	},

	lose_game : function(){
		this.context.save();
			this.context.globalAlpha = 0.6;	
			this.context.drawImage(this.img_loose,0,0,this.canvas.width,this.canvas.height);
		this.context.restore();
	},

	pause_game : function(){
		this.context.globalAlpha = 0.7;
		this.context.save();
			this.context.fillStyle = "#00FA9A";
			this.context.textAlign = 'center';
			this.context.font = "30px BDCartoonShoutRegular";
			this.context.fillText('Pause',10.5*40,9*40);
		this.context.restore();
	},

	initMessage : function(){
		GameArea.context.globalAlpha = 0.7;
		GameArea.context.save();
		GameArea.context.fillStyle = "#ffd700";
		GameArea.context.font = "20px BDCartoonShoutRegular";
		GameArea.context.fillText('Para empezar pulsa la tecla L',5*40,0.6*40);
		GameArea.context.restore();
	},

	time_game:function(){
		this.context.save();
			this.context.font = "30px BDCartoonShoutRegular";	
			roundedRect(this.context,8*40,20*40,5*40,1*40,10);
			this.context.fillStyle = "#00FA9A";
			this.context.fillText(this.time,8.75*40,20.80*40);
		this.context.restore();
	},

	/* KO*/
	fruit_user : function (){
		/* imagen de la fruta comida */
		this.context.save();
		this.context.globalAlpha = 0.6;
			this.context.fillStyle = "white";
			this.context.font = "bold 30px sans-serif";
			this.context.fillText("fruit :",1*40,22*40);
		this.context.restore();
	},

	score_user : function(){
		this.context.save();
			this.context.globalAlpha = 0.6;
			this.context.fillStyle = "white";
			this.context.font = "30px BDCartoonShoutRegular";
			this.context.fillText('score: '+this.score,1*40,20.1*40);
		this.context.restore();
	},

	life_user : function(){
		this.context.save();
			this.context.globalAlpha = 0.6;
			this.context.fillStyle = "white";
			this.context.font = "30px BDCartoonShoutRegular";
			this.context.fillText('life: '+this.lifePlayer,1*40,21.1*40);
		this.context.restore();
	},

	draw_listFruit : function(){
		console.log('ccc')
		this.context.save();
			this.context.globalAlpha = 0.8;
			this.context.drawImage(this.image,0,0,523,99,13.5*40,19.5*40,40*7,40)
		this.context.restore();
	},

  /* KO */
	draw_fruit : function(position){
		if(this.fruit != null){
			this.context.save();
				this.context.globalAlpha = 0.8;
			this.context.restore();
		 }
	}

};

function updateGameArea(){
 /************************
	Secuencia del escenario 
 *************************/
	GameArea.clear();
	if(GameArea.state == 0){
		GameArea.initMessage();
		GameArea.initButton();
	}else{
		GameArea.AudioGame.play();
		GameArea.time_game();
	}
	//GameArea.grid();
 	GameArea.draw_listFruit();
 	GameArea.score_user();
 	GameArea.life_user();
 	GameArea.shape_scene(GameArea.shape_1);
 	GameArea.shape_scene(GameArea.shape_2);
 	GameArea.draw_doits();
 	GameArea.draw_obstacles();
 	//GameArea.draw_fruit();
 	/* GHOST */
  for(var i = 0; i < list_Ghost.length;i++){
		var _ghost = list_Ghost[i];
		_ghost.init(GameArea.score,GameArea.state);
		if(_ghost.move && GameArea.state != 0){
			_ghost.new_path(graph,Pac.x_map,Pac.y_map,Pac.type_move);
			if(_ghost.flag == 0){
				nexStepGhost(_ghost);
			}
		}
		_ghost.draw();
	}
	/* PACMAN */
 	Pac.new_position();
 	Pac.hitObject(list_Ghost);
 	if(!Pac.move){
 		GameArea.AudioGame.pause();
 		Pac.draw();
 		GameArea.stop();
	 	GameArea.lose_game();
	 	GameArea.AudioDied.play();
	 	
 	}else{
 	var hitCounter = Pac.hitt_counter();
 	Pac.hitObject(GameArea.list_obstaculos);
	 	if(!Pac.move || hitCounter){
	 		Pac.reset();
	 	}else{
	 	 Pac.add_steps();
	 		if(Pac.pasos == 1 || Pac.pasos == -1 ){
	 	 	 Pac.new_path();
	 		}
 		}
	 	/* Pacman eat doit */
	 	var eatPil = Pac.eat_doit(GameArea.list_cocos);
	 	if(eatPil){
	 		GameArea.AudioGame.volume=0.7;
			GameArea.AudioEat.play();
			GameArea.AudioGame.volume=0.8;
	 	}
	 	Pac.reset_speed();
		Pac.draw();
		/* Comprobacion final juego  */
		var fin = GameArea.win_game();
		if(fin){
			GameArea.stop();
		}
	}
}

/* funcion para pacman para del juego. */
function Pacman(x,y,x_map,y_map){
	/* dos velocidades */
	this.speed_x = 0;
	this.speed_y = 0;
	this.pasos = 0;
	/* posicion en el mapa y camino */
	this.x = x;
	this.y = y;
	this.x_map = x_map;
	this.y_map = y_map;
	/* xx */
	this.width = 0.99;
	this.height = 0.99;
	/* variables comprobacion colision */
	this.move = true;
	/* var para tener en cuenta que hay que cambiar el path*/
	this.new_pos = false;
	this.type_move = '';

	/* Cargamos la imgen */
	this.image = new Image();
  this.image.src = 'imagenes/chompersprites.png';

	/* state draw */
	this.state_draw = 0;

	/* coorde draw */
	this.yDraw = 0;

	this.draw = function(){
		GameArea.context.save();
			if(this.state_draw == 0){
				GameArea.context.drawImage(this.image,320,this.yDraw,32,32,this.x*40,this.y*40,35,35);
				this.state_draw = 1;
			}else{
				GameArea.context.drawImage(this.image,320+32,this.yDraw,32,32,this.x*40,this.y*40,35,35);
				this.state_draw = 0;
			}
		GameArea.context.restore();
	}

	/* function hit */
	this.hitObject = function(list){
		/* obstaculos  */
		var hitt = false;
		for(var i = 0;i<list.length;i++){
			var obstaculo = list[i];
			/* coordenadas de los obstaculos y del pacman */
			//-->1.Obtaculo
			var Aobstaculo = {x:obstaculo.x,y:obstaculo.y};
			var Bobstaculo = {x:obstaculo.x+obstaculo.width,y:obstaculo.y};
			var Cobstaculo = {x:obstaculo.x,y:obstaculo.y+obstaculo.height};
			var Dobstaculo = {x:obstaculo.x+obstaculo.width,y:obstaculo.y+obstaculo.height};
			//-->2.Pacman
			var Apac = {x:this.x,y:this.y};
			var Bpac = {x:this.x+this.width,y:this.y};
			var Cpac = {x:this.x,y:this.y+this.height};
			var Dpac = {x:this.x+this.width,y:this.y+this.height};
			
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
		/* comprobamos el golpe */
			if(hitt == true){
				this.move = false;
			}
	}

	/* validamos que no excedemos el area de juego */
	this.hitt_counter = function(){
		var hitt_counter = false;
		if(this.x < 1 || this.x > GameArea.filas){
			hitt_counter = true;
		}else if(this.y < 1 || this.y > GameArea.columnas){
			hitt_counter = true;
		}
		return hitt_counter;
	}

	/* actualizamos la posicion */
	this.new_position = function (){
		this.x += this.speed_x;
		this.y += this.speed_y;
	}

	/* reset position */
	this.reset_speed = function(){
		this.speed_x = 0;
		this.speed_y = 0;
	}

	/* comprobamos si nos comemos un coco */	
	this.eat_doit = function(list_cocos){
		/* cocos  */
		var eat = false;
		for(var i=0;i<list_cocos.length;i++){
			var coco = list_cocos[i];
			//--->1.Pacman
			var Apac = {x:this.x,y:this.y};
			var Bpac = {x:this.x+this.width,y:this.y};
			var Cpac = {x:this.x,y:this.y+this.height};
			var Dpac = {x:this.x+this.width,y:this.y+this.height};
			/*
				comprobamos que el coco este dentro de 
				las coordenadas de nuestro pacman
			 */
			if (coco.x+0.5 > Apac.x && coco.x+0.5 < Bpac.x && 
				coco.y+0.5 > Apac.y && coco.y+0.5 < Cpac.y ){
					list_cocos.splice(i,1);
					eat = true
					GameArea.score = GameArea.score +4 ;
				/* tenemos que pasar el marcador */
					break;
			}
		}
		return eat;
	}

	/* sumamos n pasos a la poscion de pacman */
	this.add_steps = function(){
		if(this.speed_x != 0 || this.speed_y != 0){
			if(this.type_move == 'y_pos' || this.type_move == "y_neg" ){
				this.pasos += this.speed_y;
			}else{
				this.pasos += this.speed_x;
			}
		}
	}

	/* actualizamos la posicion en el mapa */
	this.new_path = function(){
		/* 
			if(this.pasos == 1 || this.pasos == -1)
			valiamos el nuevo punto en el que estara el pacman el map 
		*/
		if(this.x_map < 22 && this.x_map >= 0){
			if(this.y_map < 19 && this.y_map >= 0){
				if(this.type_move == 'y_pos'){
					this.y_map += 1;	
				}else if(this.type_move == 'x_pos'){
					this.x_map += 1;
				}else if(this.type_move == 'y_neg'){
					this.y_map -= 1;
				}else{
					this.x_map -= 1;
				}
			this.pasos = 0;
			this.new_pos = true;	
			}
		}
	}

	/* Restablecemos los valores anteriores */
	this.reset = function(){
		if(this.type_move == 'y_pos'){
			this.y -= this.speed_y; ///
		}else if(this.type_move == "y_neg" ){
			this.y -= this.speed_y;
		}else if(this.type_move == 'x_pos'){
			this.x -= this.speed_x;//
		}else{
			this.x -= this.speed_x;
		}
		this.move = true;
	}
}

/* funcion para los fantasmas para del juego. */
function Ghost(x_map,y_map,name,speed,initMoment){
	this.speed = speed;
	this.initMoment = initMoment;
	this.x = x_map;
	this.y = y_map;
	this.x_map = x_map;
	this.y_map = y_map;
	this.width = 1;
	this.height = 1;
	this.name = name;
	this.cuad_static = {x:0,y:0};
	this.move = false;
	this.result = [];
	this.image = new Image();
  this.image.src = 'imagenes/chompersprites.png';
  this.state_draw = 1;
  /* solo instanciar el movimiento */
  this.flag = 1;
  this.interval;

  /* funcion para iniciar el fantasma */
  this.init = function(score,stateArea){
  	if(score == this.initMoment && !this.move){
			this.x_map =11;
			this.y_map =7;
			this.move = true;
			/**/
			this.flag = 0;
  	}
  }

  /* dibujamos cada uno de los fantasmas */
	this.draw = function(){
		GameArea.context.save();
		if(this.name == 'blinky'){
		/* fantasma rojo */
			if(this.state_draw == 0){
				GameArea.context.drawImage(this.image,0,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}else{
				GameArea.context.drawImage(this.image,32,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}
				
		}else if(this.name == 'clyde'){
		/* fantasma rosa */
			if(this.state_draw == 0){
				GameArea.context.drawImage(this.image,64,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}else{
				GameArea.context.drawImage(this.image,94,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}
				
		}else if(this.name == 'inky'){
			if(this.state_draw == 0){
				GameArea.context.drawImage(this.image,192,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}else{
				GameArea.context.drawImage(this.image,222,0,32,32,this.x_map*40,this.y_map*40,35,35);	
			}

		}else if(this.name == 'speedy'){
			if(this.state_draw == 0){
				GameArea.context.drawImage(this.image,128,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}else{
				GameArea.context.drawImage(this.image,160,0,32,32,this.x_map*40,this.y_map*40,35,35);
			}
		}
		this.state_draw = ( this.state_draw === 1 ) ? 0 : 1;
		GameArea.context.restore();
	}

	/* Calculamos la posicion hacia el pacman */
	this.new_path = function(graph,pacman_x,pacman_y,direccion){
		var start = graph.grid[this.x_map][this.y_map];
		if(this.name == 'blinky'){
			var end = graph.grid[pacman_x][pacman_y];
		}else if(this.name == 'speedy'){
			if(pacman_x+4 < 21 && direccion == 'x_pos'){
				pacman_x += 4;
			}else if(pacman_x-4 > 0 && direccion == 'x_neg'){
				pacman_x -= 4;
			}else if(pacman_y+4 < 19 && direccion == 'y_pos'){
				pacman_y += 4;
			}else if(pacman_y-4 > 0 && direccion == 'y_neg'){
				pacman_y -= 4;
			}
			var end = graph.grid[pacman_x][pacman_y];
		}else if (this.name == 'clyde'){
			var end = graph.grid[pacman_x][pacman_y];
			this.result = astar.search(graph,start,end,false);
			if(this.result.length < 8){
				var end = graph.grid[this.cuad_static.x][this.cuad_static.y];	
			}
		}
		this.result = astar.search(graph,start,end,false);
		console.log(this.result)
	}

}

/**********************************************
		FUNCIONES AUXILIARES
***********************************************/

/* funcion de inicio del juego  */
function loadGame(){
	GameArea.start();
	GameArea.addEvent();
	updateGameArea();
}

/* funcion que funciona como cronometro OK */   
function CronoTime(){
	var auxSecond = GameArea.seconds;
	var auxMin =  GameArea.min;
	var auxHora =  GameArea.horas;

	/* funcion para dibujar el cronometro OK */	
	if(GameArea.start_crono){	

		GameArea.seconds += 1;
		if(auxSecond < 10){
			auxSecond = '0'+GameArea.seconds;
		}else{
			auxSecond = GameArea.seconds;
		}

		if(GameArea.seconds > 59){
			GameArea.min += 1;
			GameArea.seconds = 0;
		}

		if(auxMin< 10){
				auxMin = '0'+GameArea.min; 
		}else{
				auxMin = GameArea.min;
		}


		if(GameArea.min > 59){
			GameArea.horas += 1;
			GameArea.min = 0;
		}

		if(auxHora < 10){
				auxHora = '0'+GameArea.horas; 
			}else{
				auxHora = GameArea.horas;
			}
	}
	GameArea.time = auxHora+':'+auxMin+':'+auxSecond;
	setTimeout(CronoTime,1000)	
}

/* funcion para los fantasmas inicio a varias velocidades OK */
function nexStepGhost(ghost){
		ghost.flag = 1;
		if(ghost.result.length > 0){
			ghost.x = ghost.result[0].x;
			ghost.y = ghost.result[0].y;
			ghost.x_map = ghost.result[0].x;
			ghost.y_map = ghost.result[0].y;
			ghost.result.splice(0,1);
		}
		ghost.interval = setTimeout(
			function(){
				nexStepGhost(ghost)
		},ghost.speed);
}

 /* limpiamos el intervalor  OK */
function clearIntervalGhost(){
	for (var i = 0; i < list_Ghost.length; i++) {
		clearInterval(list_Ghost[i].interval);
		list_Ghost[i].flag = 0;
	}
}

/* Añadimos un evento del teclado  OK */
function NextPosPacman(e){
	if(e.code == 'ArrowDown'){
		Pac.speed_x = 0;
		Pac.speed_y = 0.5;
		Pac.type_move = 'y_pos';
		Pac.yDraw = 32;
	
	}else if(e.code == 'ArrowUp'){
		Pac.speed_x = 0;
		Pac.speed_y = -0.5;
		Pac.type_move = 'y_neg';
		Pac.yDraw = 96;
		
	}else if(e.code == 'ArrowRight'){
		Pac.speed_x = 0.5;
		Pac.speed_y = 0;
		Pac.type_move = 'x_pos';
		Pac.yDraw = 0;
	
	}else if (e.code == 'ArrowLeft'){
		Pac.speed_x = -0.5;
		Pac.speed_y = 0;
		Pac.type_move = 'x_neg';
		Pac.yDraw = 64;
	}

	/*
		añadimos dos tipos deeventos mas
		pausa y reaunudacion 
	*/
	if(e.code == 'KeyP'){
		//GameArea.text = 'Pause';
		start_crono = false;
		GameArea.AudioGame.pause();
		GameArea.stop();
		/* intevlo de conteo fantasmas */
		clearIntervalGhost();
		GameArea.pause_game();
		
	}else if(e.code == 'KeyL'){
		GameArea.state = 1;
		GameArea.start_crono = true;
		CronoTime();
		/*if(GameArea.state == 0){
			CronoTime();
			GameArea.state = 1;
		}else{
			start_crono = true;
		}*/
		GameArea.interval =  setInterval(updateGameArea, 100);
		//setIntervalGhost();
		//Ghost.interval = setTimeout(nextG,300);
	}
}

/* Guardar informacion del usuario */
function PosMouseClick(evt){
	/* evento del teclado */
	GameArea.canvas.addEventListener('click',function(evt){
		var coor_mouse = valor_mouse_real(evt,GameArea.canvas);
		if(coor_mouse.x > GameArea.canvas.width/2-(4*40) && coor_mouse.x < GameArea.canvas.width/2+(4*40)){
			if(coor_mouse.y > 13*40 && coor_mouse.y < 14.5*40){
				console.log('Tenemos que guardar el score');
				/* save localStorage */
				localStorage.setItem("lastname", "Smith");
				/* get localStorage */
				localStorage.getItem("lastname");
			}
		}
	});
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

/* Funcion para obtener el las coordenadas del raton */

function valor_mouse_real(event,canvas){
  var rect = canvas.getBoundingClientRect();
  var coordenada = {};
  coordenada.x = event.clientX - rect.left;
  coordenada.y  = event.clientY - rect.top;
  return  coordenada;
}
