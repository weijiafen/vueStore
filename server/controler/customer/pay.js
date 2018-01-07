var async = require('asyncawait/async');
var await = require('asyncawait/await');
var order=require('../../modules/order.js');
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
module.exports=(async (function(method,req,response){
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		
	}
	else if(method=='post'){
		var cid=req.session.cid;
		var orderId=req.body.orderId
		if(cid){
			result.status=0
			result.msg='支付成功'
		}
	}
	response.end(JSON.stringify(result))
	
}))