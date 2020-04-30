/* 公共接口 */

import axios from '@/utils/request'
import { getStore } from '@/utils/utils'

export default {
  // 学院数据
  // getCollegeInfo(data){
   
  //     return axios.get('college/get_info', { params: data })
     
  // },
  getCollegeVideo: data => {
    return axios.get('college/get_video', { params: data })
  },

  getCollegeImg: data => {
    return axios.get('college/get_img', { params: data })
  },

  getCollegeWf: data => {
    return axios.get('college/get_wf', { params: data })
  },

  // 视频详情
  getCollegeVideoDetail: data => {
    return axios.get('college/detail', { params: data })
  },

  // receiveReward: () => {
  //   return axios.get('index/index')
  // },
}
