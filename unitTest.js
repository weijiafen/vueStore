var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('./server/modules/good.js');
var subOrder=require('./server/modules/subOrder.js');
var order=require('./server/modules/order.js');
var Sequelize=require('sequelize')
var dbConfig=require('./server/connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var cart=[
		{
			chooceLabels:[],
			id:17,
			number:1,
			price:26.25
		}
	]
module.exports=(async (function(){
	//去重放置所有订单消耗量，用以扣除库存
	var countObj={}
			sequelize.transaction()
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
						cid:cid,
						isPay:0,
						status:1,
						createAt:(new Date()).valueOf()
					}, {transaction: t})
			  	.then(async(function (orderRes) {
			  		let isBreak=false
			  		console.log("countObj",countObj)
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
					// result={
			  //   		status:0,
					// 	data:orderRes
			  //   	}
			    	// response.end(JSON.stringify(result))
			    	return t.commit();
			    	
			    })
			    .catch(function (err) {
			   //  	result={
			   //  		status:-1,
						// msg:"下单失败"
			   //  	}
			    	// response.end(JSON.stringify(result))
			    	return t.rollback();
			    	
			  	});
			}));
}))