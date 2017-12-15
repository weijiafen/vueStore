var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var category=require('../../modules/category.js');
var label=require('../../modules/label.js');
var Sequelize=require('sequelize')
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='post'){
		var uid=req.session.uid;
		// var id=req.body.id;
		var name=req.body.name
		var bgColor=req.body.bgColor
		var goodId=req.body.goodId
		if(uid){
			if(!goodId){
				result={
					status:-1,
					msg:"商品id为空"
				}
			}
			else if(!name||name==""){
				result={
					status:-1,
					msg:"标签名称必须输入"
				}
			}
			else if(!bgColor||bgColor==""){
				result={
					status:-1,
					msg:"标签背景色必须输入"
				}
			}
			else{
				category.hasMany(good)
				good.belongsTo(category);
				//查询商品是该User的
				var isAutor=await(good.findOne({
					where:{
						id:goodId
					},
					include:[{
						model:category,
						where:{
							userId:uid,
							id:Sequelize.col('good.categoryId')
						}
					}]
				}))
				if(isAutor&&isAutor.dataValues.category){
					var res=await(label.create({
						name:name,
						goodId:goodId,
						bgColor:bgColor
					}))
					result.status=0;
					result.msg="success"
					result.data={
						id:res.id,
						name:res.name,
						bgColor:res.bgColor
					}
				}else{
					result.status=-1
					result.msg="没有操作权限"
				}
				
			}
			
		}
	}
	else if(method=='delete'){
		var uid=req.session.uid;
		var id=req.query.id;
		var goodId=req.query.goodId;
		if(uid){
			category.hasMany(good)
			good.belongsTo(category);
			//查询商品是该User的
			var isAutor=await(good.findOne({
				where:{
					id:goodId
				},
				include:[{
					model:category,
					where:{
						userId:uid,
						id:Sequelize.col('good.categoryId')
					}
				}]
			}))
			if(isAutor&&isAutor.dataValues.category){
				var res=await(label.destroy({
					where:{
						id:id
					}
				}))
				if(res!=0){
					result.status=0;
					result.msg="success"
					result.data={
					}
				}else{
					result.status=-1;
					result.msg="删除失败"
				}
			}else{
				result.status=-1
				result.msg="没有操作权限"
			}
			
		}
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))