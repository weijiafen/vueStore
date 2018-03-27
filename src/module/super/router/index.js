import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['../components/login.vue'], resolve)
const Index = resolve => require(['../components/index.vue'], resolve)
// const categoryManage = resolve => require(['../components/categoryManage.vue'], resolve)
// const goodsManage = resolve => require(['../components/goodsManage.vue'], resolve)
const account = resolve => require(['../components/account.vue'], resolve)
const saleCount = resolve => require(['../components/saleCount.vue'], resolve)
// const setting = resolve => require(['../components/setting.vue'], resolve)
// const desk = resolve => require(['../components/desk.vue'], resolve)
// const saleHistory = resolve => require(['../components/saleHistory.vue'], resolve)
// const goodsReport = resolve => require(['../components/goodsReport.vue'], resolve)
// const saleReport = resolve => require(['../components/saleReport.vue'], resolve)
// const active = resolve => require(['../components/active.vue'], resolve)
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
        	path:'/',
        	name:'index',
        	component:Index,
        	children:[
        		{
        			path:"account",
        			component:account
        		},
            {
              path:"saleCount",
              component:saleCount
            },
        	]
        }
    ]
})