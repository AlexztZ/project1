<template>
  <div>
    <el-table  style="width: 100%" :data="$store.state.admin.adminLog">
      <el-table-column label="日志日期" width="220">
        <!-- slot-scope插槽  -->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员名称">
        <template slot-scope="scope">{{scope.row.adminName}}</template>
      </el-table-column>
      <el-table-column label="日志说明">
        <template slot-scope="scope">{{scope.row.detail}}</template>
      </el-table-column>
      <el-table-column label="日志类别">
        <template slot-scope="scope">{{$store.state.admin.adminTypeEnum[scope.row.logType]}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"
		  @click="open(scope)"
		  >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
	<PageList actionName="getAdminLog"></PageList>
  </div>
</template>

<script>
export default {
  name: 'adminLog',
  props:{},
  data() {
  	return {}
  },
  components: {},
  mounted() {
	this.$store.dispatch("getAdminLog");
  },
  updated() {},
  methods:{
	    open(scope) {
	        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	            this.$message({
	               type: 'success',
	               message: '删除成功!'
	            });
				this.del(scope);
	            }).catch(() => {
					this.$message({
	                type: 'info',
	                message: '已取消删除'
	            });          
	        });
	    },
		del(scope){
			this.$store.dispatch("deleteAdminLog",scope.row._id);  
		}
  }
}
</script>

<style scoped>
.{}
</style>
