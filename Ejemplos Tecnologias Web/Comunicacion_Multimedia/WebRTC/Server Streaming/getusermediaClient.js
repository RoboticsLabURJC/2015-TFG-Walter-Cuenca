/*
*****************************************************************************
*****************************************************************************
** Autor: Walter Cuenca                                                    **
** Descripcion: En esta practica un navegador dara servicios de streaming  **
**								a los navegadores que se conecten.                       **
*****************************************************************************
*****************************************************************************
*/

//*******************************************************************
//*******************************************************************
//******* CODIGO PARA ACCEDER A LOS ELEMENTOS DE AUDIO Y VIDEO ******
//*******************************************************************
//*******************************************************************
var LocalStream;
var my_video = document.querySelector('#localVideo');
var canvas = document.querySelector('#mycanvas');
var streaming = false;
var parametros_media = {video:true,audio:false};
var pc_config = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
var x;
var isInitidor;
var list_Peer = [];
var my_id;
var my_pc;
var id_dest;

/*
	Establecemos la coneccion con el servidor de señalizacion
*/
var name = prompt('Username:');
//http://192.168.43.136:8181
// Connect to signalling server
var socket = io.connect("http://192.168.0.154:8181");

// Send 'Create or join' message to singnalling server
if (name !== '') {
  console.log('Joined room streaming with username:', name);
  socket.emit('stablish_connection',name);
}

/*
********************************************************************
********************************************************************
**	Establecemos el conjunto de eventos para transmistir mensajes **
********************************************************************
********************************************************************
*/
	
socket.on('CreateStream',function(id){
	isInitidor = true;
	//1. Comprobaremos si nuestro navegador soporta WebRTC
	if(hasUserMedia()){
		my_id = id;
		console.log('Recibo mi id:'+my_id);
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia 
													|| navigator.mozGetUserMedia || navigator.msGetUserMedia;
		navigator.getUserMedia(parametros_media,add_items,function(err){});
	}else{
		alert('Este Navegador no soporta getUserMedia')
	}
});

/*
Esto es para todos los usuarios que se conecten para ver el
streaming que se este lanzando
*/
socket.on('JoinStream',function(id){
	console.log('Bienvenido a streaming online');
	console.log('Recibo mi id:'+id)
	my_id = id;
});

/*
Recibimos esto cuando un nuevo usuario se conecta al servidor 
de streaming
*/
socket.on('New_Joined',function(id){
	console.log('Tenemos que guardar el contenido.');
	/*
	Tenemos que crear la oferta para nuestro usuario que se acaba
	de conectar.El id es del nuevo usuario lo guardaremos para poder
	atar la respuesta
	*/
	id_dest = id;
	var RTCPeerConnection = mozRTCPeerConnection;
		//1.Creamos una instancia de RTCPeerConnection
	var pc = new RTCPeerConnection(pc_config,{});
	pc.addStream(LocalStream);
	//2.Enviamos nuestro ice al usuario
	pc.onicecandidate = SendICecandidate;
	//3.enviamos la ofera para establecer la conexion con nuestro nodo.
	pc.createOffer(function(sessionDescription){
		$('#demo').append('<p>Type message:'+sessionDescription.type+'</p>');
		$('#demo').append('<p>Contenido message:'+sessionDescription.sdp+'</p>');
		pc.setLocalDescription(sessionDescription);
		//--->enviamos la oferta para establecer el contenido.
		var message = {
			id_origen : my_id,
			id_destino: id,
			msg : sessionDescription
		}
		console.log(message);
		socket.emit('message',message);
		console.log(pc);
	},function(err){},{});
	//4. Añadimos el nuevo Peer a la lista de conexiones
	list_Peer.push({id_peer:id,peer:pc});
	for(var i=0;i<list_Peer.length;i++){
		$('#demo').append('<p>User_id:'+list_Peer[i].id_peer+'</p>');
	}
	$('#demo').append('<p> === Num_user:'+list_Peer.length+'=== </p>');
	console.log(list_Peer);
});

