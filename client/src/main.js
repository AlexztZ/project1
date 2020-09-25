import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import './assets/style/reset.css'
// import './assets/style/iconfont/iconfont.css'
import components from './components'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.prototype.$axios =axios;
Vue.config.productionTip = false
Vue.use(MintUI)

for(let key in components){
	Vue.component(key,components[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
