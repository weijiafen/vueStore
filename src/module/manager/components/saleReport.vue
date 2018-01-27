<template>
	<div>
		<header>商品销售报表</header>
		<el-form :inline="true">
			<el-form-item label="报表类型">
			    <el-select v-model="type">
			    	<el-option label="月" value="2"></el-option>
			    	<el-option label="年" value="3"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="日期" v-if="type==2">
		    	<el-date-picker
				    v-model="filterDate"
				    type="month"
				    placeholder="选择月">
				 </el-date-picker>
  			</el-form-item>
  			<el-form-item label="年份" v-else>
		    	<el-date-picker
				    v-model="filterDate"
				    type="year"
				    placeholder="选择年">
				 </el-date-picker>
  			</el-form-item>
  			<el-form-item>
			    <el-button type="primary" @click="getReport">查询</el-button>
			</el-form-item>
  		</el-form>
		<chart :options="polar" style="width:100%"></chart>
	</div>
	
</template>
<script>
	import Vue from 'vue'
	import ECharts from 'vue-echarts/components/ECharts.vue'
	// 手动引入 ECharts 各模块来减小打包体积
	import 'echarts/lib/chart/line'
	import 'echarts/lib/component/tooltip'

	// 注册组件后即可使用
	Vue.component('chart', ECharts)
	import server from '../service/orderService'
    export default {
        mixins: [],
        name: 'active',
        components: {},
        data(){
		    return {
		    	filterDate:'',
		      	polar: {
		      		color: ['#fd7428','#3398DB'],
			      	title: {
				        text: '销售额报表'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:'在线支付',
				            type:'line',
				            data:[]
				        },
				        {
				            name:'总销售额',
				            type:'line',
				            data:[]
				        }
				    ]
		      	},
		      	type:"2"
		    }
        },
        mounted(){
        	this.$nextTick(()=>{
        		this.filterDate=new Date()
        		// this.getReport()
        	})
        },
        methods:{
        	getReport(){
        		if(this.filterDate){
        			server.getSaleReport({
	        			filterDate:this.filterDate.valueOf(),
	        			type:this.type
	        		}).then(res=>{
	        			if(res.status==0){
	        				this.parseData(res.data);
	        			}else{
	        				this.$message.error(res.msg);
	        			}
	        		})
        		}else{
        			this.$message.error("未选择时间");
        		}
        		
        		
        	},
        	parseData(data){
        		let xAxis=[]
        		let series=[]
        		let online=[]
        		for(let i=0;i<data.titleArr.length;i++){
        			xAxis.push(data.titleArr[i])
        			series.push(data.reports[i].sum||0)
        			online.push(data.onlinePayReport[i].sum||0)
        		}
        		this.polar.xAxis.data=xAxis
        		this.polar.series[0].data=online
        		this.polar.series[1].data=series
        		
        	},
        }
    }

</script>