var connection;

function drawGames(gamesArray){
    let html="";
    gamesArray.forEach(x=>{
        html+=`<tr><td>Juego ${x}</td><td><button onclick="joinToGame(${x})">Unirmer</button></td></tr>`;
    });
    $("#games").html(html);
}

$(function () {
    "use strict";

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
   

    if (!window.WebSocket) {
      console.log("Sorry, but your browser doesn\'t support WebSocket.")
      return;
    }
    // open connection
    connection = new WebSocket('ws://127.0.0.1:1337');
    connection.onopen = function () {
      // first we want users to enter their names
      console.log("conexión establecida");
    };
    connection.onerror = function (error) {
     console.log("error en la conexión",error)
    };
    // most important part - incoming messages
    connection.onmessage = function (message) {
      try {
        var json = JSON.parse(message.data);
        if(json.type=="avalaible-games"){
            drawGames(json.data);
        }
        console.log("mensaje recivido",json);
      } catch (e) {
        console.log('Invalid JSON: ', message.data);
        return;
      }
     
    };
    
    setInterval(function() {
      if (connection.readyState !== 1) {
        console.log("error en verificación")
      }
    }, 3000);
    //connection.send(msg);
  });