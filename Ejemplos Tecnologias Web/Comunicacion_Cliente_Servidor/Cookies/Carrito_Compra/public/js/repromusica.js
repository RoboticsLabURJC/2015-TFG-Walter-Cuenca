    var canvas;
    var context;
    var imageObj = new Image();
    imageObj.onload = function(){
        canvas = document.getElementById('canvasmusic');
        console.log(canvas);
        context = canvas.getContext('2d');
        console.log(context);
        context.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
        canvas.addEventListener('click',repro,true);
        canvas.addEventListener('mouseover',drawcontrols,true);
        canvas.addEventListener('mouseout',nodrawcontrols,true);
      };
    imageObj.src = 'http://localhost:3000/audio/Portada2.jpg';
  

    function nodrawcontrols(){
      context.translate(0,0);
      context.drawImage(imageObj, 0, 0,canvas.width,canvas.height);
    }


    function drawcontrols(){
      var audio = document.getElementById('septimo');
      if(audio.paused){
        drawplay();
      }else{
        drawpause();
      }
    }


    function drawpause(){
      context.fillStyle = 'white';
      context.save();
        context.translate(canvas.width/2-10, canvas.height/2-25);
        context.beginPath();
          context.fillRect(0,0,10,50);
          context.fillRect(20,0,10,50);
        context.closePath();
      context.restore();
    }

  function drawplay(){
    context.fillStyle = 'white';
    context.save();
      context.translate(canvas.width/2-10, canvas.height/2-25);
      context.beginPath();
        context.moveTo(0,0);
        context.lineTo(0,50);
        context.lineTo(43,25);
        context.lineTo(0,0);
        context.fill();
        context.stroke();
      context.closePath();
    context.restore();

    }


    function repro(){
      var audio = document.getElementById('septimo');
      if(audio.paused){
        audio.play();
      }else{
        audio.pause();
      }
    }