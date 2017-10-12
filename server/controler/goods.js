var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../modules/good.js');
var category=require('../modules/category.js');
var label=require('../modules/label.js');
module.exports=(async (function(method,req,response){
	var result={
		status:-1,
		msg:"请求数据异常"
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
		var text=req.body.text
		if(uid){
			var res=await(category.create({
				userId:uid,
				text:text
			}))
			result.status=0;
			result.msg="success"
			result.data={
				id:res.id,
				text:text
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
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))