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
		var filterDate=req.query.filterDate
		var type=req.query.type
        var temp=new Date(parseInt(filterDate))
        var year=temp.getFullYear()
        var month=temp.getMonth()
		if(type==1){
			//按天搜索
			
		}
		else if(type==2){
			//按月份搜索
            var titleArr=[]
            var startArr=[]
            var endArr=[]
            var lastDate=new Date(year,month+1,0).getDate();
            for(let i=1;i<=lastDate;i++){
                //构造每一天日期
                titleArr.push(month+1+'-'+i);
                startArr.push(new Date(year,month,i).valueOf())
                endArr.push(new Date(year,month,i,23,59,59).valueOf()+999)
            }
		}
		else if(type==3){
            //按年份搜索
            var titleArr=[]
            var startArr=[]
            var endArr=[]
            for(let i=0;i<12;i++){
                //构造每一天日期
                titleArr.push(year+'-'+(i+1));
                startArr.push(new Date(year,i).valueOf())
                endArr.push(new Date(year,i+1,0,23,59,59).valueOf()+999)
            }
        }
		if(uid){
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
            order.hasMany(subOrder)
			subOrder.belongsTo(order);
            var reports=[]
            var onlinePayReport=[]
            for(let i=0;i<titleArr.length;i++){
                var orderRes=await(subOrder.findOne({
                    attributes:[[Sequelize.fn('SUM',Sequelize.col('subOrder.count')),'sum']],
                    where:{
                        createAt:{
                            $gte:startArr[i],
                            $lte:endArr[i]
                        }
                    },
                    include:[
                        {
                            model:order,
                            where:{
                                status:5,
                                userId:uid
                            }
                        }
                    ]
                }))
                var onlinePayRes=await(subOrder.findOne({
                    attributes:[[Sequelize.fn('SUM',Sequelize.col('subOrder.count')),'sum']],
                    where:{
                        createAt:{
                            $gte:startArr[i],
                            $lte:endArr[i]
                        }
                    },
                    include:[
                        {
                            model:order,
                            where:{
                                status:5,
                                isPay:1,
                                userId:uid
                            }
                        }
                    ]
                }))
                if(orderRes){
                    if(orderRes.dataValues.sum){
                        let temp=orderRes.dataValues.sum
                        orderRes.dataValues.sum=parseInt(temp*100)/100
                    }
                    reports.push(orderRes);
                }
                if(onlinePayRes){
                    if(onlinePayRes.dataValues.sum){
                        let temp=onlinePayRes.dataValues.sum
                        onlinePayRes.dataValues.sum=parseInt(temp*100)/100
                    }
                    onlinePayReport.push(onlinePayRes);
                }
            }
			result.status=0;
            result.msg="success"
            result.data={
                reports:reports,
                onlinePayReport:onlinePayReport,
                titleArr:titleArr
            }
			
		}
	}
	else if(method=='put'){
		
	}
	response.end(JSON.stringify(result))
	
}))