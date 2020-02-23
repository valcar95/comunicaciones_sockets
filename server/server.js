"use strict";
process.title = 'warjs udea';
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');


function notifyAllGames(fromUser){
    let users=clients;
    if(fromUser){
        users=clients.filter(x=>x!=fromUser);
    }
    users.forEach(x=>{
        notifyGamesToUser(x);
    }); 
}

function notifyGamesToUser(user){
    let avalaibleGames=games.filter(x=>!x.user2 && x.user1!=user);
    user.sendUTF(JSON.stringify({ type: 'avalaible-games', data: avalaibleGames.map(x=>x.id)} ));
}


function initGame(user){
    let newGame={
        id:gameId,
        user1:user,
        user2:null
    }
    if(!games.some(x=>x.user1==user)){
        games.push(newGame);
        gameId++;
        user.sendUTF( JSON.stringify({ type:'game-created', data: true }));
    }
    notifyAllGames(user);
}

function joinGame(gameId,user){
    let game=games.find(x=>x.id==gameId);
    if(game && !game.user2){
        game.user2=user;
        notifyAllGames();
        user.sendUTF( JSON.stringify({ type:'joined', data: true }));
        game.user1.sendUTF( JSON.stringify({ type:'opponent-joined', data: true }));
    }
    else{
        user.sendUTF( JSON.stringify({ type:'game-not-valid', data: true }));
    }
}

function removeUserGames(user){
    let userGames=games.filter(x=>x.user1==user || x.user2==user);
    let opponents=userGames.map(x=>{
        if(x.user1==user){
            return x.user2;
        }
        return x.user1;
    });
    opponents.forEach(x=>{
        if(x && x.sendUTF){
            x.sendUTF( JSON.stringify({ type:'game-left', data: true }));
        }
    });
    userGames.forEach(x=>{
        removeGame(x);
    });
    notifyAllGames();
}

function removeGame(game){
    let index=games.indexOf(game);
    if(index!=-1){
        games.splice(index,1);
    }
}

var clients = [ ];
var games=[];
var gameId=1;

var server = http.createServer(function(request, response) {
 
});

server.listen(webSocketsServerPort, function() {});

var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {
  
  var connection = request.accept(null, request.origin); 
  clients.push(connection);
  notifyGamesToUser(connection);
  
  // user sent some message
  connection.on('message', function(message) {
    try {
        let json=JSON.parse(message.utf8Data);
        if(json.type=="init-game"){
            initGame(connection);
        }
        if(json.type=="join-game"){
            joinGame(json.gameId,connection);
        }
    } catch (error) {
        
    }
  });

  // user disconnected
  connection.on('close', function(c) {
    removeUserGames(connection);
  });
});