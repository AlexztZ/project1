import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import My from '../views/My.vue'
import Login from '../views/Login.vue'
import Address from '../views/Address.vue'
import Search from '../views/Search.vue'
import Detail from '../views/Detail.vue'
import ShopList from '../views/ShopList.vue'

const routes = [
	{ name:"index",path:"/",component:Index,
		children:[
		{ path:"/",name:"home",component:Home},
		{ path:"/order",name:"order",component:Order,
		meta:{isAuthorization:true},
		},
		{ path:"/my",name:"my",component:My,
		meta:{isAuthorization:true},
		},
		]
	},
	{ name:"login",path:"/login",component:Login},
	//{ name:"login",path:"/login",component:()=>import("@/views/Login.vue")},
	{ name:"Address",path:"/address",component:Address},
	{ name:"Search",path:"/search",component:Search},
	{ name:"Detail",path:"/detail/:shopId.html",component:Detail},
	{ name:"ShopList",path:"/ShopList/:shopTypeId.html",component:ShopList},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//前置守卫
router.beforeEach((to,from,next)=>{
	if(to.meta.isAuthorization){
		console.log(localStorage.token)
		if(localStorage.token){
			next();
		}else{
			next("/login");
		}	
	}else{
		next();
	}
})

export default router
