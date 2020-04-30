/* 公共接口 */

import axios from '@/utils/request'

export default {
  // // 获取用户信息
  // getUserInfo: () => {
  //   return axios.get('user/getinfo')
  // },

  // 获取个人信息
  getUserInfo: () => {
    return axios.get('user/user_center')
  },

  // 获取个人资料
  getUserProfile: () => {
    return axios.get('user/user_profile')
  },

  // 保存个人资料
  postUserProfile: data => {
    return axios.post('user/save_profile', data)
  },

  // 获取推荐人
  getMyRefer: data => {
    return axios.get('user/my_refer', data)
  },

  // 提交意见反馈
  postFeedback: data => {
    return axios.post('user/userFeedPost', data)
  },

  // 获取意见反馈列表
  getFeedbackBackList: data => {
    return axios.post('message/feedback_list', data)
  },

  // 获取明细列表
  getConsumeIndex: data => {
    return axios.post('consume/index', data)
  },

  // 设置支付密码
  setTransPassword: data => {
    return axios.post('user/setTransPassword', data)
  },

  // 获取修改支付密码验证嘛
  getTransCode: data => {
    return axios.post('user/getCode', data)
  },

  // 修改支付密码
  changeTransPassword: data => {
    return axios.post('user/changeTransPassword', data)
  },

  // 获取版本号
  getVersion: data => {
    return axios.get('index/version')
  },

  // 我的团队
  getTeamList: data => {
    return axios.post('team/index',data)
  },

  // 邀请好友
  getUserShare: data => {
    return axios.get('user/share')
  },

  // 新增收货地址
  postUserAddAddress: data => {
    return axios.post('user/addAddress', data)
  },

  // 获取收货地址
  getUserAddress: data => {
    return axios.post('user/getAddress', data)
  },

  // 获取会员信息
  getMemberCentre: data => {
    return axios.post('user/memberCenter', data)
  },

  // 获取激活联盟链信息
  getActiveCoin: data => {
    return axios.post('user/getActiveCoin')
  },
  // 激活联盟链信息
  postActiveCoin: data => {
    return axios.post('user/actUnIntegral', data)
  },
}
