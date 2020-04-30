/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {
  // 判断是否可以兑换
  getBonusAvaBtn: data => {
    return axios.post('bonus/is_click', data)
  },

  // 分红信息
  getBonusInfo: data => {
    return axios.post('bonus/getBonus', data)
  },

  // 获取我的分红
  getBonusMyNumber: data => {
    return axios.post('bonus/getMyNum', data)
  },

  // 购买分红v
  getBonusConfirmNumber: data => {
    return axios.post('bonus/buyBonus', data)
  },
}
