<template>
  <div class="index">
	  <router-view></router-view> 
      <Footer></Footer>
	</div>
</template>

<script>
export default {
  name: 'Index',
  props:{},
  data() {
  	return {}
  },
  components: {
	  Footer:()=>import("@/components/Footer.vue")
  },
  mounted() {},
  updated() {},
  methods: {}
}
</script>

<style scoped>
.index {
    width: 100%;
    height: calc(100% - 45px);
}       
</style>
