<template>
	<div>
		<el-upload
		  class="avatar-uploader"
		  action="/upload"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
	
</template>
<script>

    export default {
        mixins: [],
        name: 'setting',
        components: {},
        data(){
	        return {
	            imageUrl:""
	        }
	    },
        methods:{
        	handleAvatarSuccess(res){
        		this.imageUrl=res.src
        	},
        	beforeAvatarUpload(){}
        }
    }

</script>