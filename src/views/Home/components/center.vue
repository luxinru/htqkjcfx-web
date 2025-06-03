<template>
  <div class="center">
    <section class="top">
      <div
        class="item"
        v-for="card in topCards"
        :key="card.id"
        :class="{ active: active === card.id }"
        @click="onChangeActive(card.id)"
      >
        <div class="title">
          <img v-if="active === card.id" :src="card.iconActive" alt="" />
          <img v-else :src="card.icon" alt="" />

          <div class="info">
            <div class="label">
              <span>
                {{ card.title }}
              </span>

              <img
                v-if="active === card.id"
                src="@/assets/img/home/select_active.png"
                alt=""
              />
              <img v-else src="@/assets/img/home/select.png" alt="" />
            </div>

            <div class="value">
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
          <div class="content_item">
            <div class="progress">
              <div class="labels">
                <span>
                  计划完成率
                </span>
                <span> {{ card.planRate }}% </span>
              </div>
              <div class="bar">
                <div class="val" :style="{ width: card.planRate + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="content_item">
            <span> 年度计划值：{{ card.planValue }} </span>
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
      <div
        ref="partContainer"
        class="part_container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="part" v-show="active === 1 || active === 3">
          <div class="part_title">
            主要产业集团外累计新签合同占比
          </div>
          <div class="pie-chart">
            <Pie />
          </div>
        </div>
        <div class="part" v-show="active === 2">
          <div class="part_title">
            主要产业利润总额情况
          </div>
          <div ref="chart2" class="pie-chart"></div>
        </div>
        <div class="part">
          <div class="tech-table">
            <div class="table-header">
              <h3 class="main-title">主要单位集团外营业收入情况</h3>
              <span class="sub-title">单位：亿元</span>
            </div>
            <div class="table-container">
              <table class="header-table">
                <thead>
                  <tr>
                    <th>责任单位</th>
                    <th>{{ date }}累计</th>
                    <th>{{ date }}计划</th>
                    <th>完成率</th>
                    <th>上年同期</th>
                    <th>增长额</th>
                    <th>增长率</th>
                  </tr>
                </thead>
              </table>
              <div class="table-body">
                <table class="body-table">
                  <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ item.currentValue }}</td>
                      <td>{{ item.planValue }}</td>
                      <td>{{ item.completionRate }}</td>
                      <td>{{ item.lastYearValue }}</td>
                      <td>{{ item.growthValue }}</td>
                      <td>{{ item.growthRate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        class="icon icon_left"
        src="@/assets/img/home/arrow_icon.png"
        alt=""
        @click="handleScroll('left')"
      />
      <img
        class="icon icon_right"
        src="@/assets/img/home/arrow_icon.png"
        alt=""
        @click="handleScroll('right')"
      />
    </section>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Pie from "./pie.vue";
import { api2 } from "@/api/outer";
import { api6, api7, api8 } from "@/api/home";

export default {
  name: "Center",

  components: {
    Pie
  },

  data() {
    return {
      active: 1,
      partContainer: null,
      chart: null,
      chart2: null,
      pieChart: null,
      autoScrollTimer: null,
      isHovering: false,
      autoHighlightTimer: null,
      autoRotateTimer: null,
      date:
        new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月",
      topCards: [],
      pieChartData: [],
      barChartData: [],
      tableData: []
    };
  },

  mounted() {
    this.init();

    this.partContainer = this.$refs.partContainer;
    this.$nextTick(() => {
      // this.initPieChart();
      this.initChart2();
      this.initTableData();
      // this.startAutoScroll();
    });

    this.$EventBus.$on("updateDate", date => {
      this.date = date;

      this.init();

      this.partContainer = this.$refs.partContainer;
      this.$nextTick(() => {
        // this.initPieChart();
        this.initChart2();
        this.initTableData();
        // this.startAutoScroll();
      });
    });
  },

  methods: {
    init() {
      api2().then(res => {
        this.topCards = res;
      });
    },

    async initTableData() {
      try {
        this.tableData = await api8();
      } catch (error) {
        console.error("获取表格数据失败:", error);
      }
    },

    onChangeActive(index) {
      this.active = index;
      this.$nextTick(() => {
        if (index === 1) {
          this.initPieChart();
        } else if (index === 2) {
          this.initChart2();
        }
      });
    },

    handleScroll(direction) {
      const containerWidth = this.partContainer.clientWidth;
      const currentScroll = this.partContainer.scrollLeft;

      let targetScroll;
      if (direction === "left") {
        targetScroll = Math.max(0, currentScroll - containerWidth);
      } else if (direction === "right") {
        const maxScroll = this.partContainer.scrollWidth - containerWidth;
        targetScroll = Math.min(maxScroll, currentScroll + containerWidth);
      } else {
        targetScroll = (direction - 1) * containerWidth;
      }

      this.partContainer.scrollLeft = targetScroll;
    },

    async initPieChart() {
      if (!this.$refs.pieChart) return;

      if (this.pieChart) {
        this.pieChart.dispose();
        this.pieChart = null;
      }

      try {
        // 获取饼图数据
        const pieData = await api6();
        this.pieChartData = pieData.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              1,
              item.itemStyle.color.colorStops
            )
          }
        }));

        this.pieChart = echarts.init(this.$refs.pieChart);

        const option = {
          tooltip: {
            trigger: "item",
            backgroundColor: "rgba(0, 20, 40, 0.95)",
            borderColor: "#00ECFF",
            borderWidth: 2,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 500
            },
            formatter: function(params) {
              return `<div style="padding: 8px;">
                          <div style="color: #00ECFF; font-weight: bold; margin-bottom: 5px;">${params.name}</div>
                          <div>金额: <span style="color: #1BFFCC;">${params.value}亿元</span></div>
                          <div>占比: <span style="color: rgba(182, 70, 31, 1);">${params.percent}%</span></div>
                        </div>`;
            }
          },
          legend: {
            show: false
          },
          series: [
            {
              name: "新签合同",
              type: "pie",
              radius: ["35%", "75%"],
              center: ["50%", "55%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 0,
                borderColor: "rgba(0, 236, 255, 0.3)",
                borderWidth: 1,
                shadowBlur: 15,
                shadowColor: "rgba(0, 236, 255, 0.4)"
              },
              label: {
                show: true,
                position: "outside",
                formatter: function(params) {
                  return `{name|${params.name}}\n{value|${params.value}亿元}\n{percent|${params.percent}%}`;
                },
                rich: {
                  name: {
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: 18
                  },
                  value: {
                    color: "#1BFFCC",
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 16
                  },
                  percent: {
                    color: "rgba(182, 70, 31, 1)",
                    fontSize: 11,
                    fontWeight: 500,
                    lineHeight: 14
                  }
                },
                distance: 20
              },
              labelLine: {
                show: true,
                length: 15,
                length2: 8,
                lineStyle: {
                  color: "#00ECFF",
                  width: 1.5,
                  type: "solid"
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 25,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 236, 255, 0.8)",
                  borderWidth: 2,
                  borderColor: "#00ECFF"
                },
                label: {
                  fontSize: 16,
                  fontWeight: 700
                },
                labelLine: {
                  lineStyle: {
                    width: 2,
                    color: "#1BFFCC"
                  }
                }
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              },
              data: this.pieChartData
            }
          ]
        };

        this.pieChart.setOption(option);

        this.autoRotateTimer = setInterval(() => {
          if (this.pieChart) {
            this.pieChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: Math.floor(Math.random() * this.pieChartData.length)
            });
          }
        }, 3000);

        this.pieChart.on("mouseover", () => {
          if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
          }
        });

        this.pieChart.on("mouseout", () => {
          if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
          }
          this.autoRotateTimer = setInterval(() => {
            if (this.pieChart) {
              this.pieChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: Math.floor(Math.random() * this.pieChartData.length)
              });
            }
          }, 3000);
        });

        window.addEventListener("resize", () => {
          if (this.pieChart) {
            this.pieChart.resize();
          }
        });
      } catch (error) {
        console.error("初始化饼图失败:", error);
      }
    },

    async initChart2() {
      if (!this.$refs.chart2) return;

      if (this.chart2) {
        this.chart2.dispose();
        this.chart2 = null;
      }

      try {
        // 获取柱状图数据
        this.barChartData = await api7();

        this.chart2 = echarts.init(this.$refs.chart2);
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            backgroundColor: "rgba(0, 20, 40, 0.95)",
            borderColor: "rgba(0, 76, 214, 1)",
            borderWidth: 2,
            textStyle: {
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 500
            },
            formatter: params => {
              const param = params[0];
              const d = this.barChartData[param.dataIndex];
              return `<div style="padding: 8px;">
                          <div style="color: rgba(125, 220, 255, 1); font-weight: bold; margin-bottom: 5px;">${d.name}</div>
                          <div style="color: rgba(125, 220, 255, 1);">本期：<span style="color: #fff;">${d.benqi}</span></div>
                          <div style="color: rgba(125, 220, 255, 1);">占比率：<span style="color: #fff;">${d.rate}</span></div>
                        </div>`;
            }
          },
          grid: {
            left: "5%",
            right: "5%",
            top: "16%",
            bottom: "2%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: this.barChartData.map(d => d.name),
            axisLine: {
              lineStyle: {
                color: "rgba(0, 187, 255, 1)",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#FFFFFF",
              fontSize: 16,
              interval: 0,
              margin: 18
            }
          },
          yAxis: {
            type: "value",
            min: -8,
            name: "单位（亿元）",
            nameTextStyle: {
              color: "rgba(0, 187, 255, 1)",
              fontSize: 16,
              padding: [0, 0, 0, 0]
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0, 187, 255, 1)",
                width: 1,
                type: "dashed"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "rgba(0, 187, 255, 1)",
              fontSize: 14,
              formatter: "{value}"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0,236,255,0.15)",
                width: 1,
                type: "dashed"
              }
            }
          },
          series: [
            {
              name: "利润总额",
              type: "bar",
              barWidth: "38%",
              data: this.barChartData.map((d, idx) => ({
                value: d.value,
                itemStyle: {
                  color:
                    d.value >= 0
                      ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: "rgba(0, 76, 214, 1)" },
                          { offset: 1, color: "rgba(0, 165, 234, 1)" }
                        ])
                      : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: "rgba(182, 70, 31, 1)" },
                          { offset: 1, color: "rgba(248, 156, 124, 1)" }
                        ])
                },
                label: {
                  show: true,
                  position: d.value >= 0 ? "top" : "bottom",
                  formatter: d.value,
                  color:
                    d.value >= 0
                      ? "rgba(0, 236, 255, 1)"
                      : "rgba(255, 254, 112, 1)",
                  fontSize: 16,
                  offset: [0, d.value >= 0 ? -8 : 8]
                }
              })),
              animationDelay: function(idx) {
                return idx * 200;
              },
              animationEasing: "elasticOut"
            }
          ]
        };
        this.chart2.setOption(option);
        this.chart2.resize();

        this.autoHighlightTimer = setInterval(() => {
          if (this.chart2) {
            this.chart2.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: Math.floor(Math.random() * this.barChartData.length)
            });
          }
        }, 2500);

        this.chart2.on("mouseover", () => {
          if (this.autoHighlightTimer) {
            clearInterval(this.autoHighlightTimer);
          }
        });

        this.chart2.on("mouseout", () => {
          if (this.autoHighlightTimer) {
            clearInterval(this.autoHighlightTimer);
          }
          this.autoHighlightTimer = setInterval(() => {
            if (this.chart2) {
              this.chart2.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: Math.floor(Math.random() * this.barChartData.length)
              });
            }
          }, 2500);
        });

        window.addEventListener("resize", () => {
          if (this.chart2) {
            this.chart2.resize();
          }
        });
      } catch (error) {
        console.error("初始化柱状图失败:", error);
      }
    },

    startAutoScroll() {
      if (this.autoScrollTimer) {
        clearInterval(this.autoScrollTimer);
      }

      this.autoScrollTimer = setInterval(() => {
        if (!this.isHovering && this.partContainer) {
          const containerWidth = this.partContainer.clientWidth;
          const currentScroll = this.partContainer.scrollLeft;
          const maxScroll = this.partContainer.scrollWidth - containerWidth;

          if (currentScroll >= maxScroll) {
            this.partContainer.scrollLeft = 0;
          } else {
            this.partContainer.scrollLeft = currentScroll + containerWidth;
          }
        }
      }, 5 * 1000);
    },

    handleMouseEnter() {
      this.isHovering = true;
    },

    handleMouseLeave() {
      this.isHovering = false;
    }
  },

  beforeDestroy() {
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
    }
    window.removeEventListener("resize", this.resizeHandler);
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
    height: 240px;
    display: flex;
    gap: 15px;

    .item {
      position: relative;
      flex: 1 0;
      background: url("~@/assets/img/home/center_bg1.png") no-repeat center
        center;
      background-size: 100% 100%;
      padding: 20px 25px 20px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;

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

            img {
              cursor: pointer;
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
          flex: 1 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          box-sizing: border-box;

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

          .progress {
            width: 100%;
            display: flex;
            flex-direction: column;

            .labels {
              display: flex;
              align-items: center;
              justify-content: space-between;

              span {
                font-size: 16px;
                color: #ffffff;
              }
            }

            .bar {
              position: relative;
              width: 100%;
              height: 4px;
              background: rgba(0, 0, 0, 0.2);
              margin-top: 5px;

              .val {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: linear-gradient(90deg, #cf6100 0%, #fffe70 100%);
                border-radius: 2px;
                animation: progressAnimation 1.5s ease-in-out;
                transform-origin: left;
              }

              @keyframes progressAnimation {
                from {
                  transform: scaleX(0);
                }
                to {
                  transform: scaleX(1);
                }
              }
            }
          }
        }
      }

      .arrow {
        position: absolute;
        bottom: -16px;
        width: 31px;
        height: 16px;
      }
    }

    .active {
      background: url("~@/assets/img/home/center_bg1_active.png") no-repeat
        center center;
      background-size: 100% 100%;
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

        .pie-chart {
          width: 100%;
          height: calc(100% - 40px);
          margin-top: 40px;
        }
      }
    }

    .icon {
      position: absolute;
      width: 36px;
      height: 36px;
      cursor: pointer;

      &:hover {
        background: url("~@/assets/img/home/arrow_icon_active.png") no-repeat
          center center;
        background-size: 100% 100%;
      }
    }

    .icon_left {
      left: 0;
    }

    .icon_right {
      right: 0;
      transform: rotate(180deg);
    }
  }
}

