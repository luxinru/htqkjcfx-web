<template>
  <div class="right2">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { api5 } from "@/api/outer";
import * as echarts from "echarts";

export default {
  name: "Right2",

  data() {
    return {
      chart: null,
      xData2: [],
      data1: [],
      data2: [],
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
      api5().then(res => {
        this.xData2 = res.xData2;
        this.data1 = res.data1;
        this.data2 = res.data2;
        this.initChart();
      });
    },
    initChart() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      this.chart = echarts.init(this.$refs.chart);

      var barWidth = 30;
      var option = {
        tooltip: {
          trigger: "item"
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "5%",
          bottom: "15%"
        },
        xAxis: {
          data: this.xData2,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#005090"
            }
          },
          axisLabel: {
            interval: 0,
            margin: 16,
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#005090"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#005090"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#00BBFF",
              fontSize: 14
            }
          }
        },
        series: [
          {
            // 上半截柱子
            name: "2019",
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            z: 0,
            silent: true, // 禁用该系列的鼠标交互
            itemStyle: {
              color: "#163F7A",
              opacity: 0.7
            },
            data: this.data2
          },
          {
            //下半截柱子
            name: "",
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function(params) {
                if (params.dataIndex === 0) {
                  // 第一个柱子保持原来的橙色
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#E18537" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#E18537" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else {
                  // 后面三个柱子使用新的蓝色渐变
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#1570DF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#40AFF6" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                }
              }
            },
            data: this.data1
          },
          {
            // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            stack: "广告",
            itemStyle: {
              color: "transparent"
            },
            silent: true, // 禁用该系列的鼠标交互
            data: this.data1
          },
          {
            //上半截柱子顶部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 15],
            symbolOffset: [0, -5],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "#163F7A",
              opacity: 1
            },
            label: {
              show: false
            },
            silent: true, // 禁用该系列的鼠标交互
            data: this.data2
          },
          {
            //下半截柱子顶部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function(params) {
                if (params.dataIndex === 0) {
                  // 第一个柱子保持原来的橙色
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#F2B563" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#F2B563" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else {
                  // 后面三个柱子使用新的蓝色渐变
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#40AFF6" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#40AFF6" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                }
              }
            },
            label: {
              show: true,
              position: "top",
              fontSize: 16,
              color: "#fff"
              // formatter:(item)=>{
              //     console.log(item)
              //     return 'ssss'
              // }
            },
            symbolPosition: "end",
            data: this.data1,
            silent: true // 禁用该系列的鼠标交互
          },
          {
            //下半截柱子底部圆片
            name: "",
            type: "pictorialBar",
            symbolSize: [barWidth, 15],
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: {
              opacity: 1,
              color: function(params) {
                if (params.dataIndex === 0) {
                  // 第一个柱子保持原来的橙色渐变
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#FF9A22" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFD56E" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                } else {
                  // 后面三个柱子使用蓝色渐变
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#1570DF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#40AFF6" // 100% 处的颜色
                      }
                    ],
                    false
                  );
                }
              }
            },
            data: [1, 1, 1, 1, 1],
            silent: true // 禁用该系列的鼠标交互
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.right2 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
