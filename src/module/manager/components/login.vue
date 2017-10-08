<template>
	<div>
		<el-card class="login_box">
			<h1>登录后台管理系统</h1>
			<el-form label-width="60px">
				<el-form-item label="账号">
					<el-input />
				</el-form-item>
				<el-form-item label="密码">
					<input class="el-input__inner" type="password"/>
				</el-form-item>
				<el-form-item label="验证码">
					<el-input class="verification_code" />
					<img @click="changeCaptcha" :src="captcha" alt="验证码">
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="login_btn" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
	
</template>
<script>
	import server from '../service/accountService'
    export default {
        mixins: [],
        name: 'app',
        components: {},
        data(){
        	return {
        		captcha:"/captcha?"+new Date().valueOf()
        	}
        },
        methods:{
        	login(){
        		server.login().then((res)=>{
        			this.$router.push("/index")
        		})
        	},
        	changeCaptcha(){
        		this.captcha="/captcha?"+new Date().valueOf()
        	}
        }
    }

</script>
<style lang="scss">
	.login_box{
		min-width: 480px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-70%);
		h1{
			font-size: 22px;
			margin-bottom: 24px;
			color:#20A0FF;
		}
		.verification_code{
			width: 160px;
			& + img{
				position:absolute;
				cursor: pointer;
				width: 120px;
				height: 36px;
				left: 170px;
				top:2px;
			}
		}
		.login_btn{
			width:100px;
			margin-left:110px;
		}
	}
</style>