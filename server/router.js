process.setMaxListeners(0)
var session = require('express-session');
var fs=require('fs');
var path = require('path');
var bodyParser=require('body-parser')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var login=require('./controler/login.js');
var captcha=require('./controler/captcha')
module.exports=function(app){
	//app是一个express()
	app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
	app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	  extended: true
	}));
	app.use(session({
	    secret: 'hubwiz app', //secret的值建议使用随机字符串
	    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
	    resave:true		//在操作的时候重新设置session。顺延登录时间
	}));
	app.post('/user/login',function(req,res){
		login(req,res);
	})
	//获取验证码
	app.get('/captcha',function(req,res){
		captcha(req,res);
	})
}