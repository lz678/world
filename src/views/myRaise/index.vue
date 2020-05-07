<template>
  <div class="bbox">
    <van-nav-bar class="nav" title="我的股权" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="mytitle">我的占股</div>
    <div class="content">
      <van-pull-refresh class="contentRefresh" v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="leftdiv">
              <div class="namediv">{{item.name}}</div>
            </div>
            <div class="right">{{item.rate}}</div>
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
      page: 1,
      size:10,
      isLoading: false,
      // 加载更多
      finished: false,
      loading: false,
      name: "电冰箱",
      value: "",
      list:''
    };
  },
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.count++;
      this.isLoading = false;
    },
    onLoad() {
      // 加载状态结束
      this.loading = false;
    //   this.finished = true;
    },
    getmyProgect(){
      this.$api.getmyProgect({
        page:this.page,
        size:this.size
      }).then(data=>{
        if(data.code===1){
          console.log(data,"我的股权");
          this.list=data.data.data
        }
      })
    }
  },
  created() {
    this.getmyProgect()
  },
};
</script>
<style lang="scss" scoped>
.bbox {
  width: 100%;
  .nav {
    height: 8vh;
  }
}

.mytitle {
  height: 6vh;
  padding: 10px 0px 10px 10px;
  font-weight: 600;
}
.content {
  height: 86vh;
//   border: 1px solid red;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 0px;
  .leftdiv {
    width: 44%;
    .namediv {
      font-size: 1rem;
      font-weight: 600;
      color: #313131;
      padding: 6px 6px;
    }
  }
  .right {
    width: 20%;
    text-align: center;
    padding: 6px 10px;
    font-weight: 600;
    font-size: 1rem;
  }
}
</style>