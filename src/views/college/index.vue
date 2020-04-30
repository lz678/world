<!-- college_wrap -->
<template>
  <div class="college_wrap">
    <van-nav-bar fixed title="学院" />

    <div class="page_main">
      <div class="tab_wrap">
        <div
          class="tab_item"
          :class="{'tab_active':curTab ===index}"
          @click="handleTab(item,index) "
          v-for="(item,index) in temList"
          :key="index"
        >{{item.title}}</div>
      </div>

      <div class="tab_content">
        <component :is="curTem" />
      </div>
    </div>
  </div>
</template>

<script>
import videoList from './video'
import imageList from './image'
import aboutList from './about'
export default {
  name: 'college_wrap',
  components: {},
  data () {
    return {
      curTab: 0,
      curTem: videoList,
      temList: [
        {
          title: '视频教学',
          tem: videoList
        },
        {
          title: '推广素材下载',
          tem: imageList
        },
        {
          title: '玩法介绍',
          tem: aboutList
        }
      ],

      info: {},

      collegeList: []
    }
  },
  computed: {},
  methods: {
    handleTab (item, index) {
      this.curTab = index
      this.curTem = item.tem
      this.info = this.collegeList[index]
    },

    // 获取学院数据
    // getCollegeInfo () {
    //   this.$api.getCollegeInfo()
    //     .then(data => {
    //       console.log(data)
    //       if (data.code === 1) {
    //         this.collegeList = data.data
    //         this.info = this.collegeList[0]
    //       }
    //     })
    // }
  },
  created () {
    // this.getCollegeInfo()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.college_wrap {
  padding-top: 4rem;
  height: 100%;
  background: #fff;

  .tab_item {
    padding: 0 0.32rem;
  }
  .tab_active {
    background: transparent;
    border-bottom: 2px solid #2f17ad;
    border-radius: 0;
    color: #2f17ad;
  }

  .tab_content {
    margin-top: 4.32rem;
  }
}
</style>