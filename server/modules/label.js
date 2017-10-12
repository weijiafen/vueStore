
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var label = sequelize.define('label', {
  //标签id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name: {
    //标签名
    type: Sequelize.STRING
  },
  bgColor:{
    //背景颜色
    type: Sequelize.STRING
  },
  goodId:{
    //所属商品id
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
module.exports=label
