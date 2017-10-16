var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../modules/good.js');
var category=require('../modules/category.js');
var label=require('../modules/label.js');
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
		if(uid){
			var res=await(good.findAll({
				where:{
				},
				include:[{
					model:category,
					where:{
						userId:uid
					}
				},{
					model:label
				}]
			}))
			console.log(res);
			if(res.length>=0){
				result.status=0;
				result.msg="查询成功";
				result.data=[]
				for(var item of res){
					result.data.push({
						id:item.dataValues.id,
						name:item.dataValues.name,
						description:item.dataValues.description,
						count:item.dataValues.count,
						categoryId:item.dataValues.categoryId,
						price:item.dataValues.price,
						isOnline:item.dataValues.isOnline,
						label:item.dataValues.labels,
						category:item.dataValues.category
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
		if(uid){
			if(!categoryId){
				result={
					status:-1,
					mag:"菜单分类必须选择"
				}
			}
			else if(!name||name==""){
				result={
					status:-1,
					mag:"商品名称必须输入"
				}
			}
			else if(isNaN(parseInt(count))){
				result={
					status:-1,
					mag:"库存参数不合法"
				}
			}
			else if(!parseFloat(price)){
				result={
					status:-1,
					mag:"价格参数不合法"
				}
			}
			else{
				var res=await(good.create({
					name:name,
					description:description,
					count:parseInt(count),
					categoryId:categoryId,
					price:parseFloat(price),
					isOnline:isOnline
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
		var text=req.body.text
		if(uid){
			var res=await(category.update({
				text:text
			},{
				where:{
					userId:uid,
					id:id
				}
			}))
			result.status=0;
			result.msg="success"
			result.data={
				id:id,
				text:text
			}
		}
	}
	else if(method=='delete'){
		var uid=req.session.uid;
		var id=req.query.id;
		if(uid){
			var res=await(category.destroy({
				where:{
					userId:uid,
					id:id
				}
			}))
			if(res!=0){
				result.status=0;
				result.msg="success"
				result.data={
				}
			}
		}
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))