import 'babel-polyfill'

import Vue from 'vue'
import router from './router'

// 重置样式
import 'normalize.css/normalize.css'

// vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 全局样式
import './styles/index.scss'
import './styles/common.scss'

// 项目入口
import App from './App'

// store
import store from '@/store'
// api
import api from '@/api'

// 全局过滤器
import filter from './filters/index'

// 权限控制
import auth from '@/utils/auth'

// 全局过滤器
// import filter from './filters/index'

import VueCropper from 'vue-cropper'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
// Vue.use(preview, options)
Vue.use(preview)
// 移动端日志
// import VConsole from 'vconsole'

Vue.use(Vant)
Vue.use(VueCropper)
Vue.use(VueAwesomeSwiper)
// new VConsole()


Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
