<!-- task_wrap 任务-->
<template>
  <div class="task_wrap">
    <van-nav-bar fixed title="任务" />
    <!-- 导航栏 -->
    <div class="page_main">
      <div class="tab_wrap">
        <div class="tab_item" :class="{'tab_active':curTab ===0}" @click="curTab =0">兑换任务</div>
        <div class="tab_item" :class="{'tab_active':curTab ===1}" @click="curTab =1">我的任务</div>
        <div class="tab_item" :class="{'tab_active':curTab ===2}" @click="curTab =2">过期任务</div>
      </div>

      <div class="tab_content">
        <van-pull-refresh
          v-model="isLoadRefresh"
          @refresh="refreshList"
          v-if="list.length||!isFinished"
        >
          <van-list
            class="list"
            v-model="isLoading"
            :finished="isFinished"
            @load="pullList"
            :offset="100"
            finished-text="人家也是有底线的"
          >
            <div
              class="con_item"
              :class="'con_item_'+index%3"
              v-for="(item,index) in list"
              :key="index"
            >
              <div class="item_section">
                <div class="item_left item_title">{{item.name}}</div>
                <!-- <div class="item_right">活跃：+{{item.huoyue}}</div> -->
                <div class="item_right" v-if="curTab===1">进行中</div>
              </div>

              <div class="item_section">
                <div class="item_left">
                  <div>兑换所需互利积分：{{item.price}}</div>
                </div>
                <div class="item_right">
                  <div class="item_btn" v-if="curTab===0" @click="handleExchange(item.id)">兑换</div>
                </div>
              </div>

              <div class="item_section">
                <div class="item_left">
                  <div>奖励：{{item.num}}{{item.currency|filterCurrency}}</div>
                </div>
                <div class="item_right">
                  <div
                    class="item_right"
                    v-if="curTab===1"
                  >日产：{{item.today_liang}}{{item.currency|filterCurrency}}</div>
                  <div class="item_btn" v-if="curTab===2">已过期</div>
                </div>
              </div>

              <div class="item_section">
                <div class="item_left">周期：{{item.runtime}}次</div>
                <div class="item_right" v-if="curTab===0">{{item.yd_num}} / {{item.total_exchange}}</div>
                <div
                  class="item_right"
                  v-if="curTab===1"
                >已产：{{item.all_liang}}{{item.currency|filterCurrency}}</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>

        <div class="no_list" v-else>
          <img src="../../assets/images/no_list.png" alt />
          <p>暂时没有更多数据</p>
        </div>
      </div>
    </div>

    <van-popup v-model="isShowMd">
      <van-field v-model="password" required type="password" label="兑换密码" placeholder="请输入兑换密码" />
      <div class="active_btn">
        <div class="active_btn_item" @click="isShowMd =false">取消</div>
        <div class="active_btn_item btn_confrim" @click="purchase">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "task_wrap",
  components: {},
  data() {
    return {
      curTab: 0,
      len:20,
      apiList: ["getTaskList", "getMyTaskList", "getExpireTaskList"],
      isShowMd: false,
      curId: "",
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,
      password: "",
      page: 0,
      list: []
    };
  },
  filters: {
    filterCurrency(type) {
      if (type === 1) return "激活币";
      if (type === 2) return "互利积分";
      if (type === 3) return "福利积分";
    }
  },
  watch: {
    curTab() {
      this.page = 1;
      this.getList();
    }
  },
  methods: {
    quite() {
      this.isShowMd = false;
    },
    purchase() {
      const __token__ = this.$store.dispatch("getCommonToken");
      this.$api
        .getBuyTask({
          id: this.curId,
          tradepassword: this.password,
          __token__
        })
        .then(data => {
          console.log("purchase", data);

          if (data.code === 1) {
            this.isShowMd = false;
            this.getList();
            this.password = "";
          }
          console.log(data);
          this.$toast(data.msg);
        })

        .catch(err => {});
    },
    refreshList() {
      this.page = 1;
      console.log("下拉刷新");
      this.isLoadRefresh = false;
      this.getList();
    },
    pullList() {
      console.log("上拉加载");
      this.page++;
      this.getList();
    },

    getList() {
      const page = this.page;
      console.log("获取列表");
      const api = this.apiList[this.curTab];
      this.$api[api]({ 
        p: page,
        len:this.len
         }).then(data => {
        console.log(data);
        this.isLoadRefresh = false;
        this.isLoading = false;
        if (data.code === 1) {
          if (page === 1) {
            this.list = data.data.list;
          } else {
            this.list.push(...data.data.list);
          }

          if (data.data.total / 20 <= page) {
            this.isFinished = true;
          } else {
            this.isFinished = false;
          }
        } else {
          this.isLoadRefresh = false;
          this.isLoading = false;
          this.isFinished = true;
        }
      });
    },

    handleExchange(id) {
      this.isShowMd = true;
      this.curId = id;
      // this.$store.commit('changeid', id)
      // localStorage.setItem("id", id);
      //   this.$dialog
      //     .confirm({
      //       message: "确认兑换吗？"
      //     })
      //     .then(async () => {
      //       this.$toast.loading({
      //         mask: true,
      //         duration: 0,
      //         message: "提交中..."
      //       });
      //       const __token__ = await this.$store.dispatch("getCommonToken");

      //       this.$api.getBuyTask({ id, __token__ }).then(data => {
      //         if (data.code === 1) {
      //           this.isShowMd = false;
      //           this.getList();
      //         }
      //         console.log(data);
      //         this.$toast(data.msg);
      //       });
      //     })
      //     .catch(err => {});
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss'>
.active_btn {
  display: flex;
  justify-content: space-around;
  margin-top: 1.2rem;
}
.active_btn_item {
  width: 8rem;
  height: 2.4rem;
  line-height: 2.4rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 0.96rem;
  border: 1px solid #18057a;
  color: #18057a;
}
.btn_confrim {
  background: #19067b;
  color: #fff;
}

.task_wrap {
  padding-top: 4rem;
  height: 100%;
  .page_main {
    height: 100%;
    background: #fff;
    border: 1px solid transparent;
  }

  .tab_content {
    margin-top: 4.3rem;
    padding: 0.8rem 1.2rem;
    background: #fff;
  }

  .con_item {
    margin-bottom: 0.96rem;
    padding: 1.2rem 1.6rem;
    line-height: 1.6rem;
    border-radius: 0.4rem;
    font-size: 0.96rem;
    // background: #d4544f;
    background: linear-gradient(
      -90deg,
      rgba(208, 82, 76, 1),
      rgba(251, 108, 108, 1)
    );
    color: #fff;
  }

  .con_item_1 {
    background: linear-gradient(
      -90deg,
      rgba(65, 56, 153, 1),
      rgba(106, 84, 200, 1)
    );
    .item_btn {
      color: #453a9d;
    }
  }

  .con_item_2 {
    background: linear-gradient(
      -90deg,
      rgba(43, 154, 137, 1),
      rgba(84, 188, 200, 1)
    );
    .item_btn {
      color: #2e9d8e;
    }
  }

  .item_section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item_right {
    flex: 1;
    text-align: right;
    margin-left: auto;
  }
  .item_title {
    font-size: 1.04rem;
    font-weight: bold;
  }
  .item_btn {
    margin-left: auto;
    width: 3.84rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    background: #fff;
    border-radius: 1.4rem;
    color: #d4544f;
  }
}
</style>