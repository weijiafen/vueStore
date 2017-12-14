<template>
	<div class="setting">
		<header>店铺设置</header>
		<el-form :model="setting"  label-width="5rem" ref="settingForm" >
			<el-form-item label="店铺名称" prop="userName" :rules="[
            { required: true, message: '店铺名称不能为空',trigger: 'blur' }
        ]" >
				<el-input v-model="setting.userName" />
			</el-form-item>
			<el-form-item label="店铺公告">
				<el-input type="textarea" v-model="setting.notice" />
			</el-form-item>
			<el-form-item label="店铺头像">
				<el-upload
				  class="avatar-uploader"
				  action="/upload"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="setting.photo" :src="setting.photo" class="avatar userPhoto">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-button type="primary" class="save_btn" @click="save">保存</el-button>
		</el-form>
		
	</div>
	
</template>
<script>
import accountService from '../service/accountService.js'
    export default {
        mixins: [],
        name: 'setting',
        components: {},
        data(){
	        return {
	        	setting:{
	        		userName:"",
	        		notice:"",
	            	photo:""
	        	}
	        	
	        }
	    },
	    mounted(){
	    	accountService.getSetting().then(res=>{
	    		if(res.status===0){
                    this.setting.userName=res.data.userName
                    this.setting.notice=res.data.notice
                    this.setting.photo=res.data.photo
                }
	    	})
	    },
        methods:{
        	handleAvatarSuccess(res){
        		this.setting.photo=res.src
        	},
        	beforeAvatarUpload(){},
        	save(){
        		this.$refs.settingForm.validate((valid) => {
        			if (valid) {
        				accountService.putSetting(this.setting).then(res=>{
        					if(res.status==0){
        						this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
        					}else{
        						this.$message.error(res.msg);
        					}
        				})
        			}
        		})
        	}
        }
    }

</script>
<style lang="scss">
	.setting{
		.save_btn{
			width:100%;
		}
		.userPhoto{
			max-width:100%;
		}
	}
</style>