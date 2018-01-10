import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['../components/login.vue'], resolve)
const Index = resolve => require(['../components/index.vue'], resolve)
const categoryManage = resolve => require(['../components/categoryManage.vue'], resolve)
const goodsManage = resolve => require(['../components/goodsManage.vue'], resolve)
const welcome = resolve => require(['../components/welcome.vue'], resolve)
const setting = resolve => require(['../components/setting.vue'], resolve)
const saleHistory = resolve => require(['../components/saleHistory.vue'], resolve)
const active = resolve => require(['../components/active.vue'], resolve)
// import Login from '@/components/login.vue'
// import Index from '../components/index.vue'
// import categoryManage from '../components/categoryManage.vue'
// import welcome from '../components/welcome.vue'
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
        			path:"",
        			component:welcome
        		},
        		{
        			path:"categoryManage",
        			component:categoryManage
        		},
                {
                    path:"goodsManage",
                    component:goodsManage
                },
                {
                    path:"setting",
                    component:setting
                },
                {
                    path:"activeManage",
                    component:active
                },
                {
                    path:"saleHistory",
                    component:saleHistory
                },
                {
                    path:"goodsReport",
                    component:active
                },
                {
                    path:"saleReport",
                    component:active
                }
        	]
        }
    ]
})