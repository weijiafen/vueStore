<template>
	<div class="shop">
		<div class="header">
            <img class="shopPhoto" :src="shopInfo.photo"/>  
            <div class="shopInfo">
                <div class="shopName">{{shopInfo.name}}</div>
                <div class="shopNotice">
                    <span class="shopNoticeIcon">公告</span>
                    {{shopInfo.notice}}
                </div>
            </div>    
        </div>
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
                          <img v-lazy="ite.img">
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
              <mt-badge size="small" type="error" class="priceIcon">{{amount}}</mt-badge>
          </span>
        </div>
        <mt-popup v-model="isShowCart" position="bottom">
            <div class="shoppingCartDialog">
                <h2>购物车</h2>
                <div class="goodNum clearfix" v-for="good in shoppingCart">
                    <div class="goodTitle">
                        <div class="goodName">{{good.name}}</div>
                        <div class="cartLabels">
                            <div v-for="label in good.chooceLabels" :style="{backgroundColor:getLabelColor(label,good)}">
                                {{getLabelName(label,good)}}
                            </div>
                        </div>
                    </div>
                    <div class="numControler">
                        <span class="iconfont icon-minus" @click="minusGood(good)"></span>
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
                    <div class="order" :class="{disabled:noOrder}" @click="submit">确认下单</div>
                </div>
            </div>
        </mt-popup>
        <mt-popup v-model="isShowBuyDialog" position="bottom">
            <div class="buyDialog">
                <h2>选购商品</h2>
                <div class="goodNum clearfix">
                    <div class="goodTitle">
                        <div class="goodName">{{currentGood.name}}</div>
                        <div class="goodDescription">{{currentGood.description}}</div>
                    </div>
                    <div class="goodPrice priceIcon">
                    {{(currentGood.number*(currentGood.price*100))/100}}
                    </div>
                    <div class="numControler">
                        <span class="iconfont icon-minus" @click="minusGood(currentGood)"></span>
                        {{currentGood.number}}
                        <span class="iconfont icon-plus" @click="addGood(currentGood,true)"></span>
                    </div>
                </div>
                <div class="goodLabel" v-if="currentGood.labels.length>0">
                    <mt-checklist
                      title="选择口味"
                      v-model="currentGood.chooceLabels"
                      :options="currentGood.labels">
                    </mt-checklist>
                </div>
                <div class="butBtns">
                    <div class="cancelBuy" @click="cancelBuy">取消</div>
                    <div class="saveGood" @click="saveGood">确定</div>
                </div>
            </div>
        </mt-popup>
	</div>
</template>
<script>
    import server from '../service/customerService'
    import { Toast , MessageBox  } from 'mint-ui';
    export default {
        mixins: [],
        name: 'shop',
        components: {},
        data(){
        	return {
        		shopId:this.$route.params.shopId,
        		deskId:this.$route.params.deskId,
                isShowCart:false,
                isShowBuyDialog:false,
                goodsList:[
                    {
                        categoryId:1,
                        text:"",
                        goods:[
                            {
                                id:1,
                                name:"",
                                description:"",
                                img:"",
                                price:"",
                                count:""
                            },
                        ]
                    }
                ],
                shopInfo:{},
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
                shoppingCart:[]
        	}
        },
        computed:{
            amount(){
                let sum=0;
                for(let order of this.shoppingCart){
                    let orderPay=(order.price*100*order.number)/100
                    sum=(sum*100+orderPay*100)/100
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
                server.getGoods(this.shopId).then(res=>{
                    if(res.status==0){
                        this.goodsList=res.data.menu
                        this.shopInfo=res.data.shopInfo
                        setTimeout(function(){
                            that.initMenuScroll()
                        },500)
                        
                    }
                    
                })
        	})
        },
        activated(){
            this.$nextTick(()=>{
                $('.left').css('position','');
                $('.right').css('margin-left','');
            })
            
        },
        methods:{
            showShoppingCart(){
                this.isShowCart=true
            },
            showBuyDialog(item){
                if(item.count!=0){
                    this.mergeCurrentGood(item)
                    this.isShowBuyDialog=true
                }
            },
            minusGood(good){
                if(good.number>0){
                    good.number=good.number-1
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
                    Toast({
                        message: '库存不足了',
                        position: 'bottom',
                        duration: 1500
                    });
                }

            },
            cancelBuy(){
                this.isShowBuyDialog=false
            },
            saveGood(){
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
                this.currentGood.number=0;
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
                if(this.shoppingCart.length==0){
                    return 
                }else{
                    //下单操作
                    server.applyOrder({
                        cart:this.shoppingCart,
                        deskId:this.deskId
                    }).then(res=>{
                        if(res.status==0){
                            Toast({
                                message: '下单成功',
                                position: 'bottom',
                                duration: 1500
                            });
                            this.$router.push(`/pay/${this.shopId}/${this.deskId}/${res.data.id}`)
                        }else{
                            MessageBox('Notice', res.msg);
                        }
                        
                    })
                    // console.log("购物车",this.shoppingCart)
                }
            },
        }
    }

