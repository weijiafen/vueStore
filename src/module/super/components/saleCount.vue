<template>
	<div class="saleCount">
		<h2>销售记录</h2>
        <br/>
        <el-table :data="saleList">
            <el-table-column
            prop="id"
            label="ID"
            align="left"
            width=""
            >
            </el-table-column>
            <el-table-column
            prop="photo"
            label="头像"
            align="left"
            width=""
            >
            </el-table-column>
            <el-table-column
            prop="userName"
            label="店名"
            align="left"
            width=""
            >
            </el-table-column>
            <el-table-column
            prop="openBusiness"
            label="是否营业"
            align="left"
            width=""
            >
            </el-table-column>
            <el-table-column
            prop="allCount"
            label="总销售额"
            align="left"
            width=""
            >
            </el-table-column>
            <el-table-column
            prop="onlineCount"
            label="在线支付"
            align="left"
            width=""
            >
            </el-table-column>
        </el-table>
	</div>
</template>
<script>
    import server from '../service/service'
    export default {
        mixins: [],
        name: 'saleCount',
        components: {},
        data(){
        	return {
        		saleList:[]
        	}
        },
        computed:{
            
        },
        mounted(){
            this.$nextTick(()=>{
                server.getCount({
                    type:2,
                    filterDate:new Date().valueOf()
                }).then(res=>{
                    if(res.status==0){
                        this.saleList=res.data
                    }
                })
            })
        },
        methods:{
        	
        }
    }

</script>
<style lang="scss">
    .saleCount{
        
    }
</style>