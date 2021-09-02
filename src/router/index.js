import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
// import AlphaShop from '../views/AlphaShop.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/alphashop/1'
  },
  {
    path:'/alphashop/',
    redirect:'/alphashop/1'
  },
  {
    path: '/alphashop/1',
    name: 'AlphaShop-1',
    component: ()=>import('../views/PartOne.vue')
  },
  {
    path: '/alphashop/2',
    name: 'Alphashop-2',
    component: () => import('../views/PartTwo.vue')
  },
  {
    path: '/alphashop/3',
    name: 'Alphashop-3',
    component: () => import('../views/PartThree.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router

