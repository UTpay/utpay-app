import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './components/HomePage'
import MyPage from './components/MyPage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: 'mypage',
          name: 'MyPage',
          component: MyPage
        }
      ]
    }
  ]
})

export default router
