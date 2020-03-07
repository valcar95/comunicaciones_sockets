var connection;
var serverName="3.224.111.223";
var serverPort="1337";

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
    connection = new WebSocket(`ws://${serverName}:${serverPort}`);
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
        if(json.type=="opponent-joined"){
            initGame(json.data.gameId);
        }
        if(json.type=="receive-game-data"){
          initGame2(json.data.gameId,json.data.gameData);
        }
        
        if(json.type=="update-screen"){
          updateHtml(json.data.userData);
        }
        if(json.type=="opponent-attack"){
          opponentAttack();
        }
        if(json.type=="user-hurted"){
          if(json.data.type==1){
            erirUser1(json.data.shotId);
          }
          else{
            erirUser2(json.data.shotId);
          }
        }
        console.log("mensaje recivido",json);
      } catch (e) {
        console.log('Invalid JSON: ', message.data,e);
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