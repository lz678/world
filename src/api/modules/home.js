/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {
  getHome: () => {
    return axios.get('index/index')
  },

  // 是否可以签到
  getIsSign: () => {
    return axios.get('signs/if_sign')
  },

  receiveReward: () => {
    return axios.get('signs/doSign')
  },

  getMessage: () => {
    return axios.get('message/message_list')
  },

  // 系统消息
  getSysMessage: () => {
    return axios.get('message/get_message')
  },
  //获取轮播详情
  getlunbo(data){
    return axios.post('index/getnr',data)
  },
  //获取广告位信息
  getAdvertising(data){
    return axios.post('index/getIndexContent',data)
  }
}
