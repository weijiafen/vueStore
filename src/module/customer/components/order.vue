<template>
	<div class="orderList">
		<div class="orderItem" v-for="order in orderList">
            <h2>
                {{order.desk.name}}
                <span v-if="order.status==1">未支付</span>
                <span v-if="order.status==2" class="completeTag">已支付</span>
                <span v-if="order.status==3" class="cancelTag">已取消</span>
                <span v-if="order.status==4" class="doingTag">正在制作</span>
                <span v-if="order.status==5" class="completeTag">订单已完成</span>
            </h2>
            <div class="orderTime">
                {{getDate(order.createAt)}}
                <span>￥{{order.count}}</span>
            </div>
            <div class="clearfix">
                <a v-if="order.isPay==0&&order.status==1" :href='`#/pay/${shopId}/${deskId}/${order.id}`' class="payBtn">立即支付</a>
                <a v-else :href='`#/pay/${shopId}/${deskId}/${order.id}`' class="detailBtn">订单详情</a>
            </div>
        </div>
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
                orderList:[]
        	}
        },
        activated(){
        	this.$nextTick(()=>{
        	})
        },
        mounted(){
            this.$nextTick(()=>{
                this.$root.eventHub.$emit('selectTab','tab2')
                server.getOrderList().then(res=>{
                    if(res.status==0){
                        this.orderList=res.data
                    }
                    
                })
                
            })
        },
        methods:{
            getDate(timeSteam){
                let time=new Date(timeSteam)
                let year=time.getFullYear()
                let month=time.getMonth()+1
                let day=time.getDate()
                let hour=time.getHours()
                let minutes=time.getMinutes()
                let seconds=time.getSeconds()
                hour=hour>=10?hour:'0'+hour
                minutes=minutes>=10?minutes:'0'+minutes
                seconds=seconds>=10?seconds:'0'+seconds
                return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
            }
        }
        
    }

</script>
<style lang="scss">
    .orderList{
        background-color: #eee;
        .orderItem{
            padding: 10px;
            margin-bottom: 5px;
            background-color: #fff;
            h2{
                font-size: 1.2rem;
                font-weight: normal;
                span{
                    font-size: 1rem;
                    float: right;
                    color:#999;
                    &.cancelTag{
                        color:#f44336;
                    }
                    &.doingTag{
                        color:#26a2ff;
                    }
                    &.completeTag{
                        color:#13ce66;
                    }
                }
            }
            .orderTime{
                padding:5px;
                color: #555;
                border-bottom: 1px solid #eee;
                span{
                    float: right;
                    color:#fb4c16;
                }
            }
            .payBtn{
                float: right;
                text-decoration: none;
                color: #fff;
                background-color: #26a2ff;
                padding: 2px 5px;
                margin-top: 8px;
                border-radius: 5px;
            }
            .detailBtn{
                float: right;
                text-decoration: none;
                color: #888;
                background-color: #ddd;
                padding: 2px 5px;
                margin-top: 8px;
                border-radius: 5px;
            }
        }
    }
</style>