
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
    type:Sequelize.STRING,
  },
  //订单所属商店ID
  userId:{
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
  //订单状态，1下单，2已支付，3取消，4正在制作，5完成
  status:{
    type:Sequelize.INTEGER,
  },
  //下订单的桌号
  deskId:{
    type:Sequelize.INTEGER,
  },
  //微信统一下单id
  prepayId:{
    type: Sequelize.STRING 
  },
  //下单签名
  paySign:{
    type: Sequelize.STRING 
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
