<!-- msg -->
<template>
  <div class="msg">
    <van-nav-bar fixed title="消息" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="msg_list">
        <div class="msg_item" v-for="(item,index) in msgList" :key="index" @click="handleMsg(item)">
          <div class="msg_avatar">
            <img src alt />
            <div class="msg_num" v-if="item.countNoread">{{item.countNoread}}</div>
          </div>
          <div class="msg_info">
            <div class="msg_header">
              <div class="title">{{item.tab_name}}</div>
              <div class="time">{{item.add_time}}</div>
            </div>
            <div class="msg_desc" v-if="item.tab_name ==='意见反馈'">您反馈的意见我们已收到，谢谢</div>
            <div class="msg_desc" v-else>谢谢您的留言，我们将竭诚为您服务</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msg',
  components: {},
  data () {
    return {
      msgList: []
    }
  },
  computed: {},
  methods: {
    getMessage () {
      this.$api.getMessage()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.msgList = data.data.list
          }
        })
    },

    handleMsg (item) {
      const name = item.tab_name
      if (name === '意见反馈') {
        this.$router.push('/feedback_back')
      } else {
        this.$router.push('/customer')
      }
    }
  },
  created () {
    this.getMessage()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.msg {
  padding-top: 4rem;
  .van-nav-bar {
    border-bottom: 1px solid #f5f5f5;
  }
  .page_main {
    height: 100%;
    background: #fff;
  }

  .msg_list {
    padding-top: 0.6rem;
  }
  .msg_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.8rem;
  }

  .msg_item:last-child {
    .msg_info {
      border: none;
    }
  }
  .msg_avatar {
    position: relative;
    width: 4.08rem;
    height: 4.08rem;
    border-radius: 100%;
    background: #ffc076;
  }
  .msg_num {
    position: absolute;
    right: -0.4rem;
    top: -0.4rem;
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
    border: 0.08rem solid #fff;
    border-radius: 100%;
    color: #fff;
    font-size: 0.96rem;
    background: #fe282e;
  }
  .msg_info {
    flex: 1;
    margin-left: 1.2rem;
    padding: 0.6rem 0 1.2rem;
    font-size: 0.96rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #efefef;
  }
  .msg_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.16rem;
  }
  .title {
    color: #000;
    font-weight: bold;
    font-size: 1.28rem;
  }
  .time {
    color: #afafaf;
  }
  .msg_desc {
  }
}
</style>