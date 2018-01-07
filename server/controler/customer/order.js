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
		var orderId=req.query.orderId;
		var cid=req.session.cid
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
					customerId:cid,
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
			if(orderRes){
				result.status=0;
				result.msg="success"
				result.data={
					order:orderRes.dataValues
				}
			}else{
				result.status=-1;
				result.msg="查询订单失败"
			}
		}
	}
	else if(method=='post'){
		var cid=req.session.cid;
		var orderId={}
		if(cid){
			var cart=req.body.cart
			var deskId=req.body.deskId
			var countObj={}
			await(sequelize.transaction()
				.then(async(function (t) {
					let sum=0;
					let cid=123;
					//从数据库计算订单总额
				    for(let item of cart){
				    	let goodRes=await(good.findOne({
				    		where:{
				    			id:item.id
				    		}
				    	}))
				    	let price=0
				    	if(goodRes){
				    		price=goodRes.dataValues.price;
				    	}
				    	if(countObj[item.id]){
				    		let number=item.number+countObj[goodRes.id]
				    		countObj[goodRes.id]=number
				    	}else{
				    		countObj[goodRes.id]=item.number
				    	}
				        let orderPay=(price*100*item.number)/100
				        sum=(sum*100+orderPay*100)/100
				    }
				    //创建总单号
				  	return order.create({
						count:sum,
						customerId:parseInt(cid),
						isPay:0,
						status:1,
						deskId:parseInt(deskId),
						createAt:(new Date()).valueOf()
					}, {transaction: t})
			  	.then(async(function (orderRes) {
			  		orderId=orderRes
			  		for(let item in countObj){
			  			let goodRes=await(good.findOne({
				  			where:{
				  				id:item
				  			}
				  		}))
				  		if(goodRes.dataValues.count<countObj[item]){
				  			//库存不足，回滚操作
				  			throw new Error
				  		}else{
				  			//扣除库存数量
				  			var newGoodRes=await(good.update({
								count:goodRes.dataValues.count-countObj[item]
							},
							{
								where:{
									id:item
								},
								transaction:t
							}))
							if(newGoodRes==0){
								//操作异常，回滚操作
					  			throw new Error
							}
				  		}
			  			
			  		}
			  		//创建每个子单
			  		for(let item of cart){
			  			var subOrderRes=await(subOrder.create({
							number:item.number,
							count:parseFloat((item.number*100*item.price*100)/10000),
							labels:item.chooceLabels.join(","),
							goodId:item.id,
							orderId:orderRes.dataValues.id
						}, {transaction: t}))
						if(!subOrderRes){
							//操作失败，回滚
							throw new Error
						}
				  		
			  		}
				;}))
				.then(function () {
					result={
			    		status:0,
						data:orderId
			    	}
			    	response.end(JSON.stringify(result))
			  		console.log("commit1！！！！")
			    	return t.commit();
			    	
			    })
			    .catch(function (err) {
			    	result={
			    		status:-1,
						msg:"下单失败"
			    	}
			    	response.end(JSON.stringify(result))
			   		console.log("rollback！！！！！！！！！")
			    	return t.rollback();
			    	
			  	});
			})));
		}
	}
	response.end(JSON.stringify(result))
	
}))