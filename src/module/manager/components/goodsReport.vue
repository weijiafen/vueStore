<template>
	<div>
		<header>商品销售报表</header>
		<el-form :inline="true">
			<el-form-item label="月份">
		    	<el-date-picker
				    v-model="filterMonth"
				    type="month"
				    placeholder="选择月">
				 </el-date-picker>
  			</el-form-item>
  			<el-form-item>
			    <el-button type="primary" @click="getReport">查询</el-button>
			</el-form-item>
  		</el-form>
		<chart :options="polar" style="width:100%"></chart>
		商品销售报表
		柱状图
		默认查当天每个商品的销售量
		开始结束时间查区间销售量
		可选择某个商品结合时间查销售量

		销售额报表
		折线图
		默认查当前月销售额
		可选择查某个月销售额
		筛选桌号
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
	import {  MessageBox  } from 'mint-ui';
    export default {
        mixins: [],
        name: 'active',
        components: {},
        data(){
		    return {
		    	filterMonth:'',
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
		      	}
		    }
        },
        mounted(){
        	this.$nextTick(()=>{
        		this.filterMonth=new Date()
        		this.getReport()
        	})
        },
        methods:{
        	getReport(){
        		server.getGoodReport({
        			filterMonth:this.filterMonth.valueOf()
        		}).then(res=>{
        			if(res.status==0){
        				this.parseData(res.data.order);
        			}else{
        				MessageBox('Notice', res.msg);
        			}
        		})
        		
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
        	}
        }
    }

</script>