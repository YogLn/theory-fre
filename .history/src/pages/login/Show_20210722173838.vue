<template>
  <div class="container">
    <div class="item yellow">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item blue">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item green">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
    <div class="item pink">
      <p>大家好！<br />&nbsp;&nbsp;&nbsp;&nbsp;我是YogLn</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  height: 100vh;
  position: relative;
}

.item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 66px;
  font-style: italic;
  transform: translate(-100%);
}

.item p {
  letter-spacing: 0.2em;
  color: #fff;
  transform: translateX(-190%);
}

.yellow {
  background-color: rgb(160, 160, 26);
  animation: bg 0.3s linear forwards;
}
.yellow p {
  animation: text 3s 0.3s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.blue {
  background-color: rgb(36, 61, 143);
  clip: rect(0, 1100px, 100vh, 0);
  animation: bg 2.4s 0.6s cubic-bezier(0, 0.49, 0, 1) forwards;
}
.blue p {
  animation: text 2.4s 0.6s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.green {
  background-color: rgb(34, 126, 57);
  clip: rect(0, 920px, 100vh, 0);
  animation: bg 2.1s 0.9s cubic-bezier(0, 0.49, 0, 1) forwards;
}
.green p {
  animation: text 2.1s 0.9s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.pink {
  background-color: rgb(192, 55, 139);
  clip: rect(0, 780px, 100vh, 0);
  animation: bg 1.8s 1.2s cubic-bezier(0, 0.49, 0, 1) forwards;
}
.pink p {
  animation: text 1.8s 1.2s cubic-bezier(0, 0.49, 0, 1) forwards;
}

@keyframes bg {
  from {
    transform: translate(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes text {
  from {
    transform: translate(-190%);
  }
  to {
    transform: translateX(0);
  }
}
</style>