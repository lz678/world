<template>
  <div>
       <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        advertid:this.$route.query.id,
        content:''
    };
  },
  methods: {
       onClickLeft(){
          this.$router.go(-1)
      },
    getAdvertising() {
      this.$api
        .getAdvertising({
          id: this.advertid
        })
        .then(data => {
            // console.log(data,'广告详情');
            
          if (data.code == 1) {
            console.log(data,'广告详情');
            this.content=data.data.info.content
          }
        });
    }
  },
  created() {
      this.getAdvertising()
  }
};
</script>

<style lang="scss" scoped>
.content{
    width: 90%;
    margin: 20px auto;
    padding: 10px;
    overflow: hidden;
    background-color: #fff;
}
</style>