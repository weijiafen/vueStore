<template>
	<div>
		<header>账号管理</header>
        <!-- <el-button @click="addAccount" type="primary">新增账号</el-button> -->
        <addAccountBtn btnState="addAccount"></addAccountBtn>
		<el-table :data="accountList">
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="userName" label="昵称"></el-table-column>
			<el-table-column prop="account" label="账号名"></el-table-column>
			<el-table-column prop="" label="操作">
				<template scope="scope"> 
					<el-button @click.prevent="editAccount(scope.row,scope.$index)" type="primary" size="mini">编辑</el-button>
					<el-button v-if="scope.row.status" @click="toggleStatus(scope.$index,0)" type="warning" size="mini">禁用</el-button>
					<el-button v-else @click="toggleStatus(scope.$index,1)" type="success" size="mini">启用</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</template>
				
			</el-table-column>
		</el-table>
	</div>
	
</template>
<script>
import Vue from 'vue'
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
    	return {
    		accountList:[
    			
    		],
    		status:true
    	}
    },
    mounted(){
        accountService.getAccounts().then((res)=>{
            if(res.status==0){
                this.accountList=res.data;
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
            
        }
    }
}

</script>