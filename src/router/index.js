import Vue from 'vue'
import Router from 'vue-router'

//  懒加载
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/ShopCart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const Detail = () => import('views/detail/Detail.vue')

// 1. 安装插件
Vue.use(Router);

// 3. 配置映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
		// 动态路由写法
    // path: '/detail/:iid',
		path: '/detail',
    component: Detail
  }
]

// 2. 创建router
const router = new Router({
  routes,
  mode: 'history'
})

// 导出路由
export default router
