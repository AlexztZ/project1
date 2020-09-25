import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './Login.vue'
//引用element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import filters from './filters/index.js';
import components from './components/index.js'

Vue.config.productionTip = false

//让组件可以使用$axios调用axios
Vue.prototype.$axios = axios

//使用element-ui
Vue.use(ElementUI);

//使用过滤器
for(let key in filters){
	Vue.filter(key,filters[key])
}

//使用组件
for(let key in components){
    Vue.component(key,components[key])
}

//axios拦截器
axios.interceptors.request.use(config=>{
	store.commit("CAHNGE_IS_LOADING",true)
	//拦截请求url,将url前面加上 /ele
	config.url = "/ele"+config.url+"?t="+Date.now();
	config.headers = {
		authorization:store.state.admin.token
	}
	return config;
})

axios.interceptors.response.use(({data})=>{
	if(data.ok === 2){// token异常
	    store.commit("OUT_LOGIN");
	}
	store.commit("CAHNGE_IS_LOADING",false);
	//返回分页信息,更新分页信息
	if(data.pageIndex){
		store.commit("CHANGE_PAGE_INFO",{pageIndex:data.pageIndex,pageSum:data.pageSum});
	}
	return data;
})

new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.admin.adminName ? App:Login) }
}).$mount('#app')
