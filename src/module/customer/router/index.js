import Vue from 'vue'
import Router from 'vue-router'
const Shop = resolve => require(['../components/shop.vue'], resolve)
const Index = resolve => require(['../components/index.vue'], resolve)
const Order = resolve => require(['../components/order.vue'], resolve)
const Pay = resolve => require(['../components/pay.vue'], resolve)
Vue.use(Router)
//菜单页，结算页，订单列表页，订单详情页
export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children:[
            	{
            		path: '/shop/:shopId/:deskId',
            		name: 'Shop',
            		component: Shop,
            	},
            	{
            		path: '/order/:shopId/:deskId',
            		name: 'order',
            		component: Order,
            	}
            ]
        },
        {
            path: '/pay/:orderId',
            name:'pay',
            component:Pay
        }
    ]
})