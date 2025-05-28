<template>
  <div class="box">
    <div class="box_title">
      <div class="text">
        {{ title }}
      </div>
    </div>

    <div class="box_container" :class="type === 1 ? 'style1' : 'style2'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",

  props: {
    title: {
      type: String,
      default: "标题"
    },

    type: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .box_title {
    width: 100%;
    height: 34px;
    background: url("~@/assets/img/home/box_title.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 45px 10px;
    box-sizing: border-box;

    .text {
      width: 100%;
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
      // background: radial-gradient(to bottom, #00ecff 0%, #ffffff 100%);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
  }

  .box_container {
    width: 100%;
    flex: 1 0;
    background: url("~@/assets/img/home/box_container.png") no-repeat center
      center;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .style1 {
    background: url("~@/assets/img/home/box_container.png") no-repeat center
      center;
    background-size: 100% 100%;
  }

  .style2 {
    background: url("~@/assets/img/home/box_container2.png") no-repeat center
      center;
    background-size: 100% 100%;
  }
}
</style>
