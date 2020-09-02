import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Index from '../views/index/index.vue'
import Search from '../views/search/index.vue'
import My from '../views/my/index.vue'
import SearhResult from '../views/searhResult/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index,
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },
      {
        path: '/my',
        name: 'My',
        component: My,
      }
    ]
  },
  {
    path: '/Searhresult',
    name: 'SearhResult',
    component: SearhResult
  },
]

const router = new VueRouter({
  routes
})

export default router
