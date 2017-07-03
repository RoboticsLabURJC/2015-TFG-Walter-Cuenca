
//*******************************************************************
//*******************************************************************
//******* CODIGO PARA ACCEDER A LOS ELEMENTOS DE AUDIO Y VIDEO ******
//*******************************************************************
//*******************************************************************
var LocalStream;
var my_video = document.querySelector('#my');
var canvas = document.querySelector('#mycanvas');
var streaming = false;

//esta funcion comprueba si el navegador soporto alguno de los kits disponibles
function hasUserMedia() { 
 return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

function add_items(stream){
 	LocalStream = stream;
 	my_video.src = window.URL.createObjectURL(stream);
 	streaming = true;
}


if(hasUserMedia()){
	//atamos al navegador el quit correspondiente
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia 
													|| navigator.mozGetUserMedia || navigator.msGetUserMedia;
	//añadimos una ves establecido el kit los elementos que queremos lanzar
	navigator.getUserMedia({video:true,audio:false},add_items,function (err) {});

	document.querySelector('#capture').addEventListener('click', function (event) {
		if(streaming) {
			canvas.width = my_video.clientWidth;
			canvas.height = my_video.clientHeight;
			var context = canvas.getContext('2d');
			context.drawImage(my_video, 0, 0);
		}
	});
}else{
	alert('Este Navegador no soporta getUserMedia')
}


//*******************************************************
//*******************************************************
//******* CODIGO PARA EL SERVIDOR ICE: STUN Y SUNT ******
//*******************************************************
//*******************************************************
//[hardcode] etiqueeta para evaular los cambios


/*pasos para la implementacion de nuestra web 
-------------------------------------------------------
-------------------------------------------------------
	1.primero establecemos nuestro getusermedia para dar permisos de webcam
	2.segundo pasamos a crear nuestro RTCPeerconnection
	3.Buscamos los posibles candidatos ICE encontrados con el obejtivo de poder saltar los NATS 
		y luego mantener una comunicacion.
	4.Empezamos la oferta/respuesta
	5.Establecemoas la conexion entre los navegadores.

	*/
