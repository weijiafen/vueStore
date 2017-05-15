<template>

<div>

  <!-- Form -->
  <el-button :plain="true" @click="dialogFormVisible = true">新增用户</el-button>

  <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
	
	<el-form :model="form" ref="form" :rules="checkRules">

	  <el-form-item label="登录账号" :label-width="formLabelWidth" prop="account">
		<el-input v-model="form.account" auto-complete="off"></el-input>
	  </el-form-item>

	  <el-form-item label="账号昵称" :label-width="formLabelWidth" prop="userName">
		<el-input v-model="form.userName" auto-complete="off"></el-input>
	  </el-form-item>

	  <el-form-item label="登录密码" :label-width="formLabelWidth" prop="password">
		<el-input v-model="form.password" auto-complete="off" type="password"></el-input>
	  </el-form-item>

	  <el-form-item label="确认登录密码" :label-width="formLabelWidth" prop="confirmPassword">
		<el-input v-model="form.confirmPassword" auto-complete="off" type="password"></el-input>
	  </el-form-item>


	  <el-form-item label="角色身份" :label-width="formLabelWidth">
		<el-select v-model="form.selectedType" placeholder="请选择用户身份">
					<el-option label="柜台账号" value="2" ></el-option>
		  <el-option label="厨房账号" value="3"></el-option>

		</el-select>
	  </el-form-item>
			
	</el-form>
		
	<div slot="footer" class="dialog-footer">
	  <el-button @click="dialogFormVisible = false">取 消</el-button>
	  <el-button type="primary" @click="sendAccountInfo('form')">确 定</el-button>
	</div>
		
  </el-dialog>

	<!-- 测试方法 -->
  <!-- <el-button :plain="true" @click="alertSuccess">成功提醒</el-button>
  <el-button :plain="true" @click="alertFail">失败提醒</el-button>
	<el-button :plain="true" @click="alertWarning('尝试次数过多，请稍后重试')">警告提醒</el-button> -->
</div>



</template>

<script>
import Vue from 'vue'
import { Button , Select , Dialog,Form} from 'element-ui'
import accountService from '../service/accountService'

export default {

		//检验规则函数：
	var validateAccount = (rule, value, callback) => {
		if (!value) {
			 callback(new Error('请输入账号'));
		} 
		//示例模拟,可在此添加检查用户是否存在的请求
		/*
		setTimeout(()=>{
			if(value=='admin'){
				callback(new Error('用户已存在'));
			}else{
				callback();
			}
		},1000);
		*/
					
		//如果可以，加个检查用户是否存在的API，然后请求它
		//在输入完，即发生blur之后查询账号
		setTimeout(() => {
			accountService.getAccount().then((res)=>{
				//通过判断status，1为存在，0为不存在
				if (response.status=='1') {
					callback(new Error('用户已存在'));
				} else {
					callback();
				}
			})
			.catch(function(error){
				callback(new Error('无法连接到服务器检查用户是否存在'));
			})
		}, 100);			
	  };
	var validateUserName = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('昵称不能为空'));
		} else {
		  if (this.form.userName !== '') {
			//todo
		  }
		  callback();
		}
	};
	var validatePass = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请输入密码'));
		} else {
		  if (this.form.checkPass !== '') {
			this.$refs.form.validateField('confirmPassword');
		  }
		  callback();
		}
	};
	var validatePass2 = (rule, value, callback) => {
		if (value === '') {
		  callback(new Error('请再次输入密码'));
		} else if (value !== this.form.password) {
		  callback(new Error('两次输入密码不一致!'));
		} else {
		  callback();
		}
	};
			
	return {
		dialogFormVisible: false,
		form: {
		  userName: '',
		  account: '',
		  password: '',
		  confirmPassword: '',
		  selectedType:'',
		},
				
		matchPassword: false,
		formLabelWidth: '120px',
		checkRules:{
			//控制每一项值的检验函数，以及触发事件
			account:[
				{validator:validateAccount,trigger:'blur'}
			],
			userName:[
				{validator:validateUserName,trigger:'blur'}
			],
			password:[
				{validator:validatePass,trigger:'blur'}
			],
			confirmPassword:[
				{validator:validatePass2,trigger:'change'}
			]
		}
	  };
	},

	methods: {

		sendAccountInfo: function(formName) {

			//提交前进行检验,若检验有误，则不会进行下面的新增请求
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//发送请求
					var vm = this
					accountService.RegisterAccount(this.form)
					.then((response)=> {
						console.log(vm.form)
						if (response.msg == "success") {
							alertSuccess()
							dialogFormVisible = false
						} else {
							vm.alertFail()
						}
					})
					.catch(function(error) {
						console.log(vm.form)
						vm.alertFail()
					})
		  		} 
				else {
					return false;
		  		}		
		});		
	  },
			
		//弹窗通知提示的方法
		alertSuccess: function() {
			this.$message({
			  message: '用户已成功添加',
			  type: 'success'
			});
		},
		alertFail: function() {
			this.$message({
			  message: '提交失败',
			  type: 'error'
			});
		},
		alertWarning: function(alertMsg) {
			this.$message({
			  message: alertMsg,
			  type: 'warning'
			});
		},
	},

};
</script>