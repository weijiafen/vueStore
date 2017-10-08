<template>
	<div>
		<header class="shop_detail_header" style="z-index: 10;">
			<img src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" class="header_cover_img"> <section class="description_header">
				<section class="description_left">
					<img src="http://cangdu.org:8001/img/15e386ec1875697.jpeg">
				</section>
				<section class="description_right">
					<h4  class="description_title ellipsis">效果演示</h4>
					<p class="description_promotion ellipsis">公告：好好吃好好吃</p>
				</section>
				<footer class="description_footer">
					<p class="ellipsis">
						<span class="tip_icon" style="background-color: rgb(240, 115, 115); border-color: rgb(240, 115, 115);">减</span>
						<span>满30减5，满60减8（APP专享）</span>
					</p>
					<p>1个活动</p>
					<svg class="footer_arrow">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left">
						</use>
					</svg>
				</footer>
			</section>
		</header>
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
        	}
        },
        activated(){
        	this.$nextTik(()=>{
        	})
        }
    }

</script>