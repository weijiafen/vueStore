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
		var filterDate=req.query.filterDate
		var type=req.query.type
        var temp=new Date(parseInt(filterDate))
        var year=temp.getFullYear()
        var month=temp.getMonth()
        var date=temp.getDate()
        var startTime;
        var endTime;
        var userObjs=[]
		if(type==1){
			//按天搜索
			
		}
		else if(type==2){
			//按月份搜索
            startTime=new Date(year,month,1).valueOf()
            endTime=new Date(year,month+1,0,23,59,59,999).valueOf();
		}
		else if(type==3){
            //按年份搜索
            startTime=new Date(year,0,1,0,0,0).valueOf()
            endTime=new Date(year,11,31,23,59,59,999).valueOf()
        }
		if(rid){
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
            order.hasMany(subOrder)
			subOrder.belongsTo(order);
            var userRes=await(user.findAll())

            for(let obj of userRes){
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
                    updateAt:obj.updateAt,
                    allCount:parseInt(orderRes.dataValues.sum*100)/100,
                    onlineCount:parseInt(onlinePayRes.dataValues.sum*100)/100
                })
            }
			result.status=0;
            result.msg="success"
            result.data=userObjs
			
		}
	}
	else if(method=='put'){
		
	}
	response.end(JSON.stringify(result))
	
}))