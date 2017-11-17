import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import main from '@/components/main'
import dashboard from '@/components/dashboard'
import aplists from '@/components/listsAccessPoint'
import selectAccessPoint from '@/components/selectAccessPoint'
import admin from '@/components/adminDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/aplists',
      name: 'aplists',
      component: aplists
    },
    {
      path: '/selectAP',
      name: 'selectAccessPoint',
      component: selectAccessPoint
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
