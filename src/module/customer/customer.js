import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
 var vm=new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    data: {
        eventHub: new Vue()
    },
    mounted(){
    	this.$nextTick(()=>{
    		window.myVM=vm
    	})
    }
})