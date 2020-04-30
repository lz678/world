<!-- me_dividend -->
<template>
  <div class="me_dividend">
    <van-nav-bar fixed title="会员分红" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="about_divi_title">关于分红</div>
      <div class="about_divi_desc">
        <p>一、每天18点-20点投入，参与第二天分红，到第二天下午18点投入分红的互利积分直接退回账户</p>
        <p>二、每个会员限制分红权3个</p>
        <p>三、500个互利积分兑换一个分红权</p>
      </div>

      <div class="about_divi_my">我的分红权：{{myNum}}</div>
      <div class="confirm_btn" @click="handleConfirm">马上参与</div>
    </div>

    <van-popup class="active_pop" v-model="isShowMd">
      <div class="recommend_title">兑换分红权</div>
      <div class="active_tip">每种分红限购{{info.num}}份·{{info.ponits}}/份</div>
      <div class="active_btn_wrap">
        <div class="btn_item less_btn" :class="{'less_btn_hl':num>1}" @click="handleNum('less')"></div>
        <div class="num">{{num}}</div>
        <div
          class="btn_item add_btn"
          :class="{'add_btn_hl':num<info.num}"
          @click="handleNum('add')"
        ></div>
      </div>
      <div class="active_total">
        <div>总价：{{info.ponits*num}}互利积分</div>
        <div>余额：{{info.union_integral}}</div>
      </div>
      <div class="active_tip tip_err" v-if="info.ponits*num>info.union_integral">您的余额不足，无法购买</div>

      <div class="active_btn">
        <div
          class="active_btn_item btn_confrim"
          v-if="info.ponits*num>info.union_integral"
          @click="isShowMd =false"
        >知道了</div>

        <div class="active_btn_item btn_confrim" v-else @click="getConfirm">购买</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'me_dividend',
  components: {},
  data () {
    return {

      isAvaBtn: false,

      isShowMd: false,

      num: 1,

      myNum: 0,

      info: {}
    }
  },
  computed: {},
  methods: {
    handleNum (type) {
      if (type === 'less') {
        if (this.num > 1) {
          this.num--
        }
      } else {
        if (this.num < this.info.num) {
          this.num++
        }
      }
    },

    getBonusAvaBtn () {
      this.$api.getBonusAvaBtn()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.isAvaBtn = data.data.disable === 1
          }
        })
    },

    getBonusMyNumber () {
      this.$api.getBonusMyNumber()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.myNum = data.data.num
          }
        })
    },

    getBonusInfo () {
      this.$api.getBonusInfo()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.info = data.data
          }
        })
    },
    handleConfirm () {
      if (this.isAvaBtn) {
        this.$toast('还未到参与时间请于每天18点 - 20点参与')
        return false
      }
      this.isShowMd = true
    },

    getConfirm () {
      if (this.isAvaBtn) {
        this.$toast('还未到参与时间请于每天18点 - 20点参与')
        return false
      }
      const num = this.num
      const union_integral = this.num * this.info.ponits
      this.$api.getBonusConfirmNumber({ num, union_integral })
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.$toast('购买成功')
            this.isShowMd = false
          } else {
            this.$toast(data.msg)
          }
        })
    }
  },
  created () {
    this.getBonusAvaBtn()
    this.getBonusInfo()
    this.getBonusMyNumber()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.me_dividend {
  height: 100%;
  .van-nav-bar {
    background: transparent;
  }
  .van-nav-bar__title {
    color: #fff !important;
  }
  .van-icon-arrow-left {
    color: #ccc !important;
  }
  .page_main {
    padding: 8rem 1.6rem;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/dividend_bg.png") no-repeat left top;
    background-size: 100% 100%;
    color: #fff;
    font-size: 1.04rem;
  }
  .about_divi_title {
    font-size: 1.44rem;
    font-weight: bold;
  }
  .about_divi_desc {
    line-height: 1.6rem;
  }
  .about_divi_my {
    position: relative;
    top: 5.12rem;
    text-align: right;
  }
  .confirm_btn {
    margin: 0 auto;
    margin-top: 12rem;
    width: 8rem;
    height: 2.24rem;
    line-height: 2.24rem;
    text-align: center;
    background: #fff;
    color: #47248a;
    font-size: 1.2rem;
    border-radius: 0.4rem;
  }

  .active_pop {
    width: 22.08rem;
    padding: 1.6rem 0;
    border-radius: 0.32rem;
    text-align: center;
  }

  .recommend_title {
    margin-bottom: 1.2rem;
    font-size: 1.12rem;
    color: #1f1f1f;
    font-weight: 800;
  }
  .active_main {
    margin: 2.4rem 0;
    text-align: center;
    color: #464646;
    font-size: 1.04rem;
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
    margin-top: 1.2rem;
  }
  .active_btn_item {
    width: 8rem;
    height: 2.4rem;
    line-height: 2.4rem;
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

  .active_tip {
    padding: 0.3rem 1.6rem;
    text-align: left;
    font-size: 0.96rem;
  }
  .tip_err {
    color: #ef6161;
  }

  .active_btn_wrap {
    display: flex;
    align-items: center;
    padding: 0 1.92rem;
    height: 2.72rem;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }

  .btn_item {
    width: 2.08rem;
    height: 2.08rem;
  }
  .less_btn {
    background: url("../../assets/images/less_btn.png");
    background-size: 100% 100%;
  }

  .less_btn_hl {
    background: url("../../assets/images/less_hl_btn.png");
    background-size: 100% 100%;
  }
  .num {
    flex: 1;
  }
  .add_btn {
    background: url("../../assets/images/add_btn.png");
    background-size: 100% 100%;
  }
  .add_btn_hl {
    background: url("../../assets/images/add_hl_btn.png");
    background-size: 100% 100%;
  }
  .active_total {
    display: flex;
    justify-content: space-between;
    padding: 1.28rem 1.6rem 0.16rem 1.6rem;
    font-size: 0.96rem;
  }
}
</style>