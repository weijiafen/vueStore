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
		var uid=req.session.uid
		var orderBy=req.query.orderBy
		var status=req.query.status
		
		if(uid){
			order.hasMany(subOrder)
			subOrder.belongsTo(order);
			desk.hasOne(order)
			order.belongsTo(desk);
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
			good.hasMany(label)
			label.belongsTo(good);

			var whereObj={
				userId:uid,
				status:status
			}
			if(req.query.fileterOrderId){
				var fileterOrderId=req.query.fileterOrderId
				whereObj.id=fileterOrderId
			}
			if(req.query.filterDate){
				var filterDateStar=parseInt(req.query.filterDate)
				//当天的23:59:59
				var filterDateEnd=filterDateStar+86399999
				whereObj.createAt={
					$gte:filterDateStar,
					$lte:filterDateEnd
				}	
			}
			var orderRes=await(order.findAll({
                'order':[['createAt',orderBy]],
				where:whereObj,
				include:[{
					model:subOrder,
					where:{
						orderId:Sequelize.col('order.id')
					},
					include:[{
						model:good,
						include:[label]
					}]
				},
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
				result.data={
					order:orderRes
				}
			}else{
				result.status=-1;
				result.msg="查询订单失败"
			}
		}
	}
	else if(method=='put'){
		var uid=req.session.uid;
		var orderId=req.body.orderId
		var status=req.body.status
		if(uid){
			var orderRes=await(order.update({
                status:status
            },{
                where:{
                    id:orderId,
                    userId:uid
                }
            }))
            if(orderRes==1){
                result.status=0;
				result.msg="success"
                result.data={
                    id:orderId
                }
            }else{
                result.status=-1;
				result.msg="更新订单失败"
            }
		}
	}
	response.end(JSON.stringify(result))
	
}))