var Root=require('../../modules/root.js');
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
		var res=await (Root.findOne({
			where:{
				account:account,
				password:password
			}
		}))
		if(res){
			req.session.rid=res.dataValues.id;
			req.session.isLogin=true;
			result={
				status:0,
				msg:"登录成功",
				data:{
				}
			}
			
		}else{
			result={status:-1,msg:"账号名或密码错误"}
		}
	}
	
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))