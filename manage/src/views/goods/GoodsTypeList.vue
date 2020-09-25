<template>
  <div>
    <div class="toolbar">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input placeholder="请输入搜索的商品类别关键字"></el-input>
            </el-form-item>
        <el-form-item>
			<el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="shopTypeId='';shopId='';goodsTypeVisible=true;">增加商品类别</el-button>
        </el-form-item>
        </el-form>
    </div>
	
	<el-table
	:data="$store.state.goods.goodsTypeList"
	style="width: 100%">
	    <el-table-column label="商品类别名称" width="100">
	        <template slot-scope="scope">
	            {{scope.row.goodsTypeName}}
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
	    <el-table-column  label="操作">
	        <template slot-scope="scope">
	        <el-button
	         size="mini"
	         type="primary"
	         @click="shopVisible=true;shopTypeId=scope.row.shopTypeId"
	        >修改</el-button>
	        <el-button size="mini" type="danger">删除</el-button>
	        </template>
	    </el-table-column>
	</el-table>
	
	<ShopDialog v-if="shopVisible" :shopTypeId="shopTypeId" :shopVisible.sync="shopVisible"></ShopDialog>
	<PageList actionName="getGoodsTypeList"></PageList>
	<GoodsTypeDialog v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible"></GoodsTypeDialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsTypeList',
  props:{},
  data() {
  	return {
		goodsTypeVisible:false,
		shopVisible:false,
		shopTypeId:"",
		shopId:""
	}
  },
  components: {},
  mounted() {},
  updated() {},
  methods: {}
}
</script>

<style scoped>
.{}
</style>
