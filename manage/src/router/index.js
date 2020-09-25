import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin/index.js'
import shop from './shop/index.js'
import goods from './goods/index.js'

Vue.use(VueRouter)

const routes = [
  ...admin,
  ...shop,
  ...goods
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
