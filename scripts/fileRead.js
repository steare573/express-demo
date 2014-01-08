//var express = require('express');
var fs = require('fs');



var fileData = fs.readFile('../resource/file/readTest.txt',
 function (err, data) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }

  console.log('CallBack Data = ' + data);
});
console.log('Out of Callback Data = ' + fileData);
console.log('sync = ' + fs.readFileSync('../resource/file/readTest.txt'));