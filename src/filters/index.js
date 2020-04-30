import Vue from 'vue'

Vue.filter('filterDate', (timer, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof timer === 'number') {
    return new Date(timer * 1000).format(format)
  } else {
    return new Date(timer).format(format)
  }

})

Vue.filter('filterImg', (src = '') => {
  return 'https://fulishijie.oss-cn-hangzhou.aliyuncs.com' + src
})