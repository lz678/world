/* 公共接口 */

import axios from '@/utils/request'

export default {
  // 任务
  getTaskList: data => {
    return axios.get('task/extask',  data )
  },

  // 我的任务
  getMyTaskList: data => {
    return axios.post('task/myTask',  data )
  },

  // 过期任务
  getExpireTaskList: data => {
    return axios.post('task/expireTask', data )
  },

  // 兑换任务
  getBuyTask: data => {
    return axios.post('task/buy_task', data)
  },



}
