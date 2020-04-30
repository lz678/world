<!-- me -->
<template>
  <div class="me_info">
    <van-nav-bar fixed title="个人资料" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <van-cell-group class="cell_group">
        <van-cell class="avatar_warp" title="头像" is-link>
          <van-uploader class="avatar" :after-read="upLoadAvatar">
            <div class="avatar_img">
              <img :src="info.avatar" alt />
            </div>
          </van-uploader>
        </van-cell>
      </van-cell-group>

      <van-field v-model="info.nickname" label="昵称:" maxlength="18" placeholder="请填写用户名" />

      <van-field v-model="info.zfb" label="支付宝:" maxlength="25" readonly placeholder="请填写您的支付宝账号" />
      <van-field
        v-model="info.mobile"
        label="手机号:"
        maxlength="11"
        readonly
        placeholder="请填写您的支付宝账号"
      />

      <div class="btn" :class="{'confirm':hasValue}" @click="handleConfirm">提 交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me',
  components: {},
  data () {
    return {
      info: {
        avatar: '',
        mobile: '',
        zfb: '',
        nickname: ''
      },
    }
  },
  computed: {
    hasValue () {
      return this.info.avatar && this.info.nickname
    }
  },
  methods: {
    getUserProfile () {
      this.$api.getUserProfile()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            const { nickname, zfb, mobile, avatar } = data.data
            this.info = { nickname, zfb, mobile, avatar }
          }
        })
    },

    async upLoadAvatar (file, index) {
      const res = await this.$store.dispatch('uploadFile', [file])
      this.info.avatar = res[0]
    },


    validate () {
      let res = true
      const { nickname, avatar } = this.info

      if (nickname === '') {
        this.$toast('请输入昵称')
        res = false
        return false
      }

      if (avatar === '') {
        this.$toast('请上传头像')
        res = false
        return false
      }

      return res
    },

    handleConfirm () {
      const res = this.validate()
      if (!res) return false
      const { nickname, avatar } = this.info

      this.$api.postUserProfile({ nickname, avatar })
        .then(data => {
          console.log(data, ';l')
          if (data.code === 1) {
            this.$toast('修改成功')
          } else {
            this.$toast(data.msg)
          }
        })
    }
  },
  async created () {
    this.getUserProfile()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.me_info {
  padding-top: 4rem;
  height: 100%;
  background: #fff;

  .van-field__control {
    text-align: right;
  }

  .avatar_warp {
    // border: 1px solid #000;
    .van-cell__value {
      overflow: initial;
    }
  }
  .avatar {
    position: relative;
    left: -100px;
    width: 161%;
    // border: 1px solid red;
    // overflow: hidden;
    .van-uploader__input-wrapper {
      width: 100%;
      height: 100%;
    }
    .avatar_img {
      margin-left: 85%;
      width: 3.84rem;
      height: 3.84rem;
      border: 1px solid #efefef;
      border-radius: 100%;
      overflow: hidden;
    }
  }

  .btn {
    margin: 14.24rem auto 0;
    width: 25.6rem;
    border-radius: 0;
    font-size: 1.12rem;
  }
}
</style>