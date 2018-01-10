<template>
	<div class="business">
		<el-button type="primary" v-if="!isOpen" @click="open">开始营业</el-button>
		<el-button type="danger" v-if="isOpen" @click="close">结束营业</el-button>
        <div class="orderList">
            <h2>待制作订单</h2>
            <div v-for="(order,index) in orderList" class="subOrder clearfix">
                <div class="clearfix subOrderTitle">
                    <div class="fl orderId">订单号:{{order.id}}</div>
                    <div class="fl desk">桌号:{{order.desk.name}}</div>
                </div>
                <div v-for="subOrder in order.subOrders" class="subOrderDetail">
                    {{subOrder.good.name}}*
                    {{subOrder.number}}
                    <span v-for="label in subOrder.chooceLabels" :style="{backgroundColor:label.bgColor}">
                        {{label.name}}
                    </span>
                </div>
                <div class="fl count">{{order.count}}</div>
                <div class="fr makeBtn" v-if="order.status==2" @click="makeOrder(index)">准备制作</div>
                <div class="fr completeBtn" v-if="order.status==4" @click="completeOrder(index)">完成订单</div>
            </div>
        </div>
        <audio id="media" src="/static/mp3/order.mp3" controls="controls" style="display:none">
        </audio>
	</div>
	
</template>
<script>
    import server from '../service/orderService'
    import accountServer from '../service/accountService'
	import io from 'socket.io-client';
    export default {
        mixins: [],
        name: 'welcome',
        components: {},
        data(){
        	return {
        		isOpen:false,
        		shopId:localStorage.getItem('shopId'),
        		socket:null,
                orderList:[
                ]
        	}
        },
        mounted(){
            this.$nextTick(()=>{
                var that=this;
                accountServer.getBusiness().then(res=>{
                    if(res.status==0){
                        if(res.data.openBusiness==1){
                            this.open();
                        }
                    }
                })
                server.getOrderList({
                    orderBy:'ASC',
                    status:[2,4]
                }).then(res=>{
                    if(res.status==0){
                        for(let order of res.data.order){
                            this.getLabelObj(order.subOrders)
                        }
                        this.orderList=res.data.order;
                    }
                })
                //判断页面手动关闭或刷新时是否正在营业
                window.addEventListener("beforeunload",function(event){
                    that.close()
                })
            })
        },
        beforeDestroy(){
            if(this.isOpen){
                this.close();
            }
        },
        methods:{
        	open(){
                accountServer.putBusiness({
                    openBusiness:1
                }).then(res=>{
                    if(res.status==0){
                        this.socket = io.connect(`http://localhost:8080?shopId=${this.shopId}`);
                        this.isOpen=true;
                        this.socket.on('postOrder',(data)=>{
                            this.getNewOrder(data);
                            console.log("getDate ",data)
                        })
                    }else{
                        this.$message.error(res.msg);
                    }
                })
        		
        	},
        	close(){
                accountServer.putBusiness({
                    openBusiness:0
                }).then(res=>{
                    if(res.status==0){
                        this.socket.close();
                        this.isOpen=false
                    }else{
                        this.$message.error(res.msg);
                    }
                })
        		
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
            makeOrder(index){
                var order=this.orderList[index];
                server.putOrder({
                    orderId:order.id,
                    status:4
                }).then(res=>{
                    if(res.status==0){
                        this.orderList[index].status=4
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            completeOrder(index){
                var order=this.orderList[index];
                server.putOrder({
                    orderId:order.id,
                    status:5
                }).then(res=>{
                    if(res.status==0){
                        this.orderList.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '移除已完成订单!'
                        });
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            getNewOrder(order){
                this.orderList.push(order)
                document.getElementById("media").play();
            }
        }
    }

</script>
<style lang="scss">
    .business{
        .orderList{
            padding: 10px;
            margin-top: 6px;
            border-radius: 8px;
            font-size: 20px;
            h2{
                font-weight: normal;
                font-size: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 4px;
            }
            .orderId{
                margin-right:20px;
                padding-left: 6px;
                border-left: 4px solid #20a0ff;
            }
            .subOrder{
                margin-top: 8px;
                margin-bottom:8px;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 6px;
                .subOrderTitle{
                    margin-bottom:4px;
                }
                .subOrderDetail{
                    padding:6px;
                    border-bottom:1px solid #f1f1f1;
                    span{
                        font-size: 12px;
                        color:#fff;
                        padding:2px;
                        margin: 1px 2px;
                        border-radius:3px;
                    }
                }
                .makeBtn{
                    font-size: 16px;
                    background-color: #20a0ff;
                    color: #fff;
                    padding: 6px 8px;
                    border-radius: 5px;
                    margin-top: 6px;
                }
                .completeBtn{
                    font-size: 16px;
                    background-color: #13ce66;
                    color: #fff;
                    padding: 6px 8px;
                    border-radius: 5px;
                    margin-top: 6px;
                }
                .count{
                    margin-top: 10px;
                    color: #fb4c16;
                    &:before{
                        display: inline-block;
                        content: '\FFE5';
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>