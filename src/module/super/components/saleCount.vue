<template>
	<div class="saleCount">
		<h2>销售记录</h2>
        <br/>
        <el-form :inline="true">
            <el-form-item label="起始日期">
                <el-date-picker
                  v-model="filterDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="getReport">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="saleList">
            <el-table-column
            prop="id"
            label="ID"
            align="left"
            width="80px"
            >
            </el-table-column>
            <el-table-column
            prop="photo"
            label="头像"
            align="left"
            width=""
            >
                <template scope="scope">
                    <img class="photo" width="40px" :src="scope.row.photo">
                </template>
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
            <el-table-column
            prop="expireTime"
            label="过期时间"
            align="left"
            width=""
            >
                <template scope="scope">
                    {{getDate(scope.row.expireTime)}}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
	</div>
</template>
<script>
    import server from '../service/service'
    import util from '../../../assets/public/util'
    export default {
        mixins: [util],
        name: 'saleCount',
        components: {},
        data(){
            var now=new Date()
            var year=now.getFullYear()
            var month=now.getMonth()
        	return {
        		saleList:[],
                filterDate:[new Date(year,month,1),new Date(year,month+1,0)],
                type:'2',
                pageSize:10,
                page:1,
                total:0,
        	}
        },
        computed:{
            
        },
        mounted(){
            this.$nextTick(()=>{
                
            })
        },
        methods:{
        	getReport(){
                server.getCount({
                    startDate:this.filterDate[0].valueOf(),
                    endDate:this.filterDate[1].valueOf(),
                    page:this.page,
                    pageSize:this.pageSize
                }).then(res=>{
                    if(res.status==0){
                        this.saleList=res.data
                        this.total=res.total
                    }
                })
            },
            handleSizeChange(pageSize){
                this.pageSize=pageSize;
                this.getReport();
            },
            handleCurrentChange(page){
                this.page=page;
                this.getReport();
            },
        }
    }

</script>
<style lang="scss">
    .saleCount{
        .photo{
            width:40px;
            height:40px;
            vertical-align: bottom;
            margin:4px 0;
        }
        .pagination{
            text-align: center;
            margin-top: 14px;
        }
    }
</style>