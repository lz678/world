<!-- auth -->
<template>
  <div class="auth_wrap">
    <van-nav-bar fixed title="认证" left-arrow @click-left="$router.go(-1)">
      <!-- <span slot="right" class="active_btn" v-if="auth===1" @click="isShowActiveMd = true">激活</span> -->
      <!-- <div></div> -->
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>

    <div class="page_main">
      <!-- <div class="alipay">
        <div>授权支付宝</div>
        <div class="alipay_btn">授权</div>
      </div>

      <div class="alipay_tip">
        <div class="tip_title">提醒：</div>
        <div>支付宝实名信息必须与身份证实名信息一致，支付宝账号填写无法二次修改，以免给您造成交易上的经济损失！</div>
      </div>-->

      <div class="other_auth_title">身份认证({{type}})</div>

      <van-field v-model="info.realname" maxlength="5" :readonly="auth===1" placeholder="请填写您的姓名">
        <div slot="label">
          <span>姓</span>
          <span class="realname_label">名:</span>
        </div>
      </van-field>

      <van-field
        v-model="info.card"
        maxlength="18"
        label="身份证号:"
        :readonly="auth===1"
        placeholder="请填写您的身份证账号"
      />
      <van-field
        v-model="info.zfb"
        maxlength="25"
        label="支付宝账号:"
        :readonly="auth===1"
        placeholder="请填写您的支付宝账号"
      />
      <van-field
        v-model="info.tradepassword"
        type="password"
        maxlength="25"
        label="兑换密码:"
        v-if="auth!==1"
        placeholder="请填写您的兑换密码"
      />

      <van-uploader
        v-model="photo1"
        :max-count="1"
        upload-text="身份证正面照"
        :after-read="upLoadAvatarone"
        v-if="isarrow==2||isarrow==0"
      />

      <van-uploader
        v-model="photo2"
        :max-count="1"
        upload-text="身份证反面照"
        :after-read="upLoadAvatartwo"
        v-if="isarrow==2||isarrow==0"
      />

      <van-uploader
        v-model="photo3"
        :max-count="1"
        upload-text="手持身份证照"
        :after-read="upLoadAvatarthree"
        v-if="isarrow==2||isarrow==0"
      />
      <!-- <div v-if="isarrow==2||isarrow==0" style="font-size:16px">示例:
        <span style="color:#ff4f4f;font-size:20px">身份证上需放上带有易链盟专用的字条,未按要求上传不予审核</span>
      </div>-->
      <div class="exampleimg">
        <!-- <img v-if="isarrow==2||isarrow==0" preview="0" :src="require('@/assets/images/22.jpg')" alt=""> -->
        <!-- <van-overlay :show="imgshow" @click="imgshow = false">
          <div  class="wrapper">
           <img :src="require('@/assets/images/222.jpg')" alt="">
          </div>
        </van-overlay>-->

        <img
          v-if="isarrow==2||isarrow==0"
          preview="0"
          preview-text="身份证正面"
          :src="require('@/assets/images/222.jpg')"
          @click="imgshow = true"
        />
        <img
          v-if="isarrow==2||isarrow==0"
          preview="1"
          preview-text="身份证反面"
          :src="require('@/assets/images/333.jpg')"
        />

        <img
          v-if="isarrow==2||isarrow==0"
          preview="2"
          preview-text="手持身份证"
          :src="require('@/assets/images/444.png')"
        />

        <!-- <van-image
          v-if="isarrow==2||isarrow==0"
          preview="0"
          width="32%"
          height="100"
          :src="require('@/assets/images/22.jpg')"
        />
        <van-image
          v-if="isarrow==2||isarrow==0"
          width="32%"
          height="100"
          :src="require('@/assets/images/33.jpg')"
        />
       
        <van-image
          v-if="isarrow==2||isarrow==0"
          width="32%"
          height="100"
          :src="require('@/assets/images/true.jpg')"
        />-->
      </div>

      <!-- <van-image width="100" height="100" src="http://img.coozhi.com/upload/image/201908/07155037-3.jpg" /> -->
      <div style="text-align:center" v-if="isarrow==2||isarrow==0">{{reason}}</div>
      <div
        v-if="isarrow==2||isarrow==0"
        style="width:80%;margin:0px auto;font-size:26px;color:#ff4f4f;text-align:center"
      >拍照请手写纸条～互利社区审核专用,否则不予审核</div>
      <div
        class="btn"
        :class="{'confirm':hasValue}"
        v-if="isarrow==2||isarrow==0"
        @click="handleAuth"
      >提 交</div>
    </div>
    <active-account :isShow.sync="isShowActiveMd" />
  </div>
