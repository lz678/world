<!--mMembe_cCentre -->
<template>
  <div class="member_centre">
    <van-nav-bar fixed title="会员中心" left-arrow @click-left="$router.go(-1)" />

    <div class="page_main">
      <div class="page_header">
        <div class="me_user">
          <div class="user_avatar">
            <img :src="user_info.avatar" alt />
          </div>

          <div class="user_nickname">
            <div class="nickname_wrap">
              <div class="nickname">{{user_info.nickname}}</div>
              <div class="me_lv">
                <div class="lv_val">{{user_info.level_name.slice(1)}}</div>
              </div>
            </div>
            <div class="mem_fee">V1会员交易手续费{{user_info.fee}}</div>
          </div>

          <div class="user_contribution">
            <div class="contribution">贡献值：{{user_info.contribute_value||0}}</div>
          </div>
        </div>

        <div class="progress_wrap">
          <div class="progress_title">贡献值200升级为V2会员</div>
          <van-progress
            :percentage="Number(user_info.contribute_value)||0"
            stroke-width="4"
            pivot-text=""
          />
          <div class="progress_value">
            <div class="pro_pre">{{user_info.level_name}}</div>
            <div class="pro_pre">{{next_level.next_name}}</div>
          </div>
        </div>

        <div class="pro_tip">升级{{next_level.next_name}}会员，交易手续费{{next_level.next_fee_percent}}</div>
      </div>

      <div class="list">
        <div class="list_item" v-for="(item,index) in trade_list" :key="item.id">
          <div class="item_img">
            <span class="item_index">V{{index+1}}</span>
          </div>
          <div class="item_desc">
            <div class="item_value1">贡献值不足{{item.gx_val}}</div>
            <div class="item_value2">交易手续费{{item.fee_percent}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member_centre',
  components: {},
  data () {
    return {
      user_info: {
        avatar: '',
        nickname: '',
        level_name: '',
        mobile_hidden: '',
        contribute_value: '',
      },

      next_level: {
        next_name: '',
        next_fee_percent: ''
      },

      trade_list: []
    }
  },
  computed: {},
  methods: {
    getMemberCentre () {
      this.$api.getMemberCentre()
        .then(data => {
          console.log(data, '会员信息')
          if (data.code === 1) {
            this.user_info = data.data.user_info
            this.next_level = data.data.next_level
            this.trade_list = data.data.trade_list
          }
        })
    }
  },
  created () {
    this.getMemberCentre()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.member_centre {
  .page_header {
    padding-top: 3rem;
    height: 18rem;
    background: linear-gradient(
      79deg,
      rgba(241, 210, 172, 1) 0%,
      rgba(204, 153, 117, 1) 100%
    );
  }
  .van-nav-bar {
    background: transparent;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-icon-arrow-left {
    color: #fff !important;
  }

  .me_user {
    padding-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    line-height: 1.44rem;
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
    line-height: 1.92rem;
  }
  .nickname {
    margin-right: 0.8rem;
    color: #fff;
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

  .lv_val {
    transform: scale(0.8);
    color: #fff;
  }

  .mem_fee {
    color: #7d5238;
  }

  .user_contribution {
    min-width: 4rem;
    text-align: center;
  }
  .contribution {
    line-height: 1.6rem;
    color: #683d23;
    border-bottom: 1px solid #683d23;
  }

  .progress_wrap {
    padding: 0 1.2rem;
  }

  .progress_title {
    margin-bottom: 0.8rem;
    color: #fff;
  }
  .van-progress__portion {
    background: linear-gradient(
      90deg,
      rgba(201, 150, 87, 1) 0%,
      rgba(248, 218, 166, 1) 100%
    ) !important;
  }
  .van-progress__pivot {
    min-width: 0;
    width: 1.6rem;
    height: 0.8rem;
    line-height: 3.52rem;
    border: 1px solid #cb9858;
    background: #fff !important;
    color: #bd957c !important;
    font-size: 1.12rem;
  }
  .progress_value {
    display: flex;
    justify-content: space-between;
    margin-top: 0.64rem;
    font-size: 1.12rem;
    color: #fff;
  }
  .pro_tip {
    margin-top: 0.8rem;
    text-align: center;
    color: #7d5238;
  }

  .list {
  }
  .list_item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    background: #fff;
  }
  .item_img {
    position: relative;
    margin-right: 3.2rem;
    width: 5.2rem;
    height: 6.4rem;
    background: url("../../assets/images/mem_img.png");
    background-size: 100% 100%;
  }
  .item_index {
    position: absolute;
    bottom: 0.65rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.96rem;
    color: #fff;
  }
  .item_desc {
    line-height: 1.92rem;
  }
  .item_value1 {
    color: #555555;
  }
  .item_value2 {
    color: #936549;
  }
}
</style>