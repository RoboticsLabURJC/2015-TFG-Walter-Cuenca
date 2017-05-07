/* Modulo del fantamas */
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




/* Jugadores */
var player1 = {'x':5,'y':15,'typePacman':1,numPasos:0};
var player2 = {'x':11,'y':3,'typePacman':2,numPasos:0};
/*  */

var list_user=[];
var name_room = 'hallGame';

/* Cronometro */
var seconds = 0;
var min = 0;
var horas = 0;
var time = '00'+':'+'00'+':'+'00';
var _timer;

var list_cocos = [
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
];

var list_obstaculos = [
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
];

// ancho de cada cuadrado
var properGame={
	'wCuad':40,
	'hCuad':40, 
	'nColum':18,
	'nFila':19,
}

var shape_1 = [
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
	];

var shape_2 = [
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
	];

/* intervalo de refresco */
var frameInterval = 100;


/* variable info 2 user */


/* exports */


function Player(x,y,typePacman,xGhost,yGhost){
	this.info= {
		'x':x,
		'y':y,
		'typePacman':typePacman,
		'numPasos':0,
		'fantasma': {
			'x':xGhost,
			'y':yGhost,
		},
	};
	this.path = [];
}

module.exports = {
	/*estaticos no cambian a lo largo del problema */
	'map':map,
	'shape_1':shape_1,
	'shape_2':shape_2,
	'properGame':properGame,
	'list_obstaculos':list_obstaculos,
	'list_cocos':list_cocos,
	'name_room':name_room,
	'_timer;':_timer,
	'seconds':seconds,
	'min':min,
	'horas':horas,
	'time':time,
	'Player':Player
}