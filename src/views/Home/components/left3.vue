<template>
  <div class="left3">
    <div class="title">
      <div class="label">
        核技术应用营业收入
        <br />
        增长率
      </div>
      <div class="values">
        <div class="item">
          <span class="label1">
            目标值
          </span>
          <div class="schedule">
            <div class="val" style="width: 78%;"></div>
          </div>
          <span class="label2">
            78%
          </span>
        </div>
        <div class="item">
          <span class="label1">
            完成值
          </span>
          <div class="schedule">
            <div class="val val2" style="width: 32.5%;"></div>
          </div>
          <span class="label2" style="color: rgba(255, 51, 85, 1)">
            32.5%
          </span>
        </div>
      </div>
    </div>

    <div class="charts_box">
      <div class="item">
        <div ref="chart1" class="chart"></div>
        <div class="info">
          <span>
            65%
          </span>
          <span>
            同方威视
          </span>
        </div>
      </div>

      <div class="item">
        <div ref="chart2" class="chart"></div>
        <div class="info">
          <span>
            73%
          </span>
          <span>
            核医疗
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Left3",

  data() {
    return {
      chart1: null,
      chart2: null
    };
  },

  mounted() {
    this.initChart1();
    this.initChart2();
  },

  methods: {
    initChart1() {
      var option = {
        polar: {
          radius: ["60%", "70%"],
          center: ["50%", "50%"]
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true,
            barWidth: 90,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(66, 66, 66, .3)"
            },
            data: [65],
            coordinateSystem: "polar",

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(29, 211, 236, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(24, 145, 255, 1)"
                  }
                ])
              }
            }
          }
        ]
      };

      this.chart1 = echarts.init(this.$refs.chart1);
      this.chart1.setOption(option);
    },

    initChart2() {
      var option = {
        polar: {
          radius: ["60%", "70%"],
          center: ["50%", "50%"]
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true,
            barWidth: 90,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(66, 66, 66, .3)"
            },
            data: [73],
            coordinateSystem: "polar",

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(255, 254, 112, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(172, 98, 38, 1)"
                  }
                ])
              }
            }
          }
        ]
      };

      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart2.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.left3 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 80, 144, 1);

    .label {
      flex: 1 0;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      flex-wrap: wrap;
    }

    .values {
      flex: 1.5 0;
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        align-items: center;
        gap: 5px;

        .label1 {
          font-size: 14px;
          color: #00bbff;
        }

        .schedule {
          width: 148px;
          height: 16px;
          padding: 6px;
          box-sizing: border-box;
          border-radius: 2px;
          border: 1px solid #005090;

          .val {
            width: 70%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(0, 80, 144, 0.5) 0%,
              #00f6ff 100%
            );
            border-radius: 2px;
          }

          .val2 {
            background: linear-gradient(
              to right,
              rgba(0, 80, 144, 0.5) 0%,
              rgba(255, 51, 85, 1) 100%
            );
          }
        }

        .label2 {
          font-weight: 400;
          font-size: 18px;
          color: #00ecff;
        }
      }
    }
  }

  .charts_box {
    position: relative;
    width: 100%;
    flex: 1 0;
    display: flex;

    .item {
      position: relative;
      flex: 1 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .chart {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;

        span {
          &:nth-child(1) {
            font-weight: 400;
            font-size: 24rpx;
            color: #ffffff;
          }

          &:nth-child(2) {
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
