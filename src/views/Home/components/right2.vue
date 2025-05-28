<template>
  <div class="right2">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Right2",

  data() {
    return {
      chart: null
    };
  },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);

      var xData2 = ["总数", "正常", "滞后", "需要关注"];
      var data1 = [32, 27, 13, 10];
      var data2 = [40, 40, 40, 40];
      var barWidth = 30;
      var option = {
        backgroundColor: "#021132",
        tooltip: {
          trigger: "item"
        },
        grid: {
          left: 0,
          bottom: 0
        },
        xAxis: {
          data: xData2,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#fff",
              fontSize: 16
            },
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 16
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
            itemStyle: {
              color: "#163F7A",
              opacity: 0.7
            },
            data: data2
          },
          {
            //下半截柱子
            name: "2020",
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function(params) {
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
              }
            },
            data: data1
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
            data: data1
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
            data: data2
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
            data: data1
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
              }
            },
            data: [1, 1, 1, 1, 1]
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
