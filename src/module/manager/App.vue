<template>
	<div>
		<router-view></router-view>
	</div>
	
</template>
<script>
import Vue from 'vue'
import   ElementUI  from 'element-ui'
Vue.use(ElementUI)
    export default {
        mixins: [],
        name: 'app',
        components: {}
    }

</script>