<template>
  <div class="center_bottom1">
    <div class="item">
      <div class="top">
        <img class="icon" src="@/assets/img/home/left1_icon1.png" alt="" />

        <div class="info">
          <span class="label">
            {{ dataList[0]?.label }}
          </span>
          <div class="value">
            {{ dataList[0]?.value }}
            <span>
              {{ dataList[0]?.unit }}
            </span>
          </div>
        </div>
      </div>

      <span class="tip">
        年度计划值: {{ dataList[0]?.planValue }}{{ dataList[0]?.unit }}
      </span>

      <div class="chart_box">
        <div ref="chart1" class="chart"></div>
        <div class="info">
          <span> {{ dataList[0]?.completionRate }}% </span>
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
            {{ dataList[1]?.label }}
          </span>
          <div class="value" :style="{ color: dataList[1]?.valueColor }">
            {{ dataList[1]?.value }}
            <span>
              {{ dataList[1]?.unit }}
            </span>
          </div>
        </div>
      </div>

      <span class="tip">
        年度计划值: {{ dataList[1]?.planValue }}{{ dataList[1]?.unit }}
      </span>

      <div class="chart_box">
        <div ref="chart2" class="chart"></div>
        <div class="info">
          <span :style="{ color: dataList[1]?.valueColor }">
            {{ dataList[1]?.completionRate }}%
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
import { api4 } from "@/api/home";

export default {
  name: "CenterBottom1",

  data() {
    return {
      chart1: null,
      chart2: null,
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
      api4().then(res => {
        this.dataList = res;

        this.$nextTick(() => {
          this.initChart1();
          this.initChart2();
        });
      });
    },

    initChart1() {
      if (this.chart1) {
        this.chart1.dispose();
        this.chart1 = null;
      }

      this.chart1 = echarts.init(this.$refs.chart1);

      this.chart1.setOption({
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "53%"],
            min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 12,
                color: [
                  [
                    (this.dataList[0].completionRate / 100).toFixed(2),
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
                  ],
                  [1, "rgba(0, 80, 144, 1)"]
                ]
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      });
    },

    initChart2() {
      if (this.chart2) {
        this.chart2.dispose();
        this.chart2 = null;
      }

      this.chart2 = echarts.init(this.$refs.chart2);

      this.chart2.setOption({
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "53%"],
            min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 12,
                color: [
                  [
                    (this.dataList[1].completionRate / 100).toFixed(2),
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
                  ],
                  [1, "rgba(0, 80, 144, 1)"]
                ]
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.center_bottom1 {
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
          font-size: 18px;
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
            font-size: 18px;
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
