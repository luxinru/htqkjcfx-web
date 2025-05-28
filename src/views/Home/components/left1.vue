<template>
  <div class="left1">
    <div class="item">
      <div class="top">
        <img class="icon" src="@/assets/img/home/left1_icon1.png" alt="" />

        <div class="info">
          <span class="label">
            EVA
          </span>
          <div class="value">
            153.24
            <span>
              亿元
            </span>
          </div>
        </div>
      </div>

      <span class="tip">
        年度计划值: 255.47亿元
      </span>

      <div class="chart_box">
        <div ref="chart1" class="chart"></div>
        <div class="info">
          <span>
            75%
          </span>
          <span>
            计划完成率
          </span>
        </div>
        <img class="icon" src="@/assets/img/home/left1_icon3.png" alt="" />
        <img class="bg" src="@/assets/img/home/left1_icon4.png" alt="" />
      </div>
    </div>

    <div class="item">
      <div class="top">
        <img class="icon" src="@/assets/img/home/left1_icon1.png" alt="" />

        <div class="info">
          <span class="label">
            EVA
          </span>
          <div class="value">
            153.24
            <span>
              亿元
            </span>
          </div>
        </div>
      </div>

      <span class="tip">
        年度计划值: 255.47亿元
      </span>

      <div class="chart_box">
        <div ref="chart2" class="chart"></div>
        <div class="info">
          <span>
            75%
          </span>
          <span>
            计划完成率
          </span>
        </div>
        <img class="icon" src="@/assets/img/home/left1_icon3.png" alt="" />
        <img class="bg" src="@/assets/img/home/left1_icon4.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Left1",

  data() {
    return {
      chart1: null,
      chart2: null
    };
  },

  mounted() {
    this.chart1 = echarts.init(this.$refs.chart1);
    this.chart2 = echarts.init(this.$refs.chart2);

    this.initChart1();
    this.initChart2();
  },

  methods: {
    initChart1() {
      this.chart1.setOption({
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "53%"],
            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 16,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgba(0, 80, 144, 1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0, 243, 114, 1)"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            data: [
              {
                value: 70
              }
            ]
          }
        ]
      });
    },

    initChart2() {
      this.chart2.setOption({
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "53%"],
            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 16,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgba(0, 80, 144, 1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0, 236, 255, 1)"
                      }
                    ])
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            data: [
              {
                value: 70
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.left1 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .item {
    flex: 1 0;
    height: 100%;
    border-left: 1px dashed rgba(0, 80, 144, 1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:first-child {
      border-left: none;
    }

    .top {
      width: 209px;
      height: 65px;
      display: flex;
      align-items: center;
      background: url("~@/assets/img/home/left1_icon.png") no-repeat center
        center / 100% 100%;

      .icon {
        margin: 0 0 15px 17px;
      }

      .info {
        flex: 1 0;
        display: flex;
        flex-direction: column;
        margin-left: 30px;

        .label {
          font-size: 16px;
          color: #f3faff;
        }

        .value {
          display: flex;
          align-items: baseline;
          font-weight: 400;
          font-size: 24px;
          color: #1bffcc;

          span {
            font-size: 14px;
          }
        }
      }
    }

    .tip {
      font-size: 16px;
      color: #00bbff;
      margin: 16px 0;
    }

    .chart_box {
      position: relative;
      width: 100%;
      flex: 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .chart {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .icon {
        position: absolute;
        top: 26px;
      }

      .bg {
        position: absolute;
        bottom: 10px;
      }

      .info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 16px;

        span {
          &:nth-child(1) {
            font-size: 24px;
            color: #1bffcc;
          }

          &:nth-child(2) {
            font-size: 16px;
            color: #ffffff;
            // margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
