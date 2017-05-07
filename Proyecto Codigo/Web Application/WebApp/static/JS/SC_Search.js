 /*
  * Script con funcionalidad busqueda
 */ 
function sendInfo(){
  texto = $('#textSearch').val();
  console.log(texto);
  if(texto.length > 2){
  	AjaxRequest(texto);
  }else{
    $("table#tbSearch").remove();
  }
}

/*  funcion envios Ajax  */
function AjaxRequest(data){
  console.log(data);
  $.ajax({ 
  	type: "POST",
    url:'/WebMutimedia/Search/',
    data: {
      'textRequest' : data,
      'csrfmiddlewaretoken': $("input[name=csrfmiddlewaretoken]").val(),
    },
    success: resulSearch,
    dataType: 'html',
  });
}
	 
function resulSearch(data, textStatus, jqXHR){
	console.log(data);
	$('#listSearch').html(data);
}