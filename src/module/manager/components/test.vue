<template>
	<div>
		<p>{{msg}}</p>
	</div>
	
</template>
<script>

    export default {
        mixins: [],
        name: 'welcome',
        components: {},
        data(){
        	return {
        		msg:"hello world"
        	}
        }
    }
    // vue 中文文档 https://www.vuefe.cn/v2/guide/index.html
    //ele ui 文档 http://element.eleme.io/#/zh-CN/component/installation
</script>