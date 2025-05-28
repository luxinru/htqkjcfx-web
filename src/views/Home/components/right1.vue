<template>
  <div class="right1">
    <div class="item" v-for="item in list">
      <div class="part">
        <span>
          {{ item.title }}
        </span>
        <span>
          {{ item.value }}
        </span>
        <span>
          {{ item.target }}
        </span>
      </div>
      <div class="part">
        <span>
          超年度目标
        </span>
        <span>
          {{ item.targetValue }}
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span class="red">
          {{ item.targetValue2 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Right1",

  data() {
    return {
      list: [
        {
          title: "营业收现率",
          value: "14.2%",
          target: "年度目标值72%",
          targetValue: "1.2个百分点",
          targetValue2: "20.5%"
        },
        {
          title: "营业收现率",
          value: "14.2%",
          target: "年度目标值72%",
          targetValue: "1.2个百分点",
          targetValue2: "20.5%"
        },
        {
          title: "营业收现率",
          value: "14.2%",
          target: "年度目标值72%",
          targetValue: "1.2个百分点",
          targetValue2: "20.5%"
        },
        {
          title: "营业收现率",
          value: "14.2%",
          target: "年度目标值72%",
          targetValue: "1.2个百分点",
          targetValue2: "20.5%"
        },
        {
          title: "营业收现率",
          value: "14.2%",
          target: "年度目标值72%",
          targetValue: "1.2个百分点",
          targetValue2: "20.5%"
        }
      ]
    };
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
            font-size: 24px;
            color: #3ff1ff;
          }

          &:nth-child(3) {
            font-size: 14px;
            color: #00bbff;
          }
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        padding: 10px 20px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        gap: 10px;

        span {
          &:nth-child(1) {
            font-size: 16px;
            color: #ffffff;
          }

          &:nth-child(2) {
            font-size: 16px;
            color: #25ff50;
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
