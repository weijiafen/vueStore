var async = require('asyncawait/async');
var await = require('asyncawait/await');
var user=require('../../modules/user.js');
var Sequelize=require('sequelize')
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		var uid=req.session.uid;
		if(uid){
			var res=await(user.findOne({
				where:{
					id:uid
				}
			}))
			if(res){
				result={
					status:0,
					msg:"查询成功",
					data:{
						userName:res.dataValues.userName,
						notice:res.dataValues.notice,
						photo:res.dataValues.photo,
					}
				}
			}else{
				result={
					status:0,
					msg:"查询失败",
					data:{}
				}
			}
		}
	}
	else if(method=='put'){
		var uid=req.session.uid;
		var userName=req.body.userName
		var notice=req.body.notice
		var photo=req.body.photo
		if(uid){
			var res=await(user.update({
				userName:userName,
				notice:notice,
				photo:photo
			},{
				where:{
					id:uid
				}
			}))
			result.status=0;
			result.msg="success"
			result.data={}
		}else{
			result.status=-1
			result.msg="没有操作权限"
		}
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))