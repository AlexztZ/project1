<template>
  <div>
    <el-table  style="width: 100%" :data="$store.state.admin.adminList">
      <el-table-column label="最后登陆时间" width="220">
        <!-- slot-scope插槽  -->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.loginTime | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号名称">
        <template slot-scope="scope">{{scope.row.adminName}}</template>
      </el-table-column>   
      <el-table-column label="操作">
        <template slot-scope="scope">
			<el-button size="mini" type="info"
			@click="del(scope)"
			>修改</el-button>
			<el-button size="mini" type="danger"
			@click="del(scope)"
			>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
	<PageList actionName="getAdminList"></PageList>
  </div>
</template>

<script>
export default {
  name: 'AdminList',
  props:{},
  data() {
  	return {}
  },
  components: {},
  mounted() {
	  this.$store.dispatch("getAdminList");
  },
  updated() {},
  methods: {}
}
</script>

<style scoped>
.{}
</style>
