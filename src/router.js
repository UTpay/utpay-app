import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from './components/Welcome'
import Home from './components/Home'
import MyPage from './components/MyPage'
import Transfer from './components/Transfer'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'mypage',
          name: 'MyPage',
          component: MyPage
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: Transfer
        }
      ]
    }
  ]
})

export default router
