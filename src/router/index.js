import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Transition from '@/components/Transition'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
	   },
	   {
    	   path: '/Transition',
    	   name: 'Transition',
    	   component: Transition
	   }
    ]
})
