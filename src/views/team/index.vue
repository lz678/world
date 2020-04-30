<!-- my_team -->
<template>
  <div class="my_team">
    <van-nav-bar fixed title="我的团队" left-arrow @click-left="$router.go(-1)" />
    <div class="page_main">
      <div class="team_item team_bg">
        <div class="col_180579">我的领导</div>
      </div>
      <div class="team_item">
        <div class="col_494949">{{lead.username}}</div>
        <div>{{lead.mobile}}</div>
      </div>
      <div class="team_item team_bg" style="color:#363636">
        <div>
          <div class="col_7c7c7c">我的粉丝</div>
          <div class="team_val">{{info.my_fans}}</div>
        </div>
        <div>
          <div class="col_7c7c7c">粉丝总数</div>
          <div class="team_val">{{info.fans_total}}</div>
        </div>
        <div>
          <div class="col_7c7c7c">激活粉丝</div>
          <div class="team_val">{{info.active_fans}}</div>
        </div>
        <div>
          <div class="col_7c7c7c">我的直推</div>
          <div class="team_val">{{info.my_director}}</div>
        </div>
        <!-- <div>
          <div class="col_7c7c7c">大区</div>
          <div class="team_val">{{info.big_area}}</div>
        </div>-->
        <!-- <div>
          <div class="col_7c7c7c">小区</div>
          <div class="team_val">{{info.small_area}}</div>
        </div>-->
      </div>
      <div class="bbox">
        <van-pull-refresh v-model="isLoadRefresh" @refresh="onRefresh">
          <!-- <p>刷新次数: {{ count }}</p> -->
          <van-list
            v-model="isLoading"
            :finished="isFinished"
            :offset="100"
            finished-text="没有更多了"
            @load="pullList"
          >
            <div
              class="team_item border_bottom"
              v-for="(item,index) in list"
              :key="index"
              style="color:#363636"
            >
              <div class="col_494949">{{item.nickname}}</div>
              <div class="fontstyle" v-if="item.is_active==0">未激活</div>
              <div class="fontstyle" v-if="item.is_active==1">已激活</div>
              <div>{{item.mobile}}</div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my_team",
  components: {},
  data() {
    return {
      count: 0,
      isLoadRefresh: false,
      isLoading: false,
      isFinished: false,
      //  list: [],
      allpage: "",
      p: 1,
      more: 1,

      loading: false, //下拉刷新
      finished: false, //是否加载完成

      lead: {},
      list: [],
      info: {}
    };
  },
  computed: {},
  methods: {
    onRefresh() {
      this.p = 1;
      console.log("下拉刷新");
      this.isLoadRefresh = false;
      this.getTeamList();
      // setTimeout(() => {
      //   this.$toast("刷新成功");
      //   this.isLoading = false;
      //   // this.list='';
      //   this.p = 1;
      //   this.getTeamList();
      //   this.count++;
      // }, 1000);
    },
    pullList() {
      console.log("上拉加载");
      this.p++;
      this.getTeamList();
      // if (this.p < this.allpage) {
      //   //  console.log(this.p)
      //   this.p=this.p+1
      //   console.log(this.p)
      //   this.getTeamList();
      //   this.loading = true;
      // }
      // // this.p += 1;
      // // console.log(this.p);

      // // this.loading = false;
      // // this.loading = true;
      // // this.getTeamList();
      // if (this.more === 0) {
      //   this.finished = true;
      // }
    },
    getTeamList() {
      let page = this.p;
      this.$api.getTeamList({ p: this.p }).then(data => {
        console.log(data);
        this.info = data.data;
        this.lead = data.data.my_lead;
        this.list.push(...data.data.list);
        this.isLoadRefresh = false;
        this.isLoading = false;
        if (data.code === 1) {
          // if (page === 1) {
          //   this.list = data.data.list;
          // } else {
          //   this.list.push(...data.data.list);
          // }

          if (data.data.count_page <= page) {
            this.isFinished = true;
          } else {
            this.isFinished = false;
          }
        } else {
          this.isLoadRefresh = false;
          this.isLoading = false;
          this.isFinished = true;
        }
        // this.$toast("刷新成功")
        // if (data.code === 1) {
        //   this.info = data.data;
        //   this.lead = data.data.my_lead;
        //   // this.list = data.data.list;
        //   this.allpage = data.data.count_page;
        //   this.list = this.list.concat(data.data.list);
        //   this.more = data.data.is_more;
        //   this.loading=false
        // }
      });
    }
  },
  created() {
    this.getTeamList();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.fontstyle {
  // font-weight: 600;
}
.bbox {
  height: 72vh;
  overflow: scroll;
  // border: 1px solid red;
}
.my_team {
  padding-top: 4rem;
  height: 100%;
  background: #fff;
  .team_item {
    display: flex;
    justify-content: space-between;
    padding: 0.96rem 2.4rem;
    font-size: 0.96rem;
    color: #c0c0c0;
  }

  .col_180579 {
    color: #180579;
  }

  .col_494949 {
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // color: #494949;
  }
  .col_7c7c7c {
    color: #363636;
    // color: #7c7c7c;
  }
  .team_bg {
    background: #f7f7f7;
    text-align: center;
    font-size: 1.04rem;
  }

  .team_val {
    position: relative;
    top: 0.48rem;
    font-size: 0.96rem;
    transform: scale(0.8);
  }

  .border_bottom {
    border-bottom: 1px solid #f3f3f3;
  }
}
</style>