import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Cash from '../views/Cash.vue'
import Card from '../views/Card.vue'
import Bonus from '../views/Bonus.vue'
import Cost from '../views/Cost.vue'
import Language from '../views/Language.vue' //Language
import Program from '../views/Program.vue' //Program
import Setting from '../views/Setting.vue' //Setting
import Popup from '../views/Popup.vue' //Popup
import Status from '../views/Status.vue' //Status
import Finance from '../views/Finance.vue' //Finance
import Password from '../views/Password.vue' //Password

Vue.use(Router)

const router = new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main' },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/cash',
      name: 'cash',
      meta: { layout: 'main' },
      component: () => import('../views/Cash.vue')
    },
    {
      path: '/card',
      name: 'card',
      meta: { layout: 'main' },
      component: () => import('../views/Card.vue')
    },
    {
      path: '/bonus',
      name: 'bonus',
      meta: { layout: 'main' },
      component: () => import('../views/Bonus.vue')
    },
    {
      path: '/cost',
      name: 'cost',
      meta: { layout: 'main' },
      component: () => import('../views/Cost.vue')
    },
    {
      path: '/language',
      name: 'language',
      meta: { layout: 'main' },
      component: () => import('../views/Language.vue')
    },
    {
      path: '/program',
      name: 'program',
      meta: { layout: 'main' },
      component: () => import('../views/Program.vue')
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
  ]
})

export default router
