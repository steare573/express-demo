
$(function(){
    $('#leave-chat').hide();
    var primus = Primus.connect('http://localhost:2000');
    primus.on('open', function () {
      
      
      primus.on('update-chat', function (username, data) {
        
        $('#conversation').append('<b>' + username + ':</b> ' + data + '<br />');
      });

      primus.on('update-users', function (users) {
        $('#users').empty();
        $.each(users, function (key, val) {
          $('#users').append('<div>' + key + '</div>');
        });
      });
      
      $('#enter-chat').click(function (){
        primus.send('add-user', $('#username').val());
        $('#username').attr('disabled', true);
        $(this).hide();
        $('#leave-chat').show();
      });

      $('#send').click(function(){
        primus.send('send-message', $('#data').val());
      });

      $('#leave-chat').click(function(){
        primus.send('remove-user', $('#username').val());
        $('#username').attr('disabled', false).val('');
        $(this).hide();
        $('#enter-chat').show();
      });

    });
  });
  
