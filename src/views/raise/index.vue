<template>
  <div class="bbox">
    <van-nav-bar class="nav" title="项目选择" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="title">
      <div>项目名称</div>
      <div>项目介绍</div>
    </div>
    <div class="content">
      <van-pull-refresh class="contentRefresh" v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.name"> -->

          <!-- </van-cell> -->
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="leftdiv">
              <div class="namediv">{{item.name}}</div>
              <van-progress :percentage="item.n" stroke-width="10" color="#1CC282" />
               
            </div>
            <div>{{item.n}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      // 加载更多
      finished: false,
      loading: false,

      list: [
        { name: "火箭", n: "13" },
        { name: "火箭", n: "12" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "33" },
        { name: "火箭", n: "12" },
        { name: "火箭", n: "30" },
        { name: "火箭", n: "40" },
       
        { name: "火箭", n: "50" },
        { name: "火箭", n: "60" },
        { name: "火箭", n: "70" },
        { name: "火箭", n: "80" },
    
        { name: "火箭", n: "100" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
   
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" },
        { name: "火箭", n: "50" }
      ]
    };
  },
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.count++;
      this.isLoading = false;
    },
    onLoad() {
      console.log(503121546);

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成

      this.finished = true;

      // }, 1000);
    }
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
  // margin-top: 8vh;
  color: #313131;
  border-bottom: 1px solid #dbdbdb;
  div {
    // padding: 12px 4px;
  }
}
.contentRefresh {
  // height: 86vh;
  // overflow: scroll;
  // border:1px solid red
}
.content {
  width: 100%;
  height: 86vh;
  overflow: scroll;
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f5f5f5;
    border-bottom: 1px solid #dbdbdb;
    padding: 10px 0px;
    .leftdiv{
      width: 40%;
      .namediv {
      padding: 6px 6px;
    }
    }
     
  }
}
</style>