<!-- msg -->
<template>
  <div class="sys_msg">
    <van-nav-bar fixed title="系统消息" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="msg_list">
        <div class="msg_item" v-for="(item,index) in msgList" :key="index">
          <div class="msg_time" v-if="item.add_time">{{item.add_time}}</div>

          <div class="msg_info">{{item.content}}</div>
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
    getSysMessage () {
      this.$api.getSysMessage()
        .then(data => {
          console.log(data,'系统消息')
          if (data.code === 1) {
            this.msgList = data.data
          }
        })
    }
  },
  created () {
    this.getSysMessage()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.sys_msg {
  padding-top: 4rem;

  .msg_list {
    height: calc(100% - 3.84rem);
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
    margin: 0 auto;
    margin-top: 1.2rem;
    padding: 1.2rem 3rem;
    background: #fff;
    width: 92%;
    text-align: left;
    border-radius: 0.4rem;
  }
}
</style>