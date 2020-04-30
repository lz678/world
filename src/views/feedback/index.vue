<!-- feedback -->
<template>
  <div class="feedback">
    <van-nav-bar fixed title="意见反馈" left-arrow @click-left="$router.go(-1)" />

    <div class="page_main">
      <van-field v-model="info.content" type="textarea" :rows="5" placeholder="请输入你的反馈意见" />
      <div class="btn" :class="{'confirm':hasValue}" @click="handleConfirm">提 交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'feedback',
  components: {},
  data () {
    return {
      info: {
        content: ''
      }

    }
  },
  computed: {
    hasValue () {
      return this.info.content
    }
  },
  methods: {
    handleConfirm () {
      if (!this.info.content) {
        this.$toast('请输入你的反馈意见')
        return false
      }

      this.$api.postFeedback(this.info)
        .then(data => {
          console.log(data, 'llllkjk')
          if (data.code === 1) {
            this.$toast(data.msg)
            this.info.content = ''
          }
        })
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.feedback {
  padding-top: 4rem;
  height: 100%;

  .van-nav-bar {
    border-bottom: 1px solid #f5f5f5;
  }

  .page_main {
    padding: 3.04rem 2.24rem;
    height: 100%;
    background: #fff;
  }

  .van-field {
    background: #f5f5f5;
    border-radius: 5px;
  }

  .btn {
    margin: 3.28rem auto 0;
    width: 25.6rem;
    border-radius: 0;
    font-size: 1.12rem;
  }
}
</style>