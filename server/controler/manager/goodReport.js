var async = require('asyncawait/async');
var await = require('asyncawait/await');
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
		var uid=req.session.uid
		var filterMonth=req.query.filterMonth
        var temp=new Date(parseInt(filterMonth))
        var year=temp.getFullYear()
        var month=temp.getMonth()
		var starDate=new Date(year,month,1).valueOf()
		var endDate=new Date(year,month+1,0,23,59,59).valueOf()+999
		if(uid){
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
            order.hasMany(subOrder)
			subOrder.belongsTo(order);
			var orderRes=await(subOrder.findAll({
                'group':[['goodId']],
                attributes:[[Sequelize.fn('SUM',Sequelize.col('number')),'sum']],
				where:{
                    createAt:{
                        $gte:starDate,
					    $lte:endDate
                    }
                },
                include:[
                    {
                        model:good,
                        where:{
                            goodId:Sequelize.col('good.id')
                        }
				    },
                    {
                        model:order,
                        where:{
                            status:5
                        }
                    }
                ]
			}))
			if(orderRes){
				result.status=0;
				result.msg="success"
				result.data={
					order:orderRes
				}
			}else{
				result.status=-1;
				result.msg="查询报表"
			}
		}
	}
	else if(method=='put'){
		
	}
	response.end(JSON.stringify(result))
	
}))