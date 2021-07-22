import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../pages/login/Login.vue')
const Home = () => import('../pages/home/Home.vue')
const Register = () => import('../pages/login/Register.vue')
const Moment = () => import('../pages/moment/Moment.vue')
const Publish = () => import('../pages/moment/Publish.vue')
const Comment = () => import('../components/comment/Comment.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    redirect: '/moment',
    children: [
      {
        path: '/moment',
        component: Moment
      },
      {
        path: '/upload',
        component: Publish
      },
      {
        path: '/moment/:momentId',
        component: Comment
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
