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
		var count=req.body.count
		if(uid){
			if(!id){
				result={
					status:-1,
					msg:"商品id为空"
				}
			}
			else if(isNaN(parseInt(count))){
				result={
					status:-1,
					msg:"库存参数不合法"
				}
			}else{
				category.hasMany(good)
				good.belongsTo(category);
				//查询商品是该User的
				var isAutor=await(good.findOne({
					where:{
						id:id
					},
					include:[{
						model:category,
						where:{
							userId:uid
						}
					}]
				}))
				if(isAutor&&isAutor.dataValues.category){
					var newCount=isAutor.dataValues.count+parseInt(count)
					if(newCount<0){
						result.status=-1;
						result.msg="库存不能低于0"
					}else{
						var res=await(good.update({
							count:newCount,
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
					
				}else{
					result.status=-1
					result.msg="没有操作权限"
				}
			}
		}
	}
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	response.end(JSON.stringify(result))
}))