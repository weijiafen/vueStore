<template >
	<div>
        {{param}}

	</div>

</template>




<script>
    export default {
        mixins: [],
        name: 'compo',
        components:[],
        props:['param'],
        data(){   
        	return {
        		msg:"hello world", 
                message: 'Hello Vue!',
        	}
        },
        methods: {

        },  
    }


    // vue 中文文档 https://www.vuefe.cn/v2/guide/index.html
    //ele ui 文档 http://element.eleme.io/#/zh-CN/component/installation
</script>

