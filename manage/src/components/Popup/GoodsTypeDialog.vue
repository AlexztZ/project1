<template>
	<el-dialog title="添加商品类别" 
	:visible="goodsTypeVisible"
	@update:visible="bol=>$emit('update:goodsTypeVisible',bol)"
	>
	    <el-form>
	        <el-form-item label="商品类别名称" label-width="120px">
	            <el-input v-model="goodsTypeInfo.goodsTypeName" style="width:300px;" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="所属店铺" label-width="120px">
	            <el-select @change="changeShopTypeId" v-model="goodsTypeInfo.shopTypeId" placeholder="请选择店铺类别">
	                <el-option 
					v-for="item in $store.state.shop.allShopTypeList" 
					:key="item._id" 
					:label="item.shopTypeName" 
					:value="item._id"
					></el-option>
	            </el-select>
	            <el-select  v-model="goodsTypeInfo.shopId" placeholder="请选择店铺">
	                <el-option
	                v-for="item in $store.state.shop.shopListByTypeId"
	                :key="item._id"
	                :value="item._id"
	                :label="item.shopName"
	                ></el-option>
	            </el-select>
	        </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	        <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
	        <el-button type="primary" @click="addGoodsTypeList">确 定</el-button>
	    </div>
	</el-dialog>
</template>

<script>
export default {
  name: 'goodsTypeDialog',
  props:{
	  goodsTypeVisible:{
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
	   }
  },
  data() {
  	return {
		goodsTypeInfo:{
			goodsTypeName:"",
			shopTypeId:"",
			shopId:""
		},
	}
  },
  components: {},
  mounted() {
	  if(this.shopId){
	    this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
	    this.goodsTypeInfo.shopId = this.shopId;
	  }
	  this.$store.dispatch("getAllShopTypeList");
  },
  created(){
      if(this.shopTypeId.length>0)
        this.goodsTypeInfo.shopTypeId = this.shopTypeId;
  },
  updated() {},
  methods: {
	async addGoodsTypeList(){
	    const data = await this.$axios.post("/goodsTypeList",{
	        shopId:this.goodsTypeInfo.shopId,
	        goodsTypeName:this.goodsTypeInfo.goodsTypeName
	    })
	    this.$store.dispatch("getGoodsTypeList");
	    // if(this.$route.name===)
	    this.$emit("update:goodsTypeVisible",false)
	},
	changeShopTypeId(){
	    // 当更改店铺类别时，要更新店铺列表的内容
	    // console.log(this.goodsTypeInfo.shopTypeId);
	    this.goodsTypeInfo.shopId = "";
	    this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
	}
  }
}
</script>

<style scoped>
.{}
</style>
