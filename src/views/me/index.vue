<!-- me -->
<template>
  <div class="me">
    <div class="me_header">
      <div class="header_top"></div>
      <!-- <div class="me_set_title" @click="isShowActiveMd = true">激活联盟积分</div> -->
      <div class="me_set_btn" @click="$router.push('/me_set')">
        <img src="../../assets/images/me_set.png" alt />
      </div>
      <div class="me_user_wrap">
        <div class="me_user">
          <div class="user_avatar" @click="$router.push('/me_info')">
            <img :src="info.avatar" alt />
          </div>
          <div class="user_nickname">
            <div class="nickname_wrap">
              <div class="nickname" @click="$router.push('/me_info')">{{info.nickname}}</div>
              <div class="me_lv" @click="$router.push('/member_centre')">
                <div class="lv_val">{{info.level_name.slice(1)}}</div>
              </div>
            </div>
            <div @click="$router.push('/me_info')">{{info.mobile_hidden}}</div>
          </div>
          <div class="user_contribution">
            <div class="contribution">{{info.contribute_value||0}}</div>
            <div>贡献值</div>
          </div>
        </div>
        <div class="income_wrap">
          <div class="income_icon">
            <img src="../../assets/images/me_income.png" alt />
          </div>
          <div>我的收益</div>
        </div>
        <div class="income_list">
          <div class="income_item">互利链：{{info.active_currency||0}}</div>
          <div class="income_item">互利积分：{{info.union_integral||0}}</div>
          <div class="income_item">福利积分：{{info.welfare_integral||0}}</div>
        </div>
        <div class="income_more" @click="$router.push('/income_detail')">查看更多详情></div>
      </div>
    </div>

    <div class="me_list">
      <div class="me_item" @click="$router.push('/share')">
        <div class="me_item_img" style="width:1.84rem;height:1.84rem;">
          <img src="../../assets/images/me_invite.png" alt />
        </div>
        <div class="me_item_title">邀请用户</div>
      </div>
      <div class="me_item" @click="$router.push('/my_team')">
        <div class="me_item_img" style="width:2.08rem;;height:1.92rem;">
          <img src="../../assets/images/me_team.png" alt />
        </div>
        <div class="me_item_title">我的团队</div>
      </div>
      <div class="me_item" @click="$router.push('/msg')">
        <div class="me_item_img" style="width:2rem;;height: 1.68rem;;">
          <img src="../../assets/images/me_msg.png" alt />
        </div>
        <div class="me_item_title">我的消息</div>
      </div>
      <div class="me_item" @click="$router.push('/customer')">
        <div class="me_item_img" style="width: 1.6rem;;height:1.92rem;">
          <img src="../../assets/images/me_customer.png" alt />
        </div>
        <div class="me_item_title">联系客服</div>
      </div>
    </div>

    <div class="me_other_list">
      <van-cell title="实名认证" is-link to="/auth">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_auth.png" alt />
        </div>
      </van-cell>

      <van-cell title="激活社区" is-link @click="lianmen">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_auth.png" alt />
        </div>
      </van-cell>

      <!-- <van-cell title="我的推荐人" is-link @click="showMyRefer">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_recommend.png" alt />
        </div>
      </van-cell>-->
      <van-cell title="福利抽奖" is-link to="/me_lottery">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_lottery.png" alt />
        </div>
      </van-cell>
      <van-cell title="我的分红" is-link to="/me_dividend">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_dividend.png" alt />
        </div>
      </van-cell>
      <van-cell title="意见反馈" is-link to="/feedback">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_fb.png" alt />
        </div>
      </van-cell>
      <van-cell title="我的设置" is-link to="/me_set">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/my_set.png" alt />
        </div>
      </van-cell>
      <van-cell title="关于我们" is-link to="/about">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_about.png" alt />
        </div>
      </van-cell>
      <van-cell title="收货地址" is-link to="/me_address">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/me_address.png" alt />
        </div>
      </van-cell>
      <van-cell title="系统公告" is-link to="/sys_msg">
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/xitong.png" alt />
        </div>
      </van-cell>
    </div>

    <van-popup v-model="isShowRecommend">
      <div class="recommend_title">我的推荐人</div>
      <div class="recommend_main">
        <div>{{referInfo.nickname}}</div>
        <div>{{referInfo.mobile}}</div>
      </div>
    </van-popup>
    <active-account :isShow.sync="isShowActiveMd" />
  </div>
</template>

