<template>
  <div class="bbox">
    <van-nav-bar class="one" title="购买记录" left-arrow @click-left="$router.go(-1)" />
    <div class="content">
      <div class="listitem" v-for="(item,index) in list" :key="index">
        <div class="imgbox">
          <img :src="item.cover_img|filterImg" alt />
        </div>
        <div class="infobox">
          <div>{{item.name}}</div>
          <div class="paytime">{{item.pay_time}}</div>
        </div>
        <div class="pricebox">{{item.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    myhistory() {
      this.$api.postmyhistory().then(data => {
        if (data.code === 1) {
          console.log(data, "历史记录");

          this.list = data.data.data;
        }
      });
    }
  },
  created() {
    this.myhistory();
  }
};
</script>

<style lang="scss" scoped>
.bbox {
  width: 100%;
  height: 100vh;
  .one {
    width: 100%;
    height: 8vh;
    background-color: #fff;
    // height: 1.875rem;
    border-bottom: 1px solid #efefef;
    line-height: 6vh;
    font-size: 1.28rem;
    // font-weight: bold;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 92vh;
    // border: 1px solid red;
    .listitem {
      padding: 6px 0px;
      margin: 6px 0px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // border: 1px solid red;

      .imgbox {
        width: 30%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .infobox {
        width: 30%;
        div {
          padding: 6px 0px;
        }
        .paytime{
          font-size: .8rem;
          color: #999999;
        }
      }
      .pricebox {
        width: 24%;
        color: orange;
      }
    }
  }
}
</style>