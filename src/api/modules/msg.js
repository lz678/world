/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {

  // 获取聊天双方id
  getChatId: data => {
    return axios.get('message/get_chat_uid', { params: data })
  },

  // 获取聊天双方头像
  getChatHead: data => {
    return axios.post('message/get_head', data)
  },

  // 获取聊天记录
  getMsgList: data => {
    return axios.post('message/load', data)
  },

  // 发送消息
  sendMsg: data => {
    return axios.post('message/addMessage', data)
  },

  // 设置消息为已读
  changeNoRead: data => {
    return axios.post('message/changeNoRead', data)
  },
}
