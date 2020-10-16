import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tabbar',
    component: () => import('../views/tabbar.vue'),
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/order.vue')
      },
      {
        path: 'shopcar',
        name: 'shopcar',
        component: () => import('../views/shopcar.vue')
      },
      {
        path: 'mycenter',
        name: 'mycenter',
        component: () => import('../views/mycenter.vue')
      },

    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  // 全部产品
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('../views/category.vue')
  },
  {
    path: '/productDetails/',
    name: 'categoryDetails',
    component: () => import('../views/productDetails.vue')
  },
  {
    path: '/address/',
    name: 'categoryDetails',
    component: () => import('../views/address.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
