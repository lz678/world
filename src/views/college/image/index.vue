<!-- college_images -->
<template>
  <div class="college_images">
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
        <div class="images_list">
          <div class="images_item" v-for="(item,index) in list" :key="index">
            <img :src="item.img|filterImg" alt />
            <div class="images_btn" @click="saveImg(item)"></div>
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
  name: 'college_images',
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

      this.$api.getCollegeImg({ p: this.page })
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
    },

    saveImg (item) {
      const url = 'https://aerfayu.oss-cn-hangzhou.aliyuncs.com' + item.img
      const elink = document.createElement('a')
      elink.download = '素材' + item.id
      elink.style.display = 'none'
      elink.href = url
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.college_images {
  padding: 1.2rem;
  background: #fff;

  .images_list {
    display: flex;
    flex-wrap: wrap;
  }

  .images_item {
    position: relative;
    margin-bottom: 1.1rem;
    margin-right: 1.1rem;
    width: 48%;
    height: 23.52rem;
    border-radius: 0.32rem;
    box-shadow: 0 0 0.32rem 0 #aaa;
    overflow: hidden;
  }
  .images_item:nth-child(2n) {
    margin-right: 0;
  }
  .images_btn {
    position: absolute;
    right: 1.2rem;
    bottom: 0.8rem;
    width: 1.04rem;
    height: 1.52rem;
    background: url("../../../assets/images/img_download.png") no-repeat center
      center;
    background-size: 100% 100%;
  }
}
</style>