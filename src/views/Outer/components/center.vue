<template>
  <div class="center">
    <section class="top">
      <div
        class="item"
        :class="{ active: active === 1 }"
        @click="onChangeActive(1)"
      >
        <div class="title">
          <img src="@/assets/img/home/center_icon1.png" alt="" />

          <div class="info">
            <div class="label">
              <span>
                集团外营业收入
              </span>
            </div>

            <div class="value">
              50.24
              <span>亿元</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content_item">
            <span>
              同比增加：15.47亿元
            </span>
            <span>
              ↑3.4%
            </span>
          </div>
          <div class="progress">
            <div class="chart_box">
              <div ref="progressChart1" class="chart"></div>
              <div class="values">
                <span>
                  72.4%
                </span>
                <span>
                  计划完成率
                </span>
              </div>
            </div>
          </div>
          <div class="content_item">
            <span>
              年度计划值：50.47亿元
            </span>
          </div>
        </div>

        <img
          class="arrow"
          v-if="active === 1"
          src="@/assets/img/home/arrow.png"
          alt=""
        />
      </div>

      <div
        class="item"
        :class="{ active: active === 2 }"
        @click="onChangeActive(2)"
      >
        <div class="title">
          <img src="@/assets/img/home/center_icon2.png" alt="" />

          <div class="info">
            <div class="label">
              <span>
                利润总额
              </span>
            </div>

            <div class="value" style="color: rgba(255, 51, 85, 1)">
              -2.24
              <span>亿元</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content_item">
            <span>
              同比增加：1.47亿元
            </span>
            <span>
              ↑3.4%
            </span>
          </div>
          <div class="progress">
            <div class="chart_box">
              <div ref="progressChart2" class="chart"></div>
              <div class="values">
                <span>
                  72.4%
                </span>
                <span>
                  计划完成率
                </span>
              </div>
            </div>
          </div>
          <div class="content_item">
            <span>
              年度计划值：50.47亿元
            </span>
          </div>
        </div>

        <img
          class="arrow"
          v-if="active === 2"
          src="@/assets/img/home/arrow.png"
          alt=""
        />
      </div>

      <div
        class="item"
        :class="{ active: active === 3 }"
        @click="onChangeActive(3)"
      >
        <div class="title">
          <img src="@/assets/img/home/center_icon3.png" alt="" />

          <div class="info">
            <div class="label">
              <span>
                集团外累计新签合同
              </span>
            </div>

            <div class="value">
              69.24
              <span>亿元</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content_item">
            <span>
              同比增加：255.47亿元
            </span>
            <span>
              ↑3.4%
            </span>
          </div>
          <div class="progress">
            <div class="chart_box">
              <div ref="progressChart3" class="chart"></div>
              <div class="values">
                <span>
                  72.4%
                </span>
                <span>
                  计划完成率
                </span>
              </div>
            </div>
          </div>
          <div class="content_item">
            <span>
              年度计划值：50.47亿元
            </span>
          </div>
        </div>

        <img
          class="arrow"
          v-if="active === 3"
          src="@/assets/img/home/arrow.png"
          alt=""
        />
      </div>
    </section>

    <section class="bottom">
      <div ref="partContainer" class="part_container">
        <div class="part">
          <div class="part_title">
            同方威视利润总额分月计划完成情况
          </div>
          <div ref="lineChart" class="line-chart"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Center",

  data() {
    return {
      active: 1,
      date:
        new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月",
      progressChart1: null,
      progressChart2: null,
      progressChart3: null,
      lineChart: null
    };
  },

  mounted() {
    this.$EventBus.$on("updateDate", date => {
      this.date = date;
    });

    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initLineChart();
  },

  methods: {
    onChangeActive(index) {
      this.active = index;
    },

    initChart1() {
      if (this.progressChart1) {
        this.progressChart1.dispose();
      }
      this.progressChart1 = echarts.init(this.$refs.progressChart1);
      this.progressChart1.setOption({
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
      });
    },

    initChart2() {
      if (this.progressChart2) {
        this.progressChart2.dispose();
      }
      this.progressChart2 = echarts.init(this.$refs.progressChart2);
      this.progressChart2.setOption({
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
      });
    },

    initChart3() {
      if (this.progressChart3) {
        this.progressChart3.dispose();
      }
      this.progressChart3 = echarts.init(this.$refs.progressChart3);
      this.progressChart3.setOption({
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
      });
    },

    initLineChart() {
      if (this.lineChart) {
        this.lineChart.dispose();
      }
      this.lineChart = echarts.init(this.$refs.lineChart);
      this.lineChart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,32,64,0.9)",
          borderColor: "#3deaff",
          borderWidth: 1,
          textStyle: { color: "#fff" },
          formatter: function(params) {
            let tar = params[0] || {};
            let plan = params[1] || {};
            let rate = params[2] || {};
            return `
              <div style="font-size:16px;margin-bottom:4px;">${tar.axisValue || ''}</div>
              本期：${tar.value !== undefined ? tar.value : '-'}亿元<br/>
              计划值：${plan.value !== undefined ? plan.value : '-'}亿元<br/>
              完成率：${rate.value !== undefined ? rate.value : 0}%
            `;
          }
        },
        legend: {
          data: ["完成值", "计划值", "完成率"],
          right: "3%",
          top: 0,
          textStyle: { color: "#fff" }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: 0,
          top: "20%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisLabel: { color: "#fff", fontSize: 16 },
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(0, 80, 144, 1)" }
            },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位（亿元）",
            nameTextStyle: {
              color: "rgba(0, 187, 255, 1)",
              fontSize: 16,
              padding: [0, 0, 0, 0]
            },
            position: "left",
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(0, 80, 144, 1)" }
            },
            axisLabel: { color: "rgba(0, 187, 255, 1)", fontSize: 14 },
            splitLine: {
              lineStyle: { color: "rgba(0, 80, 144, 1)", type: "dashed" }
            }
          },
          {
            type: "value",
            name: "单位（%）",
            nameTextStyle: {
              color: "rgba(0, 187, 255, 1)",
              fontSize: 16,
              padding: [0, 0, 0, 0]
            },
            position: "right",
            axisLine: { show: false },
            axisLabel: {
              show: true,
              color: "rgba(0, 187, 255, 1)",
              fontSize: 14
            },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "完成值",
            type: "bar",
            data: [2, -4, 5.5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            barWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(182, 70, 31, 1)" },
                { offset: 1, color: "rgba(248, 156, 124, 1)" }
              ])
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(114, 59, 40, 0.3)"
            }
          },
          {
            name: "计划值",
            type: "bar",
            data: [1.3, 2.1, 6.2, 1.1, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 1.2],
            barWidth: 16,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(0, 76, 214, 1)" },
                { offset: 1, color: "rgba(0, 165, 234, 1)" }
              ])
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(0, 80, 144, 0.3)"
            }
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [150, 193, 160, 180],
            symbol: "emptyCircle",
            symbolSize: 10,
            itemStyle: {
              color: "rgba(37, 255, 80, 1)"
            },
            lineStyle: {
              color: "rgba(37, 255, 80, 1)",
              width: 1
            },
            label: {
              show: true,
              position: "top",
              formatter: "{c}%",
              color: "rgba(37, 255, 80, 1)",
              fontSize: 16
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  flex-shrink: 0;
}
.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top {
    width: 100%;
    height: 442px;
    display: flex;
    gap: 20px;

    .item {
      position: relative;
      flex: 1 0;
      background: url("~@/assets/img/outer/center_item_bg.png") no-repeat center
        center;
      background-size: 100% 100%;
      padding: 30px 5px 51px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        width: 100%;
        height: 100px;
        background: url("~@/assets/img/outer/center_item_icon.png") no-repeat
          center center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0 45px;
        gap: 10px;

        .info {
          flex: 1 0;
          display: flex;
          flex-direction: column;

          .label {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #ffffff;

            span {
              flex: 1 0;
            }
          }

          .value {
            font-weight: 400;
            font-size: 36px;
            color: #1bffcc;

            span {
              font-size: 14px;
            }
          }
        }
      }

      .content {
        width: 100%;
        flex: 1 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px 0 0;
        box-sizing: border-box;

        .content_item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;

          span {
            &:nth-child(1) {
              font-size: 16px;
              color: #00ecff;
            }

            &:nth-child(2) {
              font-size: 16px;
              color: #25ff50;
            }
          }
        }
        .progress {
          width: 100%;
          flex: 1 0;

          .chart_box {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .chart {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .values {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: flex;
              flex-direction: column;
              align-items: center;

              span {
                &:nth-child(1) {
                  font-size: 24px;
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

      .arrow {
        position: absolute;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
        width: 31px;
        height: 16px;
      }
    }

    .active {
    }
  }

  .bottom {
    position: relative;
    width: 100%;
    min-height: 354px;
    flex: 1 0;
    background: url("~@/assets/img/home/box_container3.png") no-repeat center
      center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .part_container {
      width: 100%;
      height: 100%;
      display: flex;
      overflow-x: auto;
      scroll-behavior: smooth;

      .part {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 36px;
        box-sizing: border-box;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .part_title {
          position: absolute;
          top: 18px;
          font-weight: bold;
          font-size: 18px;
          color: transparent;
          line-height: 19px;
          text-align: center;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 70%,
            rgba(0, 236, 255, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .line-chart {
          width: 100%;
          height: calc(100% - 40px);
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
