<!-- announcement_pop -->
<template>
  <van-popup class="announcement_pop" v-model="isShowMd">
    <div class="pop_title">公告</div>
    <div
      class="pop_main"
    >占位文字，创意营销平台提供免费H5微场景、海报、长图、表单、视频、互动游戏、建站、小程序八大制作工具及秀推智能营销平台，助力企业高效完成内容创意、传播获客、数据管理、效果转化的自营销闭</div>
  </van-popup>
</template>

<script>
export default {
  name: 'announcement_pop',
  props: {
    isShow: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    isShowMd: {
      get () {
        return this.isShow
      },
      set (val) {
        this.$emit('update:isShow', val)
      }
    }
  },
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.announcement_pop {
  width: 82% !important;
  border-radius: 0.4rem;

  .pop_title {
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.28rem;
    font-weight: bold;
  }
  .pop_main {
    font-size: 1.04rem;
    line-height: 1.44rem;
    color: #323232;
  }
}
</style>