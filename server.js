var express = require('express');
var app = express();
var fs=require('fs');
var router=require('./server/router.js');
app.use(express.static('dist',{maxAge:36000000}));
// app.use(express.static('upload',{maxAge:36000000}));
router(app);
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
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});