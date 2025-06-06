<template>
  <div class="right1">
    <div class="item" v-for="(item, index) in indicators" :key="index">
      <div class="part">
        <span>
          {{ item.name }}
        </span>
        <span>
          {{ item.value }}
        </span>
        <span> 年度目标值{{ item.target }} </span>
      </div>
      <div class="part">
        <span>
          {{ item.compareType }}
        </span>
        <span :class="{ red: item.isNegative }">
          {{ item.compareValue }}
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span :class="{ red: item.yearOnYear.isNegative }">
          <img
            :src="
              require(`@/assets/img/home/${
                item.yearOnYear.isNegative ? 'down' : 'up'
              }.png`)
            "
            alt=""
          />
          {{ item.yearOnYear.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { api4 } from "@/api/outer";

export default {
  name: "Right1",

  data() {
    return {
      indicators: [],
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
      api4().then(res => {
        this.indicators = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.right1 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  .item {
    width: 100%;
    height: 97px;
    background: url("~@/assets/img/home/right1_item_bg.png") no-repeat center
      center;
    background-size: 100% 100%;
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr;

    .part {
      border-right: 1px dashed rgba(0, 80, 144, 1);
      display: flex;
      flex-direction: column;

      &:nth-child(1) {
        padding: 10px 20px;
        box-sizing: border-box;
        justify-content: space-between;

        span {
          &:nth-child(1) {
            font-weight: bold;
            font-size: 16px;
            color: #ffffff;
          }

          &:nth-child(2) {
            font-weight: 400;
            font-size: 18px;
            color: #3ff1ff;
          }

          &:nth-child(3) {
            font-size: 12px;
            color: #00bbff;
          }
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        padding: 10px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span {
          &:nth-child(1) {
            font-size: 14px;
            color: #ffffff;
          }

          &:nth-child(2) {
            font-size: 14px;
            color: #25ff50;
            display: flex;
            align-items: center;
          }
        }
      }

      .red {
        color: rgba(255, 51, 85, 1) !important;
      }
    }
  }
}
</style>
