<!-- income_detail -->
<template>
  <div class="income_detail">
    <van-nav-bar fixed title="明细" left-arrow @click-left="$router.go(-1)" />

    <div class="page_main">
      <van-tabs v-model="curTab">
        <van-tab title="互利链" name="1" />
        <van-tab title="福利积分" name="2" />
        <van-tab title="互利积分" name="3" />
        <van-tab title="贡献值" name="4" />
      </van-tabs>

      <div class="tab_content_header">
        <div class="header_item van-ellipsis">来源</div>
        <div class="header_item van-ellipsis">时间</div>
        <div class="header_item van-ellipsis">收支</div>
      </div>

      <div class="tab_content_list">
        <van-pull-refresh
          class="list"
          v-model="isLoadRefresh"
          @refresh="refreshList"
          v-if="list.length||!isFinished"
        >
          <van-list
            v-model="isLoading"
            :finished="isFinished"
            @load="pullList"
            :offset="100"
            finished-text="人家也是有底线的"
          >
            <div class="tab_content_item" v-for="(item,index) in list" :key="index">
              <div class="header_item from van-ellipsis">{{item.title}}</div>
              <div
                class="header_item time van-ellipsis"
              >{{item.add_time|filterDate('yyyy-MM-dd hh:mm')}}</div>
              <div
                class="header_item value van-ellipsis"
                :class="{'negative':item.flag===1}"
              >{{item.flag===1?'+':'-'}}{{item.num}}</div>
            </div>
          </van-list>
        </van-pull-refresh>

        <!-- 没有数据 -->
        <div class="no_list" v-else>
          <img src="../../assets/images/no_list.png" alt />
          <p>暂时没有更多数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'income_detail',
  components: {},
  data () {
    return {
      curTab: 1,

      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,

      page: 0,
      list: []
    }
  },
  computed: {},
  watch: {
    curTab () {
      this.page = 1
      this.getConsumeIndex()
    }
  },
  methods: {
    refreshList () {
      this.page = 1
      console.log('下拉刷新')
      this.isLoadRefresh = false
      this.getConsumeIndex()
    },
    pullList () {
      console.log('上拉加载')
      this.page++
      this.getConsumeIndex()
    },

    getConsumeIndex () {
      console.log(this.curTab)
      const page = this.page
      console.log('获取列表')
      this.$api.getConsumeIndex({ p: this.page, tab_id: this.curTab })
        .then(data => {
          console.log(data)
          this.isLoadRefresh = false
          this.isLoading = false
          if (data.code === 1) {
            if (page === 1) {
              this.list = data.data.data
            } else {
              this.list.push(...data.data.data)
            }

            if (data.data.total / 10 <= page) {
              this.isFinished = true
            } else {
              this.isFinished = false
            }
          } else {
            this.isLoadRefresh = false
            this.isLoading = false
            this.isFinished = true
          }
        })
    }
  },
  created () {
    // this.getConsumeIndex()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.income_detail {
  padding-top: 4rem;
  height: 100%;

  .page_main {
    height: 100%;
  }

  .van-tab {
    border-top: 1px solid #efefef;
  }

  .tab_content_header,
  .tab_content_item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 1.6rem;
    height: 2.4rem;
    line-height: 2.4rem;
  }
  .tab_content_header {
    padding: 0 1.6rem;
    color: #666;
  }
  .tab_content_item {
    height: 4.8rem;
    line-height: 4.8rem;
    border-bottom: 1px solid #efefef;
  }
  .tab_content_list {
    height: calc(100% - 5.92rem);
    background: #fff;
    overflow: auto;
  }
  .header_item {
    width: 100%;
    text-align: center;
  }
  .from {
    color: #333;
    font-weight: bold;
  }
  .time {
    font-size: 0.96rem;
    color: #999;
  }
  .value {
    color: #34dd78;
  }
  .negative {
    color: #ea6161;
  }
}
</style>