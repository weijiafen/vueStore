var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var order=require('../../modules/order.js');
var subOrder=require('../../modules/subOrder.js');
var label=require('../../modules/label.js');
var desk=require('../../modules/desk.js');
var Sequelize=require('sequelize')
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
		var shopId=req.body.shopId
		if(cid){
			order.hasMany(subOrder)
			subOrder.belongsTo(order);
			desk.hasOne(order)
			order.belongsTo(desk);
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
			good.hasMany(label)
			label.belongsTo(good);
			var orderRes=await(order.findOne({
				where:{
					id:orderId
				},
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
			if(orderRes.dataValues.status==1){
				var payRes=await(order.update({
					status:2,
					isPay:1
				},{
					where:{
						id:orderId
					}
				}))
				if(payRes){
					//支付成功后向后台推送订单
					orderRes.dataValues.status=2;
					if(global.sockets[shopId]){
						global.sockets[shopId].emit('postOrder',orderRes)
					}
					result.status=0
					result.msg='支付成功'
				}
			}else{
				result.status=-1
				result.msg='支付异常'
			}
			
		}
	}
	response.end(JSON.stringify(result))
	
}))