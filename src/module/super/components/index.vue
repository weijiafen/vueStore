<template>
	<div>
        <el-menu :default-active="$route.path" theme="dark" mode="horizontal" menu-trigger="click" :router="true">
            <el-submenu index="shop">
                <template slot="title">店铺</template>
                <el-menu-item index="/account">账号管理</el-menu-item>
            </el-submenu>
            <el-submenu index="goods">
                <template slot="title">销售</template>
                <el-menu-item index="/saleCount">
                销售记录
                </el-menu-item>
                <el-menu-item index="/order">订单查询</el-menu-item>
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
            // navbarIndex:""
        }
    },
    mounted(){
        // this.setNavbarIndex()
    },
    updated(){
        // this.setNavbarIndex()
    },
    methods:{
        // setNavbarIndex(){
           
        // }
    }
}
</script>
<style type="scss">

</style>