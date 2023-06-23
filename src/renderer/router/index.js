import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Cash from '../views/Cash.vue'
import Card from '../views/Card.vue'
import Bonus from '../views/Bonus.vue'
import Cost from '../views/Cost.vue'
import Language from '../views/Language.vue' 
import Program from '../views/Program.vue' 
import Setting from '../views/Setting.vue' 
import Popup from '../views/Popup.vue' 
import Status from '../views/Status.vue' 
import Finance from '../views/Finance.vue' 
import Password from '../views/Password.vue' 
import Localize from '../views/Localize.vue'

// import { shallowRef } from 'vue'
// const current = shallowRef(Program)

Vue.use(Router)

const router = new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main' },
      // component: () => import('../views/Home.vue')
      component: Home
    },
    {
      path: '/cash',
      name: 'cash',
      meta: { layout: 'main' },
      // component: () => import('../views/Cash.vue')
      component: Cash
    },
    {
      path: '/card',
      name: 'card',
      meta: { layout: 'main' },
      // component: () => import('../views/Card.vue')
      component: Card
    },
    {
      path: '/bonus',
      name: 'bonus',
      meta: { layout: 'main' },
      // component: () => import('../views/Bonus.vue')
      component: Bonus
    },
    {
      path: '/cost',
      name: 'cost',
      meta: { layout: 'main' },
      // component: () => import('../views/Cost.vue')
      component: Cost
    },
    {
      path: '/language',
      name: 'language',
      meta: { layout: 'main' },
      // component: () => import('../views/Language.vue')
      component: Language
    },
    {
      path: '/program',
      name: 'program',
      meta: { layout: 'main' },
      // component: () => import('../views/Program.vue')
      component: Program
    },
    {
      path: '/service',
      name: 'service',
      meta: { layout: 'main' },
      component: () => import('../views/Service.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      meta: { layout: 'main' },
      component: () => import('../views/Setting.vue')
    },
    {
      path: '/popup',
      name: 'popup',
      meta: { layout: 'main' },
      component: () => import('../views/Popup.vue')
    },
    {
      path: '/status',
      name: 'status',
      meta: { layout: 'main' },
      component: () => import('../views/Status.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      meta: { layout: 'main' },
      component: () => import('../views/Finance.vue')
    },
    {
      path: '/password',
      name: 'password',
      meta: { layout: 'main' },
      component: () => import('../views/Password.vue')
    },
    {
      path: '/invoice',
      name: 'invoice',
      meta: { layout: 'main' },
      component: () => import('../views/Invoice.vue')
    },
    {
      path: '/localize',
      name: 'localize',
      meta: { layout: 'main' },
      component: () => import('../views/Localize.vue')
    },
  ]
})

export default router
