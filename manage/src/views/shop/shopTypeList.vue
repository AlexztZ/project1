<template>
  <div>
    <div class="toolbar">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="shopTypeName" placeholder="请输入搜索的店铺类别关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sear">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="shopTypeVisible=true;info={}">增加店铺类别</el-button>
        </el-form-item>
      </el-form>
    </div>
	<!-- 渲染 -->
	<el-table  style="width: 100%" :data="$store.state.shop.shopTypeList">
	  <el-table-column label="创建时间" width="220">
	    <!-- slot-scope插槽  -->
	    <template slot-scope="scope">
	      <i class="el-icon-time"></i>
	      <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
	    </template>
	  </el-table-column>
	  <el-table-column label="店铺类别">
	    <template slot-scope="scope">{{ scope.row.shopTypeName }}</template>
	  </el-table-column>   
	  <el-table-column label="店铺图片">
	    <template slot-scope="scope">
			<img height="100px" width="100px" :src="'/ele'+scope.row.shopTypePic" alt="">
		</template>
	  </el-table-column>   
	  <el-table-column label="操作">
	    <template slot-scope="scope">
			<el-button size="mini" type="info"
			@click="shopTypeVisible=true;info=scope.row;"
			>修改</el-button>
			<el-button size="mini" type="danger"
			>删除</el-button>
	    </template>
	  </el-table-column>
	</el-table>
	
	
	<PageList actionName="getShopTypeList" :keyWord="shopTypeName"></PageList>
	<ShopTypeDialog 
	v-if="shopTypeVisible"
	:shopTypeVisible.sync="shopTypeVisible"
	:info="info"
	></ShopTypeDialog>
	<!-- <ShopTypeDialog
	:shopTypeVisible="shopTypeVisible"
	@update:shopTypeVisible="bol => shopTypeVisible=bol"
	></ShopTypeDialog> -->
	
  </div>
</template>

<script>
export default {
  name: 'shopTypeList',
  props:{},
  data() {
  	return {
		shopTypeName:"",
		shopTypeVisible:false,
		info:{},
	}
  },
  components: {},
  mounted() {
	  this.$store.dispatch("getShopTypeList");
  },
  updated() {},
  methods: {
	  sear(){
		  this.$store.dispatch("getShopTypeList",{keyWord:this.shopTypeName})
	  }
  }
}
</script>

<style scoped>
.{}
</style>
