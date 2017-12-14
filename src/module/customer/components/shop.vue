<template>
	<div class="shop">
		<div class="header"></div>
        <div class="content">
          <div class="left" id="left">
            <ul>
              <li v-for="item in goodsList">{{item.categoryName}}</li>
            </ul>
          </div>
          <div class="right" id="right">
            <ul>
              <li v-for="item in goodsList">
                <div class="class-title">{{item.categoryName}}</div>
                <div v-for="ite in item.goods">
                  <div class="item">
                    <div class="item-left">
                      <div class="item-img"></div>
                    </div>
                    <div class="item-right">
                      <div class="title">{{ite.name}}</div>
                      <div class="subtitle">{{ite.description}}</div>
                      <div class="price">￥{{ite.price}}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
                goodsList:[
                    {
                        categoryId:1,
                        categoryName:"热销",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    },
                    {
                        categoryId:1,
                        categoryName:"优惠套餐",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    },
                    {
                        categoryId:1,
                        categoryName:"不知道吃什么",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    },
                    {
                        categoryId:1,
                        categoryName:"热销",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    },
                    {
                        categoryId:1,
                        categoryName:"热销",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    },
                    {
                        categoryId:1,
                        categoryName:"热销",
                        goods:[
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                            {
                                id:1,
                                name:"麻辣小龙虾",
                                description:"描述",
                                img:"/file/9168271425522615.jpg",
                                price:12,
                                count:11
                            },
                        ]
                    }
                ]
        	}
        },
        mounted(){
        	this.$nextTick(()=>{
                $('.content').css('height',$('.right').height());
                $('.left ul li').eq(0).addClass('active');
                $(window).scroll(function(){
                    if($(window).scrollTop() >= 150){
                        $('.swiper-container-ul').css('position','fixed');
                        $('.left').css('position','fixed');
                        $('.right').css('margin-left',$('.left').width());
                    }else {
                        $('.swiper-container-ul').css('position','');
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
        	})
        }
    }

</script>
<style lang="scss">
    .shop{
        .header{
          width: 100%;
          height: 150px;
          background: #999;
        }
        .content{
          width: 100%;
          margin-bottom:40px;
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
                            }
                        }
                        .item-right {
                            float: left;
                            padding: 0 10px;
                            .title {
                                width: 100px;
                                height: 20px;
                                margin-top: 10px;
                                background: #fff;
                            }
                            .subtitle {
                                width: 70px;
                                height: 20px;
                                margin-top: 6px;
                                font-size:12px;
                                height:40px;
                                color:#999;
                                background: #fff;
                            }
                            .price {
                                width: 50px;
                                height: 20px;
                                margin-top: 2px;
                                background: #fff;
                                font-size:18px;
                                color:#fb4c16
                            }
                        }
                    }
                }
            }
        }
        .active{
            background: #fff;
            border-left: 2px solid #3190e8;
        }
    }
</style>