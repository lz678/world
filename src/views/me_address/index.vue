<!-- me_address -->
<template>
  <div class="me_address">
    <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="page_add_title">请填写您的收货地址：</div>
      <van-field v-model="address" maxlength="50" placeholder="请填写收货地址" />

      <div class="btn" :class="{'confirm':hasValue}" @click="handleConfirm">提 交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me_address',
  components: {},
  data () {
    return {
      address: ''
    }
  },
  computed: {
    hasValue () {
      return this.address
    }
  },
  methods: {
    getUserAddress () {
      this.$api.getUserAddress()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.address = data.data.data
          } else {
            this.$toast(data.msg)
          }
        })
    },
    handleConfirm () {
      this.$api.postUserAddAddress({ address: this.address })
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.$toast('新增成功')
          } else {
            this.$toast(data.msg)
          }
        })
    }
  },
  created () {
    this.getUserAddress()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.me_address {
  height: 100%;
  padding-top: 5rem;
  .page_main {
    padding: 2.4rem;
    height: 100%;
    color: #797979;
    background: #fff;

    .van-cell {
      padding-left: 0;
      border-bottom: 1px solid #efefef;
    }
    .van-cell:not(:last-child)::after {
      border: none;
    }
    .van-field__control {
      color: #c4c4c4;
    }
    .btn {
      margin: 14.24rem auto 0;
      width: 25.6rem;
      border-radius: 0;
      font-size: 1.12rem;
    }
  }
}
</style>