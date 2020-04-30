<!-- customer -->
<template>
  <div class="customer">
    <van-nav-bar fixed title="意见反馈" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="msg_list">
        <div class="msg_item" v-for="(item,index) in msgList" :key="index">
          <div class="msg_time" v-if="item.time">{{item.time}}</div>

          <div class="msg_info msg_info_left" v-if="item.type===1">
            <div class="msg_avatar">
              <img :src="item.avatar" alt />
            </div>
            <div class="msg_desc msg_desc_left">
              <div>{{item.msg}}</div>
            </div>
          </div>

          <div class="msg_info msg_info_right" v-if="item.type===2">
            <div class="msg_desc msg_desc_right">
              <div>{{item.msg}}</div>
            </div>
            <div class="msg_avatar">
              <img :src="item.avatar" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer',
  components: {},
  data () {
    return {
      msg: '',

      msgList: []
    }
  },
  watch: {
    'msgList.length' () {
      this.handleScrollBottom()
    }
  },
  methods: {
    handleScrollBottom () {
      const dom = document.querySelector('.msg_list').scrollTop = 10000000
    },

    getFeedbackBackList () {
      this.$api.getFeedbackBackList()
        .then(data => {
          console.log(213, data)
          if (data.code === 1) {
            // this.
            const list = data.data.list
            const me = {
              type: 2,
              time: list[0].add_time,
              msg: list[0].content,
              avatar: list[0].user_avatar
            }

            const customer = {
              type: 1,
              time: list[0].reply_time,
              msg: list[0].reply_content,
              avatar: list[0].customer_avatar
            }

            this.msgList = [me, customer]
          }
        })
    },
    handleSubmit () {

    }
  },
  created () {
    this.getFeedbackBackList()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.customer {
  padding-top: 4rem;
  height: 100%;

  .page_main {
    height: 100%;
    background: #fff;
  }

  .msg_list {
    height: calc(100% - 3.84rem);
  }

  .msg_btn_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.2rem;
    height: 3.84rem;
    background: #e1e1e1;
  }

  .van-cell {
    padding: 0 1.2rem;
    height: 2.24rem;
    border-radius: 2.24rem;
  }

  .msg_input {
    flex: 1;
    margin-right: 0.96rem;
  }
  .msg_btn {
    width: 6.8rem;
    height: 2.24rem;
    text-align: center;
    line-height: 2.24rem;
    font-size: 1.28rem;
    color: #fff;
    border-radius: 2.24rem;
    background: #180579;
  }

  .msg_list {
    padding: 1.2rem;
    overflow: auto;
  }

  .msg_item {
    text-align: center;
  }
  .msg_time {
    display: inline-block;
    margin: 0 auto;
    margin-top: 1.2rem;
    padding: 0.32rem 1.2rem;
    border-radius: 0.32rem;
    background: rgba($color: #171e28, $alpha: 0.2);
    color: #eef3f5;
    font-size: 0.96rem;
  }

  .msg_info {
    margin-top: 1.2rem;
    // display: flex;
  }
  .msg_info_left {
    text-align: left;
  }

  .msg_info_right {
    text-align: right;
  }

  .msg_avatar {
    display: inline-block;
    vertical-align: top;
    width: 4.08rem;
    height: 4.08rem;
    border-radius: 100%;
    background: rgba($color: #60657a, $alpha: 0.2);
  }

  .msg_desc {
    position: relative;
    display: inline-block;

    max-width: 22rem;
    vertical-align: middle;

    font-size: 1.04rem;
    color: #000;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);

    div {
      position: relative;
      padding: 1rem;
      z-index: 1;
      border-radius: 0.32rem;
    }
  }

  .msg_desc_left {
    margin-left: 0.5rem;
    div {
      background: #8ad854;
    }
  }
  .msg_desc_left:after {
    content: "";
    position: absolute;
    top: 0.6rem;
    left: -0.44rem;
    width: 1.6rem;
    height: 1.6rem;
    transform: rotate(45deg);
    background: #8ad854;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  }

  .msg_desc_right {
    margin-right: 0.5rem;
    div {
      background: #fff;
    }
  }

  .msg_desc_right:after {
    content: "";
    position: absolute;
    top: 0.6rem;
    right: -0.44rem;
    width: 1.6rem;
    height: 1.6rem;
    transform: rotate(45deg);
    background: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  }
}
</style>