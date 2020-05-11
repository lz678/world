/* 公共接口 */

import axios from '@/utils/request'

export default {
  // 卷轴
  getMallList: data => {
    return axios.get('book/index', { params: data })
  },

  // 我的卷轴
  getMyMallList: data => {
    return axios.get('book/mybook', { params: data })
  },

  // 历史卷轴
  getMalledList: data => {
    return axios.get('book/mybooked', { params: data })
  },

  // 兑换卷轴
  getBuyMall: data => {
    return axios.post('book/buybook', data)
  },


  // 兑换卷轴
  getAfcBuyMall: data => {
    return axios.post('book/useAfcbuybook', data)
  },
  // 获取商品种类列表
  getMallTypeList(data) {
    return axios.post('store/store_list', data)
  },
  // 商品详情
  getGoodsDetail(data) {
    return axios.get('store/store_detail', { params: data })
  },
  // 获取商品列表
  getGoodsList(data) {
    return axios.get('store/lists', { params: data })
  },
  //购买商品
  postbuygoods(data) {
    return axios.post('store/pay_product', data)
  },
  // 获取我的购买记录
  postmyhistory(){
    return axios.post('user/my_store')
  }
}
