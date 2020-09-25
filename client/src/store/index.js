import Vue from 'vue'
import Vuex from 'vuex'
import location from './location/index.js'
import user from './user/index.js'
import shop from './shop/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  location,user,shop
  }
})
