var express = require('express');
var app = express();
var helloHandler = require('./routes/hello');

var socketio = require('socket.io');
var port = 3000;
var users = {};
app
  .get('/', function (req, res) {
    res.end('Hello World');
  })
  .get('/hello', helloHandler)
  .get('/testing', function (req, res) {
   
    var filePath = __dirname + '/views/test.html';
    console.log(filePath);
    res.sendfile(filePath);
  });
  
app.use(express.static(__dirname + '/public'));
socketio = socketio.listen(app.listen(port));


socketio.sockets.on('connection', function (socket) {
  socket.on('sendchat', function (data) {
    socketio.sockets.emit('updatechat', socket.username, data);
  });

  socket.on('adduser', function (data) {
    socket.username = data;
    users[data] = data;
    socket.emit('updatechat', 'SERVER', data + ' has connected to chat');
    socket.broadcast.emit('updatechat', 'SERVER',
     data + ' has connected to the chat');
    socketio.sockets.emit('updateusers', users);
  });
  socket.on('disconnect', function () {
    delete users[socket.username];
    socketio.sockets.emit('updateusers', users);
    socket.broadcast.emit('updatechat',
      'SERVER', socket.username + ' has disconnected');
  });
});
