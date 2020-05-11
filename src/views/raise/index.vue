<template>
  <div class="bbox">
    <van-nav-bar class="nav" title="项目选择" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="title">
      <div>项目名称</div>
      <div>项目介绍</div>
    </div>
    <div class="content">
      <van-pull-refresh class="contentRefresh" v-model="isLoading" @refresh="onRefresh">
        <van-list
          class="mylist"
          v-model="loading"
          :offset="11"
          :finished="finished"
          finished-text="人家也是有底线的"
          @load="onLoad"
        >
          <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.name"> -->

          <!-- </van-cell> -->
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="leftdiv">
              <div class="namediv">{{item.name}}</div>
              <van-progress :percentage="item.rate" stroke-width="10" color="#1CC282" />
            </div>
            <div class="rightdiv" @click="check(item,index)">查看详情</div>
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
      
      isLoading: false,
      // 加载更多
      finished: false,
      loading: false,
      page: 0,
      size: 10,
      list: [],
      mylist: [
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" },
        { name: "bch" }
      ]
    };
  },
  filters: {
    // myrate(a) {
    //   return toString(a);
    // }
  },
  methods: {
    onRefresh() {
      // Toast("刷新成功");
      // this.count++;
      this.page = 1;
      this.getprogect();
      this.isLoading = false;
       
    },
    onLoad() {
      // console.log(503121546);
      this.page += 1;
      console.log("加载更多");
      
      //  if (this.page != 1) {
      //   this.getprogect();
      // }  
        this.getprogect();
      
      // if (this.page == 1) {
      //   return;
      // } else {
      //   this.getprogect();
      // }

      // 加载状态结束
    },
    check(item, index) {
      // console.log(item);
      // console.log(index);
      this.$router.push({
        path: "/raiseDetail",
        query: {
          id: item.id
        }
      });
    },
    getprogect() {
      this.$api
        .getProgect({
          page: this.page,
          size: this.size
        })
        .then(data => {
          this.isLoading = false;
          this.loading = false;
          if (data.code === 1) {
            console.log(data, "项目列表");
            if (this.page == 1) {
              this.list = data.data.data;
            } else {
              this.list.push(...data.data.data);
            }
            if (data.data.total / this.size <= this.page) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
        });
    }
  },
  created() {
    // this.getprogect();
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
  // height: 100%;

  overflow: scroll;
  // border:1px solid red
}
.mylist {
  height: 86vh;
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
    .leftdiv {
      width: 44%;
      .namediv {
        // font-family: SourceHanSansCN-Medium;
        font-size: 1rem;
        font-weight: 600;
        color: #313131;
        padding: 6px 6px;
      }
    }
    .rightdiv {
      padding: 6px 10px;
      border-radius: 0.375rem;
      background-color: #18057a;
      color: white;
      font-size: 0.875rem;
    }
  }
}
</style>