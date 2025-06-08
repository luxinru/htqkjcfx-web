<template>
  <div class="page_root">
    <Header />

    <section class="container">
      <div class="part top">
        <div class="side">
          合同分析
        </div>
        <div class="box box1">
          <div class="box_title">
            <img src="~@/assets/img/contract/icon8.png" alt="" />
          </div>
          <div class="box_container">
            <top1 />
          </div>
        </div>
        <div class="box box2" style="padding: 0;">
          <top2 />
        </div>
        <div class="box box3">
          <div class="box_title">
            <img src="~@/assets/img/contract/icon7.png" alt="" />
          </div>
          <div class="box_container">
            <top3 />
          </div>
        </div>
      </div>
      <div class="part bottom">
        <div class="side">
          客户分析
        </div>
        <div class="box box1" style="padding: 0;">
          <bottom1 />
        </div>
        <div class="box box2">
          <div class="box_title">
            <img src="~@/assets/img/contract/icon6.png" alt="" />
          </div>
          <div class="box_container">
            <div class="box_container_part">
              <bottom2 />
            </div>
            <div class="line"></div>
            <div class="box_container_part">
              <bottom3 />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import top1 from "./components/top1.vue";
import top2 from "./components/top2.vue";
import top3 from "./components/top3.vue";
import bottom1 from "./components/bottom1.vue";
import bottom2 from "./components/bottom2.vue";
import bottom3 from "./components/bottom3.vue";

export default {
  name: "Contract",

  components: {
    Header,
    top1,
    top2,
    top3,
    bottom1,
    bottom2,
    bottom3
  },

  data() {
    return {};
  },
  mounted() {},
  methods: {}
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

  .container {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    background: transparent;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;

    .part {
      flex: 1 0;
      display: flex;
      gap: 20px;
      overflow: hidden;

      .side {
        width: 50px;
        height: 100%;
        background: url("~@/assets/img/contract/icon1.png") no-repeat center
          center;
        background-size: 100% 100%;
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        letter-spacing: 10px;
      }

      &:nth-child(1) {
        flex: 394 0;
      }

      &:nth-child(2) {
        flex: 536 0;

        .side {
          background: url("~@/assets/img/contract/icon2.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }

      .box {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        box-sizing: border-box;
        .box_title {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0, 105, 202, 1);

          img {
            height: 24px;
          }
        }

        .box_container {
          flex: 1 0;
          overflow: hidden;
          display: flex;
          align-items: center;

          .box_container_part {
            flex: 1 0;
            height: 100%;
          }

          .line {
            width: 0;
            height: 464px;
            border-left: 1px dashed rgba(0, 105, 202, 1);
          }
        }
      }
    }

    .top {
      .box1 {
        flex: 590 0;
        background: url("~@/assets/img/contract/icon3.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .box2 {
        flex: 570 0;
      }

      .box3 {
        flex: 610 0;
        background: url("~@/assets/img/contract/icon4.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }

    .bottom {
      .box1 {
        flex: 280 0;
      }

      .box2 {
        flex: 1510 0;
        background: url("~@/assets/img/contract/icon5.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
