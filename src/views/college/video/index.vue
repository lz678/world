<!-- college_video -->
<template>
  <div class="college_video">
    <van-pull-refresh
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
        <div class="video_list">
          <div
            class="video_item"
            v-for="(item,index) in list"
            :key="index"
            @click="$router.push('/video_details/'+item.id)"
          >
            <div class="video_header">
              <img :src="item.img|filterImg" alt />
              <div class="video_btn"></div>
            </div>

            <div class="video_title van-ellipsis">{{item.title}}</div>
            <div class="video_desc van-ellipsis">{{item.brief}}</div>
            <div class="video_time">发布时间：{{item.add_time|filterDate('yyyy-MM-dd')}}</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 没有数据 -->
    <div class="no_list" v-else>
      <img src="../../../assets/images/no_list.png" alt />
      <p>暂时没有更多数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'college_video',
  components: {},
  props: {},
  data () {
    return {
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,

      page: 0,
      list: []
    }
  },
  computed: {},
  methods: {
    refreshList () {
      this.page = 1
      console.log('下拉刷新')
      this.isLoadRefresh = false
      this.getCollegeInfo()
    },
    pullList () {
      console.log('上拉加载')
      this.page++
      this.getCollegeInfo()
    },

    getCollegeInfo () {
      const page = this.page
      console.log('获取列表')

      this.$api.getCollegeVideo({ p: this.page })
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
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.college_video {
  padding: 1.2rem;
  background: #fff;

  .video_list {
    display: flex;
    flex-wrap: wrap;
  }

  .video_item {
    margin-bottom: 1.1rem;
    margin-right: 1.1rem;
    width: 48%;
    border-radius: 0.32rem;
    box-shadow: 0 0 0.32rem 0 #aaa;
    overflow: hidden;
  }
  .video_item:nth-child(2n) {
    margin-right: 0;
  }
  .video_header {
    position: relative;
    height: 10.08rem;
  }
  .video_btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2.4rem;
    background: url("../../../assets/images/video_btn.png") center center;
    background-size: 100% 100%;
  }
  .video_title {
    padding: 0.8rem 0.8rem 0.48rem;
    font-size: 1.04rem;
    color: #3a3a3a;
    font-weight: bold;
  }
  .video_desc {
    margin-bottom: 0.48rem;
    padding: 0 0.8rem;
    font-size: 0.96rem;
    color: #c6c6c6;
  }
  .video_time {
    border-top: 1px solid #f1f1f1;
    padding: 0.8rem 0.8rem;
    font-size: 0.96rem;
    color: #878787;
  }
}
</style>