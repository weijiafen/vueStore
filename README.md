# vueStore

> 一个基于vue和node的点餐系统

## 部署项目
### 后台
1. 安装mysql和navicat for mysql 
2.  新建一个vuestore数据库
3. 在vuestore数据库运行项目根目录的sql文件，生成本地环境数据库vuestore
4. 在src/main/server/connection目录下新建一个dbConfig.js文件，配置你的本地数据库信息
```
	var dbConfig={
		dbName:'vuestore',
		user:'root',
		password:'weijiafen',
		host:'localhost',
		pool:{
			max: 5,
		    min: 0,
		    idle: 10000
		}
	}
	module.exports=dbConfig;
```
### 前端
#### 安装依赖文件（前后端依赖都是用npm）
npm install

#### 在localhost:8080启动一个热加载的服务器
npm run dev

#### 打包生产环境的文件。
npm run build

#### 启动生产环境服务器
node server.js

## 项目结构
```
vueStore
|——build·········开发和生成环境的webpack配置
|——config········webpack使用到的配置文件
|——dist··········npm run build 编译出来的生产环境文件
|——node_modules······依赖文件
|——src·······源代码
    |——assets······用于import的静态文件
    |——component····存放所有模块可以公用的组件
    |——module······多个单页面应用，每一个module都是一个单页面应用
        |——customer······客户点餐模块
        |——manager·······管理后台模块
            |——component·····模块私有组件
            |——router·····模块路由
            |——store····vuex状态管理
            |    |——modules····每个对象作为一个状态模块
            |——manager.html···入口页面
            |——manager.js·····入口脚本文件
            |——App.vue····挂载vue-router的总容器
|——server·····后台业务逻辑
|——static·····开发存放的静态文件
```