.tech-table {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 15px 12px;
    border-bottom: 1px solid rgba(0, 236, 255, 0.3);
    margin-bottom: 15px;
    flex-shrink: 0;

    .main-title {
      font-size: 18px;
      font-weight: 600;
      color: #00ecff;
      text-shadow: 0 0 10px rgba(0, 236, 255, 0.5);
      margin: 0;
    }

    .sub-title {
      font-size: 14px;
      color: #ffffff;
      opacity: 0.8;
    }
  }

  .table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header-table {
      flex-shrink: 0;
      width: 100%;
      border-collapse: collapse;
      font-family: "Courier New", monospace;
      table-layout: fixed;

      thead {
        th {
          padding: 15px 8px;
          background: linear-gradient(
            90deg,
            rgba(0, 236, 255, 0.2) 0%,
            rgba(27, 255, 204, 0.2) 100%
          );
          border: 1px solid rgba(0, 236, 255, 0.5);
          font-size: 14px;
          font-weight: 600;
          color: #00ecff;
          text-align: center;
          text-shadow: 0 0 10px rgba(0, 236, 255, 0.5);
          position: relative;
          width: calc(100% / 7);

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              #00ecff 50%,
              transparent 100%
            );
          }

          &:first-child {
            border-left: 2px solid #00ecff;
          }

          &:last-child {
            border-right: 2px solid #00ecff;
            padding-right: 18px;
          }
        }
      }
    }

    .table-body {
      flex: 1;
      overflow-y: auto;

      .body-table {
        width: 100%;
        border-collapse: collapse;
        font-family: "Courier New", monospace;
        table-layout: fixed;

        tbody {
          tr {
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 236, 255, 0.2);
            cursor: pointer;

            &:hover {
              background: rgba(0, 236, 255, 0.1);
              box-shadow: 0 0 20px rgba(0, 236, 255, 0.3);
              transform: translateY(-2px);
            }

            &:nth-child(even) {
              background: rgba(27, 255, 204, 0.05);
            }

            td {
              padding: 12px;
              border: 1px solid rgba(0, 236, 255, 0.2);
              font-size: 13px;
              color: #ffffff;
              text-align: center;
              position: relative;
              width: calc(100% / 7);
              word-wrap: break-word;

              &:first-child {
                color: #1bffcc;
                font-weight: 600;
                text-shadow: 0 0 8px rgba(27, 255, 204, 0.5);
                border-left: 2px solid rgba(27, 255, 204, 0.5);
              }

              &:nth-child(4) {
                color: #25ff50;
                font-weight: 600;
                text-shadow: 0 0 8px rgba(37, 255, 80, 0.5);
              }

              &:nth-child(6),
              &:nth-child(7) {
                color: #fffe70;
                font-weight: 600;
                text-shadow: 0 0 8px rgba(255, 254, 112, 0.5);
              }

              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 2px;
                background: linear-gradient(
                  90deg,
                  transparent 0%,
                  #00ecff 50%,
                  transparent 100%
                );
                transition: all 0.3s ease;
                transform: translateX(-50%);
              }
            }

            &:hover td::after {
              width: 80%;
            }
          }
        }
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #00ecff, #1bffcc);
        border-radius: 3px;

        &:hover {
          background: linear-gradient(45deg, #1bffcc, #00ecff);
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00ecff, #1bffcc);
    border-radius: 3px;

    &:hover {
      background: linear-gradient(45deg, #1bffcc, #00ecff);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #00ecff 50%,
      transparent 100%
    );
    animation: scanLine 3s linear infinite;
    z-index: 1;
  }

  @keyframes scanLine {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(300px);
      opacity: 0;
    }
  }
}
</style>
