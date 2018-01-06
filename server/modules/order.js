
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var Order = sequelize.define('order', {
  //订单id
  id:{
    type:Sequelize.BIGINT,
    primaryKey:true,
    autoIncrement: true
  },
  //顾客id
  customerId:{
    type:Sequelize.INTEGER,
  },
  count: {
    //总额
    type: Sequelize.STRING 
  },
  //是否支付,0未支付，1已支付
  isPay:{
    type:Sequelize.INTEGER,
  },
  //订单状态，1下单，2取消，3正在制作，4完成
  status:{
    type:Sequelize.INTEGER,
  },
  //下订单的桌号
  deskId:{
    type:Sequelize.INTEGER,
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
module.exports=Order
