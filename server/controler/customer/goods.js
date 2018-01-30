var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var user=require('../../modules/user.js');
var category=require('../../modules/category.js');
var label=require('../../modules/label.js');
var Sequelize=require('sequelize')
module.exports=(async (function(method,req,response){
	var result={
		status:-1,
		msg:"登录异常,请关闭页面重新进入"
	}
	if(method=='get'){
		var shopId=req.query.shopId||req.session.uid;
		//临时增加顾客id，待接入微信登录
		category.hasMany(good)
		good.belongsTo(category);
		good.hasMany(label)
		label.belongsTo(good);
		var shopRes=await(user.findOne({
			where:{
				id:shopId,
				openBusiness:1
			}
		}))
		if(shopRes){
			result.status=0;
			result.msg="success"
			result.data={
				shopInfo:{
					name:shopRes.dataValues.userName,
					notice:shopRes.dataValues.notice,
					photo:shopRes.dataValues.photo,
					openBusiness:shopRes.dataValues.openBusiness
				}
			}
			var menuRes=await(category.findAll({
				where:{
					userId:shopId
				},
				include:[{
					model:good,
					where:{
						isOnline:1,
						isDelete:0
					},
					include:[
						{
							model:label
						}
					]
				}],
			}))
			result.data.menu=menuRes
		}else{
			result.status=-1;
			result.msg="此店铺未开启营业"
		}
		
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))