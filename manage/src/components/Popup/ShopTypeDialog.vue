<template>
  <el-dialog :title="title" 
  :visible="shopTypeVisible" 
  @update:visible="bol=>$emit('update:shopTypeVisible',bol)"
  >
    <el-form>
      <el-form-item label="店铺类别名称" label-width="120px" style="margin-bottom:20px;">
        <el-input v-model="shopInfo.shopTypeName" autocomplete="off"></el-input>
      </el-form-item>
  	<el-form-item label="店铺类别图片" label-width="120px">
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
		:file-list="filelist"
  		>
  	    <el-button size="small" type="primary">点击上传</el-button>
  	    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  	  </el-upload>
  	</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:shopTypeVisible',false)">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
  
</template>

<script>
export default {
  name: 'shopTypeDialog',
  props:{
	shopTypeVisible:{
		type:Boolean,
		default:false
	},  
	info:{
		type:Object,
		default(){
			return{}
		}
	},
  },
  data() {
  	return {
  		dialogFormVisible:false,
  		shopInfo:{
  			shopTypeName:""
  		},
		title:"添加店铺类别",
		filelist:[],
  	}
  },
  components: {},
  created(){
	  //同步事件,所以写在created中而不是mounted中
	  if(this.info._id){
	  	this.title="修改店铺类别";
	  	this.shopInfo.shopTypeName = this.info.shopTypeName;
	  	this.filelist.push({
			name:this.info.shopTypeName,
			url:"/ele/"+this.info.shopTypePic
		})
	  }
  },
  mounted() {},
  updated() {},
  methods: {
  	  async submitForm(){
		  if(this.info._id){//修改操作时
			const formdata = new FormData();
			  for(let key in this.shopInfo){
				  formdata.set(key,this.shopInfo[key]);
			  }
			  formdata.set("shopTypeId",this.info._id);
			  // formdata.set("shopTypeName",this.info.shopTypeName);
			  // formdata.set("shopTypePic",this.info.shopTypePic);
			  formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0])
			  const data = await this.$axios.put("/shopTypeList",formdata)
			  if(data.ok === 1){
			        this.success();
			  }else{
			        alert(data.msg);
			  }
		  }else{//添加操作时
			  this.$refs.upload.submit();
		  }
  	  },
  	  success(){
  		  // this.dialogFormVisible=false;
		  this.$emit('update:shopTypeVisible',false)
		  if(this.$route.name === "shopTypeList"){
			  this.$store.dispatch("getShopTypeList")
		  }else{
			  this.$router.push("/shopTypeList");
		  }
  		  
		  
		  
  	  },
  }
}
</script>

<style scoped>
.{}
</style>
