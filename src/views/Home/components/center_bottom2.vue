<template>
  <div class="center_bottom2">
    <div class="item" v-for="(item, index) in dataList" :key="index">
      <img class="icon" :src="item.icon" alt="" />

      <div class="center_bottom2_container">
        <div class="part">
          <div class="child">
            <div class="label1">
              {{ item.investment.label }}
            </div>
            <div class="label2">
              {{ item.investment.value }}
              <span>
                {{ item.investment.unit }}
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">
              年度计划值: {{ item.investment.planValue }}
            </div>
            <div class="value2">
              计划完成率: {{ item.investment.completionRate }}
            </div>
          </div>
        </div>
        <div class="part">
          <div class="child">
            <div class="label1">
              {{ item.project.label }}
            </div>
            <div class="label2">
              {{ item.project.value }}
              <span>
                {{ item.project.unit }}
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">正常: {{ item.project.normal }}</div>
            <div class="value2">滞后: {{ item.project.lagging }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api5 } from "@/api/home";

export default {
  name: "CenterBottom2",
  data() {
    return {
      dataList: [],
      date: ""
    };
  },

  mounted() {
    this.init();

    this.$EventBus.$on("updateDate", date => {
      this.date = date;

      this.init();
    });
  },

  methods: {
    init() {
      api5().then(res => {
        this.dataList = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.center_bottom2 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .item {
    flex: 1 0;
    display: flex;
    align-items: center;
    gap: 16px;

    .icon {
      width: 100px;
      height: 94px;
    }

    .center_bottom2_container {
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .part {
        width: 100%;
        flex: 1 0;
        background: linear-gradient(
          to right,
          rgba(0, 51, 92, 0) 0%,
          rgba(0, 51, 92, 1) 100%
        );
        border: 1px solid;
        border-image: linear-gradient(
            to right,
            rgba(0, 105, 202, 0) 0%,
            rgba(0, 105, 202, 1) 100%
          )
          1;

        display: flex;

        .child {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .label1 {
            font-size: 16px;
            color: #f3faff;
          }

          .label2 {
            display: flex;
            align-items: baseline;
            font-weight: 400;
            font-size: 18px;
            color: #3ff1ff;

            span {
              font-size: 14px;
            }
          }

          .value1,
          .value2 {
            font-size: 14px;
            color: #00bbff;
          }

          .value2 {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
