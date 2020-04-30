<!-- set_pay_pw -->
<template>
  <div class="set_pay_pw">
    <van-nav-bar fixed title="兑换密码" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <!-- <div v-if="!isSet"> -->
      <van-cell-group>
        <van-field v-model="info.tradepassword" type="password" label="设置密码:" />
        <van-field v-model="info.again_tradepassword" type="password" label="确认密码:" />
      </van-cell-group>
      <!-- </div> -->

      <!-- <div v-else>
        <van-field v-model="info2.old_pw" type="password" label="原始密码:" />
        <van-field v-model="info2.new_pw" type="password" label="新设密码:" />
        <van-field v-model="info2.again_pw" type="password" label="确认密码:" />
        <div class="forget_btn" @click="$router.push('/forget_pay_pw')">忘记密码？</div>
      </div>-->
      <div class="btn" :class="{'confirm':hasValue}" @click="handleConfirm">提 交</div>
    </div>
  </div>
</template>

<script>
import { getStore } from '@/utils/utils'
export default {
  name: 'set_pay_pw',
  components: {},
  data () {
    return {
      isSet: true,
      info: {
        tradepassword: '',
        again_tradepassword: ''
      },

      // info2: {
      //   tradepassword: '',
      //   again_tradepassword: '',
      //   again_pw: '',
      // }
    }
  },
  computed: {
    hasValue () {
      // if (this.isSet) {
      //   return this.info.tradepassword && this.info.again_tradepassword
      // } else {
      return this.info.tradepassword && this.info.again_tradepassword
      // }
    }
  },
  methods: {
    validate () {
      let res = true
      // if (this.isSet) {
      //   const { tradepassword, again_tradepassword } = this.info2
      //   res = false
      //   return false
      // } else {
      const { tradepassword, again_tradepassword } = this.info

      if (tradepassword === '') {
        this.$toast('设置密码不能为空')
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

      // }

      return res
    },

    handleConfirm () {
      const res = this.validate()
      if (!res) return false
      // const api = this.isSet ? 'changeTransPassword' : ''
      this.$api.setTransPassword(this.info)
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
    // const userInfo = getStore('userInfo')
    // console.log(userInfo, 'userInfo')
    // this.isSet = userInfo.is_zfpwd === 1
  },
  mounted () { }
}
</script>

<style lang='scss'>
.set_pay_pw {
  padding-top: 5.2rem;
  height: 100%;

  .page_main {
    height: 100%;
    background: #fff;
  }

  .van-cell__title {
    margin-left: 0.8rem;
  }

  .forget_btn {
    margin-top: 1.1rem;
    margin-left: 2.24rem;
    font-size: 0.96rem;
  }

  .btn {
    margin: 12rem auto 0;
    width: 25.6rem;
    border-radius: 0;
    font-size: 1.12rem;
  }
}
</style>