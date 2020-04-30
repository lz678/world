/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {
  getApiHost: () => {
    return axios.get('http://www.xvjd.cn/apis.php')
  },

  // 登录
  login: data => {
    return axios.get('user/login', { params: data })
  },

  // 注册
  register: data => {
    return axios.get('user/register', { params: data })
  },

  // 忘记密码
  forgetPw: data => {
    return axios.post('user/resetpwd', data)
  },

  // 退出登录
  logout: () => {
    return axios.get('user/logout')
  },

  // 获取手机验证码
  getSmsCode: (data) => {
    return axios.get('sms/send', { params: data })
  },

  // 检测登录token 是否过期
  checktLoginToken: () => {
    return axios.get('token/check')
  },

  // 获取公共的 token
  getCommonToken: () => {
    return axios.get('common/gettoken')
  },

  // 上传文件
  uploadFiles: (data) => {
    let token = getStore('token')
    console.log(token, 'tokentoken')
    // host + '/addons/alioss/index/upload'
    return axios.post('http://www.fulishijie.top/addons/alioss/index/upload', data, {
      // headers['token']: token.token
      // http://www.faagy.cn/n
      headers: { 'token': token.token },
    })
  },

  // 获取下载地址
  getAppDownloadAddress: () => {
    return axios.get('index/version')
  },

  getAuthInfo: data => {
    return axios.post('/auths/identify', data)
  },

  postAuth: data => {
    return axios.post('auths/identify_post', data)
  }
}
