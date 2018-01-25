<template>
	<div class="saleHistory">
		<header>订单历史</header>
  		<el-form :inline="true">
			<el-form-item label="日期">
		    	<el-date-picker
		      v-model="fileterDate"
		      type="date"
		      placeholder="选择日期">
		    	</el-date-picker>
  			</el-form-item>
			<el-form-item label="订单ID">
    			<el-input v-model="fileterOrderId" placeholder="订单ID"></el-input>
  			</el-form-item>
  			<el-form-item>
			    <el-button type="primary" @click="getOrderList">查询</el-button>
			</el-form-item>
  		</el-form>
		<el-table :data="orderList">
			<el-table-column type="expand">
				<template scope="scope">
					<el-form label-position="left" inline class="demo-table-expand" v-for="suborder in scope.row.subOrders">
						<el-form-item label="商品名称">
				        	<span>{{ suborder.goodName }}</span>
				        </el-form-item>
				        <el-form-item label="商品数量">
				        	<span>{{ suborder.number }}</span>
				        </el-form-item>
				        <el-form-item label="小计">
				        	<span>￥{{ suborder.count }}</span>
				        </el-form-item>
					</el-form>
				</template>
			</el-table-column>
			
			<el-table-column
		      label="订单ID"
		      prop="id">
		    </el-table-column>
		    <el-table-column
		      label="总额"
		      prop="count">
		    </el-table-column>
		    <el-table-column
		      label="桌号"
		      prop="deskId">
		      <template scope="scope">
		      		{{scope.row.desk.name}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="日期"
		      prop="createAt" width="170px">
		      <template scope="scope">
		      		{{getDate(scope.row.createAt)}}
		      </template>
		    </el-table-column>
		</el-table>
	</div>
	
</template>
<script>
	import server from '../service/orderService'
	import util from '../../../assets/public/util'
    export default {
        mixins: [util],
        name: 'active',
        components: {},
        data(){
        	return {
        		orderList:[

        		],
        		fileterOrderId:'',
        		fileterDate:''
        	}
        },
        mounted(){
        	this.$nextTick(()=>{
        		this.fileterDate=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
        		this.getOrderList()
        	})
        },
        methods:{
        	getOrderList(){
        		server.getOrderList({
        			orderBy:'DESC',
        			status:[5],
        			filterDate:this.fileterDate.valueOf(),
        			fileterOrderId:this.fileterOrderId
        		}).then(res=>{
        			if(res.status==0){
        				this.orderList=res.data.order
        			}
        		})
        	},

        }
    }

</script>
<style lang="scss">
	.saleHistory{
		.el-table .cell, .el-table th>div{
			padding-left:4px;
			padding-right:4px;
		}
	}
</style>