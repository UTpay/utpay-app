import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from './components/Welcome'
import Home from './components/Home'

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
        }
      ]
    }
  ]
})

export default router
