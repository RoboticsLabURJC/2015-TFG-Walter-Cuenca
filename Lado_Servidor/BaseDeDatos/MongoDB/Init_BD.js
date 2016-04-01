var mongodb = require('mongodb');

////////////////////////////////////
/// Establecer conecccion con BD ///
////////////////////////////////////

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var collection;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';


// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    collection=db.collection("mycollection");
    console.log('Connection established to', url);

    var palabra = {name: "cantante", valor: ["Persona que canta por profesión"]};
	var palabra1 = {name: "cantina", valor: ["Establecimiento público que forma parte de una instalación más amplia y en el que se venden bebidas y algunos comestibles."]};
	var palabra2 = {name: "antebrazo", valor: ["Parte del brazo desde el codo hasta la muñeca."]};
	var palabra3 = {name: "antagonista", valor: ["Personaje que se opone al protagonista en el conflicto esencial de una obra de ficción."]};
	var palabra4 = {name: "perro", valor: ["Mamífero doméstico de la familia de los cánidos, de tamaño, forma y pelaje muy diversos, según las raza."]};
	var palabra5 = {name: "pera", valor: ["Fruto del peral."]};
	var palabra6 = {name: "beato", valor: ["Dicho de una persona: Beatificada por el papa."]};
	var palabra7 = {name: "rap", valor: ["Estilo musical de origen afroamericano en que, con un ritmo sincopado, la letra, de carácter provocador."]};

	collection.insert([palabra,palabra1,palabra2,palabra3,palabra4,palabra5,palabra6,palabra7]);
	db.close();
    }
});


