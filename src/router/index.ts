import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import EditLabel from "@/views/EditLabel.vue"
import Money from "@/views/Money.vue"
import Labels from "@/views/Labels.vue"
import Statistics from "@/views/Statistics.vue"
import NotFound from "@/views/NotFound.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: "/money"
  },
  {
    path: "/money",
    component: Money
  },
  {
    path: "/lables",
    component: Labels
  },
  {
    path: "/statistics",
    component: Statistics
  },
  {
    path: "/lables/edit",
    component: EditLabel
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
