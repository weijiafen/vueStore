<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import '../../assets/css/font/iconfont.css'
Vue.use(MintUI)
    export default {
        mixins: [],
        name: 'app',
        components: {}
    }

</script>