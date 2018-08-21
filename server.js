// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

var maze = require('./js/maze.js');
var walls = maze.getWalls();

var players = {};

// WebSocket handlers
io.on('connection', function (socket) {
    socket.on('new player', function () {
        console.log('A new player has connected! ID: ' + socket.id);

        socket.emit('walls', walls);
        socket.emit('cat start', maze.getCatPosition());
        socket.emit('mouse start', maze.getMousePosition());
    });

    socket.on('player', function (data) {
        players[socket.id] = {
            id: socket.id,
            data: data
        };

        socket.broadcast.emit('player', players[socket.id]);
    });

    socket.on('disconnect', function () {
        console.log('A player has disconnected! ID: ' + socket.id);

        delete players[socket.id];

        io.sockets.emit('bye bye player', socket.id);
    });
});