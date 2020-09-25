import AdminLog from "../../views/admin/adminLog.vue";
import AdminList from '../../views/admin/adminList.vue';
import upPassWord from "../../views/admin/upPassWord.vue"
export default [
    {
        path:"/",
        name:"adminLog",
        component:AdminLog
    },
	{
		path:"/adminList",
		name:"adminList",
		component:AdminList
	},
	{
		path:"/upPassWord",
		name:"upPassWord",
		component:upPassWord
	},
]