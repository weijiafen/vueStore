var express = require('express');
var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
app.use(express.static('static',{maxAge:36000000}));
server.listen(8088);

app.get('/', function (req, res) {
  res.sendfile('test.html');
  
});
global.sockets={};
io.sockets.on('connection', function (socket) {
	var shopId=socket.handshake.query.shopId
  socket.shopId=shopId;
	console.log('connection')
	global.sockets[shopId]=socket
  	socket.emit('news', { hello: 'world' });
  	socket.on('my other event', function (data) {
    	console.log(data);
  	});
  	socket.on('disconnect', function (data) {
    	console.log(socket.shopId);
  	});
});