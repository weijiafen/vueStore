import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['../components/login.vue'], resolve)
const Index = resolve => require(['../components/index.vue'], resolve)
const accountManage = resolve => require(['../components/accountManage.vue'], resolve)
const categoryManage = resolve => require(['../components/categoryManage.vue'], resolve)
const goodsManage = resolve => require(['../components/goodsManage.vue'], resolve)
const welcome = resolve => require(['../components/welcome.vue'], resolve)
// import Login from '@/components/login.vue'
// import Index from '../components/index.vue'
// import accountManage from '../components/accountManage.vue'
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
        	path:'/index',
        	name:'index',
        	component:Index,
        	children:[
        		{
        			path:"",
        			component:welcome
        		},
        		{
        			path:"accountManage",
        			component:accountManage
        		},
        		{
        			path:"categoryManage",
        			component:categoryManage
        		},
                {
                    path:"goodsManage",
                    component:goodsManage
                }
        	]
        }
    ]
})