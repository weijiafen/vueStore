import Vue from 'vue'
import Router from 'vue-router'
const Shop = resolve => require(['../components/shop.vue'], resolve)
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/shop/:shopId/:deskId',
            name: 'Shop',
            component: Shop
        },
    ]
})