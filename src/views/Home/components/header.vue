<template>
  <div class="header">
    <img src="@/assets/img/home/header_title.png" alt="">
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 90px;
  background: url("~@/assets/img/home/header.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  // .text {
  //   font-weight: bold;
  //   font-size: 42px;
  //   background: linear-gradient(to bottom, #97d4ff 0%, #ffffff 100%);
  //   -webkit-background-clip: text;
  //   -webkit-text-fill-color: transparent;
  // }
}
</style>
