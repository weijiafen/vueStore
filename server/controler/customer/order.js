var async = require('asyncawait/async');
var await = require('asyncawait/await');
var user=require('../../modules/user.js');
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
		status:-1,
		msg:"登录异常,请关闭页面重新进入"
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
		var orderObj={}
		if(cid){
			var cart=req.body.cart
			var deskId=req.body.deskId
			var userId=req.body.shopId
			var countObj={}
			await(sequelize.transaction()
				.then(async(function (t) {
					let sum=0;
					console.log("cid----",req.session.cid)
					let cid=req.session.cid;
					var shopRes=await(user.findOne({
						where:{
							id:userId
						}
					}))
					if(shopRes&&shopRes.dataValues.openBusiness==0){
						//店铺没有开启营业不可下单
						throw new Error
					}
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
				        sum=parseFloat(((sum*100+orderPay*100)/100).toFixed(2))
				    }
				    //创建总单号
				  	return order.create({
						count:sum,
						customerId:cid,
						isPay:0,
						status:1,
						userId:userId,
						deskId:parseInt(deskId),
						createAt:(new Date()).valueOf()
					}, {transaction: t})
			  	.then(async(function (orderRes) {
			  		orderObj=orderRes
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
							orderId:orderRes.dataValues.id,
							goodName:item.name,
							price:item.price,
							createAt:new Date().valueOf()
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
						data:orderObj
			    	}
			    	response.end(JSON.stringify(result))
			  		console.log("commit1！！！！")
					  setTimeout(async(function(){
						  //十五分钟后未支付自动取消未支付订单
						  var orderId=orderObj.dataValues.id
						  var OrderRes=await(order.update({
							  status:3
						  },{
							  where:{
								  id:orderId,
								  status:1
							  }
						  }))
						  if(OrderRes[0]){
							  //取消订单后将库存恢复
							  var subOrderRes=await(subOrder.findAll({
								  where:{
									  orderId:orderId
								  }
							  }))
							  if(subOrderRes){
								  for(var subOrderData of subOrderRes){
									  var goodRes=await(good.findOne({
										  where:{
											  id:subOrderData.dataValues.goodId
										  }
									  }))
									  var updateGood=await(good.update({
										  count:goodRes.dataValues.count+subOrderData.dataValues.number
									  },{
										  where:{
											  id:subOrderData.dataValues.goodId
										  }
									  }))
								  }
							  }
						  }
					  }),15*60*1000)
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
			})).catch(function(err){
				//下单时店铺已关闭
				result={
					status:-1,
					msg:"该店铺已停止营业"
				}
				response.end(JSON.stringify(result))
			}));
		}
	}
	response.end(JSON.stringify(result))
	
}))