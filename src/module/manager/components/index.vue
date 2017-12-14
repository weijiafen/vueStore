<template>
	<div>
        <el-menu :default-active="$route.path" theme="dark" mode="horizontal" menu-trigger="click" :router="true">
            <el-submenu index="shop">
                <template slot="title">店铺</template>
                <el-menu-item index="/activeManage">活动</el-menu-item>
                <el-menu-item index="/setting">设置</el-menu-item>
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
                <el-menu-item index="/goodsReport">商品销售报表</el-menu-item>
                <el-menu-item index="/saleReport">销售额报表</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="mainContainer">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
	</div>
	
</template>
<script>


// import 'element-ui/lib/theme-default/index.css'


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
           
        }
    }
}
</script>
<style type="scss">

</style>