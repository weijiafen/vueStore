<template>
	<div class="pay">
		<mt-header title="订单详情">
            <mt-button slot="left" icon="back" @click="back">返回</mt-button>
        </mt-header>
        <div class="orderDetail">
            <h2>订单详情</h2>
            <div v-for="item in subOrders">
                <div>{{item.good.name}}</div>
                <div>{{item.number}}</div>
                <div>{{item.count}}</div>
            </div>
        </div>
	</div>
</template>
<script>
    import { Header } from 'mint-ui';
    export default {
        mixins: [],
        name: 'pay',
        components: {},
        data(){
        	return {
        		orderId:this.$route.params.orderId,
                subOrders:[
                    {
                        id:18,
                        number:2,
                        count:26.55,
                        good:{
                            id:18,
                            name:'栗子鸡新品满足餐',
                            price:26.25
                        },
                        labels:[

                        ]
                    }
                ],
                order:{
                    id:'',
                    count:26.25,
                    isPay:0,
                    createAt:1515241456844,
                    status:1
                }
        	}
        },
        activated(){
        	this.$nextTick(()=>{
        	})
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }

</script>
<style lang="scss">
    .pay{
        background-color: #f6f6f6;
        .orderDetail{
            background-color:#fff;
        }
    }
</style>