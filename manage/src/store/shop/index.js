import axios from "axios";
export default{
	state:{
		shopTypeList:[],
		allShopTypeList:[],
		shopList:[],
		// 根据类别ID获得的店铺列表
		shopListByTypeId:[]
	},
	mutations:{
		CHANGE_SHOPTYPE_LIST(state,shopTypeList){
			state.shopTypeList = shopTypeList;
		},
		CAHNGE_ALL_SHOPTYPE_LIST(state,shopTypeList){
		    state.allShopTypeList = shopTypeList;
		},
		CHANGE_SHOP_LIST_TYPEID(state,shopList){
		    state.shopListByTypeId = shopList;
		},
		CHANGE_SHOP_LIST(state,shopList){
		    state.shopList = shopList;
		},
		
	},
	actions:{
	 	async getShopTypeList({commit},{pageIndex=1,keyWord="",_id}={}){
			const data = await axios.get("/shopTypeList",{
				params:{
					pageIndex,
					keyWord,
					_id
				}
			})
			commit("CHANGE_SHOPTYPE_LIST",data.shopTypeList);
		},
		async getAllShopTypeList({commit}){
			const data = await axios.get("/allShopTypeList");
			commit("CAHNGE_ALL_SHOPTYPE_LIST",data.shopTypeList);
		},
		async getShopListByShopTypeId({commit},shopTypeId){
		    const {shopList} = await axios.get("/shopList/"+shopTypeId);
		    commit("CHANGE_SHOP_LIST_TYPEID",shopList);
		},
		async getShopList({commit},{pageIndex=1}={}){
		    const data = await axios.get("/shopList",{
		        params:{
		            pageIndex
		        }
		    })
		    commit("CHANGE_SHOP_LIST",data.shopList);
		},
	}
}