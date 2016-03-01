var user;
var contador;
console.log(document.cookie);
  
///////////////////////////////////////////////
/// Buscamos usuario para darle el contenido //
///////////////////////////////////////////////
      
function SeekUser(){
	console.log("==========================");
	console.log("=== Buscamos info user ===");
	console.log("==========================");
  user = document.getElementById("name_user").value;
  var existe = getCookie(user);
  console.log("-->>> Buscamos contenido de "+user+"= "+JSON.parse(existe));
  if(existe != null){
    View_Car(existe);
  }else{
    View_Car(existe);
  }
}
      
      ///////////////////////////////////////////////
      /// Añadiamos el nuevo producto al contenido //
      ///////////////////////////////////////////////
      
    function Añadir(id){
      	console.log("=======================================");
      	console.log("=== Se añade un producto al carrito ===");
      	console.log("=======================================");
        var elemento = document.getElementById(id);
        var compra = {producto:elemento.src,cantidad:'1'};
        ///buscamos si existe el usuaario con el contenido
        var existe = getCookie(user);
        console.log("-->>> Buscamos contenido de "+user+"= "+JSON.parse(existe));
        if(existe != null){
	       	old_item = JSON.parse(existe);
	        var carrito = old_item.carrito;
	        carrito.push({compra:compra});
	        old_item = {carrito:carrito};
	        console.log("-->>> Se añadio el nuevo elemento: "+JSON.stringify(old_item));
	        console.log(old_item);
	        setCokie(user,old_item);
        }else{
        	var obj = {compra:compra};
	        var list =[obj];
	        var car = {carrito:list};
	        console.log("-->>> Añadimos primer producto: "+ compra.libro);
	        setCokie(user,car);
	        console.log(obj);
        }
    }

    function View_Car(existe){
    	var p = "vacio";
        console.log("=======================");
        console.log("===Contenido Carrito===");
        console.log("=======================");
        $('#elementos').remove('li');
        if(existe != null){
          var old_item = JSON.parse(existe);
          var carrito = old_item.carrito;
          for(var i=0;i < carrito.length;i++){
	      	  var compra = carrito[i].compra;
            var producto = compra.producto.split('/').slice(-1);
            console.log(producto);
	      	  $('#elementos').append('<li><strong>producto:'+producto+';Unidades:'+compra.cantidad+'</strong></li>');
          }
          console.log(p);
        }else{
          $('#elementos').append('<li><strong>El carrito esta:'+p+'</strong></li>');
        }
    }
      
    /////////////////////////////////////////////////
    /// Funciones que me permiten tratar la cookie //
    ////////////////////////////////////////////////
    function getCookie(name){
        var cname = name + "=";               
        var dc = document.cookie;             
        if (dc.length > 0) {              
        	begin = dc.indexOf(cname);       
            if (begin != -1) {           
            	begin += cname.length;       
            	end = dc.indexOf(";", begin);
            	if (end == -1) end = dc.length;
            		return unescape(dc.substring(begin, end));
            	} 
          	}
        return null;
    }
      
    function setCokie(name,compra){
      document.cookie = name + "=" + JSON.stringify(compra);
    }