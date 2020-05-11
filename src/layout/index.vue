<!-- layout -->
<template>
  <div class="layout">
    <div class="container">
      <router-view />
    </div>

    <nav-bar />
  </div>
</template>

<script>
import navBar from './children/nav_bar'
export default {
  name: 'layout',
  components: { navBar },
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang='scss'>
.layout {
  height: 100vh;
  .container {
    // width:100%;
    // height: calc(100% - 4rem);
    height: 92vh;
    overflow: auto;
    // z-index: ;
  }
}
</style>