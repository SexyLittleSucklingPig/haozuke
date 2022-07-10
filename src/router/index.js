import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
// import Store from '@/store'
// console.log(Store.state)
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Serch = () => import('@/views/Serch')
const People = () => import('@/views/People')
const Set = () => import('@/views/Set')
const Newhouses = () => import('@/views/Newhouses')
const CityList = () => import('@/views/CityList')
const Map = () => import('@/views/Map')
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/home/serch',
        name: 'serch',
        component: Serch
      },
      {
        path: '/home/set',
        name: 'set',
        component: Set
      },
      {
        path: '/home/people',
        name: 'people',
        component: People
      }

    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/newhouses',
    component: Newhouses
  },
  {
    path: '/citylist',
    component: CityList
  },
  {
    path: '/map',
    component: Map
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 返回 false 以取消导航
//   console.log(to.path)
//   if (JSON.parse(localStorage.getItem('vuex')).xuser?.token && to.path === '/login') {
//     next({ path: '/home' })
//   } else {
//     next()
//   }
// })
export default router
