<template>
	<div @keyup="show($event)">
		<el-card class="login_box">
			<h1>登录超管系统</h1>
			<el-form label-width="3rem">
				<el-form-item label="账号">
					<el-input v-model="account" />
				</el-form-item>
				<el-form-item label="密码">
					<input class="el-input__inner" type="password" v-model="password"/>
				</el-form-item>
				<el-form-item label="验证码">
					<el-input class="verification_code" v-model="captcha" />
					<img @click="changeCaptcha" :src="captchaImg" alt="验证码">
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="saveAccount" @change="changeSave">记住密码</el-checkbox>
				</el-form-item>
				<el-button type="primary" class="login_btn" @click="login">登录</el-button>
			</el-form>
		</el-card>
	</div>
	
</template>
<script>
	import server from '../service/service'
    export default {
        mixins: [],
        name: 'app',
        components: {},
        data(){
        	return {
        		account:'',
        		password:'',
        		captcha:'',
        		saveAccount:false,
        		captchaImg:"/captcha?"+new Date().valueOf()
        	}
        },
        mounted(){
        	let isSave=localStorage.getItem("saveSuperAccount")
        	if(isSave==1){
        		this.saveAccount=true
        		this.account=localStorage.getItem("superAccount")
        		this.password=localStorage.getItem("superPassword")
        	}else{
        		this.saveAccount=false
        	}
        },
        methods:{
            show:function(ev){  
                if(ev.keyCode == 13){  
                    this.login();
                }  
            },

        	login(){
        		server.login({
        			account:this.account,
        			password:this.password,
        			captcha:this.captcha
        		}).then((res)=>{
        			if(res.status==0){
        				localStorage.setItem('shopId', res.data.shopId);
        				this.$router.push("/account")

        			}else{
        				this.$alert(res.msg)
        				this.changeCaptcha();
        			}
        			if(this.saveAccount){
                        localStorage.setItem("superAccount",this.account)
                        localStorage.setItem("superPassword",this.password)
                    }
        		})
        	},
        	changeCaptcha(){
        		this.captchaImg="/captcha?"+new Date().valueOf()
        	},
        	changeSave(val){
        		if(this.saveAccount==0){
        			localStorage.setItem("saveSuperAccount",0)
        			localStorage.setItem("superAccount","")
        			localStorage.setItem("superPassword","")
        		}else{
                    localStorage.setItem("saveSuperAccount","1")
                }
        	}
        }
    }

</script>
<style lang="scss">
	.login_box{
		width: 80%;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		h1{
			font-size: 1rem;
			margin-bottom: 24px;
			color:#5c6063;
		}
		.el-form-item__label{
			font-size:.6rem;
		}
		.verification_code{
			width: 100px;
			& + img{
				position:absolute;
				cursor: pointer;
				width: 100px;
				height: 36px;
				left: 100px;
				top:2px;
			}
		}
		.login_btn{
			width:100%;
			font-size:.7rem;
            color: #fff;
            background-color: #5c6063;
            border-color: #5c6063;
			// margin-left:110px;
		}
	}
</style>