</template>

<script>
// import Vue from 'vue'
import activeAccount from "@/components/active_account";
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// let options = {
//   fullscreenEl: false
// };
// Vue.use(preview, options)
// Vue.use(preview)

export default {
  name: "auth",
  components: { activeAccount },
  data() {
    return {
      money:'',
      isPay: 1,
      host: "http://aaed6.ihycc.cn",
      token: "",
      isarrow: "",
      imgshow: false,
      isShowActiveMd: false,
      photo1: [],
      photo2: [],
      photo3: [],
      info: {
        realname: "",
        card: "",
        zfb: "",
        tradepassword: "",
        photo1: "",
        photo2: "",
        photo3: ""
      },
      reason: "",
      auth: 0,

      isLoad: false
    };
  },
  computed: {
    type() {
      if (this.isarrow == 1) {
        return "已认证";
      } else if (this.isarrow == 2) {
        return "未通过";
      } else if (this.isarrow == 3) {
        return "审核中";
      } else if (this.isarrow == 0) {
        return "未认证";
      }
    },
    hasValue() {
      return this.info.realname && this.info.card && this.info.tradepassword;
    }
  },
  methods: {
    getAuthInfo() {
      this.$api.getAuthInfo().then(data => {
        console.log(data, "消息回填");
        console.log(this.isarrow);

        if (data.code === 1) {
          const { realname, card, zfb, auth } = data.data.data;
          this.info = { realname, card, zfb };
          this.auth = auth;
          this.isarrow = data.data.data.check_status;
          this.reason = data.data.data.reason;
        }
      });
    },

    upLoadAvatarone(file, index) {
      console.log(file, index);
      this.$store.dispatch("uploadFileone", [file]).then(data => {
        console.log(data);
        this.photo1 = [
          {
            text: "身份证正面照",
            url: data[0]
          }
        ];
        this.info.photo1 = data[0];
      });
    },
    upLoadAvatartwo(file, index) {
      console.log(123);
      this.$store.dispatch("uploadFiletwo", [file]).then(data => {
        console.log(data);
        this.photo2 = [
          {
            text: "身份证反面照",
            url: data[0]
          }
        ];
        this.info.photo2 = data[0];
      });
    },
    upLoadAvatarthree(file, index) {
      console.log(123);
      this.$store.dispatch("uploadFilethree", [file]).then(data => {
        console.log(data);
        this.photo3 = [
          {
            text: "手持身份证照",
            url: data[0]
          }
        ];
        this.info.photo3 = data[0];
      });
    },
    // 获取查询参数
    getQueryParams(name) {
      var ca = location.href.split("?")[1];
      if (!ca) return false;
      var list = ca.split("&");

      var arr = [];
      list.map(function(it) {
        arr.push(it.split("="));
      });

      console.log(arr, "arr");
      var map = new Map(arr);
      return map.get(name);
    },

    // 验证认证信息
    validate() {
      var res = true;
      var name = /^1\d{10}$/;
      var id = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|x|X)$/;
      var zfb = /^.{6,20}$/;

      if (this.info.realname === "") {
        res = false;
        this.$toast("请输入姓名");
        return false;
      }

      var year = this.info.card.slice(6, 10);
      var nowYear = new Date().getFullYear() + 2;
      var age = nowYear - Number(year);
      if (this.info.card === "") {
        res = false;
        this.$toast("请输入身份证号");
        return false;
      } else if (!id.test(this.info.card)) {
        res = false;
        this.$toast("请输入真确的身份证号");
        return false;
      } else if (age < 16) {
        res = false;
        this.$toast("年龄必须大于18岁");
        return false;
      }

      if (this.info.zfb === "") {
        res = false;
        this.$toast("请输入支付宝号");
        return false;
      }

      return res;
    },

    // 认证
    handleAuth() {
      const res = this.validate();
      if (!res) return false;
      this.isLoad = true;
      this.$api
        .postAuth({
          ...this.info
        })
        .then(data => {
          console.log(data, "认证");
          this.isLoad = false;
          if (data.code === 1) {
            this.$toast("等待审核！");
            this.$router.go(-1);
            // window.location.href = data.data.url;
          } else {
            this.$toast(data.msg);
          }
        });
    },
    // 查看支付状态
    isAuthPay() {
      this.$api.isAuthPay().then(data => {
        if (data.code == 1) {
          console.log(data, "判断是否已支付！");
          this.isPay = data.data.is_pay;
          // this.Authmoney();
          this.AuthPay();
        }
      });
    },
    // 认证支付
    AuthPay() {
      //  console.log("认证！");
      if (this.isPay == 0) {
        this.$dialog.confirm({
          title: "支付",
          message: `认证前需要支付${this.money}元人民币！`
        })
          .then(() => {
            // console.log(1111);
            this.$router.push('/pay')
            // on confirm
          })
          .catch(() => {
            this.$router.go(-1)
            // on cancel
          });
      }
    },
    // 获取认证费用
    Authmoney(){
      this.$api.PayMoney().then(
         data=>{
            // console.log(data,"认证费用！");
           if(data.code==1){
            //  console.log(data,"认证费用！");
             
             this.money=data.data
            //  console.log(this.money);
             this.isAuthPay();
           }
         }
      )
    }
  },
  created() {
    this.Authmoney();
    // this.isAuthPay();
    this.getAuthInfo();
  }
};
</script>

