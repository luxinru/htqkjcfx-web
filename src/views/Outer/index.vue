<template>
  <div class="page_root">
    <Header />

    <section class="page_root_container">
      <div class="left">
        <Left />
      </div>
      <div class="center">
        <Center />
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

    <Modal :show="modalVisible" @close="closeModal" />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Box from "./components/box.vue";
import Left from "./components/left.vue";
import Center from "./components/center.vue";
import Right1 from "./components/right1.vue";
import Right2 from "./components/right2.vue";
import Modal from "./components/modal.vue";

export default {
  name: "Outer",

  components: {
    Header,
    Box,
    Left,
    Center,
    Right1,
    Right2,
    Modal
  },

  data() {
    return {
      modalVisible: false
    };
  },

  methods: {
    openModal() {
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
    }
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
    grid-template-columns: 220px 1fr 530px;
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

    .left {
      background: url("~@/assets/img/outer/left_bg.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
}
</style>
