<template>
  <div class="center">
    <section class="top">
      <div
        v-for="card in topCards"
        :key="card.id"
        class="item"
        :class="{ active: active === card.id }"
        @click="onChangeActive(card.id)"
      >
        <div class="title">
          <img :src="card.icon" alt="" />

          <div class="info">
            <div class="label">
              <span>
                {{ card.title }}
              </span>
            </div>

            <div class="value" :style="{ color: card.valueColor }">
              {{ card.value }}
              <span>{{ card.unit }}</span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="content_item">
            <span>
              同比增加：{{ card.compareValue }}{{ card.compareUnit }}
            </span>
            <span> ↑{{ card.comparePercent }}% </span>
          </div>
          <div class="progress">
            <div class="chart_box">
              <div :id="'progressChart' + card.id" class="chart"></div>
              <div class="values">
                <span> {{ card.planRate }}% </span>
                <span>
                  计划完成率
                </span>
              </div>
            </div>
          </div>
          <div class="content_item">
            <span> 年度计划值：{{ card.planValue }}{{ card.unit }} </span>
          </div>
        </div>

        <img
          class="arrow"
          v-if="active === card.id"
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
import { api2, api3 } from "@/api/outer";

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
      lineChart: null,
      topCards: [],
      lineChartData: {
        xAxisData: [
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
        series: [
          {
            name: "完成值",
            data: [2, -4, 5.5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            color: {
              start: "rgba(182, 70, 31, 1)",
              end: "rgba(248, 156, 124, 1)"
            },
            background: "rgba(114, 59, 40, 0.3)"
          },
          {
            name: "计划值",
            data: [1.3, 2.1, 6.2, 1.1, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 1.2],
            color: {
              start: "rgba(0, 76, 214, 1)",
              end: "rgba(0, 165, 234, 1)"
            },
            background: "rgba(0, 80, 144, 0.3)"
          },
          {
            name: "完成率",
            data: [150, 193, 160, 180],
            color: "rgba(37, 255, 80, 1)"
          }
        ]
      }
    };
  },

  mounted() {
    this.$EventBus.$on("updateDate", date => {
      this.date = date;
    });

    this.init();
    this.initLineChartFun();

    this.$EventBus.$on("left-item-click", () => {
      this.init();
      this.initLineChartFun();
    });
  },

  methods: {
    init() {
      api2().then(res => {
        this.topCards = res;
        this.$nextTick(() => {
          this.initChart1();
          this.initChart2();
          this.initChart3();
        });
      });
    },

    initLineChartFun() {
      api3().then(res => {
        this.lineChartData = res;
        this.initLineChart();
      });
    },

    onChangeActive(index) {
      this.active = index;
    },

    initChart1() {
      const chartDom = document.getElementById("progressChart1");
      if (!chartDom) return;

      if (this.progressChart1) {
        this.progressChart1.dispose();
      }

      this.progressChart1 = echarts.init(chartDom);
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
            data: [Number(this.topCards[0]?.planRate || 0)],
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
      const chartDom = document.getElementById("progressChart2");
      if (!chartDom) return;

      if (this.progressChart2) {
        this.progressChart2.dispose();
      }

      this.progressChart2 = echarts.init(chartDom);
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
            data: [Number(this.topCards[1]?.planRate || 0)],
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
      const chartDom = document.getElementById("progressChart3");
      if (!chartDom) return;

      if (this.progressChart3) {
        this.progressChart3.dispose();
      }

      this.progressChart3 = echarts.init(chartDom);
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
            data: [Number(this.topCards[2]?.planRate || 0)],
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
              <div style="font-size:16px;margin-bottom:4px;">${tar.axisValue ||
                ""}</div>
              本期：${tar.value !== undefined ? tar.value : "-"}亿元<br/>
              计划值：${plan.value !== undefined ? plan.value : "-"}亿元<br/>
              完成率：${rate.value !== undefined ? rate.value : 0}%
            `;
          }
        },
        legend: {
          data: this.lineChartData.series.map(item => item.name),
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
            data: this.lineChartData.xAxisData,
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
        series: this.lineChartData.series.map((item, index) => {
          if (index === 2) {
            // 完成率是折线图
            return {
              name: item.name,
              type: "line",
              yAxisIndex: 1,
              data: item.data,
              symbol: "emptyCircle",
              symbolSize: 10,
              itemStyle: {
                color: item.color
              },
              lineStyle: {
                color: item.color,
                width: 1
              },
              label: {
                show: true,
                position: "top",
                formatter: "{c}%",
                color: item.color,
                fontSize: 16
              }
            };
          } else {
            // 完成值和计划值是柱状图
            return {
              name: item.name,
              type: "bar",
              data: item.data,
              barWidth: 16,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: item.color.start },
                  { offset: 1, color: item.color.end }
                ])
              },
              showBackground: true,
              backgroundStyle: {
                color: item.background
              }
            };
          }
        })
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
