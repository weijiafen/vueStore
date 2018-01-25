
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var SubOrder = sequelize.define('subOrder', {
  //子订单id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //总单ID
  orderId:{
    type:Sequelize.BIGINT
  },
  count: {
    //总额
    type:Sequelize.INTEGER
  },
  //购买数量
  number:{
    type: Sequelize.INTEGER
  },
  //商品ID
  goodId: {
    type: Sequelize.INTEGER
  },
  //选中的标签
  labels:{
    type: Sequelize.STRING 
  },
  price:{
    //商品价格
    type:Sequelize.INTEGER,
  },
  goodName:{
    //保存商品名称快照
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
module.exports=SubOrder
