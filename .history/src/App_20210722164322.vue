<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  background: url('./assets/img/home.jpg') no-repeat center;
  min-height: 760px;
  background-attachment: fixed;
  background-size: 100% 100%;
}
</style>
