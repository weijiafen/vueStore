
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var good = sequelize.define('good', {
  //商品id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name: {
    //商品名
    type: Sequelize.STRING
  },
  description:{
    //商品描述
    type: Sequelize.STRING
  },
  count:{
    //商品库存
    type:Sequelize.INTEGER,
  },
  //所属菜单id
  categoryId:{
    type:Sequelize.INTEGER,
  },
  price:{
    //商品价格
    type:Sequelize.INTEGER,
  },
  isOnline:{
    //商品是否上线 1：上线 ， 0 ：下线
    type:Sequelize.INTEGER,
  },
  img:{
    //商品图片
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
module.exports=good
