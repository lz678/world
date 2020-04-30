<!-- customer -->
<template>
  <div class="customer">
    <van-nav-bar fixed title="客服" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="msg_list">
        <div class="msg_item" v-for="(item,index) in msgList" :key="index">
          <div class="msg_time" v-if="item.time">{{item.add_time}}</div>

          <div class="msg_info msg_info_left" v-if="item.type===1">
            <div class="msg_avatar">
              <img :src="item.from_img" alt />
            </div>
            <div class="msg_desc msg_desc_left">
              <div>{{item.content}}</div>
            </div>
          </div>

          <div class="msg_info msg_info_right" v-if="item.type===2">
            <div class="msg_desc msg_desc_right">
              <div>{{item.content}}</div>
            </div>
            <div class="msg_avatar">
              <img :src="item.to_img" alt />
            </div>
          </div>
        </div>
      </div>

      <div class="msg_btn_wrap">
        <div class="msg_input">
          <van-field v-model="msg" left-icon="chat-o" placeholder="说说您的看法..." />
        </div>
        <div class="msg_btn" @click="sendMsg(msg)">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
export default {
  name: 'customer',
  components: {},
  data () {
    return {
      msg: '',

      userInfo: {
        id: '',
        avatar: ''
      },

      kefuInfo: {
        id: '',
        avatar: ''
      },

      msgList: []
    }
  },
  watch: {
    'msgList.length' () {
      console.log(123213)

    }
  },
  methods: {
    handleScrollBottom () {
      const dom = document.querySelector('.msg_list').scrollTop = 10000000
    },

    // 获取聊天id
    getChatId () {
      this.$api.getChatId()
        .then(data => {
          console.log('聊天id ==>', data)
          if (data.code === 1) {
            this.userInfo.id = data.data.uid
            this.kefuInfo.id = data.data.kefu_id

            this.getChatHead({ fromid: data.data.uid, toid: data.data.kefu_id })
          }
        })
    },

    // 获取聊天双方头像
    getChatHead (info) {
      this.$api.getChatHead(info)
        .then(data => {
          console.log('聊天头像 ==>', data)
          if (data.code === 1) {
            this.userInfo.avatar = data.data.from_head
            this.kefuInfo.avatar = data.data.to_head

            this.getMsgList()
          }
        })
    },

    // 获取聊天记录
    getMsgList () {
      const fromid = this.userInfo.id
      const toid = this.kefuInfo.id
      this.$api.getMsgList({ fromid, toid })
        .then(data => {
          console.log('消息记录 ==>', data)
          if (data.code === 1) {
            const list = data.data.list
            console.log(list)

            const msgList = list.map(it => {
              if (fromid === it.fromid) {
                it.type = 1
              } else {
                it.type = 2
              }

              return it
            })

            this.msgList = msgList
            this.handleScrollBottom()
            this.changeNoRead()
          }
        })
    },

    // 发送消息
    sendMsg (content) {
      // this.$socket.send(msg)
      this.$api.sendMsg({
        content,
        fromid: this.userInfo.id,
        toid: this.kefuInfo.id
      })
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.msg = ''
            this.getMsgList()
          }
        })
    },

    // 改变消息状态
    changeNoRead () {
      const fromid = this.userInfo.id
      const toid = this.kefuInfo.id
      this.$api.changeNoRead({ fromid, toid })
        .then(data => {
          console.log('改变消息状态 ==>', data)
        })
    }
  },
  created () {
    this.getChatId()
    // this.getMsgList()


    Vue.use(VueNativeSock, 'ws://47.99.92.1:8282', {
      // connectManually: true,
    })


    // this.$connect(configs.socketApi + to)

    this.$socket.onopen = (data) => {
      // this.$message.error('连接成功') 
      console.log('连接成功')
      // this.$socket.send(JSON.stringify({ to, action: 'pingSite', message: 'www.163.com', mac }))
      // this.$socket.send('sss')
    }

    this.$socket.onerror = (data) => {
      console.log(data, '连接失败')
      this.$message.error('连接失败')
    }

    this.$socket.onclose = (data) => {
      console.log(data, '连接关闭')
      this.$message.error('连接关闭')
    }

    this.$socket.onmessage = (data) => {
      // console.log(data, 'datat')
      const res = JSON.parse(data.data)
      // console.log(res, 'kkkkkkk')
      if (res.type !== 'ping') {
        this.getMsgList()
      }
    }
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