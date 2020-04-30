<!-- me_lottery -->
<template>
  <div class="me_lottery">
    <van-nav-bar fixed title="幸运大抽奖" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="page_head">
        <div class="page_banner">
          <img src="../../assets/images/lottery_banner.png" alt />
        </div>
        <div class="header_wrap">
          <div class="header_item" style="width:11.2rem;padding-top: 2rem;">
            <div class="header_item_title">我的奖券号</div>
            <div class="header_item_main code">{{info.jq_number}}</div>
          </div>
          <div class="header_item" style="width:15.68rem;">
            <!-- <div class="header_item_title">抽奖</div> -->
            <div class="header_item_main">
              <p>{{Number(info.welfare_integral)}}福利积分兑换一个抽奖券</p>
            </div>
            <div class="header_item_btn" v-if="isAvaBtn" @click="getLotteryRomNumber">兑换</div>
            <div class="header_item_btn no_btn" v-else>兑换</div>
          </div>
        </div>
      </div>

      <div class="page_desc">
        <div class="header_item_title">本期抽奖</div>
        <div
          class="desc_time"
          style="margin-top:10px;"
          v-if="info.content"
        >活动时间：{{info.active_time}}</div>
        <div class="desc_time" v-if="info.content">开奖时间：{{info.open_time}}</div>
        <div class="desc_main" v-html="info.content" v-if="info.content"></div>
        <div v-else style="height:100px;text-align: center;padding-top:50px">暂无抽奖活动！</div>
      </div>

      <div class="line"></div>
      <div class="page_desc" v-if="list">
        <div class="header_item_title">本期中奖号码</div>
        <div v-if="info.content">
          <div class="list" v-for="(item,index) in list" :key="index">
            <div class="list_title">{{item.name}}</div>
            <div class="page_list">
              <div class="list_item" v-for="(itm,indx) in item.list" :key="indx">{{itm.number}}</div>
            </div>
          </div>
           <!-- <div v-else style="height:100px;text-align: center;padding-top:50px">暂无抽奖活动！</div> -->
        </div>
         <div v-else style="height:100px;text-align: center;padding-top:50px">暂无抽奖活动！</div>
      </div>
    </div>

    <van-popup class="active_pop" v-model="isRomNum">
      <div class="recommend_title">兑换抽奖号</div>
      <div class="active_main">{{num}}</div>

      <van-field v-model="tradepassword" type="password" v-if="!isConfirm" placeholder="请输入兑换密码" />
      <div class="active_btn">
        <div class="active_btn_item btn_confrim" v-if="isConfirm" @click="handleClose">知道了</div>

        <div class="active_btn_item" v-if="!isConfirm" @click="getLotteryRomNumber">重新随机</div>
        <div
          class="active_btn_item btn_confrim"
          v-if="!isConfirm"
          @click="getLotteryConfirmNumber"
        >确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "me_lottery",
  components: {},
  data() {
    return {
      isAvaBtn: false,

      isConfirm: false,

      isRomNum: false,

      num: "",

      tradepassword: "",

      info: {},
      list: []
    };
  },
  computed: {},
  methods: {
    // 判断是否可以选号
    getLotteryAvaBtn() {
      this.$api.getLotteryAvaBtn().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.isAvaBtn = data.data.disable === 1;
        }
      });
    },

    getLotteryInfo() {
      this.$api.getLotteryInfo().then(data => {
        console.log("抽奖", data);
        if (data.code === 1) {
          this.info = data.data;
          this.list = data.data.number_list;
        }
      });
    },

    // 选号
    getLotteryRomNumber() {
      this.$api.getLotteryRomNumber().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.num = data.data.number;
          this.isRomNum = true;
        } else {
          this.$toast(data.msg);
        }
      });
    },

    // 确认选好
    getLotteryConfirmNumber() {
      const tradepassword = this.tradepassword;
      if (!tradepassword) {
        this.$toast("请输入兑换密码");
        return false;
      }
      this.$api
        .getLotteryConfirmNumber({ number: this.num, tradepassword })
        .then(data => {
          console.log(data);

          if (data.code === 1) {
            this.isConfirm = true;
            this.num = "恭喜你兑换成功！";
          } else {
            if (data.msg === "兑换密码不正确") {
              this.$toast(data.msg);
              this.tradepassword = "";
            } else {
              this.tradepassword = "";
              this.isConfirm = true;
              this.num = data.msg;
            }
          }
        });
    },

    handleClose() {
      this.isConfirm = false;
      this.isRomNum = false;
    }
  },
  created() {
    this.getLotteryInfo();
    this.getLotteryAvaBtn();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.me_lottery {
  padding-top: 4rem;
  height: 100%;
  background: #fff;
  .page_head {
    padding: 1.2rem;
    background: #f5f5f5;
  }
  .page_banner {
    height: 11.2rem;
  }

  .header_wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
  }
  .header_item {
    padding: 1rem 1.2rem;

    width: 48%;
    height: 7.2rem;
    text-align: center;
    font-size: 0.96rem;
    color: #868686;
    background: #fff;
    border-radius: 0.4rem;
  }
  .header_item_title {
    font-size: 1.12rem;
    font-weight: bold;
    color: #454545;
  }
  .header_item_main {
    p {
      line-height: 0.6rem;
    }
  }
  .code {
    margin-top: 2.4rem;
  }
  .header_item_btn {
    margin: 0 auto;
    margin-top: 1.28rem;
    width: 8rem;
    height: 2.24rem;
    line-height: 2.24rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    background: #18057a;
    color: #fff;
  }
  .no_btn {
    background: #efefef;
  }
  .page_desc {
    padding: 1.2rem 2.4rem;
    font-size: 0.96rem;
    background: #fff;
  }

  .desc_time {
    font-size: 1.12rem;
    color: #454545;
    line-height: 1.6rem;
  }
  .desc_main {
    padding: 0.8rem 0 0;
    line-height: 1.6rem;
  }

  .list {
    margin-top: 0.8rem;
  }

  .list_title {
    font-size: 1.04rem;
    font-weight: bold;
  }
  .page_list {
  }
  .list_item {
  }

  .page_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list_item {
    color: #868686;
    line-height: 1.6rem;
  }
  .line {
    height: 0.8rem;
    background: #f5f5f5;
  }

  .active_pop {
    width: 22.08rem;
    padding: 1.6rem;
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
    border-radius: 0.4rem;
    font-size: 0.96rem;
    border: 1px solid #18057a;
    color: #18057a;
  }
  .btn_confrim {
    background: #19067b;
    color: #fff;
  }
}
</style>