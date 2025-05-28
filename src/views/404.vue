<template>
  <div class="not-find">
    <div class="color1"></div>
    <div class="color2"></div>
    <div class="color3"></div>
    <div class="color4"></div>
    <div class="color5"></div>
  </div>
</template>
<style lang="scss" scoped>
.not-find {
  width: 100%;
  height: 100%;
  position: relative;
  div {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .color1 {
    border-top: 50px solid red;
    border-right: 50px solid transparent;
    z-index: 999;
  }
  .color2 {
    border-top: 60px solid #fff;
    border-right: 60px solid transparent;
    z-index: 998;
  }
  .color3 {
    border-top: 70px solid green;
    border-right: 70px solid transparent;
    z-index: 997;
  }
  .color4 {
    border-top: 80px solid #fff;
    border-right: 80px solid transparent;
    z-index: 996;
  }
  .color5 {
    border-top: 90px solid blue;
    border-right: 90px solid transparent;
    z-index: 995;
  }
}
</style>
