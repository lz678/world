<!-- forget_pay_pw -->
<template>
  <div class="forget_pay_pw">
    <van-nav-bar fixed title="重置兑换密码" left-arrow @click-left="$router.go(-1)" />

    <div class="page_main">
      <van-cell-group>
        <van-field v-model="info.tradepassword" type="password" label="新设密码:" />
        <van-field v-model="info.again_tradepassword" type="password" label="确认密码:" />
        <van-field v-model="info.code" label="验证码:">
          <div slot="button" class>
            <div class="code_btn" v-if="!showReminderTime" @click="getSmsCode">获取验证码</div>
            <div class="code_btn" v-else>重新发送({{reminderTime}}s)</div>
          </div>
        </van-field>
      </van-cell-group>
        
        
      <div class="btn" :class="{'confirm':hasValue}" @click="handleConfirm">提 交</div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from '@/utils/utils'
export default {
  name: 'forget_pay_pw',
  components: {},
  data () {
    return {
      isDisabled: true,
      timer: null,
      showReminderTime: false,
      reminderTime: 60,

      info: {
        tradepassword: '',
        again_tradepassword: '',
        code: ''
      }
    }
  },
  computed: {
    hasValue () {
      return this.info.tradepassword && this.info.again_tradepassword && this.info.code
    }
  },
  methods: {
    // 获取定时器
    getTimer () {
      var nowDate = new Date().getTime()
      var verifyTime = Number(getStore('verifyTime'))

      if (nowDate - verifyTime > 60000) {
        this.showReminderTime = false
      } else {
        var time = parseInt((60000 - (nowDate - verifyTime)) / 1000)
        this.reminderTime = time
        this.setTimer()
      }
    },

    // 倒计时
    setTimer () {
      this.showReminderTime = true
      var nowDate = new Date().getTime()
      setStore('verifyTime', nowDate)
      this.timer = setInterval(() => {
        if (this.reminderTime > 0) {
          this.reminderTime--
        } else {
          clearInterval(this.timer)
          this.showReminderTime = false
          this.reminderTime = 60
        }
      }, 1000)
    },


    // 获取验证码
    getSmsCode () {
      this.$api.getTransCode()
        .then(data => {
          if (data.code === 1) {
            this.$toast('验证码已发送')
            this.setTimer()
          } else {
            this.$toast(data.msg)
          }
        })
    },
    validate () {
      let res = true
      let codeReg = /^\d{4}$/

      const { tradepassword, again_tradepassword, code } = this.info

      if (tradepassword === '') {
        this.$toast('新设密码不能为空')
        res = false
        return false
      } else if (tradepassword.length < 6 || tradepassword.length > 30) {
        this.$toast('密码长度为6-30')
        res = false
        return false
      }

      if (again_tradepassword === '') {
        this.$toast('确认密码不能为空')
        res = false
        return false
      } else if (again_tradepassword.length < 6 || again_tradepassword.length > 30) {
        this.$toast('确认密码为6-30')
        res = false
        return false
      } else if (again_tradepassword !== tradepassword) {
        this.$toast('两次密码输入不一致')
        res = false
        return false
      }


      if (code === '') {
        res = false
        this.$toast('请输入验证码')
        return false
      } else if (!codeReg.test(code)) {
        res = false
        this.$toast('请输入正确的验证码')
        return false
      }


      return res
    },
    handleConfirm () {
      const res = this.validate()
      if (!res) return false
      this.$api.changeTransPassword(this.info)
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.$toast('设置成功')
            this.$router.go(-1)
          } else {
            this.$toast(data.msg)
          }
        })
    }
  },
  created () {
    this.getTimer()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.forget_pay_pw {
  padding-top: 5.2rem;
  height: 100%;

  .page_main {
    height: 100%;
    background: #fff;
  }

  .van-field__button {
    margin-left: 0.8rem;
    font-size: 1.04rem;
    line-height: 1.12rem;
    border-left: 1px solid #ccc;
    color: #3a3c43;
  }
  .btn {
    margin: 12rem auto 0;
    width: 25.6rem;
    border-radius: 0;
    font-size: 1.12rem;
  }
}
</style>