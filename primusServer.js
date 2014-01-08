var express = require('express');
var app = express();
var Primus = require('primus');
var PrimusEmitter = require('primus-emitter');
var chatHandler = require('./routes/chat.js');
var port = 2000;
var users = {};
app.get('/chat', chatHandler);

var server = app.listen(port, function (err) {
  console.log('Server Listening');
  if (err) {
    console.log('ERROR!!');
  }
});

var primus = new Primus(server, {transformer: 'engine.io', parser: 'json'});

primus.use('emitter', PrimusEmitter);

primus.on('connection', function (spark) {

  spark.on('add-user', function (username) {
   
    console.log('add-user event detected: ' + username);
    spark.username = username;
    users[username] = username;
    console.log(users);
    primus.forEach(function (spark) {
      spark.send('update-chat', 'SERVER', username +
     ' has entered the building').send('update-users', users);
      
    });


  });

  spark.on('remove-user', function (username) {
    console.log('remove-user event detected: ' + username);
    spark.username = undefined;
    delete users[username];
    console.log(users);
    primus.forEach(function (spark) {
      spark.send('update-chat', 'SERVER', username +
     ' has left the building').send('update-users', users);
      
    });

    //primus
  });
  spark.on('send-message', function (message) {
    console.log('send-message event detected' + message);
    primus.forEach(function (spark) {
      spark.send('update-chat', '<b>' + spark.username + '</b>',  message);
    });
  });
  
  console.log('Spark Connected to Primus');

  
});

primus.on('disconnection', function () {
  console.log('Spark Disclonnected to Primus');
});

primus.on('error', function error(err) {
  console.log('ERROR: ' + err.message);

});


