process.setMaxListeners(0)
var session = require('express-session');
var fs=require('fs');
var path = require('path');
var bodyParser=require('body-parser')
var captcha=require('./controler/captcha');
var upload=require('./controler/upload');
var login=require('./controler/manager/login.js');
var category=require('./controler/manager/category.js');
var goods=require('./controler/manager/goods.js');
var label=require('./controler/manager/label.js');
var stock=require('./controler/manager/stock.js');
var goodOnline=require('./controler/manager/goodOnline.js');
var setting=require('./controler/manager/setting.js');
var managerOrder=require('./controler/manager/order.js');
var openBusiness=require('./controler/manager/openBusiness.js');
var menu=require('./controler/customer/goods.js');
var order=require('./controler/customer/order.js');
var orderList=require('./controler/customer/orderList.js');
var pay=require('./controler/customer/pay.js');

module.exports=function(app){
	//app是一个express()
	app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
	app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	  extended: true
	}));
	app.use(session({
	    secret: 'hubwiz app', //secret的值建议使用随机字符串
	    cookie: {maxAge: 60 * 1000 * 60*12}, // 过期时间（毫秒）
	    resave:true		//在操作的时候重新设置session。顺延登录时间
	}));
	app.post('/user/login',function(req,res){
		login(req,res);
	})
	//获取验证码
	app.get('/captcha',function(req,res){
		captcha(req,res);
	})
	//上传文件接口
	app.post('/upload',function(req,res){
		upload(req,res);
	})
	//获取菜单
	app.get('/manager/categories',function(req,res){
		category('get',req,res);
	})
	//新增菜单
	app.post('/manager/categories',function(req,res){
		category('post',req,res);
	})
	//修改菜单
	app.put('/manager/categories',function(req,res){
		category('put',req,res);
	})
	//删除菜单
	app.delete('/manager/categories',function(req,res){
		category('delete',req,res);
	})
	//获取商品
	app.get('/manager/goods',function(req,res){
		goods('get',req,res);
	})
	//新增商品
	app.post('/manager/goods',function(req,res){
		goods('post',req,res);
	})
	//修改商品
	app.put('/manager/goods',function(req,res){
		goods('put',req,res);
	})
	//删除商品
	app.delete('/manager/goods',function(req,res){
		goods('delete',req,res);
	})
	//修改商品库存
	app.put('/manager/stock',function(req,res){
		stock('put',req,res);
	})
	//新增标签
	app.post('/manager/label',function(req,res){
		label('post',req,res);
	})
	//删除标签
	app.delete('/manager/label',function(req,res){
		label('delete',req,res);
	})
	//修改商品上下架
	app.put('/manager/goodOnline',function(req,res){
		goodOnline('put',req,res);
	})
	//获取店铺设置
	app.get('/manager/setting',function(req,res){
		setting('get',req,res);
	})
	//修改店铺设置
	app.put('/manager/setting',function(req,res){
		setting('put',req,res);
	})
	//获取店铺设置
	app.get('/customer/menu',function(req,res){
		menu('get',req,res);
	})
	//下单
	app.post('/customer/order',function(req,res){
		order('post',req,res);
	})
	//查询订单详情
	app.get('/customer/order',function(req,res){
		order('get',req,res);
	})
	//下单
	app.post('/customer/pay',function(req,res){
		pay('post',req,res);
	})
	//查询订单列表
	app.get('/customer/orderList',function(req,res){
		orderList('get',req,res);
	})
	//后台查询已支付订单列表
	app.get('/manager/orderList',function(req,res){
		managerOrder('get',req,res);
	})
	//修改订单状态
	app.put('/manager/order',function(req,res){
		managerOrder('put',req,res);
	})
	//修改店铺开店状态
	app.put('/manager/openBusiness',function(req,res){
		openBusiness('put',req,res);
	})
	//查询店铺开店状态
	app.get('/manager/openBusiness',function(req,res){
		openBusiness('get',req,res);
	})
}