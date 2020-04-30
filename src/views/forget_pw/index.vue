<!-- forget_pw -->
<template>
  <div class="login_wrap forget_pw">
    <div class="login_title">忘记密码</div>
    <div class="login_tip">欢迎来到易盟链</div>

    <div class="login_field_wrap">
      <van-field class="login_field login_phone" v-model="info.mobile" placeholder="请输入手机号">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_phone.png" alt />
          </div>
        </div>
        <div slot="button" class>
          <div class="code_btn" v-if="!showReminderTime" @click="getSmsCode">获取验证码</div>
          <div class="code_btn" v-else>重新发送({{reminderTime}}s)</div>
        </div>
      </van-field>

      <van-field class="login_field login_code" v-model="info.code" placeholder="请输入验证码">
        <div slot="left-icon">
          <div class="login_icon">
            <img src="../../assets/images/login_code.png" alt />
          </div>
        </div>
      </van-field>

      <van-field
        class="login_field"
        v-model="info.newpassword"
        type="password"
        placeholder="请输入用户密码"
      >
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>
    </div>

    <div class="btn" :class="{'confirm':hasValue}" @click="submit">提 交</div>
  </div>
</template>

<script>
import { getStore, setStore, removeStore } from '@/utils/utils'
export default {
  name: 'forget_pw',
  components: {},
  data () {
    return {
      isDisabled: true,
      timer: null,
      showReminderTime: false,
      reminderTime: 60,

      info: {
        newpassword: '',
        mobile: '',
        code: ''
      },
    }
  },
  computed: {
    hasValue () {
      return this.info.newpassword && this.info.mobile && this.info.code
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
    async getSmsCode () {
      let tel = /^1\d{10}$/
      if (this.info.mobile === '') {
        this.$toast('请输入手机号')
        return false
      } else if (!tel.test(this.info.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }

      this.$api.getSmsCode({ mobile: this.info.mobile, event: 'resetpwd' })
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
      let telReg = /^1\d{10}$/
      let pwReg = /^.{6,20}$/
      let codeReg = /^\d{4}$/

      const { newpassword, mobile, code } = this.info

      if (mobile === '') {
        res = false
        this.$toast('请输入手机号')
        return false
      } else if (!telReg.test(mobile)) {
        res = false
        this.$toast('请输入正确的手机号')
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
      if (newpassword === '') {
        res = false
        this.$toast('请输入密码')
        return false
      } else if (!pwReg.test(newpassword)) {
        res = false
        this.$toast('请输入正确的密码，6-20位')
        return false
      }

      return res
    },

    async submit () {
      const res = this.validate()
      if (!res) return false
      // const __token__ = await this.$store.dispatch('getCommonToken')
      this.$api.forgetPw({ mobile:this.info.mobile,newpassword:this.info.newpassword,code:this.info.code})

        .then(data => {
          console.log('重置密码返回结果 ==>', data)
          this.$toast(data.msg)
          if (data.code === 1) {
            this.$store.commit('changeValue', { type: 'token', value: '' })
            removeStore('userInfo')
            removeStore('token')
            this.$router.push('/login')
          }
        })
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.forget_pw {
  .van-field__button {
    margin-left: 0.8rem;
    font-size: 1.04rem;
    line-height: 1.12rem;
    border-left: 1px solid #ccc;
    color: #3a3c43;
  }
}
</style>