<template>
	<div class="pay">
		<mt-header title="订单详情">
            <mt-button slot="left" icon="back" @click="back">返回</mt-button>
        </mt-header>
        <div class="payTime" v-if="canPay">
            支付剩余时间：{{this.payTime}}
        </div>
        <div class="payTime" v-if="!canPay&&this.order.status==1">
            超过支付时间，订单将自动取消。
        </div>
        <div class="orderDetail">
            <h2>订单详情</h2>
            <div class="subOrder clearfix" v-for="item in subOrders">
                <div class="name">
                    <div>
                        {{item.goodName}}
                    </div>
                    <span v-for="label in item.chooceLabels" :style="{backgroundColor:label.bgColor}">
                        {{label.name}}
                    </span>
                </div>
                <div class="number">{{item.number}}</div>
                <div class="count">
                    <span>
                        {{item.count}}
                    </span>
                </div>
            </div>
            <div class="desk">桌号：{{order.desk.name}}</div>
        </div>
        <div class="payFooter clearfix">
            <div class="totalPrice priceIcon">
                总额：{{order.count}}
            </div>
            <div v-if="order.status==1" class="payBtn" :class="{disabled:!canPay}" @click="payOrder">确认支付</div>
        </div>
	</div>
</template>
<script>
    import server from '../service/customerService'
    import { Header , MessageBox ,Toast , Indicator } from 'mint-ui';
    export default {
        mixins: [],
        name: 'pay',
        components: {},
        data(){
        	return {
                orderId:this.$route.params.orderId,
                shopId:this.$route.params.shopId,
        		deskId:this.$route.params.deskId,
                subOrders:[],
                order:{
                    desk:{}
                },
                payTime:'00:00',
                canPay:false
        	}
        },
        activated(){
        	
        },
        mounted(){
            this.$nextTick(()=>{
                server.getOrder(this.orderId).then(res=>{
                    if(res.status==0){
                        this.setOrderData(res.data);
                    }else{
                        MessageBox('Notice', res.msg);
                    }
                })
            })
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            setOrderData(data){
                this.getLabelObj(data.order.subOrders)
                
                this.subOrders=data.order.subOrders
                this.order=data.order
                if(this.order.status==1){
                    this.canPay=true
                }
                this.setPayTime()
            },
            getLabelObj(subOrders){
                //遍历每个子单
                for(let subOrder of subOrders){
                    let chooceLabelsArr=subOrder.labels.split(",")
                    subOrder.chooceLabels=[]
                    //遍历子单中的每个标签
                    for(let item of chooceLabelsArr){
                        //从商品所有标签中找出所选标签对象
                        for(let label of subOrder.good.labels){
                            if(label.id==item){
                                subOrder.chooceLabels.push(label)
                                break;
                            }
                        }
                    }
                }
            },
            setPayTime(){
                if(this.order.status==1){
                    
                    let nowTime=new Date().valueOf()
                    //订单创建十五分钟内可支付
                    if(nowTime-this.order.createAt<15*60*1000){
                        var that=this;

                        var intervalTag=setInterval(function(){
                            let restTime=15*60*1000-(new Date().valueOf()-that.order.createAt);
                            
                            if(restTime>0){
                                let minus=parseInt(restTime/60/1000)
                                let second=parseInt(restTime/1000%60)
                                let minusStr=minus>=10?minus:'0'+minus
                                let secondStr=second>=10?second:'0'+second
                                that.payTime=minusStr+':'+secondStr
                            }else{
                                clearInterval(intervalTag);
                                that.canPay=false
                            }
                        },500)
                    }else{
                        this.canPay=false
                    }
                }
            },
            payOrder(){
                if(this.canPay){
                    Indicator.open();
                    server.payOrder({
                        orderId:this.orderId,
                        shopId:this.shopId
                    }).then(res=>{
                        if(res.status==0){
                            Toast({
                                message: '支付成功',
                                position: 'bottom',
                                duration: 1500
                            });
                            this.$router.push(`/order/${this.shopId}/${this.deskId}`)
                        }else{
                            MessageBox('Notice', res.msg);
                        }
                        Indicator.close();
                    })
                }
            }
        }
    }

</script>
<style lang="scss">
    .pay{
        background-color: #f6f6f6;
        .orderDetail{
            background-color:#fff;
            margin-top: 5px;
            h2{
                font-size: 1.4rem;
                padding: 5px;
                font-weight:normal;
            }
            .subOrder{
                padding: 0 5px 5px;
                border-bottom: 1px solid #eee;
                .name{
                    float: left;
                    width: 60%;
                    font-size: 1.2rem;
                    &>div{
                        line-height: 2rem;
                    }
                    span{
                        font-size: .6rem;
                        color:#fff;
                        padding:2px;
                        margin: 1px 2px;
                        float: left;
                        border-radius:3px;

                    }
                }
                .number{
                    float: left;
                    width: 10%;
                    color:#999;
                    height: 2rem;
                    line-height: 2rem;
                }
                .count{
                    float: left;
                    width: 30%;
                    text-align: right;
                    color: #fb4c16;
                    height: 2rem;
                    line-height: 2rem;
                    span:before{
                        display: inline-block;
                        content: '\FFE5';
                        font-size: .6rem;
                    }
                }
            }
        }
        .payTime{
            color:#fb4c16;
            text-align: center;
            font-size: .8rem;
            line-height: 2;
        }
        .desk{
            padding:5px;
        }
        .payFooter{
            position: fixed;
            border-top: 1px solid #eee;
            width: 100%;
            bottom: 0;
            .totalPrice{
                color: #fb4c16;
                float: left;
                padding: .6rem .8rem;
            }
            .payBtn{
                float: right;
                background-color: #13ce66;
                color: #fff;
                padding: .6rem .8rem;
                &.disabled{
                    background-color: #ddd;
                }
            }
        }
    }
    .mint-indicator-mask{
        z-index:9999;
    }
</style>