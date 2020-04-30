<!-- home_wrap -->
<template>
  <div class="home_wrap">
    <van-nav-bar fixed left-text="返回" title="首页" right-text="项目众筹" @click-right="handleNavRight">
      <img
        slot="left"
        class="home_nav_icon home_nav_left"
        src="../../assets/images/home_msg.png"
        @click="$router.push('/sys_msg')"
      />

      <!-- <span slot="left">
        公告
      </span>-->
      <!-- <img
        slot="right"
        class="home_nav_icon home_nav_right"
        src="../../assets/images/home_right.png"
        alt
      />-->
    </van-nav-bar>
    <div class="new">公告</div>
    <div class="page_main">
      <div class="home_swipe">
        <van-swipe :autoplay="3000" :height="160" indicator-color="white">
          <van-swipe-item v-for="item in wheel_img" :key="item.index" @click="jumpimg(item.id)">
            <!-- <a :href="item.src">
              <img :src="item.img|filterImg" alt />
            </a>-->
            <img :src="item.img|filterImg" alt />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- <div class="sys_msg">
        <div class="sys_left_icon">系统公告</div>
        <div class="sys_right">{{notice_info.content}}</div>
        <div class="sys_bottom" @click="isShowAnnouncement= true">详情></div>
      </div>-->

      <div class="home_reward">
        <div class="reward_header">
          <div class="r_h_img">
            <img src="../../assets/images/home_reward.png" alt />
          </div>
          <div class="r_h_title">领取奖励</div>
        </div>
        <div class="reward_bottom">
          <div class="r_b_img">
            <img src="../../assets/images/home_reward_img.png" alt />
          </div>
          <div class="reward_tip">签到、直推获取奖励，完成初始设置领取奖励</div>

          <div class="reward_btn" @click="receiveReward">领取奖励</div>
        </div>
      </div>

      <div
        class="home_adv"
        v-for="(item,index) in advertis_img"
        :key="index"
        @click="jumpadvertis(item)"
      >
        <!-- <img src="../../assets/images/adv_img.png" alt /> -->
        <img :src="item.img|filterImg" alt />
      </div>
    </div>

    <announcement-md :isShow.sync="isShowAnnouncement" />

    <van-popup class="active_pop" v-model="isShowActive">
      <div class="recommend_title">您还没有激活，激活后才能领取</div>
      <div class="active_tip" v-if="!isActive">今天的激活名额已到达上限，请明天再来激活！</div>

      <div class="active_btn">
        <div class="active_btn_item btn_confrim" v-if="!isActive" @click="isShowMd =false">知道了</div>
        <div class="active_btn_item btn_confrim" v-else @click="goActive">去激活</div>
      </div>
    </van-popup>

    <active-account :isShow.sync="isShowActiveMd" />
  </div>
</template>

