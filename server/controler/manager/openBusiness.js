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
                result.status=0;
                result.data={
                    openBusiness:res.dataValues.openBusiness
                }
                res.msg="店铺处于开启状态"
            }
        }
	}
	else if(method=='put'){
		var uid=req.session.uid;
        var openBusiness=req.body.openBusiness
		if(uid){
			var res=await(user.update({
				openBusiness:openBusiness,
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