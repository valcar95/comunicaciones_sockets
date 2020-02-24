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
        user.sendUTF( JSON.stringify({ type:'joined', data: {gameId} }));
        game.user1.sendUTF( JSON.stringify({ type:'opponent-joined', data: {gameId} }));
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

function setGameData(gameId, gameData){
    let game=games.find(x=>x.id==gameId);
    if(game){
        game.data=gameData;
        game.user2.sendUTF( JSON.stringify({ type:'receive-game-data', data: {gameId,gameData} }));
    }
}

function userKeyPress(data,user){
    let game=games.find(x=>x.id==data.gameId);
    if(game && (game.user1==user || game.user2==user)){
        if(user==game.user1){
            game.user2.sendUTF( JSON.stringify({ type:'keypress-user1', data: {key:data.keyValue} }));
        }
        else{
            game.user1.sendUTF( JSON.stringify({ type:'keypress-user2', data: {key:data.keyValue} }));
        }
    }
}

function userKeyUp(data,user){
    let game=games.find(x=>x.id==data.gameId);
    if(game && (game.user1==user || game.user2==user)){
        if(user==game.user1){
            game.user2.sendUTF( JSON.stringify({ type:'keyup-user1', data: {key:data.keyValue} }));
        }
        else{
            game.user1.sendUTF( JSON.stringify({ type:'keyup-user2', data: {key:data.keyValue} }));
        }
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
        if(json.type=="set-game-data"){
            setGameData(json.gameId,json.gameData);
        }
        if(json.type=="notify-key-press"){
            userKeyPress(json.data,connection);
        }
        if(json.type=="notify-key-up"){
            userKeyUp(json.data,connection);
        }
    } catch (error) {
        
    }
  });

  // user disconnected
  connection.on('close', function(c) {
    removeUserGames(connection);
  });
});