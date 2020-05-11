<template>
  <div class="bbox">
    <van-nav-bar class="nav" title="支付" left-arrow @click-left="$router.go(-2)"></van-nav-bar>
    <div class="list" ref="myList"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money:2
    };
  },
  methods: {
    pay() {
      // if (this.isPay == 0) {
      this.$dialog
        .confirm({
          title: "是否确认支付！",
          // message: "支付2元人民币！"
        })
        .then(() => {
          this.$api.Pay().then(data => {
            console.log(data);
            if (data.code == 1) {
              // window.location.href = data.data;
              var form = (window.location.href = data.data);
              const div = document.createElement("div");
              div.style.width = "100%";
              div.innerHTML = form;
              this.$refs.myList.appendChild(div);
              // document.body.appendChild(div);
              document.forms[0].submit();
            }
          });
          //   this.$router.push("/pay");
          console.log(555);
        })
        .catch(() => {
          //   this.$router.go(-1);
          console.log(666);
        });
      // }
    }
  },
  created() {
    this.pay();
  }
};
</script>

<style lang="scss" scoped>
.bbox {
  width: 100%;
  // height: 100%;
  .nav {
    height: 8vh;
  }
  .list {
    width: 100%;
    height: 100vh;
    // border: 1px solid red;
    #alipaysubmit {
      width: 100%;
      height: 100vh;
    }
  }
}
</style>