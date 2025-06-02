<template>
  <div class="right1">
    <div class="item">
      <div class="part">
        <span>
          营业收现率
        </span>
        <span>
          14.2%
        </span>
        <span>
          年度目标值72%
        </span>
      </div>
      <div class="part">
        <span>
          超年度目标
        </span>
        <span>
          1.2个百分点
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span class="red">
          <img src="@/assets/img/home/down.png" alt="" />
          15.5%
        </span>
      </div>
    </div>

    <div class="item">
      <div class="part">
        <span>
          净资产收益率
        </span>
        <span>
          17.8%
        </span>
        <span>
          年度目标值72%
        </span>
      </div>
      <div class="part">
        <span>
          年度目标差距
        </span>
        <span class="red">
          1.2个百分点
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span>
          <img src="@/assets/img/home/up.png" alt="" />
          20.5%
        </span>
      </div>
    </div>

    <div class="item">
      <div class="part">
        <span>
          资产负债率
        </span>
        <span>
          17.8%
        </span>
        <span>
          年度目标值72%
        </span>
      </div>
      <div class="part">
        <span>
          超年度目标
        </span>
        <span>
          1.2个百分点
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span>
          <img src="@/assets/img/home/up.png" alt="" />
          15.7
        </span>
      </div>
    </div>

    <div class="item">
      <div class="part">
        <span>
          研发投入强度
        </span>
        <span>
          17.8%
        </span>
        <span>
          年度目标值72%
        </span>
      </div>
      <div class="part">
        <span>
          超年度目标
        </span>
        <span>
          1.2个百分点
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span class="red">
          <img src="@/assets/img/home/down.png" alt="" />
          2.79
        </span>
      </div>
    </div>

    <div class="item">
      <div class="part">
        <span>
          全员劳动生产率
        </span>
        <span>
          43万元/人年
        </span>
        <span>
          年度目标值39万元/人年
        </span>
      </div>
      <div class="part">
        <span>
          年度目标差距
        </span>
        <span class="red">
          10.1万元/人年
        </span>
      </div>
      <div class="part">
        <span>
          同比
        </span>
        <span>
          <img src="@/assets/img/home/up.png" alt="" />
          1.5万元/人年
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
            font-size: 22px;
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
