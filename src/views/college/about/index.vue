<!-- college_about -->
<template>
  <div class="college_about">
    <!-- <div class="about_title">XX玩法详细介绍</div> -->
    <!-- <div class="about_time">时间：{{info.add_time|filterDate}}</div> -->
    <!-- <div class="about_img">
      <img src="../../../assets/images/about_img.png" alt />
    </div>-->
    <div class="about_content" v-html="info.content">
      <!-- <div
        class="about_paragraph"
      >也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
      <div
        class="about_paragraph"
      >来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>
      <div
        class="about_paragraph"
      >在这个文艺，诗意而又有些许怀旧的最新影片里，WeTransfer创造了在现实和梦想生活之间的另外一种状态，一份让你可以感受自己真正所处的世界的生活。因为当你电脑浏览器上的网页越积越多，当你桌面上的文件已经乱花眼，你也许已经离你的灵感越来越远，离那些好的、你真正需要的创意越来越远。</div>
      <div class="about_paragraph">当你翻滚在互联网咨询的海洋中时，你吸入了大量的信息，却把时间给丢掉了。</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'college_about',
  components: {},
  props: {},
  data () {
    return {
      info: []
    }
  },
  computed: {},
  methods: {
    getCollegeInfo () {
      this.$api.getCollegeWf()
        .then(data => {
          console.log(data)
          if (data.code === 1) {
            this.info = data.data
          }
        })
    }
  },
  created () {
    this.getCollegeInfo()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.college_about {
  padding: 1.44rem 1.84rem;
  background: #fff;
  .about_title {
    line-height: 1.6rem;
    font-size: 1.04rem;
    font-weight: bold;
    color: #575757;
  }
  .about_title::after {
    display: block;
    content: "";
    height: 0.08rem;
    width: 4.8rem;
    background: #575757;
  }
  .about_time {
    margin-top: 1.04rem;
    font-size: 0.96rem;
    color: #949494;
  }
  .about_img {
    margin-top: 1.92rem;
    margin-bottom: 0.96rem;
    height: 12.64rem;
  }

  .about_paragraph {
    line-height: 1.6rem;
    text-indent: 2em;
    font-size: 0.96rem;
    color: #747474;
  }
}
</style>