var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var order=require('../../modules/order.js');
var subOrder=require('../../modules/subOrder.js');
var label=require('../../modules/label.js');
var desk=require('../../modules/desk.js');
var Sequelize=require('sequelize')
var parseString = require('xml2js').parseString;
module.exports=(async(function(method,req,response){
	var result={
		status:-1,
		msg:"登录异常,请关闭页面重新进入"
	}
	if(method=='post'){
		var data=''
		req.on('data', function (chunk) {
			data += chunk
		})
		req.on('end',function () {
			console.log("xmldata",data)
			parseString(data,async(function(error,result2){
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
						id:result2.xml.out_trade_no[0],
						customerId:result2.xml.openid[0]
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
				if(orderRes.dataValues.isPay==0){
					console.log("orderRes.dataValues.count)*100",parseFloat(orderRes.dataValues.count)*100)
					console.log("result2.xml.total_fee[0]",result2.xml.total_fee[0])
					if(Math.round(orderRes.dataValues.count*100)==result2.xml.total_fee[0]){
						var payRes=await(order.update({
							isPay:1,
							status:2
						},{
							where:{
								id:result2.xml.out_trade_no[0],
								customerId:result2.xml.openid[0]
							}
						}))
						if(payRes){
							var shopId=orderRes.dataValues.userId;
							orderRes.dataValues.status=2
							orderRes.dataValues.isPay=1
							if(global.sockets[shopId]){
								global.sockets[shopId].emit('postOrder',orderRes)
							}

						}
						
					}
				}
				response.writeHead(200,{'Content-Type':'text/xml;charset=utf-8'});//设置respons
		    	response.end("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>")
			}))
			
		})
	}
	
	// response.end(JSON.stringify(result))
}))