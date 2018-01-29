<template>
	<div class="index">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
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
    import server from '../service/customerService'
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
        beforeRouteEnter(to, from, next){
            var href=location.href;
            var hasCode=href.match(/code=[\d\w]{1,}&/)
            let shopId=to.params.shopId
            let deskId=to.params.deskId
            var isLogin=sessionStorage.getItem("isLogin")
            if(!isLogin){
                if(hasCode){
                   next(vm=>{
                        var code=hasCode[0].slice(5,-1)
                        server.sendWXCode(code).then(res=>{
                            if(res.status!=0){
                                alert("登录异常")
                                location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9c22df153e7dd7b&redirect_uri=http%3A%2F%2Fwww.yslpartition.com%2Fcustomer.html%23%2Fshop%2F${shopId}%2F${deskId}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                            }else{
                                sessionStorage.setItem("isLogin","true")
                            }
                        })
                   }) 
                }else{
                    location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9c22df153e7dd7b&redirect_uri=http%3A%2F%2Fwww.yslpartition.com%2Fcustomer.html%23%2Fshop%2F${shopId}%2F${deskId}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }
            }
            
        },
        mounted() {
            this.$root.eventHub.$on('selectTab',(data)=>{
                if(data){
                    this.selected = data;
                }
            })
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
                line-height:2;
                text-decoration: none;
                color: #666;
            }
        } 
    }
    

</style>