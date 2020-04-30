<!-- me_set -->
<template>
  <div class="me_set">
    <van-nav-bar fixed title="设置中心" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <van-cell-group>
        <van-cell
          :title="isSet?'重置支付密码':'设置支付密码'"
          is-link
          :to="isSet?'/forget_pay_pw':'/set_pay_pw'"
        >
          <div slot="icon" class="cell_icon">
            <img src="../../assets/images/set_pw.png" alt />
          </div>
        </van-cell>
        <van-cell title="退出登录" is-link @click="handleLogout">
          <div slot="icon" class="cell_icon">
            <img src="../../assets/images/logout.png" alt />
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getStore, removeStore } from '@/utils/utils'
export default {
  name: 'me_set',
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    handleLogout () {
      this.$api.logout()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.$store.commit('changeValue', { type: 'token', value: '', })
            removeStore('token')
            removeStore('userInfo')
            this.$router.push('/login')
          }
        })
    }
  },
  created () {
    const userInfo = getStore('userInfo')
    console.log(userInfo, 'userInfo')
    this.isSet = userInfo.is_zfpwd === 1
  },
  mounted () { }
}
</script>

<style lang='scss'>
.me_set {
  padding-top: 5.2rem;

  .van-cell {
    padding: 0.8rem 1.6rem;
  }
  .cell_icon {
    width: 0.88rem;
    height: 1.04rem;
  }
}
</style>