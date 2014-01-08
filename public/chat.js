
var messages = [];
var socket = socketio.connect('http://localhost:3000');
var field = document.getElementById('field');
var sendButton = document.getElementById('send');
var content = document.getElementById('content');

socket.on('message', function (data) {
  if (data.message) {
    messages.push(data.message);
    var html = '';
    for (var i = 0; i < messages.length; i++) {
      html += messages[i] + '<br />';

    }
    content.innerHTML = html;
  } else {
    console.log('Error on message: ', data);
  }

  sendButton.onclick = function () {
    socket.emit('send', {message: field.value});
  };
});
