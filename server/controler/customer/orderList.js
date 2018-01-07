var async = require('asyncawait/async');
var await = require('asyncawait/await');
var order=require('../../modules/order.js');
var desk=require('../../modules/desk.js');
var Sequelize=require('sequelize')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var order=require('../../modules/order.js');
var subOrder=require('../../modules/subOrder.js');
var label=require('../../modules/label.js');
var desk=require('../../modules/desk.js');
var Sequelize=require('sequelize')
var dbConfig=require('../../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
module.exports=(async (function(method,req,response){
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		var cid=req.session.cid
		if(cid){
			desk.hasOne(order)
			order.belongsTo(desk);
			var orderRes=await(order.findAll({
				'order':[['createAt','DESC']],
				where:{
					customerId:cid
				},
				include:[
				{
					model:desk,
					where:{
						id:Sequelize.col('order.deskId')
					}
				}
				]
			}))
			if(orderRes){
				result.status=0;
				result.msg="success"
				result.data=orderRes
			}else{
				result.status=-1;
				result.msg="查询订单列表失败"
			}
		}
	}
	response.end(JSON.stringify(result))
	
}))