/*
Esto evento es el principal ya que tratara todo el flujo de
session SDP entre navegadores(Recepcion)
*/
socket.on('message',function(message){
	if(message.msg.type == 'offer'){
 		/*
		Añadimos a una session_remota,creamos una 
		respuesta con los datos de la oferta
 		*/
 		id_dest = message.id_origen;
 		console.log('Recibimos una oferta de comunicacion.');
		var RTCPeerConnection = mozRTCPeerConnection;
		//1. Creamos una instancia para contestar a la offerta
		my_pc = new RTCPeerConnection(pc_config,{});
		//2. Añadimos el streaming que llega de la oerta
		my_pc.onaddstream = function(event){
			console.log(event);
			my_video.src = window.URL.createObjectURL(event.stream);
     	my_video.play();
		}
		/*
		3. Obtenemos tenemos nuestro ICEcandidate para enviarlo al nodo
		que emite el streaming
		*/
		my_pc.onicecandidate = function(event){
			console.log(event);
			if(event.candidate){
				var ice = {
					type: 'iceCandidate',
		      label: event.candidate.sdpMLineIndex,
		      id: event.candidate.sdpMid,
		      candidate: event.candidate.candidate
		    };

		    var msg ={
		    	id_origen:my_id,
		    	id_destino:id_dest,
		    	msg:ice
		    }
		    console.log('Envimos un mensaje iceCandidate:');
		    console.log(msg);
				socket.emit('message',msg);
			}
		};
		/*
		4.Tenemos que crear una descripcion de sesion con los datos que nos 
		recibimos y lo añadimos a una descripcion remota
		*/
		my_pc.setRemoteDescription(new RTCSessionDescription(message.msg));
		/*
		5. Creamos una respuesta a la oferta que se guardara en nuestra instancia
			 RTCPeer y sera enviado
		*/
		my_pc.createAnswer(function(sessionDescription){
		 	my_pc.setLocalDescription(sessionDescription);
		 	var msg = {
		 		id_origen:my_id,
		 		id_destino:message.id_origen,
		 		msg:sessionDescription
		 	}
		 	console.log('Enviamos el siguiente msg(contestamos oferta)')
		 	console.log(msg);
		 	socket.emit('message',msg);
		 	},function(err){},{});

		console.log('Contenido crecion RTCPeerconnection(other node)')
		console.log(my_pc);

 	}else if(message.msg.type == 'answer'){
 		/*
		Añadimos a la session_remote peer que nosotros vamos 
		guardamos en nuestro array de liste_peer
 		*/
 		console.log('Recibimos respuesta añadimos descripcion');
 		AddDescription(message.id_origen,message.msg)
 	
 	}else if(message.msg.type == 'iceCandidate'){
 		/*
 		Creamos una instancia del Icecandidate
 		que recibimos
 		*/
 		console.log('Recibimos una ice_candidate:');
 		console.log(message); 
		var candidate = new RTCIceCandidate({sdpMLineIndex:message.msg.label,
	      candidate:message.msg.candidate});
		if(list_Peer.length == 0){
				my_pc.addIceCandidate(candidate);
			}else{
				AddIce_peer(message.id_origen,candidate)
			}
 	}
});

/*
************************************************************
************************************************************
**	Funciones auxiliares que se utilizaran en la conexion **
************************************************************
************************************************************
*/
function SendICecandidate(event){
	console.log(event);
	if(event.candidate){
		var ice = {
			type: 'iceCandidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    };

    var msg ={
    	id_origen:my_id,
    	id_destino:id_dest,
    	msg:ice
    }
    //enviamos el mensaje
    console.log('Envimos un mensaje iceCandidate:');
    console.log(msg);
		socket.emit('message',msg);
	}
}

/*
 Nos permite sabe en que peer tenemos que añadir el 
 IceCandidate que recibimos ya que podemos tener n nodos
 conectados.
*/
function AddIce_peer(id,candidate){
	for(var i=0;i<list_Peer.length;i++){
		var elemento = list_Peer[i];
		if(elemento.id_peer == id){
			console.log(elemento.id_peer);
			console.log('Se añade el ICEcandidate con exito')
			elemento.peer.addIceCandidate(candidate);
		}
	}
}

/*
 Nos permite saber que nodo nos envia la la respuesta a la offerta
 y asi poder añadirlo a nuestra remote descripcion .
*/
function AddDescription(id,msg){
	for(var i=0;i<list_Peer.length;i++){
		var elemento = list_Peer[i];
		if(elemento.id_peer == id){
			console.log(elemento.id_peer);
			console.log('Se añade el Descripcion con exito')
			elemento.peer.setRemoteDescription(new RTCSessionDescription(msg));
		}
	}
}

function hasUserMedia() { 
 return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

/*
	Nos permite que el nodo principal conecte su camara y el audio del 
	navegador
*/
function add_items(stream){
 	LocalStream = stream;
 	my_video.src = window.URL.createObjectURL(stream);
 	$('#demo').append('<p>Video:'+parametros_media.video+',Audio:'+parametros_media.audio+'</p>');
 	streaming = true;
}

/*
Funcion con el que podemos parar o reproducir el contenido del 
video
*/
function Control_video(){
	//evaluamos en que estado estamos btn-primary
	if(my_video.paused == true){
		my_video.play();
	}else{
		my_video.pause();
	}
}

//*******************************************************
//*******************************************************
//******* CODIGO PARA EL SERVIDOR ICE: STUN Y SUNT ******
//*******************************************************
//*******************************************************

