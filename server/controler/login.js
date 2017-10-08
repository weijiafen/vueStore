// var User=require('../modules/resume/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req,response){
	result={
		status:0
	}
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))