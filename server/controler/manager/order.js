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
	else if(method=='post'){
		var uid=req.session.uid;
		var orderId=''
		if(uid){
			var cart=req.body.cart
			var deskId=req.body.deskId
			var userId=uid
			var countObj={}

			order.hasMany(subOrder)
			subOrder.belongsTo(order);
			desk.hasOne(order)
			order.belongsTo(desk);
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
			good.hasMany(label)
			label.belongsTo(good);
			await(sequelize.transaction()
				.then(async(function (t) {
					let sum=0;
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
						customerId:parseInt(uid),
						isPay:0,
						status:2,
						userId:userId,
						deskId:parseInt(deskId),
						createAt:(new Date()).valueOf()
					}, {transaction: t})
			  	.then(async(function (orderRes) {
			  		orderId=orderRes.dataValues.id
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
				.then(async(function () {
					t.commit();
					var a=orderId;
					var orderObj=await(order.findOne({
						where:{
							id:orderId,
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
					result={
			    		status:0,
						data:orderObj
			    	}
			    	response.end(JSON.stringify(result))
			  		console.log("commit1！！！！")
			    	return 
			    	
			    }))
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