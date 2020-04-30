<!-- register -->
<template>
  <div class="login_wrap register">
    <div class="login_title">注册</div>
    <div class="login_tip">欢迎来到互利社区</div>

    <div class="login_field_wrap">
      <!-- <van-field class="login_field" v-model="info.nickname" placeholder="请输入昵称">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_user.png" alt />
          </div>
        </div>
      </van-field>-->
      <!-- 
      <van-field class="login_field" v-model="info.password" type="password" placeholder="请输入用户密码">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>-->

      <van-field class="login_field login_phone" v-model="info.mobile" placeholder="请输入手机号">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_phone.png" alt />
          </div>
        </div>
        <div slot="button" class>
          <div class="code_btn" v-if="!showReminderTime" @click="getSmsCode">获取验证码</div>
          <div class="code_btn" v-else>重新发送({{reminderTime}}s)</div>
        </div>
      </van-field>
      <van-field class="login_field login_code" v-model="info.code" placeholder="请输入验证码">
        <div slot="left-icon">
          <div class="login_icon">
            <img src="../../assets/images/login_code.png" alt />
          </div>
        </div>
      </van-field>

      <van-field class="login_field" v-model="info.password" type="password" placeholder="请设置用户密码">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>
      <van-field
        class="login_field login_code"
        type="password"
        v-model="info.tradepassword"
        placeholder="请设置兑换密码"
      >
        <div slot="left-icon">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>

      <van-field class="login_field login_phone" v-model="info.pid" placeholder="请输入邀请人手机">
        <div slot="left-icon" class="phone_fix">
          <div class="login_icon">
            <img src="../../assets/images/login_phone.png" alt />
          </div>
        </div>
      </van-field>

      <!-- <van-field
        class="login_field login_code"
        type="password"
        v-model="info.tradepassword"
        placeholder="请输入兑换密码"
      >
        <div slot="left-icon">
          <div class="login_icon">
            <img src="../../assets/images/login_pw.png" alt />
          </div>
        </div>
      </van-field>-->
    </div>

    <div class="btn" @click="register">注 册</div>
    <!-- :class="{'confirm':hasValue}"  -->
  </div>
</template>

<script>
import { getStore, setStore } from "@/utils/utils";
export default {
  name: "register",
  components: {},
  data() {
    return {
      isDisabled: true,
      timer: null,
      showReminderTime: false,
      reminderTime: 60,

      info: {
        // nickname: '',
        password: "",
        mobile: "",
        code: "",
        pid: this.$route.query.pid,
        tradepassword: ""
      }
    };
  },
  computed: {
    hasValue() {
      return (
        this.info.nickname &&
        this.info.password &&
        this.info.mobile &&
        this.info.code &&
        this.info.tradepassword
      );
    }
  },
  methods: {
    // 获取定时器
    getTimer() {
      var nowDate = new Date().getTime();
      var verifyTime = Number(getStore("verifyTime"));

      if (nowDate - verifyTime > 60000) {
        this.showReminderTime = false;
      } else {
        var time = parseInt((60000 - (nowDate - verifyTime)) / 1000);
        this.reminderTime = time;
        this.setTimer();
      }
    },

    // 倒计时
    setTimer() {
      this.showReminderTime = true;
      var nowDate = new Date().getTime();
      setStore("verifyTime", nowDate);
      this.timer = setInterval(() => {
        if (this.reminderTime > 0) {
          this.reminderTime--;
        } else {
          clearInterval(this.timer);
          this.showReminderTime = false;
          this.reminderTime = 60;
        }
      }, 1000);
    },

    // 获取验证码
    getSmsCode() {
      let tel = /^1\d{10}$/;
      if (this.info.mobile === "") {
        this.$toast("请输入手机号");
        return false;
      } else if (!tel.test(this.info.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }

      this.$api
        .getSmsCode({ mobile: this.info.mobile, event: "register" })
        .then(data => {
          if (data.code === 1) {
            this.$toast("验证码已发送");
            this.setTimer();
          } else {
            this.$toast(data.msg);
          }
        });
    },

    validate() {
      let res = true;
      let telReg = /^1\d{10}$/;
      let pwReg = /^.{6,20}$/;
      let codeReg = /^\d{4}$/;

      const { nickname, password, mobile, code, tradepassword } = this.info;

      if (nickname === "") {
        res = false;
        this.$toast("请输入昵称");
        return false;
      }

      if (password === "") {
        res = false;
        this.$toast("请输入密码");
        return false;
      } else if (!pwReg.test(password)) {
        res = false;
        this.$toast("请输入正确的密码，6-20位");
        return false;
      }
      if (mobile === "") {
        res = false;
        this.$toast("请输入手机号");
        return false;
      } else if (!telReg.test(mobile)) {
        res = false;
        this.$toast("请输入正确的手机号");
        return false;
      }

      if (code === "") {
        res = false;
        this.$toast("请输入验证码");
        return false;
      } else if (!codeReg.test(code)) {
        res = false;
        this.$toast("请输入正确的验证码");
        return false;
      }

      if (tradepassword === "") {
        res = false;
        this.$toast("请输入兑换密码");
        return false;
      }

      return res;
    },

    register() {
      const res = this.validate();
      if (!res) return false;
      this.$api.register(this.info).then(data => {
        // console.log("登录返回结果 ==>", data);
        // console.log(data);
        console.log(data.code);
        if(data.code === 0){
          this.$toast(data.msg);
          return
        }
        // this.$toast(data.msg);
        if (data.code === 1) {
          this.$store.commit("changeValue", {
            type: "token",
            value: data.data.userinfo.token
          });
          this.$toast("注册成功！");
          // this.$toast(data.msg)
          setStore("userInfo", data.data.userinfo);
          setStore("token", { token: data.data.userinfo.token });
          // window.location.href='https://copy.im/a/hpoABm'
          this.$router.push("/login");
        }
      });
    }
  },
  created() {
    this.getTimer();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.register {
  .login_field_wrap {
    margin-top: 4.5rem;
  }
  .van-field__button {
    margin-left: 0.8rem;
    font-size: 1.04rem;
    line-height: 1.12rem;
    border-left: 1px solid #ccc;
    color: #3a3c43;
  }
  .btn {
    background-color: #18057a;
    color: white;
  }
  // .confirm{
  //   background-color: #3BF110;
  // }
}
</style>