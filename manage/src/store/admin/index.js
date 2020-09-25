import axios from "axios";
const state = {
	adminName: sessionStorage.adminName || null,
	token:sessionStorage.token || null,
	adminLog:[],
	adminList:[],
	adminTypeEnum:{
	    1:"管理员登陆成功",
	    2:"管理员登陆失败"
	}
};
const mutations = {
	//登录功能
	CHANGE_USER_NAME(state,{adminName,token}){
	    state.adminName = sessionStorage.adminName = adminName;
		state.token = sessionStorage.token = token;
	},
	//注销功能
	OUT_LOGIN(state){
	    sessionStorage.clear();
        state.adminName = null;
    },
	//生成日志
	CHANGE_ADMIN_LOG(state,adminLog){
	    state.adminLog = adminLog;
	},
	CHANGE_ADMIN_LIST(state,adminList){
		state.adminList = adminList;
	}
};
const actions = {
	async login({commit},vm){
		const data = await axios.post( "/login",vm.adminForm);
		if(data.ok === 1){
			commit("CHANGE_USER_NAME",{
				adminName:vm.adminForm.adminName,
				token:data.token,
			});
		}else{
			vm.$message.error(data.msg);
		}
	},
	async getAdminLog({commit},{pageIndex=1}={}){
	    const {adminLog} = await axios.get("/adminLog",{
			params:{
				pageIndex:pageIndex
			}
	     });
	    commit("CHANGE_ADMIN_LOG",adminLog);
		// commit("CHANGE_PAGE_INFO",{pageIndex,pageSum});放入拦截器中后期多页面调用
	},
	async getAdminList({ commit },{pageIndex=1}={}){
		const { adminList } = await axios.get("/adminList",{
			params:{
				pageIndex
			}
		})
		commit("CHANGE_ADMIN_LIST", adminList);
	},
	async deleteAdminLog(context, id) {
	    const data = await axios.delete("/adminLog/" + id);
	    if (data.ok === 1) {
	        context.dispatch('getAdminLog', context.rootState.pageIndex)
	    } else {
	        alert("删除失败")
	    }
	},


}
export default{
	state,mutations,actions
}