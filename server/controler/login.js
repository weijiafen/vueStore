var User=require('../modules/user.js');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
module.exports=(async (function(req,response){
	var account=req.body.account;
	var password=req.body.password;
	var captcha=req.body.captcha.toLowerCase();
	if(!account){
		result={status:-1,msg:'账号为空'}
	}
	else if(!password){
		result={status:-1,msg:'密码为空'}
	}
	else if(captcha!==req.session.captcha.toLowerCase()){
		result={status:-1,msg:'验证码错误'}
	}
	else{

		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		var result={}
		var res=await (User.findOne({
			where:{
				account:account,
				password:password
			}
		}))
		if(res){
			req.session.uid=res.dataValues.id;
			req.session.isLogin=true;
			result={
				status:0,
				msg:"登录成功",
				data:{
					userName:res.dataValues.userName
				}
			}
			var now=(new Date()).valueOf();
			//30s后更新最近登录时间，避免登录成功后立刻拿到最新的登录时间（非最优策略）
			setTimeout(function(){
				User.update({
					lastLoginAt:now,
				},{
					where:{
						id:res.id
					}
				})
			},30*1000)
			
		}else{
			result={status:-1,msg:"账号名或密码错误"}
		}
	}
	
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))