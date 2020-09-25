import axios from 'axios'

const state = {
	token:localStorage.token ||null,
	phoneCode:localStorage.phoneCode || null
}
const mutations = {
	CHANGE_TOKEN(state,{phoneCode,token}){
		state.phoneCode = localState.phoneCode = phoneCode;
		state.token = localState.token = token;
	}
}
const actions = {
	async login(){
			  if(!this.code){
			  	this.code_invalid=true;
			  }else{
				 const {data}= await axios.post("/ele/login",{
				    phoneCode:this.phoneCode,
				    code:this.code
				 })
				 if(data.ok === 1){
				    localStorage.token = data.token;
				    localStorage.phoneCode = this.phoneCode;
				    this.$router.go(-1);// 返回上一级
				 }
			  }
	}
}

export default{
	state,mutations,actions
}
