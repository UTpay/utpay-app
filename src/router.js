import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home'
import MyPage from './components/MyPage'
import Transfer from './components/Transfer'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
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
