<template>
	<div>
		<header>账号管理</header>

        <el-button @click="showAccountEdit()" type="primary">新增账号</el-button>

		<el-table :data="accountList" v-loading="loadAccounts">
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="userName" label="昵称"></el-table-column>
			<el-table-column prop="account" label="账号名"></el-table-column>
			<el-table-column prop="" label="操作">
				<template scope="scope">
					<el-button @click.prevent="showAccountEdit(scope.row,scope.$index)" type="primary" size="mini">编辑</el-button>
                    <!-- <addAccountBtn btnState="editAccount"></addAccountBtn> -->
					<el-button v-if="scope.row.status" @click="toggleStatus(scope.$index,0)" type="warning" size="mini">禁用</el-button>
					<el-button v-else @click="toggleStatus(scope.$index,1)" type="success" size="mini">启用</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>


		<el-dialog  :visible.sync="dialogFormVisible">
		  <div slot="title">{{dialogName}}</div>

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


			<el-form-item label="角色身份" :label-width="formLabelWidth" prop="type">
			  <el-select v-model="form.type" placeholder="请选择用户身份" >
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
	</div>

</template>
<script>
// import Vue from 'vue'
// import {  Table , TableColumn , Button , Switch , Message } from 'element-ui'
import accountService from '../service/accountService'
import addAccountBtn from '../components/Add_account'

// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Button)
// Vue.use(Switch)
// Vue.prototype.$message = Message
export default {
    mixins: [],
    name: 'accountManage',
    components: {
        addAccountBtn
    },
    data(){
		//检验规则函数：
		var validateAccount = (rule, value, callback)=>{

			//如果可以，加个检查用户是否存在的API，然后请求它
			//在输入完，即发生blur之后查询账号

			accountService.getAccounts().then((res)=>{
				//通过判断status，1为存在，0为不存在
				if (res.status=='1') {
					callback(new Error('用户已存在'))
				}else{
					callback()
				}
			})
			.catch(function(error){
				callback(new Error('无法连接到服务器检查用户是否存在'))
			})

		  };
		var validatePass = (rule, value, callback) => {
			  if (this.form.checkPass !== '') {
				this.$refs.form.validateField('confirmPassword');
				callback();
			  }else{
				callback();
			  }
		};
		var validatePass2 = (rule, value, callback) => {
			if (value !== this.form.password) {
			  callback(new Error('两次输入密码不一致!'));
			} else {
			  callback();
			}
		};

    	return {
    		accountList:[

    		],
    		status:true,
            loadAccounts:true,


			dialogFormVisible: false,
			form: {
			  userName: '',
			  account: '',
			  password: '',
			  confirmPassword: '',
			  type:'',
			},

			matchPassword: false,
			formLabelWidth: '120px',
			checkRules:{
				//控制每一项值的检验函数，以及触发事件
				account:[
					{required:true ,message:"请输入账号"},
					{validator:validateAccount,trigger:'blur'}
				],
				userName:[
					// {validator:validateUserName,trigger:'blur'}
					{required:true,message:'请输入用户昵称',trigger:'blur'},
					{min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
				],
				password:[
					{required:true,message:"请输入密码"},
					{validator:validatePass,trigger:'blur'}
				],
				confirmPassword:[
					{required:true,message:"请再次输入密码"},
					{validator:validatePass2,trigger:'change'}
				],
				type:[
					{required:true,message:'请选择用户身份',trigger:'change'}
				]
			}
    	}
    },
    mounted(){
        accountService.getAccounts().then((res)=>{
            if(res.status==0){
                this.accountList=res.data;
                this.loadAccounts=false;
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    methods:{
    	editAccount(row,index){
    		this.$message.error("edit")
    	},
    	toggleStatus(index,status){
    		console.log("toggle",index,status)

    	},
        addAccount(){

        },

		showAccountEdit(userObj,index){
            if(userObj){
                this.form=userObj
            }
            else{
				this.form={
				  userName: '',
				  account: '',
				  password: '',
				  confirmPassword: '',
				  type:'',
				}
            }
            this.dialogFormVisible=true;
        },

		sendAccountInfo: (formName,btnState=this.btnState)=>{
			console.log(this.btnState)
			if(btnState=='addAccount'){
				console.log("a")
				this.$store.state.commit('dialogName','添加用户')
				//提交前进行检验,若检验有误，则不会进行下面的新增请求
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//发送请求
						var vm = this
						accountService.RegisterAccount(this.form)
						.then((response)=> {
							console.log(vm.form)
							if (response.msg == "success") {
								this.alertSuccess()
								this.dialogFormVisible = false
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

			}
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
	computed:{
		dialogName:function(){
			//获得按钮功能
			//无法获取
			console.log(this.btnState)
			if(this.btnState=="addAccount"){
				return "新增用户"
			}else if(this.btnState=="editAccount"){
				return "编辑"
			}
		}
	}
}

</script>
