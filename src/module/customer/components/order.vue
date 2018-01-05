<template>
	<div>
		order
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
        	this.$nextTick(()=>{
        	})
        }
    }

</script>