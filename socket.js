var express = require('express');
var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
app.use(express.static('static',{maxAge:36000000}));
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile('test.html');
  
});
global.sockets={};
io.sockets.on('connection', function (socket) {
	var shopId=socket.handshake.query.shopId
	console.log(shopId)
	global.sockets[shopId]=socket
  	socket.emit('news', { hello: 'world' });
  	socket.on('my other event', function (data) {
    	console.log(data);
  	});
});