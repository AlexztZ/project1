<template>
  <div>
    <!-- prev上一页, pager页码页, next下一页 -->
    <el-pagination 
    background 
    layout="prev, pager, next" 
    :page-count="$store.state.pageSum"
	@current-change="changePage"
    ></el-pagination>
  </div>
</template>
<!-- @current-change="pageIndex => this.$store.dispatch(this.actionName,{pageIndex,keyWord})" -->
<script>
export default {
  name: 'PageList',
  props:{
	  actionName:{
		type:String,
		required:true
	  },
	  keyWord:{
	    type:String,
	    default:""
	  },
  },
  data() {
  	return {
	}
  },
  components: {},
  mounted() {
	  this.$store.dispatch(this.actionName);
  },
  updated() {},
  methods: {
	changePage(pageIndex){
		let keys =this.keyWord; 
	  	this.$store.dispatch(this.actionName,{pageIndex,keyWord:keys})
	}
  }
}
</script>

<style scoped>
.{}
</style>
