<template>
  <div class="bbox">
    <van-nav-bar title="详情" left-arrow @click-left="$router.go(-1)" />
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in imglist" :key="index">
        <div class="imgbox">
          <img :src="item.img" alt />
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="middle">
      <div class="middleL">
        <div class="Lone">礼品的名称</div>
        <div class="Ltwo">兑换量：2000</div>
        <div class="Lthree">价格：120</div>
      </div>
      <div class="middleR">兑换</div>
    </div>
    <div class="foot">项目详情</div>
    <div
      class="footdetail"
    >说不出别逗比吧vbVvbV说不出别逗比吧vbVvbV说不出 吧vbVvbV说不出别逗比吧说不出别逗比吧vbVvbV说不出别逗比吧vbVvbV说不出 吧vbVvbV说不出别逗比吧说不出别逗比吧vbVvbV说不出别逗比吧vbVvbV说不出 吧vbVvbV说不出别逗比吧</div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imglist: [
        {
          img: require("@/assets/images/goods.png")
        },
        {
          img: require("@/assets/images/goods.png"),
          name: "小火锅",
          info:
            "说不出别逗比吧vbVvbV说不出别逗比吧vbVvbV说不出 吧vbVvbV说不出别逗比吧v",
          need: "1998积分"
        },
        {
          img: require("@/assets/images/goods.png")
        },
        {
          img: require("@/assets/images/goods.png")
        },
        {
          img: require("@/assets/images/goods.png")
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.bbox {
  width: 100%;
  height: 100vh;
  //   border: 1px solid red;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  // background-color: #39a9ed;
}
.imgbox {
  width: 96%;
  height: 28vh;
  // border-radius: 4px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
.middle {
  width: 100%;
  height: 20vh;
  border-bottom: 1px solid #e6e6e6;
  //   border: 1px solid red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .middleL {
    width: 40%;
    margin-left: 20px;
    div {
      padding: 8px 0px 4px 0px;
    }
    .Lone {
      margin-top: 6px;
      font-weight: 600;
      color: #3c3c3c;
    }
    .Ltwo {
      color: #898989;
    }
    .Lthree {
      color: #e83333;
    }
  }
  .middleR {
    //   width: ;
    padding: 10px 36px;
    background-color: #ffd436;
  }
}
.foot {
  font-size: 12px;
  padding-left: 10px;
  margin: 10px 0px 6px 10px;
  border-left: 2px solid #ffd436;
}
.footdetail {
  width: 96%;
  height: 36vh;
  margin: 0 auto;
  overflow: scroll;
  //  border: 1px solid red;
}
</style>