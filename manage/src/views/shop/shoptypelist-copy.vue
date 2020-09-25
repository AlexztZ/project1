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
          <el-button type="success" @click="dialogFormVisible=true">增加店铺类别</el-button>
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
			<el-button size="mini" type="danger"
			>删除</el-button>
	    </template>
	  </el-table-column>
	</el-table>
	
	
	<PageList actionName="getShopTypeList" :keyWord="shopTypeName"></PageList>
	
	<el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
	  <el-form>
	    <el-form-item label="店铺类别名称" label-width="120px">
	      <el-input v-model="shopInfo.shopTypeName" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="店铺类别名称" label-width="120px">
		  <!-- 
		   data:增加数据  
		   headers:传递token auto-upload:手动上传。 
		   limit:上传图片的条数
		   ref:设置的值,可通过this.$refs.值huo'qu获取
		   on-success:文件上传成功时的钩子
		   -->
		  <el-upload
		    class="upload-demo"
		    action="/ele/shopTypeList"
		    list-type="picture"
			:auto-upload="false"
			:limit="1"
			ref="upload"
			:headers="{authorization:$store.state.admin.token}"
			name="shopTypePic"
			:data="shopInfo"
			:on-success="success"
			>
		    <el-button size="small" type="primary">点击上传</el-button>
		    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitForm">确 定</el-button>
	  </div>
	</el-dialog>
	
  </div>
</template>

<script>
export default {
  name: 'shopTypeList',
  props:{},
  data() {
  	return {
		dialogFormVisible:false,
		shopInfo:{
			shopTypeName:""
		},
		shopTypeName:""
	}
  },
  components: {},
  mounted() {
	  this.$store.dispatch("getShopTypeList");
  },
  updated() {},
  methods: {
	  submitForm(){
		  this.$refs.upload.submit();
	  },
	  success(){
		  this.dialogFormVisible=false;
		  this.$store.dispatch("getShopTypeList");
	  },
	  sear(){
		  this.$store.dispatch("getShopTypeList",{keyWord:this.shopTypeName})
	  }
  }
}
</script>

<style scoped>
.{}
</style>
