<template>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
		
	
</template>
<script>
import Vue from 'vue'
import   ElementUI  from 'element-ui'
// import '../../assets/css/font/iconfont.css'
Vue.use(ElementUI)
    export default {
        mixins: [],
        name: 'app',
        components: {}
    }

</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>