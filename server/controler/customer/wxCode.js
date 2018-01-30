var async = require('asyncawait/async');
var await = require('asyncawait/await');
var customer=require('../../modules/customer.js');
var request = require('request');
module.exports=(async (function(method,req,response){
    console.log("wxcode start")
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:-1,
		msg:"登录异常,请关闭页面重新进入"
	}
    if(method='post'){
        var code=req.body.code;
        let openid=''
        let access_token=''
        let nickname=''
        let sex=''
        let province=''
        let city=''
        let country=''
        let headimgurl=''
        var datas = [];
        var openIdUrl=`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxa9c22df153e7dd7b&secret=21662b08be44476ed1a6c0d7f4c0d3df&code=${code}&grant_type=authorization_code`
        request(openIdUrl,function(err,res1,body){
            body=JSON.parse(body)
            console.log("res1 body",body)
            if(body.openid){
                openid=body.openid
                access_token=body.access_token
                var infoUrl=`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
                request(infoUrl,async(function(err,res2,body2){
                    body2=JSON.parse(body2)
                    if(body2.openid){
                        nickname=body2.nickname
                        sex=body2.sex
                        province=body2.province
                        city=body2.city
                        country=body2.country
                        headimgurl=body2.headimgurl
                        var customerRes=await(customer.findOne({
                            where:{
                                openId:openid
                            }
                        }))
                        if(customerRes){
                            //用户存在则更新
                            var updateRes=customer.update({
                                nickname:nickname,
                                sex:parseInt(sex),
                                province:province,
                                city:city,
                                country:country,
                                headimgurl:headimgurl,
                            },{
                                where:{
                                    openId:openid
                                }
                            })
                        }else{
                            //不存在则自动注册
                            var createRes=await(customer.create({
                                nickname:nickname,
                                sex:parseInt(sex),
                                province:province,
                                city:city,
                                country:country,
                                headimgurl:headimgurl,
                                openId:openid
                            }))
                        }
                        req.session.cid=openid;
                        result.status=0;
                        result.msg="success"
                        response.end(JSON.stringify(result))
                    }else{
                        response.end(JSON.stringify(result))
                    }
                }))
            }else{
                response.end(JSON.stringify(result))
            }
            
        })
        console.log("res1 end")
    }
    
}))