<!-- about -->
<template>
  <div class="about">
    <van-nav-bar fixed title="关于我们" left-arrow @click-left="$router.go(-1)" />

    <div class="page_main">
      <van-cell title="软件升级" is-link>
        <div slot="icon" class="cell_icon">
          <img src="../../assets/images/upgrade.png" alt />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {
    getVersion () {
      this.$api.getVersion()
        .then(data => {
          console.log(data)
        })
    }
  },
  created () {
    this.getVersion()
  },
  mounted () { }
}
</script>

<style lang='scss'>
.about {
  padding-top: 5.2rem;

  .van-cell {
    padding: 0.8rem 1.2rem;
  }
  .cell_icon {
    width: 1.28rem;
    height: 1.28rem;
  }
}
</style>