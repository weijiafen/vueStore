var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var fs=require('fs');
var router=require('./server/router.js');
app.use(express.static('dist',{maxAge:36000000}));
app.use(express.static('upload',{maxAge:36000000}));
server.listen(8080);
router(app);
// app.use('/upload/file', express.static('upload/file'));
app.get('/', function (req, res) {
		fs.readFile('dist/manager.html',function(err,data){
			if(err){
				res.end('404');
			}
			else{
				res.end(data.toString());
			}
	})
})
app.get('/custom', function (req, res) {
		fs.readFile('dist/custom.html',function(err,data){
			if(err){
				res.end('404');
			}
			else{
				res.end(data.toString());
			}
	})
})
global.sockets={};
io.sockets.on('connection', function (socket) {
	var shopId=socket.handshake.query.shopId
	console.log('connection')
	global.sockets[shopId]=socket
  	socket.emit('news', { hello: 'world' });
  	socket.on('my other event', function (data) {
    	console.log(data);
  	});
  	socket.on('disconnect', function (data) {
    	console.log('server disconnect');
  	});
});