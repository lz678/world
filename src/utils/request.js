/**
 * *AXIOS通用的设置
 * @Author: Lyle
 * @Date: 2018-10-12 14:42:49
 * @Last Modified by: Lyle
 * @Last Modified time: 2018-10-13 17:45:18
 */

import axios from 'axios'
import Router from '../router'

console.log(host, 'storestore')
import { getStore, removeStore } from '@/utils/utils'


// axios 基础配置
axios.defaults.timeout = 8000
axios.defaults.baseURL = 'http://134.175.202.70:8080/'

// axios.defaults.withCredentials = true
const reg = /^(http|https)/

// request请求拦截
axios.interceptors.request.use(
  // 在请求发送之前做一些事
  config => {
    if (!reg.test(config.url)) {
      // config.url = host + '/api/' + config.url

      let token = getStore('token')
      if (token) {
        config.headers['token'] = token.token
      }
    }
    return config
  },
  // 当出现请求错误是做一些事
  err => {
    console.log('err' + err)
  }
)

// respone拦截器
axios.interceptors.response.use(
  res => {
    console.log(res, 'dddd');
    const data = res.data;
    if(data.code === 1001) {
      removeStore('userInfo')
      removeStore('token')
      // Router.push('/login')
    } else {
      return data
    }
  },
  err => {
    console.log(err, 'rrrr')
    if (String(err).includes('401')) {
      removeStore('userInfo')
      removeStore('token')
      // Router.push('/login')
    }
  }

)

export default axios
