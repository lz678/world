
<template>
  <div class="nav_bar">
    <div
      class="nav_item"
      :class="{'active':isActive(item.route)}"
      v-for="(item,index) in navList"
      :key="index"
      @click="jump(item.route)"
    >
      <div class="nav_icon">
        <img :src="isActive(item.route)?item.iconHl:item.icon" alt />
      </div>

      <div class="nav_title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bav_bar",
  components: {},
  data() {
    return {
      navList: [
        {
          title: "首页",
          icon: require("@/assets/images/nav_home.png"),
          iconHl: require("@/assets/images/nav_home_hl.png"),
          route: "/layout/home"
        },
        {
          title: "任务",
          icon: require("@/assets/images/nav_task.png"),
          iconHl: require("@/assets/images/nav_task_hl.png"),
          route: "/layout/task"
        },
        {
          title: "商城",
          icon: require("@/assets/images/nav_mall.png"),
          iconHl: require("@/assets/images/nav_mall_hl.png"),
          route: "/layout/mall"
        },
        {
          title: "学院",
          icon: require("@/assets/images/nav_college.png"),
          iconHl: require("@/assets/images/nav_college_hl.png"),
          route: "/layout/college"
        },
        {
          title: "个人",
          icon: require("@/assets/images/nav_me.png"),
          iconHl: require("@/assets/images/nav_me_hl.png"),
          route: "/layout/me"
        }
      ]
    };
  },
  computed: {},
  methods: {
    isActive(route) {
      // console.log(this.$route.path, "this.$route.path");
      return this.$route.path === route;
    },

    jump(route) {
      this.$router.push(route);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss'>
.nav_bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  text-align: center;
  font-size: 0.96rem;
  background: #fff;
  border-top: 1px solid #ededed;
  z-index: 2011;

  .nav_item {
    width: 100%;
    color: #929292;
  }

  .active {
    color: #1b1788;
  }

  .nav_icon {
    margin: 0 auto;
    width: 1.76rem;
    height: 1.76rem;
  }

  .nav_title {
    margin-top: 0.4rem;
  }
}
</style>