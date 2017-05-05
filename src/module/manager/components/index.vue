<template>
	<div>
		<div>index</div>
<el-button type="primary">主要按钮</el-button>
<el-progress :percentage="0"></el-progress>
		<router-view></router-view>
	</div>
	
</template>
<script>
import Vue from 'vue'
import { Button ,Progress } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
Vue.component(Button.name, Button)
Vue.component(Progress.name, Progress)
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