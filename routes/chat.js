module.exports = function (req, res) {
  var filePath = '/Users/steare/libs/express-demo/views/primusChat.html';
  console.log(filePath);
  res.sendfile(filePath);
};