<style lang='scss'>
.exampleimg {
  //   .wrapper {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   height: 100%;
  //   img{
  //      width: 100%;
  //      height: 150px;
  //   }
  // }
  img {
    width: 32%;
    height: 100px;
  }
}
.auth_wrap {
  padding-top: 4rem;
  height: 100%;
  background: #fff;
  .alipay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.6rem 0.8rem 2.4rem;
    border-bottom: 1px solid #efefef;
    background: #fff;
  }
  .alipay_btn {
    width: 3.84rem;
    height: 1.68rem;
    line-height: 1.68rem;
    text-align: center;
    border-radius: 0.32rem;
    background: #18057a;
    color: #fff;
    font-size: 0.96rem;
  }

  .alipay_tip {
    padding: 0.8rem 1.6rem 0.8rem 2.4rem;
    line-height: 1.44rem;
    background: #fff;
    color: #adadad;
    font-size: 0.96rem;
  }
  .tip_title {
    margin-bottom: 0.32rem;
    line-height: 1.6rem;
    color: #ff4f4f;
  }
  .other_auth_title {
    padding-left: 2.4rem;
    height: 3rem;
    line-height: 3.1rem;
    font-weight: bold;
    color: #3b3b3b;
    background: #f7f7f7;
  }

  .van-cell {
    padding: 0.8rem 2.4rem;
    font-size: 1.04rem;
    border-bottom: 1px solid #efefef;
  }
  .van-field__control {
    text-align: right;
  }
  .van-cell__title {
    margin-left: 0;
  }
  .van-field__label {
    width: 6.44rem;
  }
  .realname_label {
    margin-left: 1.92rem;
  }
  .van-cell:not(:last-child)::after {
    border: none;
  }
  .btn {
    margin: 4rem auto;
    width: 25.6rem;
    border-radius: 0;
    font-size: 1.12rem;
  }
  .active_btn {
    color: #180579;
    font-weight: 600;
  }
}
</style>