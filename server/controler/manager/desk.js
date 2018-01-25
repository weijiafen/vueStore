var async = require('asyncawait/async');
var await = require('asyncawait/await');
var desk=require('../../modules/desk.js');
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		var uid=req.session.uid;
		if(uid){
			var res=await(desk.findAll({
				where:{
					userId:uid
				}
			}))
			if(res.length>=0){
				result.status=0;
				result.msg="查询成功";
				result.data=[]
				for(var item of res){
					result.data.push({
						id:item.dataValues.id,
						name:item.dataValues.name
					})
				}
			}
		}
	}
	else if(method=='post'){
		var uid=req.session.uid;
		var name=req.body.name
		if(uid){
			var res=await(desk.create({
				userId:uid,
				name:name
			}))
			result.status=0;
			result.msg="success"
			result.data={
				id:res.id,
				name:name
			}
		}
	}
	else if(method=='put'){
		var uid=req.session.uid;
		var id=req.body.id;
		var name=req.body.name
		if(uid){
			var res=await(desk.update({
				name:name
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
				name:name
			}
		}
	}
	else if(method=='delete'){
		var uid=req.session.uid;
		var id=req.query.id;
		if(uid){
			var res=await(desk.update({
				isDelete:1
			},{
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