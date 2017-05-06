<template>
	<div>
        <el-row>
            <el-col :xs="24" :sm="24">
                <el-menu theme="dark" mode="horizontal">
                    <el-menu-item index="accountManage">
                        <a href="#/index/accountManage">
                        账号管理
                        </a>
                    </el-menu-item>
                    <el-menu-item index="categoryManage">
                        <a href="#/index/categoryManage">
                        菜单管理
                        </a>
                    </el-menu-item>
                    <el-menu-item index="goodsManage">商品管理</el-menu-item>
                    <el-menu-item index="activeManage">活动管理</el-menu-item>
                    <el-submenu index="report">
                        <template slot="title">数据统计</template>
                        <el-menu-item index="goodsReport">商品销售报表</el-menu-item>
                        <el-menu-item index="saleReport">销售额报表</el-menu-item>
                    </el-submenu>
                    <span class="logo">Manager</span>
                </el-menu>
            </el-col>
            <el-col :xs="24" :sm="24">
                <router-view></router-view>
            </el-col>
        </el-row>
	</div>
	
</template>
<script>
import Vue from 'vue'
import { Row ,Col , Menu , Submenu , MenuItem } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
export default {
    mixins:[],
    components:{},
    data(){
        return {
        }
    },
    methods:{

    }
}
</script>
<style type="scss">
.logo{
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
    float: right;
    color:#Fff;
    margin-right: 20px;
}
</style>