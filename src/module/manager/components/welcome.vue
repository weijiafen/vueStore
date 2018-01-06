<template>
	<div>
		<el-button type="primary" v-if="!isOpen" @click="open">开始营业</el-button>
		<el-button type="danger" v-if="isOpen" @click="close">结束营业</el-button>
	</div>
	
</template>
<script>
	import io from 'socket.io-client';
    export default {
        mixins: [],
        name: 'welcome',
        components: {},
        data(){
        	return {
        		isOpen:false,
        		shopId:localStorage.getItem('shopId'),
        		socket:null
        	}
        },
        methods:{
        	open(){
        		this.socket = io.connect(`http://localhost:8080?shopId=${this.shopId}`);
        		this.isOpen=true;

        	},
        	close(){
        		this.socket.close();
        		this.isOpen=false
        	}
        }
    }

</script>