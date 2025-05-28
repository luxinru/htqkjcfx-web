<template>
  <div class="page_root">
    <Header />

    <section class="page_root_container">
      <div class="left">
        <div class="part">
          <Box title="经营指标">
            <Left1 />
          </Box>
        </div>
        <div class="part">
          <Box title="结构优化">
            <Left2 />
          </Box>
        </div>
        <div class="part">
          <Box title="产业控制">
            <Left3 />
          </Box>
        </div>
      </div>
      <div class="center">
        <div class="part" style="flex: 2 0;">
          <Center />
        </div>
        <div class="part">
          <div class="child">
            <Box title="国际化经营">
              <CenterBottom1 />
            </Box>
          </div>
          <div class="child">
            <Box title="投资">
              <CenterBottom2 />
            </Box>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="part" style="flex: 2 0;">
          <Box title="五率" :type="2">
            <Right1 />
          </Box>
        </div>
        <div class="part">
          <Box title="重点任务">
            <Right2 />
          </Box>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Box from "./components/box.vue";
import Left1 from "./components/left1.vue";
import Left2 from "./components/left2.vue";
import Left3 from "./components/left3.vue";
import Right1 from "./components/right1.vue";
import Right2 from "./components/right2.vue";
import Center from "./components/center.vue";
import CenterBottom1 from "./components/center_bottom1.vue";
import CenterBottom2 from "./components/center_bottom2.vue";

export default {
  name: "Home",

  components: {
    Header,
    Box,
    Left1,
    Left2,
    Left3,
    Right1,
    Right2,
    CenterBottom1,
    CenterBottom2,
    Center
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.page_root {
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/home/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .page_root_container {
    width: 100%;
    flex: 1 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
    background: transparent;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;

    .left,
    .right,
    .center {
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow: hidden;

      .part {
        width: 100%;
        flex: 1 0;
        display: flex;
        gap: 20px;
        overflow: hidden;

        .child {
          width: 100%;
          flex: 1 0;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
