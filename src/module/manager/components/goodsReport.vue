<template>
	<div>
		<header>商品销售报表</header>
		<el-form :inline="true">
			<el-form-item label="报表类型">
			    <el-select v-model="type">
			    	<el-option label="天" value="1"></el-option>
			    	<el-option label="月" value="2"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="日期" v-if="type==1">
		    	<el-date-picker
				    v-model="filterDate"
				    type="date"
				    placeholder="选择日期">
				 </el-date-picker>
  			</el-form-item>
  			<el-form-item label="月份" v-else>
		    	<el-date-picker
				    v-model="filterDate"
				    type="month"
				    placeholder="选择月">
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
	import 'echarts/lib/chart/bar'
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
			      	color: ['#3398DB'],
			        title: {
		                text: '商品销售报表'
		            },
		            tooltip: {},
		            legend: {
		                data:['销量']
		            },
		            xAxis: {
		                data: []
		            },
		            yAxis: {},
		            series: [{
		                name: '销量',
		                type: 'bar',
		                data: []
		            }]
		      	},
		      	type:"1"
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
        			server.getGoodReport({
	        			filterDate:this.filterDate.valueOf(),
	        			type:this.type
	        		}).then(res=>{
	        			if(res.status==0){
	        				this.parseData(res.data.order);
	        			}else{
	        				this.$message.error(res.msg);
	        			}
	        		})
        		}else{
        			this.$message.error("未选择时间");
        		}
        		
        		
        	},
        	parseData(dataList){
        		let xAxis=[]
        		let series=[]
        		for(let data of dataList){
        			xAxis.push(data.good.name)
        			series.push(data.sum)
        		}
        		this.polar.xAxis.data=xAxis
        		this.polar.series[0].data=series
        	},
        }
    }

</script>