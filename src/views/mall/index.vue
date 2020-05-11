<template>
  <div class="bbox">
    <!-- <div class="one">商城</div> -->
     <van-nav-bar class="one" title="商城" @click-right="onClickLeft" >
       <div slot="right">
         已购买
       </div>
     </van-nav-bar>
    <!-- <div class="two">
      <div>积分余额：5153232</div>
      <div>我的礼品></div>
    </div>-->
    <!-- 礼品 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option"  @change="change" />
      
    </van-dropdown-menu>
    <div class="giftbox">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          offset="10"
          finished-text="没有更多了"
          @load="onLoad"
        > -->
          <div class="giftitem" v-for="(item,index) in mygift" :key="index" @click="check(item)">
            <!-- <div class="giftimg"> -->
            <img class="giftimg" :src="item.cover_img|filterImg" alt />
            <!-- </div> -->
            <div class="call">{{item.name}}</div>
            <div class="common">{{item.description}}</div>
            <div class="itemfoot">
              <div class="need">{{item.price}}</div>
              <div class="huan" @click.stop="show = true" @click="mypay(item)">购买</div>
            </div>
          </div>
        <!-- </van-list> -->
      <!-- </van-pull-refresh> -->
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <div class="title">购买礼品</div>
          <div class="hr"></div>
          <div class="name">{{name}}</div>
          <div class="price">
            价格：
            <span style="color:#E83333">{{price}}</span>
          </div>
          <div class="buy" @click.stop="buy">立即购买</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      value1: '',
      switch1: false,
      option: [
        // { text: "全部商品", value: 0 },
      ],
      page: 0,
      size: 10,
      show: false,
      isLoading: false,
      loading: false,
      finished: true,
      mygift:'',
      name:'',
      price:"",
      id:''
    };
  },
  methods: {
    buy(){
      this.$api.postbuygoods({
        product_id:this.id
      })
      .then(data=>{
        console.log(data,"购买");
        window.location.href=data.data
        // if(data.code==1){
        //   this.show = false
        // }
        
      })
    },
    mypay(item){
      this.name=item.name;
      this.price=item.price;
      this.id=item.id
    },
    onClickLeft(){
      this.$router.push('/payHistorty')
    },
    change(e){
      console.log(e);
      this.value1=e
      
      this.getGoodsList();
    },
    // onRefresh() {
    //   setTimeout(() => {
    //     Toast("刷新成功");
    //     this.isLoading = false;
    //      this.getGoodsList();
    //     // this.count++;
    //   }, 1000);
    // },
    // onLoad() {
    //   this.page += 1;
    // },
    check(item) {
      this.$router.push("/mallDetail");
    },
    getMallTypeList() {
      this.$api.getMallTypeList().then(data => {
        console.log(data, "商品列表");
        if (data.code === 1) {
          data.data.forEach(element => {
            this.value1=data.data[0].id
            this.option.push({text:element.name,value:element.id})
            this.getGoodsList();
          })
        }
      });
    },
    getGoodsList(){
      this.$api.getGoodsList({
        cate_id:this.value1
      })
      .then(data=>{
        console.log(data,"列表");
        this.mygift=data.data
      })
    }
  },
  created() {
    this.getMallTypeList()
    // this.getGoodsList();
  }
};
</script>

<style lang="scss" scoped>
.bbox {
  width: 100%;
  height: 92vh;
  // height: calc(100% - 4rem);
  // border: 1px solid red;
  .one {
    width: 100%;
    height: 6vh;
    background-color: #fff;
    // height: 1.875rem;
    border-bottom: 1px solid #EFEFEF;
    line-height: 6vh;
    font-size: 1.28rem;
    // font-weight: bold;
    text-align: center;
  }
  .two {
    width: 95%;
    height: 2.5rem;
    margin: 2px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.375rem;
    background-color: #ffd436;
  }
  .giftbox {
    width: 100%;
    height: 76vh;
    overflow: scroll;
    // border: 1px solid red;
    .giftitem {
      width: 44%;
      float: left;
      margin: 3% 1% 1% 4%;
      .giftimg {
        width: 100%;
      }
      .call {
        font-size: 12px;
        font-weight: 600;
        padding: 6px 0 6px 10px;
        text-align: left;
      }
      .common {
        width: 90%;
        height: 1.875rem;
        margin: 2px auto;
        font-size: 10px;
        font-family: "SourceHanSansCN-Regular";
        color: #bcbcbc;
        overflow: hidden;
        text-align: left;
      }
      .itemfoot {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .need {
          font-size: 0.875rem;
          line-height: 1.875rem;
          color: red;
        }
        .huan {
          width: 36%;
          height: 1.4rem;
          text-align: center;
          font-size: 0.75rem;
          line-height: 1.4rem;
          border-radius: 0.375rem;
          background-color: #ffd436;
        }
      }
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 60%;
  height: 28vh;
  border-radius: 4px;
  margin: 0 auto;
  background-color: #fff;
  .title {
    text-align: center;
    padding: 6px 0px;
    font-weight: 600;
  }
  .hr {
    height: 2px;
    background-color: #ececec;
  }
  .name {
    text-align: center;
    padding: 20px 0px 20px 0px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }
  .price {
    text-align: center;
    padding: 4px 0px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #5a5a5a;
  }
  .buy {
    width: 50%;
    background-color: #ffd436;
    padding: 8px 0px;
    margin: 6px auto;
    text-align: center;

    font-weight: 600;
  }
}
</style>