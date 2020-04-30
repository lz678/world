<template>
  <div>
    <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content" v-html="content">
        
    </div>
    <!-- <div class="content">
        {{content}}
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        content:'',
      id: this.$route.query.imgid
    };
  },
  methods: {
      onClickLeft(){
          this.$router.go(-1)
      },
    getimg() {
      this.$api
        .getlunbo({
          id: this.id
        })
        .then(data => {
            if(data.code==1){
                console.log(data, "轮播详情");
                this.content=data.data.info.content
            }
           
        });
    }
  },
  created() {
    this.getimg();
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