<script>
import { removeStore } from "@/utils/utils";
import activeAccount from "@/components/active_account";
export default {
  name: "me",
  components: { activeAccount },
  data() {
    return {
      isShowRecommend: false,
      isShowActiveMd: false,
      referInfo: {},
      info: {
        active_currency: null, //激活币
        union_integral: null, //联盟积分
        welfare_integral: null, //福利积分
        contribute_value: null, //贡献值
        level_name: "",
        is_active: "",
        nickname: "dkd", //昵称
        avatar: "/avatar.jpg", // 头像
        mobile: 18382426157, //手机
        mobile_hidden: "183 **** 6157"
      }
    };
  },
  computed: {},
  methods: {
    lianmen() {
      if (this.info.is_active === 1) {
        this.$toast("已激活！");
      } else {
        this.isShowActiveMd = true;
      }
    },
    showMyRefer() {
      this.$api.getMyRefer().then(data => {
        console.log(data);
        if (data.code === 1) {
          console.log("推荐人信息 ==>", data);
          this.referInfo = data.data;
          this.isShowRecommend = true;
        }
      });
    },
    handleBav() {
      this.$router.push("/download");
    },

    handleLogout() {
      this.$api.logout().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.$toast("退出登录");
          removeStore("userInfo");
          removeStore("token");
          this.$router.push("/login");
        } else {
          this.$toast(data.msg);
        }
      });
    },

    handleEditRemark() {}
  },
  async created() {
    const info = await this.$store.dispatch("getUserInfo");
    console.log(info, "infoinfoinfo");
    this.info = info;
  },
  mounted() {}
};
</script>

<style lang='scss'>
.me {
  height: 100%;
  .me_header {
    height: 20.64rem;
    background: #fff;
  }
  .header_top {
    position: relative;
    height: 13.92rem;
    background: #180579;
  }
  .me_set_title {
    position: absolute;
    top: 1.1rem;
    left: 1.2rem;
    color: #fff;
  }
  .me_set_btn {
    position: absolute;
    top: 1.1rem;
    right: 1.2rem;
    width: 1.44rem;
    height: 1.44rem;
  }
  .me_user_wrap {
    position: absolute;
    // position: fixed;
    top: 4rem;
    right: 1.2rem;
    padding: 1.2rem;
    padding-bottom: 0.8rem;
    width: 27.52rem;
    background: #fff;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.8rem 0 #aaa;
    z-index: 99;
  }

  .me_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    line-height: 1.44rem;
    box-shadow: 0 0 0.8rem 0 #aaa;
    border-radius: 0.4rem;
    font-size: 0.96rem;
    color: #808186;
  }
  .user_avatar {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 100%;
    overflow: hidden;
  }
  .user_nickname {
    flex: 1;
    margin-left: 0.8rem;
  }

  .nickname_wrap {
    display: flex;
  }
  .nickname {
    margin-right: 0.8rem;
    color: #404040;
    font-size: 1.28rem;
    font-weight: bold;
  }

  .me_lv {
    position: relative;
    width: 1.6rem;
    height: 1.28rem;
    text-align: center;
    line-height: 2rem;
    background: url("../../assets/images/me_lv.png");
    background-size: 100% 100%;
  }
  .me_lv::after {
    content: "";
    display: block;
    position: absolute;
    right: -0.8rem;
    top: 0.48rem;
    width: 0.32rem;
    height: 0.56rem;
    background: url("../../assets/images/me_array.png");
    background-size: 100% 100%;
  }

  .lv_val {
    transform: scale(0.8);
    color: #fff;
  }

  .user_contribution {
    min-width: 4rem;
    text-align: center;
  }
  .contribution {
    color: #4470ff;
  }

  .income_wrap {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;
    padding-left: 0.8rem;
  }
  .income_icon {
    margin-right: 0.64rem;
    width: 1.12rem;
    height: 1.2rem;
  }
  .income_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.64rem;
    padding: 0.64rem 0.8rem;
    font-size: 0.96rem;
    background: #f4f6fb;
  }
  .income_more {
    margin-top: 0.8rem;
    text-align: center;
    font-size: 0.8rem;
    color: #b7bbc7;
  }

  .me_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;
    padding: 1.2rem 2.4rem;
    font-size: 0.96rem;
    color: #172537;
    background: #fff;
  }
  .me_item {
  }
  .me_item_img {
    // width:1.84rem
    margin: 0 auto 0.8rem;
  }

  .me_other_list {
    margin-top: 10px;
    padding: 0 2rem;
    height: 36rem;
    background: #fff;
  }
  .van-cell {
    padding: 0.8rem 0.8rem;
    // border-bottom: 1px solid #ededed;
  }
  .cell_icon {
    width: 1.6rem;
    height: 1.6rem;
  }
  .van-cell__title {
    color: #484848;
  }

  .van-popup {
    width: 82%;
    border-radius: 0.4rem;
    text-align: center;
  }
  .recommend_title {
    margin-bottom: 1.2rem;
    font-size: 1.28rem;
    color: #1f1f1f;
    font-weight: 800;
  }
  .recommend_main {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem;
    font-size: 0.96rem;
    color: #808186;
  }

  .active_pop {
    width: 82%;
    padding: 1.6rem;
  }

  .active_main {
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
}
</style>