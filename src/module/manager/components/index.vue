<template>
	<div>
		<div>index</div>
<el-button type="primary">主要按钮</el-button>
		<router-view></router-view>
	</div>
	
</template>
<script>
import Vue from 'vue'
import {Button} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Button)
export default {
    mixins:[],
    components:{},
    data(){
        return {
        }
    },
    methods:{

    }
}
</script>