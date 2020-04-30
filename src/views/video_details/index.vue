<!-- video_detail -->
<template>
  <div class="video_detail">
    <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="video_wrap">
        <!-- <video src="../../../static/video.mp4" controls></video> -->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>

      <div class="detail_info">
        <div class="video_title">{{info.title}}</div>
        <div class="video_time">发布时间：{{info.add_time}}</div>
        <div class="video_desc_wrap">
          <div class="video_title">视频简介</div>
          <div class="video_desc" v-html="info.brief">
            <!-- <div>也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
            <div>来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>
            <div>也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
            <div>来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>
            <div>也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
            <div>来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>
            <div>也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
            <div>来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>
            <div>也许，呼吁大家不要用你的产品和服务，会是个自暴自弃的好法子。来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界。</div>
            <div>来自阿姆斯特丹的文件传输利器巨头WeTransfer，就想出了这样一个奇招，号召大家暂时离开纷繁的网络世界，回到那熙熙攘攘的，闹腾的，我们却远离太久了的——真实世界。</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video_detail',
  components: {},
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          type: '',
          src: '../../../static/video.mp4'
        }],
        poster: '../../static/images/test.jpg',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      info: {
        img: '',
        video_link: '',
      }
    }
  },
  computed: {},
  methods: {
    getVideoDetail (id) {
      this.$api.getCollegeVideoDetail({ id })
        .then(data => {
          console.log(data, 'lllll')
          if (data.code === 1) {
            this.playerOptions.sources[0].src = data.data.video_link
            this.playerOptions.poster = 'https://aerfayu.oss-cn-hangzhou.aliyuncs.com' + data.data.img
            this.info = data.data
          } else {
            this.$toast(data.msg)
          }
        })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getVideoDetail(id)
  },
  mounted () { }
}
</script>

<style lang='scss'>
.video_detail {
  padding-top: 17.8rem;
  min-height: 100%;
  background: #fff;
  .van-nav-bar {
    background: transparent;
  }
  .van-icon-arrow-left {
    color: #fff !important;
  }

  .video_wrap {
    position: fixed;
    top: 0;
    width: 100%;
    height: 16.8rem;
    background: #000;

    video {
      width: 100%;
      height: 100%;
    }
  }
  .detail_info {
    padding-left: 2.4rem;
    font-size: 0.96rem;
    color: #747474;
  }
  .video_title {
    position: relative;
    margin-bottom: 0.8rem;
    padding-left: 0.64rem;
    font-size: 1.04rem;
    color: #3a3a3a;
    font-weight: bold;
  }
  .video_title::before {
    content: "";
    position: absolute;
    top: 0.16rem;
    left: 0;
    display: block;
    width: 0.16rem;
    height: 0.64rem;
    background: #3a3a3a;
  }
  .video_time {
    padding-bottom: 0.96rem;
    border-bottom: 1px solid #efefef;
  }
  .video_desc_wrap {
    margin-top: 0.96rem;
    padding-right: 2.4rem;
  }
  .video_title {
  }
  .video_desc {
    line-height: 1.44rem;
    div {
      text-indent: 2em;
    }
  }
}
</style>