</script>
<style lang="scss">
    .shop{
        .header{
            box-sizing:border-box;
            padding:20px;
            width: 100%;
            height: 120px;
            background:#999 url(../../../assets/img/headerbg.jpg) no-repeat;
            background-size:100%;
            .shopPhoto{
                float:left;
                width:80px;
                height:80px;
                border:1px solid #fefefe;
                border-radius:2px;
            }
            .shopInfo{
                float:left;
                .shopName{
                    color: #fff;
                    font-size: 1.4rem;
                    padding: 0 0 4px 10px;
                }
                .shopNotice{
                    padding-left: 10px;
                    font-size: .8rem;
                    width:220px;
                    color:#fff;
                    .shopNoticeIcon{
                        padding:0px 4px;
                        color:#333;
                        font-size: .4rem;
                        border-radius:4px;
                        background:#eee;
                    }
                }
                
            }
        }
        .content{
          width: 100%;
          margin-bottom:4rem;
          overflow: hidden;
            .left{
                top: 0px;
                float: left;
                width: 25%;
                height: 100%;
                background: #f6f6f6;
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
                                width: 100px;
                                height: 100px;
                                background: #f6f6f6;
                                img{
                                    border:1px solid #eee;
                                    border-radius:5px;
                                    width: 100px;
                                    height: 100px;
                                }
                            }
                        }
                        .item-right {
                            float: left;
                            padding: 0 10px;
                            .title {
                                width:150px;
                                margin-top: 10px;
                                background: #fff;
                            }
                            .subtitle {
                                width:150px;
                                margin-top: 6px;
                                font-size:12px;
                                color:#999;
                                background: #fff;
                                min-height:40px;
                            }
                            .price {
                                height: 20px;
                                margin-top: 2px;
                                background: #fff;
                                font-size:18px;
                                color:#fb4c16;
                                display:inline-block;
                            }
                            .buy{
                                display: inline-block;
                                margin: 2px 10px 0;
                                background-color: #26a2ff;
                                color: #fff;
                                padding: 4px 8px;
                                font-size: 14px;
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
        }
        .active{
            background: #fff;
            border-left: 3px solid #3190e8;
        }
        .mint-popup-bottom{
            width:100%;
        }
        .shoppingCartDialog{
            h2{
                font-size: 1rem;
                font-style: normal;
                color: #333;
                background-color: #eee;
                line-height: 2;
                padding-left: .8rem;
                border-left: 4px solid #26a2ff;
                
            }
            .goodNum{
                padding: 10px;
                border-bottom: 1px solid #eee;
                position: relative;
                .goodTitle{
                    width:55%;
                    float:left;
                    .goodName{
                        font-size: 1rem;
                    }
                    .goodDescription{
                        font-size: 10px;
                        color: #999;
                    }
                    
                }
                .goodPrice{
                    width:25%;
                    text-align: center;
                    color: #fb4c16;
                    position: absolute;
                    top: 50%;
                    left: 55%;
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
                    width: 20%;
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 80%;
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
            .order{
                float: right;
                background-color: #13ce66;
                color: #fff;
                padding: .6rem .8rem;
                &.disabled{
                    background-color: #ddd;
                }
            }
        }
        .buyDialog{
            h2{
                font-size: 1rem;
                font-style: normal;
                color: #333;
                background-color: #eee;
                line-height: 2;
                padding-left: .8rem;
                border-left: 4px solid #26a2ff;
                
            }
            .goodNum{
                padding: 10px;
                border-bottom: 1px solid #eee;
                .goodTitle{
                    width:60%;
                    float:left;
                    .goodName{
                        font-size: 1rem;
                    }
                    .goodDescription{
                        font-size: 10px;
                        color: #999;
                    }
                    
                }
                .goodPrice{
                    width:20%;
                    float:left;
                    text-align: center;
                    color: #fb4c16;
                    margin-top: .8rem;
                }
                .numControler{
                    width:20%;
                    float:left;
                    margin-top: .8rem;
                    text-align: right;
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
            .mint-cell{
                display:inline-block
            }
            .butBtns{
                text-align: center;
                .cancelBuy{
                    width: 50%;
                    float: left;
                    line-height: 2.2rem;
                    border: 1px solid #eee;
                    box-sizing: border-box;
                }
                .saveGood{
                    width: 50%;
                    float: left;
                    line-height: 2.2rem;
                    background-color: #26a2ff;
                    color: #fff;
                    border: 1px solid #26a2ff;
                    box-sizing: border-box;
                    
                }
            }
        }
        .priceIcon:before{
            display:inline-block;
            content:'￥';
            font-size:.6rem;
        }
    }
    .mint-toast{
        z-index:2009;
    }
</style>