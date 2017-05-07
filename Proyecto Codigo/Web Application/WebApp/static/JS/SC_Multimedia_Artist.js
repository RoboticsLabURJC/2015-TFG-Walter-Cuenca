
var porcentaje;
var idTable;
var urlAudio;
var timer;
var stado_Old = '';
/* funcion para indicar el pop den los discos  */
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();    
});

/* funcion para crear la lista de reproducccion */
function loadList(elemente,imagen){
	/* Update Imagen */
	$('#ImgRepro').attr('src','/media/'+imagen);
 	/* Clonamos la lista  por medio del div */
 	var idElemento = $(elemente).attr("id");
 	var divListSong = $('#'+idElemento).siblings('div');
 	var idDivListSong = $(divListSong).attr("id");
 	$("table#x").remove();
 	$('#'+idDivListSong).children('table').clone().appendTo($('#x'));
}

function loadSong(name,idElement,urlSong){
	var idTimer = 'timer_'+idElement;
	var state_Actual = 'state_'+idElement;
	var path = '/media/'+urlSong;
	var audio = document.getElementById('repro');

	/* Comprobamos si esta reproduccion */
	if(!audio.paused){
		audio.pause();
		StopDrawProgres();
	}
	/* canccelamos lo anterior */
	if (state_Actual != stado_Old && stado_Old != ''){
		document.getElementById(stado_Old).innerHTML = '';
	}
	audio.src = path;	
	audio.onloadeddata=function() {
		var valor = audio.duration;
		var str_Time = convertSeg_Min(valor);
		document.getElementById(state_Actual).innerHTML = 'Reproduciendo';
		document.getElementById(idTimer).innerHTML = str_Time;
		porcentaje = convert(valor);
		drawProgress(porcentaje);
		audio.play();
		stado_Old = state_Actual;
	}

}

function convertSeg_Min(segundos){
	/* obtenemos lo minutos */
	var v_min = String(segundos/60);
	var value_min = v_min.split('.');
	var min = value_min[0];
	var v_seg = parseFloat('0.'+value_min[1]);
	var seg = String(v_seg*60).split('.')[0];
	return min+':'+seg;
}
 
/* progreso de la cancion  */
function drawProgress(numero){
 	//console.log('number:'+numero);
 	$("#barprogress").attr('style','width:'+numero+'%');
 	var percent = numero+porcentaje;
 	if(percent <= 100){
 		timer = setTimeout(function(){
			drawProgress(percent);
		},1000);
 	}
}

function StopDrawProgres(){
	clearTimeout(timer);
	$("#barprogress").attr('style','width:'+0+'%');
}

/* obtenemos el % de avance segun la duracion total */
function convert(time){
 	var percent = 100/time
 	return percent
}

/* funcion para cargar el video */
function loadVideo(linkFile,typeFile){
	if (typeFile ==  'iframe') {
		$('iframe').attr('src',linkFile);
		$('iframe').show();
		$('video').hide();
	} else {
		var path = '/media/'+linkFile;
 		$('video').attr('src',linkFile);
 		$('iframe').hide();
		$('video').show();
	}	
}
