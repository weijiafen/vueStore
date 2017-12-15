var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var category=require('../../modules/category.js');
module.exports=(async (function(method,req,response){
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='put'){
		var uid=req.session.uid;
		var id=req.body.id;
		var isOnline=parseInt(req.body.isOnline)
		if(uid){
			if(!id){
				result={
					status:-1,
					msg:"商品id为空"
				}
			}
			else if(isOnline==null||isOnline==undefined){
				result={
					status:-1,
					msg:"上架参数不合法"
				}
			}else{
				var goodObj=await(good.findOne({
					where:{
						id:id
					}
				}))
				if(goodObj){
					//查询商品是该User的
					var isAutor=await(category.findOne({
						where:{
							id:goodObj.dataValues.categoryId,
							userId:uid
						}
					}))
					if(isAutor){
						var res=await(good.update({
							isOnline:isOnline,
						},{
							where:{
								id:id
							}
						}))
						result.status=0;
						result.msg="success"
						result.data={
						}
					}
				}
				
			}
		}
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))