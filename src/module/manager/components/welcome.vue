<template>
	<div class="business">
		
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待处理订单" name="exitOrder">
                <el-button type="primary" v-if="!isOpen" @click="open">开始营业</el-button>
                <el-button type="danger" v-if="isOpen" @click="close">结束营业</el-button>
                <div class="orderList">
                    <h2>待制作订单</h2>
                    <div v-for="(order,index) in orderList" class="subOrder clearfix">
                        <div class="clearfix subOrderTitle">
                            <div class="fl orderId">订单号:{{order.id}}</div>
                            <div class="fl desk">桌号:{{order.desk.name}}</div>
                        </div>
                        <div v-for="subOrder in order.subOrders" class="subOrderDetail" :class="{done:subOrder.done}" @click="doneSubOrder(subOrder)">
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
                不支持语音播放新订单信息
                </audio>
            </el-tab-pane>
            <el-tab-pane label="新增订单" name="addOrder">
                <el-form :inline="true">
                    <el-form-item label="桌号">
                        <el-select v-model="deskId" placeholder="未选择">
                          <el-option v-for="desk in deskList" :label="desk.name" :value="desk.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="content">
                  <div class="left" id="left">
                    <ul>
                      <li v-for="item in goodsList">{{item.text}}</li>
                    </ul>
                  </div>
                  <div class="right" id="right">
                    <ul>
                      <li v-for="item in goodsList">
                        <div class="class-title">{{item.text}}</div>
                        <div v-for="ite in item.goods">
                          <div class="item">
                            <div class="item-left">
                              <div class="item-img">
                                  <img :src="ite.img">
                              </div>
                            </div>
                            <div class="item-right">
                              <div class="title">{{ite.name}}</div>
                              <div class="subtitle">{{ite.description}}</div>
                              <div>
                                    <div class="price priceIcon">{{ite.price}}</div>
                                    <div class="buy" :class="{disabled:ite.count==0}" @click="showBuyDialog(ite)">
                                        {{ite.count==0?'售罄':'选购'}}
                                    </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <span class="iconfont icon-shoppingcart shoppingCart" @click="showShoppingCart">
                      <span class="amount priceIcon">
                          {{amount}}
                      </span>
                  </span>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
          title="选购商品"
          :visible.sync="isShowBuyDialog"
          size="large"
          class="buyDialog"
          >
          <div class="goodNum clearfix">
            <div class="goodTitle">
                <div class="goodName">{{currentGood.name}}</div>
                <div class="goodDescription">{{currentGood.description}}</div>
            </div>
            <div class="goodPrice priceIcon">
            {{((currentGood.number*(currentGood.price*100))/100).toFixed(2)}}
            </div>
            <div class="numControler">
                <span class="iconfont icon-minus" @click="minusGood(currentGood)"></span>
                {{currentGood.number}}
                <span class="iconfont icon-plus" @click="addGood(currentGood,true)"></span>
            </div>
        </div>
        <div class="goodLabel" v-if="currentGood.labels.length>0">
            <el-checkbox-group v-model="currentGood.chooceLabels">
                <el-checkbox v-for="label in currentGood.labels" :label="label.id">{{label.name}}</el-checkbox>
            </el-checkbox-group>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowBuyDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveGood">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="购物车"
          :visible.sync="isShowCart"
          size="large"
          class="cartDialog"
          >
            <div class="goodNum clearfix" v-for="(good,index) in shoppingCart">
                    <div class="goodTitle">
                        <div class="goodName">{{good.name}}</div>
                        <div class="cartLabels">
                            <div v-for="label in good.chooceLabels" :style="{backgroundColor:getLabelColor(label,good)}">
                                {{getLabelName(label,good)}}
                            </div>
                        </div>
                    </div>
                    <div class="numControler">
                        <span class="iconfont icon-minus" @click="minusGood(good,index)"></span>
                        {{good.number}}
                        <span class="iconfont icon-plus" @click="addGood(good)"></span>
                    </div>
                    <div class="goodPrice priceIcon">
                    {{good.price}}*{{good.number}}
                    </div>
                    
                </div>
                <div>
                    <div class="totalPrice priceIcon">
                    总价：{{amount}}
                    </div>
                    <div class="clearCart" @click="clearCart">清空购物车</div>
                </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowCart = false">取 消</el-button>
            <el-button type="primary" :disabled="noOrder" @click="submit">确认下单</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script>
    import server from '../service/orderService'
    import accountServer from '../service/accountService'
    import deskServer from '../service/deskService'
	import io from 'socket.io-client';
    export default {
        mixins: [],
        name: 'welcome',
        components: {},
        data(){
        	return {
        		isOpen:false,
        		shopId:localStorage.getItem('shopId'),
                deskId:'',
                deskList:[],
        		socket:null,
                orderList:[
                ],
                activeName:"exitOrder",
                goodsList:[],
                currentGood:{
                    id:"",
                    name:"",
                    description:"",
                    count:"",
                    labels:[],
                    price:"",
                    number:0,
                    chooceLabels:[]
                },
                shoppingCart:[],
                isShowCart:false,
                isShowBuyDialog:false,
        	}
        },
        computed:{
            amount(){
                let sum=0;
                for(let order of this.shoppingCart){
                    let orderPay=(order.price*100*order.number)/100
                    sum=((sum*100+orderPay*100)/100).toFixed(2)
                }
                return sum
            },
            noOrder(){
                if(this.shoppingCart.length==0){
                    return true
                }else{
                    return false
                }
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
                this.getOrderList();
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
                document.getElementById("media").play();
                document.getElementById("media").pause();
                accountServer.putBusiness({
                    openBusiness:1
                }).then(res=>{
                    if(res.status==0){
                        var that=this;
                        //`http://yslpartition.com:80?shopId=${this.shopId}`
                        this.socket = io.connect(`http://yslpartition.com:80?shopId=${this.shopId}`);
                        this.isOpen=true;
                        //心跳保持
                        that.heartCheck={
                            timeout:60000,
                            timeoutObj:null,
                            reset:function(){
                                clearTimeout(that.heartCheck.timeoutObj);
                                that.heartCheck.start();
                            },
                            start:function(){
                                that.heartCheck.timeoutObj=setTimeout(function(){
                                    that.socket.emit("SHeartBeat","client HeartBeat")
                                },that.heartCheck.timeout)
                            },
                            clear:function(){
                                clearTimeout(that.heartCheck.timeoutObj);
                            }
                        }
                        this.socket.on('postOrder',(data)=>{
                            this.getNewOrder(data);
                            this.heartCheck.reset();
                        })
                        this.socket.on('CHeartBeat',(data)=>{
                            console.log("recieve HeartBeat")
                            this.heartCheck.reset();
                        })
                        this.socket.on('disconnect',(data)=>{
                            this.heartCheck.clear();
                            console.log("clear HeartBeat")
                        })
                        this.heartCheck.start();
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
            getOrderList(){
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
            },
            getLabelObj(subOrders){
                //遍历每个子单
                for(let subOrder of subOrders){
                    //初始化done为false
                    subOrder.done=false
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
                this.getLabelObj(order.subOrders);
                this.orderList.push(order)
                document.getElementById("media").play();
            },
            doneSubOrder(subOrder){
                var done=subOrder.done||false
                subOrder.done=!done
            },
            showShoppingCart(){

            },
            handleClick(){
                if(this.goodsList.length==0){
                    var that=this;
                    deskServer.getDesks().then(res=>{
                        if(res.status==0){
                            this.deskList=res.data
                            server.getGoods().then(res2=>{
                                if(res2.status==0){
                                    this.goodsList=res2.data.menu
                                    setTimeout(function(){
                                        that.initMenuScroll()
                                    },500)
                                }else{
                                    this.$message.error(res2.msg)
                                }
                            })
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            },
            showShoppingCart(){
                this.isShowCart=true
            },
            showBuyDialog(item){
                if(item.count!=0){
                    this.mergeCurrentGood(item)
                    this.isShowBuyDialog=true
                }
            },
            minusGood(good,index){
                if(good.number>1){
                    good.number=good.number-1
                }else{
                    if(index>=0){
                        this.shoppingCart.splice(index,1)
                    }
                }
            },
            addGood(good,isAdd){
                let count=this.getSelectCount(good.id);
                let allCount=(good.count);
                let surplus=allCount-count;
                if(isAdd){
                    surplus=surplus-good.number
                }
                if(surplus>0){
                    good.number=good.number+1
                }else{
                    this.$message.error('库存不足了')
                }

            },
            cancelBuy(){
                this.isShowBuyDialog=false
            },
            saveGood(){
                if(this.currentGood.number==0){
                    return 
                }
                var order =$.extend(true,{},this.currentGood)
                this.shoppingCart.push(order)
                this.isShowBuyDialog=false
            },
            initMenuScroll(){
                $('.content').css('height',$('.right').height());
                $('.left ul li').eq(0).addClass('active');
                $(window).scroll(function(){
                    if($(window).scrollTop() >= 150){
                        $('.left').css('position','fixed');
                        $('.right').css('margin-left',$('.left').width());
                    }else {
                        $('.left').css('position','');
                        $('.right').css('margin-left','');
                    };
                    //滚动到标杆位置,左侧导航加active
                    $('.right ul li').each(function(){
                        var target = parseInt($(this).offset().top-$(window).scrollTop()-150);
                        var i = $(this).index();
                        if (target<=0) {
                        $('.left ul li').removeClass('active');
                        $('.left ul li').eq(i).addClass('active');
                        }
                    });
                });
                $('.left ul li').click(function(){
                    var i = $(this).index('.left ul li');
                    $('body, html').animate({scrollTop:$('.right ul li').eq(i).offset().top-40},500);
                    setTimeout(function(){
                        $('.left ul li').removeClass('active');
                        $('.left ul li').eq(i).addClass('active');
                    },520)
                    
                });
            },
            mergeCurrentGood(item){
                for(let label of item.labels){
                    label.value=label.id
                    label.label=label.name
                }
                this.currentGood.id=item.id;
                this.currentGood.name=item.name;
                this.currentGood.description=item.description;
                this.currentGood.count=item.count;
                this.currentGood.price=item.price;
                this.currentGood.number=1;
                this.currentGood.chooceLabels=[]
                this.currentGood.labels=item.labels;
            },
            getLabelName(label , good ){
                for(let item of good.labels){
                    if(label==item.id){
                        return item.name
                    }
                }
                return ""
            },
            getLabelColor(label , good ){
                for(let item of good.labels){
                    if(label==item.id){
                        return item.bgColor
                    }
                }
                return ""
            },
            getSelectCount(id){
                let count=0
                for(let good of this.shoppingCart){
                    if(good.id==id){
                        count+=good.number
                    }
                }
                return count
            },
            submit(){
                var that=this;
                if(this.shoppingCart.length==0){
                    return 
                }else{
                    if(this.deskId==''){
                       this.$message.error('请选择下单桌号')
                    }else{
                        server.postOrder({
                            cart:this.shoppingCart,
                            deskId:""+this.deskId
                        }).then(res=>{
                            if(res.status==0){
                                // that.getOrderList();
                                this.orderList.push(res.data)
                                that.isShowCart=false;
                                that.shoppingCart=[];
                                that.$message.success('下单成功')
                            }else{
                                that.$message.error(res.msg)
                            }
                        })
                    }
                }
            },
            clearCart(){
                this.shoppingCart=[]
                this.isShowCart=false
            },
        }
    }

</script>
<style lang="scss">
    .business{
        .clearfix{overflow:hidden;_zoom:1;}
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
                .done{
                    color:#666;
                    text-decoration: line-through;
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
        .content{
            width: 100%;
            overflow: hidden;
            .active{
                background: #fff;
                border-left: 3px solid #3190e8;
            }
            .left{
                top: 0px;
                float: left;
                width: 25%;
                height: 100%;
                ul{
                    list-style:none;
                    li{
                        padding:15px 10px;
                        text-align:left;
                        border-bottom: 1px solid #eee;
                    }
                }
            }
            .right{
                float: left;
                width: 75%;
                height: 100%;
                ul{
                    list-style:none;
                    .class-title{
                        padding: 7px 10px;
                        background: #f6f6f6;
                        border-left: 3px solid #ddd;
                        font-size:.6rem;
                    }
                    .item {
                        overflow: hidden;
                        width: 100%;
                        padding: 10px;
                        background: #fff;
                        border-bottom: 1px solid #f6f6f6;
                        .item-left {
                            float: left;
                            .item-img {
                                width: 60px;
                                height: 60px;
                                background: #f6f6f6;
                                img{
                                    border:1px solid #eee;
                                    border-radius:5px;
                                    width: 60px;
                                    height: 60px;
                                }
                            }
                        }
                        .item-right {
                            float: left;
                            padding: 0 10px;
                            .title {
                                background: #fff;
                            }
                            .subtitle {
                                width:150px;
                                margin-top: 4px;
                                font-size:.6rem;
                                color:#999;
                                background: #fff;
                                height:30px;
                            }
                            .price {
                                height: 20px;
                                margin-top: 2px;
                                background: #fff;
                                font-size:.8rem;
                                color:#fb4c16;
                                display:inline-block;
                            }
                            .buy{
                                display: inline-block;
                                margin: 2px 10px 0;
                                background-color: #26a2ff;
                                color: #fff;
                                padding: 4px 8px;
                                font-size: .7rem;
                                border-radius: 4px;
                                float:right;
                                &.disabled{
                                    background-color: #ddd;
                                }
                            }
                        }
                    }
                }
            }
            .shoppingCart{
                position: fixed;
                z-index:2;
                padding: .3rem;
                bottom: 4rem;
                border-radius: 50%;
                left: 1rem;
                color: #fff;
                font-size: 2rem;
                background-color: rgba(38, 162, 255, 0.8);
                .mint-badge{
                    position: absolute;
                    left: 40%;
                    top: -4px;
                    font-size: 10px;
                    white-space: nowrap;
                }
            }
            .priceIcon:before{
                display:inline-block;
                content:'￥';
                font-size:10px;
            }
            .amount{
                position: absolute;
                background-color: #fb4c16;
                font-size: 12px;
                padding:2px;
                right: -6px;
                top: 0;
                border-radius:6px;
            }
        }
        .buyDialog{
            .goodLabel{
                padding-top:10px;
                .el-checkbox{
                    margin:5px;
                }
            }
            .goodNum{
                padding: 10px 0;
                border-bottom: 1px solid #eee;
                .goodTitle{
                    width:55%;
                    float:left;
                    .goodName{
                        font-size: 1rem;
                    }
                    .goodDescription{
                        font-size: .6rem;
                        color: #999;
                    }
                }
                .goodPrice{
                    width:20%;
                    float:left;
                    text-align: center;
                    color: #fb4c16;
                    margin-top: .8rem;
                    font-size:.8rem;
                }
                .numControler{
                    width:25%;
                    float:left;
                    margin-top: .7rem;
                    text-align: right;
                    color:#26a2ff;
                    font-size:.8rem;
                    .icon-minus{
                        font-size: 1rem;
                        padding: 3px;
                        border-radius: 50%;
                    }
                    .icon-plus{
                        color:#fff;
                        background-color:#26a2ff;
                        font-size: 1rem;
                        padding: 3px;
                        border-radius: 50%;
                    }
                }
            }
            .mint-cell{
                display:inline-block
            }
            
        }
        .cartDialog{
            .goodNum{
                padding: 10px 0;
                border-bottom: 1px solid #eee;
                position: relative;
                .goodTitle{
                    width:50%;
                    float:left;
                    .goodName{
                        font-size: 1rem;
                    }
                    .goodDescription{
                        font-size: .6rem;
                        color: #999;
                    }
                    
                }
                .goodPrice{
                    width:25%;
                    text-align: center;
                    color: #fb4c16;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    font-size:.8rem;
                    transform: translateY(-50%);
                }
                .cartLabels{
                    &>div{
                        color: #fff;
                        background-color: rgb(231, 12, 12);
                        display: inline-block;
                        padding: .1rem .3rem;
                        font-size: 0.4rem;
                        border-radius: 6px;
                    }
                }
                .numControler{
                    width: 25%;
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 75%;
                    font-size:.8rem;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    color:#26a2ff;
                    .icon-minus{
                        font-size: 1rem;
                        padding: 3px;
                        border-radius: 50%;
                    }
                    .icon-plus{
                        color:#fff;
                        background-color:#26a2ff;
                        font-size: 1rem;
                        padding: 3px;
                        border-radius: 50%;
                    }
                }
            }
            .totalPrice{
                color: #fb4c16;
                float: left;
                margin-top: .6rem;
            }
            .clearCart{
                float: right;
                background-color: #ff4949;
                color: #fff;
                padding: .4rem .6rem;
                margin-top:.2rem;
            }
        }
    }
</style>