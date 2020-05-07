<template>
  <div class="bbox">
    <van-nav-bar
      class="nav"
      title="兑换股权"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    >
      <div slot="right">我的股权</div>
    </van-nav-bar>
    <div class="name">{{info.name}}</div>
    <div class="imgbox">
      <img :src="info.image|filterImg" alt />
    </div>
    <div class="fontdetail">{{info.description}}</div>
    <div class="name">项目进度</div>
    <van-progress
      class="my-progress"
      track-color="#DDDDDD"
      :percentage="rate|my"
      stroke-width="10"
      color="#1CC282"
    />
    <div class="name">兑换数量</div>
    <van-field class="num" v-model="num" placeholder="请输入兑换数量" />
    <div class="change">
      <div>价格：{{info.per_share}}</div>
      <div>股份：1%</div>
    </div>
    <div class="name">兑换密码</div>
    <van-field class="num" v-model="pd" placeholder="请输入兑换密码" />
    <div class="bt" @click="hostProgect">兑换</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      info: "",
      rate: "",
      num: "",
      pd: "",
      id: this.$route.query.id
    };
  },
  filters: {
    my(a) {
      return a.slice(0, -1);
    }
  },
  computed: {
    myrate() {
      // const str='20%'
      const rate = this.rate.slice(0, -1);
      // const rate=str.slice(0,-1)

      // console.log(rate,5555);

      return rate;
    }
  },
  methods: {
    onClickRight() {
      // console.log(1);
      this.$router.push("/myRaise");
    },
    getProgectDetail() {
      this.$api
        .getProgectDetail({
          project_id: this.$route.query.id
        })
        .then(data => {
          console.log(data, "项目详情");
          if (data.code === 1) {
            this.info = data.data;
            this.rate = data.data.rate;
          }
        });
    },
    hostProgect() {
      this.$api.hostProgect({
        project_id: this.$route.query.id,
        pay_pwd: this.pd,
        num: this.num
      }).then(data=>{
        Toast(data.msg)
        // console.log(data);
        
        if(data.code===1){
          console.log(data);
           
        }
      });
    }
  },
  created() {
    this.getProgectDetail();
  }
};
</script>
<style lang="scss">
.bbox {
  width: 100%;
  // height: 100%;
  .nav {
    height: 8vh;
  }
}
.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6vh;
  color: #313131;
  border-bottom: 1px solid #dbdbdb;
}
.name {
  font-weight: 600;
  padding: 14px 16px;
}
.imgbox {
  width: 92%;
  height: 20vh;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.fontdetail {
  width: 92%;
  height: 14vh;
  overflow: scroll;
  //   border: 1px solid red;
  margin: 0 auto;
  //   padding: 10px 10px;
}
.my-progress {
  width: 92%;
  margin: 0 auto;
}
.num {
  width: 96%;
  margin: 0 auto;
  background: transparent;
  // border-bottom: 1px solid #dbdbdb;
}
.van-field__control {
  border-bottom: 1px solid #dbdbdb;
  // color:
  // 光标颜色
  // caret-color:red
}

.change {
  width: 90%;
  margin: 0 auto;
  padding: 6px 0px;
  display: flex;
  justify-content: space-between;
  color: #ff5151;
  font-size: 0.875rem;
  font-weight: 600;
}
.bt {
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  margin: 10px auto;
  background-color: #18057a;
  color: white;
  text-align: center;
}
.van-nav-bar__text {
  color: black;
}
</style>