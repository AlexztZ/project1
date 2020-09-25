<template>
  <div class="toolbar">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="shopTypeName" placeholder="请输入搜索的店铺类别关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
		<el-button type="warning" @click="shopId='';ShopVisible=true">增加店铺</el-button>
        <el-button type="success" @click="shopTypeVisible=true">增加店铺类别</el-button>
      </el-form-item>
    </el-form>
	
	<el-table
	v-loading="$store.state.isLoading"
	:data="$store.state.shop.shopList"
	style="width: 100%">
		<el-table-column label="id">
	        <template slot-scope="scope">{{scope.row._id}}</template>
	    </el-table-column>
	    <el-table-column label="店铺名字" width="100">
	        <template slot-scope="scope">
	            {{scope.row.shopName}}
	        </template>
	    </el-table-column>
	    <el-table-column label="创建日期">
	        <template slot-scope="scope">
	            <i class="el-icon-time"></i>
	            <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
	        </template>
	    </el-table-column>
	    <el-table-column width="150px" label="店铺类别的名字">
	        <template slot-scope="scope">
	        {{scope.row.shopTypeName}}
	        </template>
	    </el-table-column>
		<el-table-column label="店铺图片">
	        <template slot-scope="scope">
	        <img height="100px" :src="'/ele/'+scope.row.shopPic" alt="">
	        </template>
	    </el-table-column>
	    <el-table-column  label="操作">
	        <template slot-scope="scope">
	        <el-button
	         size="mini"
	         type="primary"
	         @click="shopId=scope.row._id;ShopVisible=true"
	        >修改</el-button>
	        <el-button size="mini" type="danger">删除</el-button>
	        </template>
	    </el-table-column>
	</el-table>
	<!-- @click="shopTypeId=scope.row.shopTypeId;shopId=scope.row._id;goodsTypeVisible=true" -->
	<PageList actionName="getShopList"></PageList>
	
	<ShopTypeDialog
	v-if="shopTypeVisible"
	:shopTypeVisible.sync="shopTypeVisible"
	></ShopTypeDialog>
	<ShopDialog
	:shopId="shopId"
	v-if="ShopVisible"
	:shopVisible.sync="ShopVisible"
	></ShopDialog>
  </div>
</template>

<script>
export default {
  name: 'shopList',
  props:{},
  data() {
  	return {
		shopTypeName:"",
		shopTypeVisible:false,
		ShopVisible:false,
		shopId:""
	}
  },
  components: {},
  mounted() {},
  updated() {},
  methods: {
	  success(){
		  
	  },
  }
}
</script>

<style scoped>
.{}
</style>
