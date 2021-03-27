<template>
  <div class="">
    <top-bar class="top-bar" />
    <div class="home" ref="homePage">
      <router-view class="view" />
    </div>
  </div>

</template>

<script>
import TopBar from '../../components/home/TopBar'
export default {
  components: { TopBar },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.home {
  .top-bar {
    z-index: 999;
    height: 50px;
  }
}
</style>