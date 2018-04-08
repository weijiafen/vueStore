<template>
	<div>
        <el-menu :default-active="$route.path" theme="dark" mode="horizontal" menu-trigger="click" :router="true">
            <el-submenu index="shop">
                <template slot="title">店铺</template>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/activeManage">活动</el-menu-item>
                <el-menu-item index="/setting">店铺设置</el-menu-item>
                <el-menu-item index="/desk">桌号设置</el-menu-item>
            </el-submenu>
            <el-submenu index="goods">
                <template slot="title">菜单</template>
                <el-menu-item index="/categoryManage">
                分类管理
                </el-menu-item>
                <el-menu-item index="/goodsManage">商品管理</el-menu-item>
            </el-submenu>
            <el-submenu index="report">
                <template slot="title">统计</template>
                <el-menu-item index="/saleHistory">订单历史</el-menu-item>
                <el-menu-item index="/goodsReport">商品销售报表</el-menu-item>
                <el-menu-item index="/saleReport">销售额报表</el-menu-item>
            </el-submenu>
            <el-button @click="logout" class="logout" type="danger" size="small">退出</el-button>
        </el-menu>
        <div class="mainContainer">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
	</div>
	
</template>
<script>
import server from '../service/accountService'
export default {
    mixins:[],
    components:{},
    data(){
        return {
            navbarIndex:""
        }
    },
    mounted(){
        this.setNavbarIndex()
    },
    updated(){
        this.setNavbarIndex()
    },
    methods:{
        setNavbarIndex(){
           
        },
        logout(){
            server.logout().then((res)=>{
                if(res.status==0){
                    this.$message({
                        type: 'success',
                        message: '账号已退出!'
                    });
                    this.$router.push("/login")
                }
            })
        }
    }
}
</script>
<style type="scss">
    .logout{
        float: right;
        margin-top: 18px;
        margin-right: 6px;
    }
</style>