<script>
import announcementMd from "./children/announcement";
import activeAccount from "@/components/active_account";
export default {
  name: "home_wrap",
  components: { announcementMd, activeAccount },
  data() {
    return {
      isShowAnnouncement: false,

      isShowActive: false,
      isActive: true,
      // advertid:'',
      isShowActiveMd: false,
      advertis_img: "",
      wheel_img: [],
      notice_info: {},

      isSign: false
    };
  },
  computed: {},
  methods: {
    jumpadvertis(a) {
      console.log(a);
      if (a.type == 1) {
        // window.location.href = "http://www.dianzuobiao.com/down";
        window.location.href=`${a.src}`;
      } else if (a.type == 2) {
        this.$router.push({
          path: "/advertis",
          query: {
            id: a.id
          }
        });
      }
    },

    jumpimg(a) {
      this.$router.push({
        path: "/lunbo",
        query: {
          imgid: a
        }
      });
    },
    handleNavRight() {
      this.$toast("暂未开放，敬请期待！");
    },

    getHomeData() {
      this.$api.getHome().then(data => {
        console.log("获取首页数据 ==>", data);
        if (data.code === 1) {
          this.wheel_img = data.data.wheel_img;
          this.advertis_img = data.data.index_ads;
          this.notice_info = data.data.notice_info;
        }
      });
    },

    // 是否可以签到
    getIsSign() {
      this.$api.getIsSign().then(data => {
        if (data.code === 1) {
          this.isSign = data.data.list;
        }
      });
    },

    receiveReward() {
      if (this.isSign === -1) {
        this.isShowActive = true;
        return false;
      } else if (this.isSign === -2) {
        this.isShowActive = true;
        this.isActive = false;
        return false;
      } else if (this.isSign === 0) {
        this.$toast("您已经领取过了！");
        return false;
      }

      this.$api.receiveReward().then(data => {
        console.log("领取奖励 ==>", data);
        if (data.code === 1) {
          this.$toast("领取成功");
        } else {
          this.$toast(data.msg);
        }
      });
    },

    goActive() {
      this.isShowActive = false;
      this.isShowActiveMd = true;
    }

    // getAdvertising(){
    //   this.$api.getAdvertising({
    //     id:this.advertid
    //   })
    //   .then((data)=>{
    //     if(data.code==1){
    //       console.log(data);

    //     }
    //   })
    // }
  },
  created() {
    this.getHomeData();
    this.getIsSign();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.new {
  position: absolute;
  top: 18px;
  left: 38px;
  z-index: 2;
  width: 3rem;
}
.home_wrap {
  padding-top: 4rem;
  .van-nav-bar__left {
    width: 1.44rem;
    height: 1.76rem;
  }
  .van-nav-bar__title {
    position: relative;
    left: 2.4rem;
    font-size: 1.28rem;
  }
  .van-nav-bar__right {
    // width: 1.44rem;
    // height: 1.44rem;

    .van-nav-bar__text {
      color: #000;
    }
  }
  .home_nav_icon {
    width: 1.44rem;
    height: 1.76rem;
  }
  .home_nav_right {
    width: 4rem;
    height: 0.96rem;
  }
  .van-nav-bar__left,
  .van-nav-bar__right {
    position: relative;
  }

  .home_swipe {
    padding: 0.8rem;
    background: #fff;
  }
  .van-swipe-item {
    height: 12.8rem;
    // background: red;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  .van-swipe__indicator {
    width: 0.64rem;
    height: 0.16rem;
  }

  .sys_msg {
    position: relative;
    display: flex;
    margin-top: 0.8rem;
    padding: 1.2rem 1.6rem;
    padding-bottom: 2.6rem;
    background: #fff;
  }
  .sys_left_icon {
    width: 5.04rem;
    height: 1.44rem;
    background: url("../../assets/images/sys_msg.png");
    background-size: 100% 100%;
    font-size: 0.96rem;
    text-align: center;
    line-height: 1.44rem;
    color: #fff;
  }
  .sys_right {
    flex: 1;
    margin-left: 0.8rem;
    line-height: 1.28rem;
    font-size: 1.12rem;
    color: #323232;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .sys_bottom {
    position: absolute;
    bottom: 0.8rem;
    right: 1.6rem;
  }

  .home_reward {
    margin: 0 auto;
    margin-top: 1.2rem;
    width: 92%;
    background: #fff;
    border-radius: 0.8rem;
  }

  .reward_header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.2rem;
    font-size: 1.2rem;
    color: #172537;
    border-bottom: 1px solid #eaeaeb;
  }

  .r_h_img {
    margin-right: 0.8rem;
    width: 2.48rem;
    height: 2.48rem;
  }

  .reward_bottom {
    padding-bottom: 1.6rem;
  }

  .r_b_img {
    margin: 0 auto;
    margin-top: 1.2rem;
    width: 8.48rem;
    height: 7.84rem;
  }
  .reward_tip {
    text-align: center;
    color: #7e7d7d;
  }

  .reward_btn {
    margin: 1rem auto 0;
    width: 10.8rem;
    height: 2.48rem;
    line-height: 2.48rem;
    text-align: center;
    border: 1px solid #743bc6;
    border-radius: 2.48rem;

    background: linear-gradient(
      180deg,
      rgba(41, 95, 193, 1) 0%,
      rgba(24, 5, 121, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .home_adv {
    margin: .625rem auto;
    // margin-top: 1rem;
    // margin-bottom: 1rem;
    width: 92%;
    height: 4.5rem;
    // border: 1px solid red;
    border-radius: 0.8rem;
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
    color: #3a3c43;
    font-weight: 800;
  }
  .active_btn {
    display: flex;
    justify-content: space-around;
    margin-top: 2.4rem;
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
    padding: 0.3rem 3.6rem;
    line-height: 1.6rem;
    text-align: left;
    font-size: 0.96rem;
  }
}
</style>