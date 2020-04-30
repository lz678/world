<!-- login -->
<template>
  <div class="login_wrap">
    <div class="login_title">登录</div>
    <div class="login_tip">欢迎来到互利社区</div>

    <div class="login_field_wrap">
      <van-field class="login_field" v-model="info.account" placeholder="请输入用户名/手机号">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_user.png" alt />
          </div>
        </div>
      </van-field>

      <!--   :type="isShowEye?'text':'password'"
      :right-icon="isShowEye?'eye-o':'closed-eye'" 
      @click-right-icon="isShowEye=!isShowEye"-->
      <van-field class="login_field" v-model="info.password" type="password" placeholder="请输入用户密码">
        <div slot="left-icon">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>
    </div>

    <div class="btn" :class="{'confirm':hasValue}" @click="login">登 录</div>

    <div class="forget_pw">
      <div @click="$router.push('/forget_pw')">忘记密码</div>
      <div @click="$router.push('/register')">注册</div>
    </div>

    <div class="login_protocol_tip foot">注册登录即代表同意《隐私政策》</div>
  </div>
</template>

<script>
import { setStore } from '@/utils/utils'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      info: {
        account: '',
        password: ''
      },
    }
  },
  computed: {
    
    hasValue () {
      return this.info.account && this.info.password
    }
  },
  methods: {

    validate () {
      const telReg = /^1\d{10}$/

      const { account, password } = this.info

      let res = true

      if (account === '') {
        this.$toast('请输入手机号')
        res = false
        return false
      }

      //  else if (!telReg.test(account)) {
      //   this.$toast('请输入正确的手机号')
      //   res = false
      //   return false
      // }

      if (password === '') {
        this.$toast('请输入密码')
        res = false
        return false
      }

      return res
    },

    login () {
      const res = this.validate()
      if (!res) return false
      this.$api.login(this.info)
       
        .then(data => {
          // console.log('登录返回结果 ==>', data)
          this.$toast(data.msg)
          if (data.code === 1) {
            this.$store.commit('changeValue', { type: 'token', value: data.data.userinfo.token })
            setStore('userInfo', data.data.userinfo)
            setStore('token', { token: data.data.userinfo.token })
            this.$router.push('/layout/home')
          }
        })
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.foot{
  margin-top:6.25rem;
}
.login_wrap {
  .forget_pw {
    display: flex;
    justify-content: space-between;
    margin-top: 1.44rem;
    font-size: 0.96rem;
  }
  .other_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8rem;
    color: #ccc;

    .other_h_title {
      margin: 0 0.8rem;
    }

    .line {
      flex: 1;
      height: 0.08rem;
      background: #ccc;
    }
  }
}
</style>