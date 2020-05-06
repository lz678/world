import Vue from 'vue'
import Router from 'vue-router'
import { getComponent } from '@/utils/utils'

// import me from './modules/me'
// import mall from './modules/mall'
// import market from './modules/market'

Vue.use(Router)


export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: getComponent('views/login/index'),
    meta: { isOpen: true, title: '登录' }
  },
  {
    path: '/register',
    name: 'register',
    component: getComponent('views/register/index'),
    meta: { isOpen: true, title: '注册' }
  },

  {
    path: '/forget_pw',
    name: 'forget_pw',
    component: getComponent('views/forget_pw/index'),
    meta: { isOpen: true, title: '忘记密码' }
  },

  {
    path: '/',
    name: '',
    redirect: '/layout/me',
    component: getComponent('layout/index'),
    meta: { isOpen: true, title: '我的' }
  },


  {
    path: '/layout',
    name: 'layout',
    redirect: '/layout/me',
    component: getComponent('layout/index'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: getComponent('views/home/index'),
        meta: { isOpen: true, title: '首页' }
      },
      {
        path: 'task',
        name: 'task',
        component: getComponent('views/task/index'),
        meta: { isOpen: true, title: '任务' }
      },
      {
        path: 'mall',
        name: 'mall',
        component: getComponent('views/mall/index'),
        meta: { isOpen: false, title: '商城' }
      },
      {
        path: 'college',
        name: 'college',
        component: getComponent('views/college/index'),
        meta: { isOpen: true, title: '学院' }
      },
      {
        path: 'me',
        name: 'me',
        component: getComponent('views/me/index'),
        meta: { isOpen: true, title: '个人' }
      }
    ]
  },
  {
    path: '/me_info',
    name: 'me_info',
    component: getComponent('views/me_info/index'),
    meta: { isOpen: true, title: '个人资料' }
  },
  {
    path: '/member_centre',
    name: 'member_centre',
    component: getComponent('views/member_centre/index'),
    meta: { isOpen: true, title: '会员中心' }
  },
  {
    path: '/about',
    name: 'about',
    component: getComponent('views/about/index'),
    meta: { isOpen: true, title: '关于我们' }
  },

  {
    path: '/income_detail',
    name: 'income_detail',
    component: getComponent('views/income_detail/index'),
    meta: { isOpen: true, title: '明细' }
  },

  {
    path: '/my_team',
    name: 'my_team',
    component: getComponent('views/team/index'),
    meta: { isOpen: true, title: '我的团队' }
  },

  {
    path: '/me_address',
    name: 'me_address',
    component: getComponent('views/me_address/index'),
    meta: { isOpen: true, title: '收货地址' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: getComponent('views/auth/index'),
    meta: { isOpen: true, title: '认证' }
  },

  {
    path: '/me_lottery',
    name: 'me_lottery',
    component: getComponent('views/me_lottery/index'),
    meta: { isOpen: true, title: '我的抽奖' }
  },
  {
    path: '/me_dividend',
    name: 'me_dividend',
    component: getComponent('views/me_dividend/index'),
    meta: { isOpen: true, title: '我的分红' }
  },
  {
    path: '/me_set',
    name: 'me_set',
    component: getComponent('views/set/index'),
    meta: { isOpen: true, title: '用户设置' }
  },
  {
    path: '/set_pay_pw',
    name: 'set_pay_pw',
    component: getComponent('views/set_pay_pw/index'),
    meta: { isOpen: true, title: '支付密码' }
  },
  {
    path: '/forget_pay_pw',
    name: 'forget_pay_pw',
    component: getComponent('views/forget_pay_pw/index'),
    meta: { isOpen: true, title: '重置支付密码' }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: getComponent('views/feedback/index'),
    meta: { isOpen: true, title: '意见反馈' }
  },
  {
    path: '/feedback_back',
    name: 'feedback_back',
    component: getComponent('views/feedback_back/index'),
    meta: { isOpen: true, title: '意见反馈' }
  },
  {
    path: '/share',
    name: 'share',
    component: getComponent('views/share/index'),
    meta: { isOpen: true, title: '邀请好友' }
  },

  {
    path: '/msg',
    name: 'msg',
    component: getComponent('views/msg/index'),
    meta: { isOpen: true, title: '消息' }
  },
  {
    path: '/sys_msg',
    name: 'sys_msg',
    component: getComponent('views/sys_msg/index'),
    meta: { isOpen: true, title: '系统消息' }
  },
  {
    path: '/customer',
    name: 'customer',
    component: getComponent('views/customer/index'),
    meta: { isOpen: true, title: '客服' }
  },
  {
    path: '/video_details/:id',
    name: 'video_details',
    component: getComponent('views/video_details/index'),
    meta: { isOpen: true, title: '视频详情' }
  },
  {
    path: '/download',
    name: 'download',
    component: getComponent('views/download/index'),
    meta: { isOpen: true, title: '下载' }
  },
  {
    path:"/lunbo",
    name:'lunbo',
    component:getComponent('views/img_detail/index'),
    meta: { isOpen: true, title: '轮播详情' }
  },
  {
    path:"/advertis",
    name:'advertis_detail',
    component:getComponent('views/advertis_detail/index'),
    meta: { isOpen: true, title: '广告详情' }
  },
  {
    path:"/raise",
    name:'raise',
    component:getComponent('views/raise/index'),
    meta: { isOpen: true, title: '众筹' }
  },

]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

//解决重复点击tabbar问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

