var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../modules/good.js');
var category=require('../modules/category.js');
var label=require('../modules/label.js');
var Sequelize=require('sequelize')
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		category.hasMany(good)
		good.belongsTo(category);
		good.hasMany(label)
		label.belongsTo(good);
		var uid=req.session.uid;
		var categoryId=req.query.categoryId
		var pageSize=req.query.pageSize||10
		var page=req.query.page||1
		var whereObj={}
		if(categoryId&&categoryId!=""){
			whereObj={
				categoryId:categoryId
			}
		}
		if(uid){
			var res=await(good.findAndCountAll({
				'limit':parseInt(pageSize),
				'offset':parseInt(pageSize*(page-1)),
				'order':[['id']],
				where:whereObj,

				include:[category,label],

				distinct: true
			}))
			if(res.rows.length>=0){
				result.status=0;
				result.msg="查询成功";
				result.total=res.count;
				result.data=[]
				for(var item of res.rows){
					result.data.push({
						id:item.dataValues.id,
						name:item.dataValues.name,
						description:item.dataValues.description,
						count:item.dataValues.count,
						categoryId:item.dataValues.categoryId,
						price:item.dataValues.price,
						isOnline:item.dataValues.isOnline,
						label:item.dataValues.labels,
						category:item.dataValues.category,
						img:item.dataValues.img||""
					})
				}
			}
		}
	}
	else if(method=='post'){
		var uid=req.session.uid;
		// var id=req.body.id;
		var name=req.body.name
		var description=req.body.description
		var count=req.body.count
		var categoryId=req.body.categoryId
		var price=req.body.price
		var isOnline=req.body.isOnline
		var img=req.body.img
		if(uid){
			if(!categoryId){
				result={
					status:-1,
					msg:"菜单分类必须选择"
				}
			}
			else if(!name||name==""){
				result={
					status:-1,
					msg:"商品名称必须输入"
				}
			}
			else if(isNaN(parseInt(count))){
				result={
					status:-1,
					msg:"库存参数不合法"
				}
			}
			else if(!parseFloat(price)){
				result={
					status:-1,
					msg:"价格参数不合法"
				}
			}
			else{
				var res=await(good.create({
					name:name,
					description:description,
					count:parseInt(count),
					categoryId:categoryId,
					price:parseFloat(price),
					isOnline:isOnline,
					img:img
				}))
				result.status=0;
				result.msg="success"
				result.data={
					id:res.id,
					name:res.name
				}
			}
			
		}
	}
	else if(method=='put'){
		var uid=req.session.uid;
		var id=req.body.id;
		var name=req.body.name
		var description=req.body.description
		var count=req.body.count
		var categoryId=req.body.categoryId
		var price=req.body.price
		var isOnline=req.body.isOnline
		var img=req.body.img
		if(uid){
			if(!categoryId){
				result={
					status:-1,
					msg:"菜单分类必须选择"
				}
			}
			else if(!name||name==""){
				result={
					status:-1,
					msg:"商品名称必须输入"
				}
			}
			else if(isNaN(parseInt(count))){
				result={
					status:-1,
					msg:"库存参数不合法"
				}
			}
			else if(!parseFloat(price)){
				result={
					status:-1,
					msg:"价格参数不合法"
				}
			}
			else{
				category.hasMany(good)
				good.belongsTo(category);
				good.hasMany(label)
				label.belongsTo(good);
				//查询商品是该User的
				var isAutor=await(good.findOne({
					where:{
						id:id,
						categoryId:categoryId
					},
					include:[{
						model:category,
						where:{
							userId:uid,
							id:categoryId
						}
					}]
				}))
				if(isAutor&&isAutor.dataValues.category){
					var res=await(good.update({
						name:name,
						description:description,
						count:parseInt(count),
						categoryId:categoryId,
						price:parseFloat(price),
						isOnline:isOnline,
						img:img
					},{
						where:{
							id:id
						}
					}))
					result.status=0;
					result.msg="success"
					result.data={
						id:res.id,
						name:res.name
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
		if(uid){
			category.hasMany(good)
			good.belongsTo(category);
			//查询商品是该User的
			var isAutor=await(good.findOne({
				where:{
					id:id
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
				var res=await(good.destroy({
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