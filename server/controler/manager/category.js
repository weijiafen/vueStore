var async = require('asyncawait/async');
var await = require('asyncawait/await');
var category=require('../../modules/category.js');
var good=require('../../modules/good.js');
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		var uid=req.session.uid;
		if(uid){
			var res=await(category.findAll({
				where:{
					userId:uid,
					isDelete:0
				}
			}))
			if(res.length>=0){
				result.status=0;
				result.msg="查询成功";
				result.data=[]
				for(var menu of res){
					result.data.push({
						id:menu.dataValues.id,
						text:menu.dataValues.text
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
			var res=await(category.update({
				isDelete:1
			},{
				where:{
					userId:uid,
					id:id
				}
			}))
			if(res!=0){
				good.update({isDelete:1},{
					where:{
						categoryId:id
					}
				})
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