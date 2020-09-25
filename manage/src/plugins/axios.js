import axios from 'axios';
import Vue from 'vue';
import router from './router.js';
import vm from '../main.js';

//axios拦截器
axios.interceptors.request.use(config=>{
	//拦截请求url,将url前面加上 /ele
	config.url = "/ele"+config.url;
	
	return config;
})
axios.interceptors.responet.use(res=>{
	
	return res.data;
})

Vue.prototype.$axios=axios;
// window.axios=axios;  ×
export default axios;