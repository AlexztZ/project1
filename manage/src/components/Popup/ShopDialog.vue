<template>
  <el-dialog title="添加店铺"
  :visible="shopVisible" 
  @update:visible="bol=>$emit('update:shopVisible',bol)"
  >
    <el-form>
	  <el-form-item label="店铺名称" label-width="120px">
		<el-input v-model="shopInfo.shopName" autocomplete="off"></el-input>
		</el-form-item>
      <el-form-item label="店铺类别" label-width="120px" style="margin:20px auto;">
        <el-select v-model="shopInfo.shopTypeId" placeholder="请选择">
            <el-option
              v-for="item in $store.state.shop.allShopTypeList"
              :key="item._id"
              :label="item.shopTypeName"
              :value="item._id">
            </el-option>
          </el-select>
      </el-form-item>
  	<el-form-item label="店铺图片" label-width="120px">
  	  <!-- 
  	   data:增加数据  
  	   headers:传递token auto-upload:手动上传。 
  	   limit:上传图片的条数
  	   ref:设置的值,可通过this.$refs.值huo'qu获取
  	   on-success:文件上传成功时的钩子
  	   -->
  	  <el-upload
  	    class="upload-demo"
  	    action="/ele/shopList"
  	    list-type="picture"
  		ref="upload"
  		name="shopPic"
		:on-success="success"
		:data="shopInfo"
		:headers="{authorization:$store.state.admin.token}"
		:auto-upload="false"
		:file-list="fileList"
		:limit="1"
  		>
  	    <el-button size="small" type="primary">点击上传</el-button>
  	    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  	  </el-upload>
  	</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ShopDialog',
  props:{
	  shopVisible:{
		  type:Boolean,
		  default:false
	  },
	  shopTypeId:{
		  type:String,
		  default:""
	  },
	  shopId:{
		  type:String,
		  default:""
	  },
	  info:{
	      type:Object,
	      default(){
	        return {}
	      }
	  }
  },
  data() {
  	return {
  		shopInfo:{
  			shopName:"",
  			shopTypeId:"",
  		},
  		fileList:[]
  	}
  },
  created(){
	  if(this.shopTypeId.length > 0){
		  this.shopInfo.shopTypeId = this.shopTypeId;
	  }
  },
  components: {},
  async mounted(){
	  this.$store.dispatch("getAllShopTypeList")
	  if(this.shopId.length>0){
		const {shopInfo} = await this.$axios.get("/shopInfo/"+this.shopId)
		this.shopInfo.shopName = shopInfo.shopName;
		this.shopInfo.shopTypeId = shopInfo.shopTypeId;
		this.fileList.push({
			name:shopInfo.shopPic,
			url:"/ele/"+shopInfo.shopPic
		})
	  }
  },
  updated() {},
  methods: {
	  success(){
	    this.$emit('update:shopVisible',false);
	    this.$store.dispatch("getShopList");
		this.$router.push("/shopList");
	  },
	  submitForm(){
	    this.$refs.upload.submit();
	  }
	  // 提交店铺信息
	 //  async submitForm(){
	 // //    this.$refs.upload.submit();
		// // this.$store.dispatch("getShopList")
		// const formdata = new FormData();
		//   for(let key in this.shopInfo){
		// 	  formdata.set(key,this.shopInfo[key]);
		//   }
		//   formdata.set("shopId",this.info._id);
		//   // formdata.set("shopTypeName",this.info.shopTypeName);
		//   // formdata.set("shopTypePic",this.info.shopTypePic);
		//   formdata.set("shopPic",document.querySelector(".el-upload__input").files[0])
		//   const data = await this.$axios.put("/shopList",formdata)
		//   if(data.ok === 1){
		//         this.success();
		//   }else{
		//         alert(data.msg);
		//   }
	 //  }
   }
}
</script>

<style scoped>
.{}
</style>
