/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {
  // 判断是否可以兑换
  getLotteryAvaBtn: data => {
    return axios.post('lottery/avaButton', data)
  },

  // 判断是否可以兑换
  getLotteryInfo: data => {
    return axios.post('lottery/index', data)
  },

  // 抽奖选好
  getLotteryRomNumber: data => {
    return axios.post('lottery/getRomNumber', data)
  },

  // 确定选好
  getLotteryConfirmNumber: data => {
    return axios.post('lottery/confirmNumber', data)
  },
}
