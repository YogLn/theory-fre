<template>
  <div class="container">
    <div class="text">

      <a-divider orientation="left">关于我</a-divider>
      <div class="text" v-html="'我叫胥雍林,就读西华大学2018级'"></div>
      <div class="text" v-html="'目前大三了，从大二下学期开始接触前端 '"></div>
      <div class="text" v-html="'从最初的html、css、JavaScript再到vue、react的熟悉'"></div>
      <div class="text" v-html="'在学习前端的道路上总是充满了惊喜和挑战'"></div>
      <div class="text" v-html="'学了Echarts让我知道了原来数据可视化是这么的美妙'"></div>
      <div class="text" v-html="'了解了Node和Koa让我在服务端又学到了很多的东西'"></div>
      <div class="text" v-html="'起码能自己写一些简单的接口了'"></div>
      <div class="text" v-html="'接下来打算好好学习Vue3和Webpack'"></div>
      <div class="text" v-html="'学无止尽~~~加油~~~'"></div>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/home/TopBar.vue'
export default {
  components: { TopBar },
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 400px;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px 14px;

  .text {
    line-height: 34px;
    text-align: center;
    font-size: 22px;
    width: 0;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 2s steps(24) forwards; //steps里为你的字符数
  }

  @keyframes typing {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
}
</style>