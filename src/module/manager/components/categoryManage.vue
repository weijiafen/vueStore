<template>
	<div>
		<div v-for="category in categoryList">
            <el-input v-model="category.text"></el-input> 
        </div>
	</div>
	
</template>
<script>
import Vue from 'vue'
// import {   Button , Input } from 'element-ui'

// Vue.use(Button)
// Vue.use(Input)
export default {
    mixins: [],
    name: 'categoryManage',
    components: {},
    data(){
        return {
            categoryList:[
                {
                    id:1,
                    text:"香烟"
                }
            ]
        }
    },
    mounted(){

    }
}

</script>