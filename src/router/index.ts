import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home.vue')
const Base = () => import(/* webpackChunkName: "base" */ '@/components/Base.vue')

const Login = () => import(/* webpackChunkName: "Login" */ '@/components/Login.vue')
const List = () => import(/* webpackChunkName: "List" */ '@/components/List.vue')

const NotFound = () => import(/* webpackChunkName: "NoFound" */ '@/components/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    component: Base,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/main',
    component: Base,
    children: [
      {
        path: 'list',
        name: 'list',
        component: List
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
