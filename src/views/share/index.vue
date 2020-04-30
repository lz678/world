<!-- share -->
<template>
  <div class="share">
    <van-nav-bar fixed title="邀请用户" left-arrow @click-left="$router.go(-1)" />
    <!--  -->
    <div class="page_main" :style="{'background': `url(${share_imgs})`}">
      <!-- <div class="header_title">
        <img src="../../assets/images/share_image.png" alt />
      </div>-->

      <!-- <div class="share_content">
        <div class="qrcode">
          <img src="../../assets/images/qrcode.png" alt />
        </div>
       
      </div>-->

      <!-- <div class="remmend_code">
        <span class>推荐码</span>
        <span class="remmend">{{share_id}}</span>
      </div>-->

      <div class="tip">扫描二维码进行下载</div>

      <div class="share_link">
        <div class="link van-ellipsis">
          下载链接:
          <span id="share_link">{{link}}</span>
        </div>
        <div
          class="link_btn"
          id="copy_link"
          data-clipboard-target="#share_link"
          data-clipboard-action="copy"
        >复制</div>
      </div>
      <!-- @click="handleShareLink"-->

      <div class="share_opt">
        <div style="font-size:24px;text-align:center">互利社区</div><br>
        <div style="font-size:22px;text-align:center">打造实体落地运营积分平台</div>
        <!-- <div class="opt_item" @click="saveImg">
          <div class="opt_icon">
            <img src="../../assets/images/share_down.png" alt />
          </div>
          <div class="opt_title">保存二维码</div>
        </div>
        <div class="opt_item">
          <div class="opt_icon">
            <img src="../../assets/images/share_share.png" alt />
          </div>
          <div class="opt_title">分享给好友</div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import { getStore } from "@/utils/utils";
export default {
  name: "share",
  components: {},
  data() {
    return {
      share_imgs: "",

      share_id: "",

      link: "",

      qrcodeUrl: ""
    };
  },
  computed: {},
  methods: {
    getUserShare() {
      return this.$api.getUserShare().then(data => {
        console.log(data);
        if (data.code === 1) {
          this.link = data.data.url;
          this.share_id = data.data.tj_code;
          this.share_imgs = data.data.share_imgs[0];
        }
      });
    },

    handleShareCode() {
      this.$nextTick(() => {
        const btn = document.querySelector("#copy_code");
        var copyBtn = new ClipboardJS(btn);
        copyBtn.on("success", e => {
          this.$toast("复制成功");
          e.clearSelection();
        });
        copyBtn.on("error", function(e) {
          console.log(e.action);
        });
      });
    },

    // handleShareLink () { },

    async handleRefesh() {
      await this.getShareInfo();
      this.$toast("刷新成功");
    },

    saveImg() {
      // const i = this.$refs.swiper.swiper.activeIndex
      const url = this.share_imgs;
      const elink = document.createElement("a");
      elink.download = this.share_id;
      elink.style.display = "none";
      elink.href = url;
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    }
  },
  created() {
    this.getUserShare();
  },
  mounted() {
    this.$nextTick(() => {
      const btn = document.querySelector("#copy_link");
      var copyBtn = new ClipboardJS(btn);
      copyBtn.on("success", e => {
        this.$toast("复制成功");
        e.clearSelection();
      });
      copyBtn.on("error", function(e) {
        console.log(e.action);
      });
    });
  }
};
</script>

<style lang='scss'>
.share {
  padding-top: 4rem;
  height: 100%;

  .page_main {
    position: relative;
    padding-top: 2.4rem;
    // background: #8311fb;
    background-size: 100% 100% !important;
    height: 100%;
  }

  .header_title {
    margin: 0 auto;
    width: 15.84rem;
    height: 3.36rem;
  }

  .share_content {
    margin: 2.4rem auto;
    padding-top: 3.2rem;
    padding-bottom: 1.84rem;
    width: 25.04rem;
    border-radius: 0.96rem;
    background: #fff;
  }

  .qrcode {
    margin: 0 auto;
    width: 14.88rem;
    height: 14.88rem;
  }

  .remmend_code {
    position: absolute;
    bottom: 18.56rem;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.8rem;
    width: 100%;
    text-align: center;
    color: #000000;
    font-size: 1.6rem;
  }
  .remmend {
    color: #e9420b;
  }

  .tip {
    position: absolute;
    bottom: 16.16rem;
    left: 50%;
    transform: translateX(-50%);
    // margin-top: 1.2rem;
    text-align: center;
    font-size: 1.5rem;
  }
  .link {
    flex: 1;
    margin-right: 0.8rem;
  }
  #share_link {
    font-size: 0.96rem;
    color: #4c4b4b;
  }
  .share_link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 9.6rem;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    padding: 0.8rem 1.6rem;
    width: 25.04rem;
    background: #fff;
    border-radius: 0.96rem;
  }
  .link_btn {
    padding: 0.56rem 0;
    width: 4.64rem;
    text-align: center;
    background: #8311fb;
    color: #fff;
    border-radius: 0.8rem;
  }

  .share_opt {
    
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    position: absolute;
    // bottom: 3.04rem;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 2rem;
    width: 100%;
    color: #fff;
  }
  .opt_icon {
    margin: 0 auto;
    margin-bottom: 1.2rem;
    width: 2.16rem;
    height: 2.16rem;
  }
}
</style>