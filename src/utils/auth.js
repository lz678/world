/**
 * *权限控制 - 路由跳转前 设置
 * @Author: Lyle
 * @Date: 2018-01-01 14:53:36
 * @Last Modified by: Lyle
 * @Last Modified time: 2018-05-08 17:02:17
 */
import store from '@/store'
import router from '@/router'
import {
  getStore,
  setStore,
  removeStore,
  setPagesTitle
} from '@/utils/utils'
import { Toast } from 'vant'
import { runInNewContext } from 'vm'

// const handleNext = async (next, path) => {
//   if (host === '') {
//     const res = await store.dispatch('getApiHost')
//     next(path)
//   } else {
//     next(path)
//   }
// }

// const handleLocToken = async (next) => {
//   console.log(host, 'hosthost===>')
//   if (host === '') {
//     const res = await store.dispatch('getApiHost')
//     if (!res) {
//       next('/login')
//       return false
//     }
//     const hasToken = await store.dispatch('checktLoginToken')
//     hasToken ? next() : next('/login')
//   } else {
//     const hasToken = await store.dispatch('checktLoginToken')
//     hasToken ? next() : next('/login')
//   }
// }

/* 路由跳转之前 */
router.beforeEach(async (to, from, next) => {
  // handleNext(next)

  const whiterList = ['login', 'register', 'forget_pw']
  const isOpen = to.meta.isOpen
  const stoToken = store.state.token
  if (!isOpen) {
    Toast('暂未开放，敬请期待！')
    next(false)
  } else if (stoToken) {
    // handleNext(next)
    next()
  }
  else if (whiterList.includes(to.name)) {
    // handleNext(next)
    next()
  } else {
    const locToken = getStore('token')
    if (locToken) {
      // handleLocToken(next)
      const hasToken = await store.dispatch('checktLoginToken')
      hasToken ? next() : next('/login')
    } else {
      next('/login')
    }
  }
})
