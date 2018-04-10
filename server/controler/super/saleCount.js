var async = require('asyncawait/async');
var await = require('asyncawait/await');
var user=require('../../modules/user.js');
var good=require('../../modules/good.js');
var order=require('../../modules/order.js');
var subOrder=require('../../modules/subOrder.js');
var Sequelize=require('sequelize')
module.exports=(async (function(method,req,response){
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:1000,
		msg:"未登录"
	}
	if(method=='get'){
		var rid=req.session.rid
        var startDate=req.query.startDate||0
		var endDate=req.query.endDate||0
        var pageSize=req.query.pageSize||10
        var page=req.query.page||1
        var startDate=new Date(parseInt(startDate))
        var endDate=new Date(parseInt(endDate))
        var startTime;
        var endTime;
        var userObjs=[]
		startTime=new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()).valueOf()
        endTime=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59,999).valueOf()
		if(rid){
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
            order.hasMany(subOrder)
			subOrder.belongsTo(order);
            var userRes=await(user.findAndCountAll({
                'limit':parseInt(pageSize),
                'offset':parseInt(pageSize*(page-1)),
                'order':[['id']],
            }))

            for(let obj of userRes.rows){
                var orderRes=await(subOrder.findOne({
                    attributes:[[Sequelize.fn('SUM',Sequelize.col('subOrder.count')),'sum']],
                    where:{
                        createAt:{
                            $gte:startTime,
                            $lte:endTime
                        }
                    },
                    include:[
                        {
                            model:order,
                            where:{
                                status:5,
                                userId:obj.id
                            }
                        }
                    ]
                }))
                var onlinePayRes=await(subOrder.findOne({
                    attributes:[[Sequelize.fn('SUM',Sequelize.col('subOrder.count')),'sum']],
                    where:{
                        createAt:{
                            $gte:startTime,
                            $lte:endTime
                        }
                    },
                    include:[
                        {
                            model:order,
                            where:{
                                status:5,
                                isPay:1,
                                userId:obj.id
                            }
                        }
                    ]
                }))
                userObjs.push({
                    id:obj.id,
                    userName:obj.userName,
                    openBusiness:obj.openBusiness,
                    photo:obj.photo,
                    expireTime:obj.expireTime,
                    allCount:parseInt(orderRes.dataValues.sum*100)/100,
                    onlineCount:parseInt(onlinePayRes.dataValues.sum*100)/100
                })
            }
			result.status=0;
            result.msg="success"
            result.total=userRes.count
            result.data=userObjs
			
		}
	}
	else if(method=='put'){
		
	}
	response.end(JSON.stringify(result))
	
}))