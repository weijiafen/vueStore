var async = require('asyncawait/async');
var await = require('asyncawait/await');
//node提供的加密模块
var crypto = require('crypto')
var request = require('request');
module.exports=(async (function(method,req,response){
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:-1,
		msg:"获取签名失败"
	}
	if(method=='get'){
		var timestamp=req.query.timestamp
		var noncestr=req.query.nonceStr
		var url=req.query.url
		var accessTokenUrl='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa9c22df153e7dd7b&secret=21662b08be44476ed1a6c0d7f4c0d3df'
		if(!global.signatureObj){
			//签名放置在全局下
			global.signatureObj={
				jsapi_ticket:'',
				access_token:'',
				expire:true
			}
		}
		if(global.signatureObj.expire){
			//签名2小时过期
			request(accessTokenUrl,function(err,res1,body1){
				body1=JSON.parse(body1)
				if(body1.access_token){
					global.signatureObj.access_token=body1.access_token
					var ticketUrl='https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+global.signatureObj.access_token+'&type=jsapi'
					request(ticketUrl,function(err,res2,body2){
						body2=JSON.parse(body2)
						if(body2.ticket){
							//获取ticket并设置过期字段为false，延时将expire设置为true
							global.signatureObj.jsapi_ticket=body2.ticket
							global.signatureObj.expire=false
							setTimeout(function(){
								global.signatureObj.expire=true
							},parseInt(body2.expires_in)*1000)
							var string1='jsapi_ticket='+global.signatureObj.jsapi_ticket+
								'&noncestr='+noncestr+'&timestamp='+timestamp
								+'&url='+url
							var sha1 = crypto.createHash('sha1');
							var signature= sha1.update(string1).digest('hex');
							result.status=0;
							result.msg="success";
							result.data=signature
							response.end(JSON.stringify(result))
						}else{
							//获取不到返回错误
							response.end(JSON.stringify(result))
						}
					})
				}else{
					//获取不到返回错误
					response.end(JSON.stringify(result))
				}
			})
		}else{
			var string1='jsapi_ticket='+global.signatureObj.jsapi_ticket+
				'&noncestr='+noncestr+'&timestamp='+timestamp
				+'&url='+url
			var sha1 = crypto.createHash('sha1');
			var signature= sha1.update(string1).digest('hex');
			result.status=0;
			result.msg="success";
			result.data=signature
			response.end(JSON.stringify(result))
		}
	}
}))