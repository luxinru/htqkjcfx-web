<template>
  <div class="section-title">
    <div class="title-bg1">
      <span>{{ title }}</span>
    </div>
    <div class="title-bg2"></div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: '标题'
    }
  }
}
</script>

<style scoped lang="scss">
.section-title {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
  height: 34px;

  .title-bg1 {
    width: 100px;
    background: url('/images/titleBg1.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    height: 100%;

    .title-icon {
      width: 4px;
      height: 16px;
      background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
      border-radius: 2px;
      margin-right: 10px;
      margin-left: 15px;
      opacity: 0;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
      margin-right: 15px;
      white-space: nowrap;
    }
  }

  .title-bg2 {
    background: url('/images/titleBg2.png') no-repeat;
    background-size: 100% 100%;
    flex: 1;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}
</style> 