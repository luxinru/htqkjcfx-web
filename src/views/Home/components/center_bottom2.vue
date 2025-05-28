<template>
  <div class="center_bottom2">
    <div class="item">
      <img
        class="icon"
        src="@/assets/img/home/center_bottom2_icon1.png"
        alt=""
      />

      <div class="center_bottom2_container">
        <div class="part">
          <div class="child">
            <div class="label1">
              固投投资金额
            </div>
            <div class="label2">
              52.91
              <span>
                亿元
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">
              年度计划值: 83亿元
            </div>
            <div class="value2">
              计划完成率: 63.75%
            </div>
          </div>
        </div>
        <div class="part">
          <div class="child">
            <div class="label1">
              固投投资金额
            </div>
            <div class="label2">
              52.91
              <span>
                亿元
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">
              年度计划值: 83亿元
            </div>
            <div class="value2">
              计划完成率: 63.75%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <img
        class="icon"
        src="@/assets/img/home/center_bottom2_icon2.png"
        alt=""
      />

      <div class="center_bottom2_container">
        <div class="part">
          <div class="child">
            <div class="label1">
              固投投资金额
            </div>
            <div class="label2">
              52.91
              <span>
                亿元
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">
              年度计划值: 83亿元
            </div>
            <div class="value2">
              计划完成率: 63.75%
            </div>
          </div>
        </div>
        <div class="part">
          <div class="child">
            <div class="label1">
              固投投资金额
            </div>
            <div class="label2">
              52.91
              <span>
                亿元
              </span>
            </div>
          </div>

          <div class="child">
            <div class="value1">
              年度计划值: 83亿元
            </div>
            <div class="value2">
              计划完成率: 63.75%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterBottom2"
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
            font-size: 24px;
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
