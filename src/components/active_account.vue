<!-- active_account -->
<template>
  <van-popup class="active_account" v-model="isShowMd">
    <div class="recommend_title">激活互利积分</div>
    <div class="active_main">
      <div>消耗互利链：{{info.active_integral}}</div>
      <div class="active_balance">互利链余额：{{info.now_currency}}</div>
      <div
        class="active_balance err"
        v-if="Number(info.now_currency)<Number(info.active_integral)"
      >您的互利链余额不足，现在余额为：{{info.now_currency}}</div>

      <van-field v-model="tradepassword" type="password" label="兑换密码:" placeholder="请输入兑换密码" />

      <div class="active_btn">
        <div class="active_btn_item" @click="isShowMd = false">取消</div>
        <div
          class="active_btn_item btn_confrim"
          v-if="Number(info.now_currency)<Number(info.active_integral)"
          @click="isShowMd = false"
        >知道了</div>
        <div class="active_btn_item btn_confrim" v-else @click="confirm">激活</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "active_account",
  props: {
    isShow: Boolean
  },
  data() {
    return {
      info: {
        active_integral: "",
        now_currency: ""
      },
      tradepassword: ""
    };
  },
  computed: {
    isShowMd: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      }
    }
  },
  methods: {
    getActiveCoin() {
      this.$api.getActiveCoin().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.info = data.data;
        }
      });
    },
    confirm() {
      if (!this.tradepassword) {
        this.$toast("请输入兑换密码");
        return false;
      }
      this.$api
        .postActiveCoin({
          num: this.info.active_integral,
          tradepassword: this.tradepassword
        })
        .then(data => {
          console.log("confirm",data);
          if (data.code ==1) {
            this.$toast("激活成功");
            this.$router.go(0)
            // this.$router.push("/layout/me")
            // isShowMd = false;
            // isShowMd.set(false)
          } else {
            this.$toast(data.msg);
            // isShowMd = false;
          }
        });
    }
  },
  created() {
    this.getActiveCoin();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.active_account {
  width: 82% !important;
  padding: 1.6rem;
  border-radius: 0.32rem;

  .recommend_title {
    text-align: center;
    font-size: 1.28rem;
    color: #1f1f1f;
  }
  .active_main {
    text-align: left;
    color: #464646;
    font-size: 1.04rem;
    & > div {
      padding: 0.48rem 0;
    }
  }
  .active_balance {
    padding-right: 1.6rem;
    text-align: right;
    color: #b5b5b5;
    border-top: 1px solid #e9e9e9;
  }

  .active_btn {
    display: flex;
    justify-content: space-around;
    margin-top: 0.8rem;
  }
  .active_btn_item {
    width: 7.04rem;
    height: 2.08rem;
    line-height: 2.08rem;
    text-align: center;
    background: rgba(233, 233, 233, 1);
    border-radius: 0.4rem;
    font-size: 0.96rem;
    color: #8a8a8a;
  }
  .btn_confrim {
    background: #19067b;
    color: #fff;
  }
  .err {
    text-align: left;
    color: #ed5c5c;
  }
  .van-cell {
    padding: 0.8rem 2.4rem;
    font-size: 1.04rem;
    border-bottom: 1px solid #efefef;
  }
  .van-field__control {
    text-align: right;
  }
  .van-cell__title {
    margin-left: 0;
  }
}
</style>