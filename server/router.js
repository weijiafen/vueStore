process.setMaxListeners(0)
var session = require('express-session');
var fs=require('fs');
var path = require('path');
var bodyParser=require('body-parser')
var captcha=require('./controler/captcha');
var login=require('./controler/login.js');
var category=require('./controler/category.js');
var goods=require('./controler/goods.js');

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
	//获取菜单
	app.get('/shop/categories',function(req,res){
		category('get',req,res);
	})
	//新增菜单
	app.post('/shop/categories',function(req,res){
		category('post',req,res);
	})
	//修改菜单
	app.put('/shop/categories',function(req,res){
		category('put',req,res);
	})
	//删除菜单
	app.delete('/shop/categories',function(req,res){
		category('delete',req,res);
	})
	//获取商品
	app.get('/shop/goods',function(req,res){
		goods('get',req,res);
	})
	//获取商品
	app.post('/shop/goods',function(req,res){
		goods('post',req,res);
	})
}