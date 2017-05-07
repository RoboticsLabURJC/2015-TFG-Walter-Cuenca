var coordenadas;
var pointers = [];
var markers =[];
var map;
  
/* Script para crear la localizacion del espectaculo */
  
$(document).ready(function(){
  /* obtenemos la direccion del evento */
  var v_direct = $('#direct').text();
  var direct = v_direct.split(":")[1];
  console.log('>>>Realizamos la peticion ajax');
  console.log('url:/WebMutimedia/WebServRequest/');
  console.log('data:'+direct);
  $.ajax({ 
    type: "POST",
    url:"/WebMutimedia/WebServRequest/",
    data: {
      'site' : direct,
      'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: searchSucess,
    dataType: 'html',
  });
});

 
function searchSucess(data, textStatus, jqXHR){
  console.log('>>>Obtenemos respuesta:')
  console.log(data)
  var infoRequest = JSON.parse(data);
  coordenadas = infoRequest.results[0].geometry.location;
  console.log('>>>Seleccionamos las coordenas del lugar')
  console.log('Coord:'+coordenadas),
  WarchMap();  
}

function WarchMap(){
  var lat = parseFloat(coordenadas.lat);
  var long = parseFloat(coordenadas.lng);
  var mapProp = {
    center:new google.maps.LatLng(lat,long),
    zoom:15,
    //mapTypeId:google.maps.MapTypeId.ROADMAP,
  };
  
  map=new google.maps.Map(document.getElementById("Maps"),mapProp);

  var marker = new google.maps.Marker({
    position: {lat:parseFloat(coordenadas.lat),lng:parseFloat(coordenadas.lng)},
    draggable: true,
    animation: google.maps.Animation.BOUNCE,
    map: map,
    title: 'Double Click to zoom'
  });
}
  
/* funcion para enviar una peticion de servicios auxiliares */
  
function SendInfo(typeService){
  var infoSite = 'location='+parseFloat(coordenadas.lat)+','+parseFloat(coordenadas.lng)+'&radius=500&types='+typeService
  console.log('info: '+infoSite);
  console.log('>>>Realizamos la peticion ajax');
  console.log('url:/WebMutimedia/WebServInfoSite/');
  console.log('infoSite:'+infoSite);
  $.ajax({ 
    type: "POST",
    url:"/WebMutimedia/WebServInfoSite/",
    data: {
      'infoSite' : infoSite,
      'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: viewInfoSite,
    dataType: 'html',
  });
}

/* funcion para presentar la respuesta de la info del site */
function viewInfoSite(data, textStatus, jqXHR){
  console.log('>>>Obtenemos respuesta:');
  console.log(data);
  var infoRequest = JSON.parse(data);
  for (var i = 0; i < infoRequest.results.length; i++) {
    var resultados = infoRequest.results[i];
    var coord = resultados.geometry.location;
    var name = resultados.name;
    var point = {'coord':coord,'name':name};
    pointers.push(point);
  }
  console.log('>>>Obtenemos las coordenadas de los lugares cercanos:');
  console.log(pointers);
  console.log('>>>Dibujamos un marcador en cada coordenada.');
  for (var i = 0; i < pointers.length; i++) {
    var point = pointers[i];
    console.log(point);
    /* creamos un marcador */
    var marker = new google.maps.Marker({
      position: {lat:parseFloat(point.coord.lat),lng:parseFloat(point.coord.lng)},
      draggable: true,
      map: map,
      title: point.name,
    });
    markers.push(marker);
  }
}
