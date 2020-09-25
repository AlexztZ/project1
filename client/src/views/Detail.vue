<template>
  <div>
    <eleNav><h1 class="header-title" >{{shopInfo.shopName}}</h1></eleNav>
    <p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<p>1</p>
	<h3>{{shopInfo.shopName}}</h3>
    <img v-if="shopInfo.shopPic" :src="'/ele/'+shopInfo.shopPic" alt="">
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props:{},
  data() {
  	return {
		shopInfo:{},
	}
  },
  components: {},
  async mounted() {
	  // console.log(this.$route.params.shopId)
	  const {data} = await this.$axios.get("/ele/shopInfo/"+this.$route.params.shopId)
	  console.log(data.shopInfo)
	  this.shopInfo = data.shopInfo 
	  const goodsTypeRes = await this.$axios.get("/ele/goodsTypeList/"+this.$route.params.shopId);
	  console.log(goodsTypeRes.data.goodsTypeList)
  },
  updated() {},
  methods: {}
}
</script>

<style scoped>
.{}
</style>
