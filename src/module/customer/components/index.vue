<template>
	<div class="index">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <mt-tabbar v-model="selected" :fixed="true">
            <mt-tab-item id="tab1">
                <a :href="'#/shop/'+shopId+'/'+deskId">菜单</a>
            </mt-tab-item>
            <mt-tab-item id="tab2">
                <a :href="'#/order/'+shopId+'/'+deskId">订单</a>
            </mt-tab-item>
        </mt-tabbar>
	</div>
</template>
<script>

    export default {
        mixins: [],
        name: 'shop',
        components: {},
        data(){
        	return {
        		shopId:this.$route.params.shopId,
        		deskId:this.$route.params.deskId,
                selected:"tab1"
        	}
        },
        activated(){
        	this.$nextTik(()=>{
        	})
        }
    }

</script>
<style lang="scss">
    .index{
        .mint-tab-item{
            background-color: #eaeaea;
            color:#26a2ff;
            &.is-selected{
                background-color: #26a2ff;
                a{
                    color: #fff;
                }
            }
        }
        .mint-tab-item-label{
            a{
                display:block;
                font-size:1rem;
                text-decoration: none;
                color: #888;
            }
        } 
    }
    

</style>