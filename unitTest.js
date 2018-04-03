var Sequelize=require('sequelize')
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var dbConfig=require('./server/connection/dbConfig.js')
var sequelize = new Sequelize('test', dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var Good = sequelize.define('good', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  count:{
    type:Sequelize.INTEGER
  },
  createAt:{
    type:Sequelize.BIGINT
  },
  updateAt:{
    type:Sequelize.BIGINT
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});
var Order = sequelize.define('order', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  goodId:{
  	type:Sequelize.INTEGER
  },
  count:{
    type:Sequelize.INTEGER
  },
  createAt:{
    type:Sequelize.BIGINT
  },
  updateAt:{
    type:Sequelize.BIGINT
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});
module.exports=(async(function(goodId){
	var trans;
	await(sequelize.transaction()
		.then(async(function (t) {
			trans=t
			var goodRes=await(Good.findOne({
				where:{
					id:goodId
				},
				transaction:trans
			}))
			if(goodRes.dataValues.count<=0){
				throw new Error
			}else{
				var newGood=await(Good.update({
					count:goodRes.dataValues.count-1
				},{
					where:{
						id:goodId,
						count:{
							$gte:0
						}
					},
					transaction:trans
				}))
				if (newGood==0) {
					throw new Error
				}else{
					return Order.create({
						count:1,
						goodId:goodId
					}, {transaction: trans})
				}
				
			}
			
		}))
		.then(function(){
			console.log("commit！！！！！！")
			return trans.commit();
		})
		.catch(function(err){
			console.log("rollback！！！！！！！！！")
			return trans.rollback();
		})
	)
	return
}))