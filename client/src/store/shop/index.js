import axios from 'axios'
import {Toast} from 'mint-ui'
const state = {
	searchShopList:[],
}
const mutations = {
	CHANGE_SEARCH_SHOP_LIST(state,shopList){
		state.searchShopList = shopList
	},
}
const actions = {
	async search({commit},keyword){
		if(keyword.length>0){
			const {data} = await axios.get("/ele/search",{
				params:{
					keyword
				}
			})
			commit("CHANGE_SEARCH_SHOP_LIST",data.shopList)
		}else{
			Toast({
			  message: '请输入店铺关键字',
			  position: 'bottom',
			  duration: 1000
			});
		}	
	}
}

export default{
	state,mutations,actions
}
