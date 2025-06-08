<template>
  <div class="top3">
    <section class="tabs">
      <div class="tab" :class="{ active: active === 1 }" @click="active = 1">
        累计新签合同额
      </div>
      <div class="tab" :class="{ active: active === 2 }" @click="active = 2">
        期末手持合同总额
      </div>
    </section>

    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "top3",

  data() {
    return {
      active: 1,
      chart: null
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      this.chart = echarts.init(this.$refs.chart);

      this.chart.setOption({
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "15%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [
            "2024.04",
            "2024.06",
            "2024.08",
            "2024.10",
            "2024.12",
            "2025.02",
            "2025.04"
          ],
          axisLine: {
            lineStyle: {
              color: "#0a4a78"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#ffffff",
            fontSize: 16
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          name: "单位（亿元）",
          nameTextStyle: {
            color: "rgba(0, 187, 255, 1)",
            fontSize: 16,
            padding: [0, 0, 0, 0]
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 80, 144, 1)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "rgba(0, 187, 255, 1)",
            fontSize: 14
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0, 80, 144, 1)",
              type: "dashed"
            }
          },
          interval: 10
        },
        series: [
          {
            name: this.active === 1 ? "累计新签合同额" : "期末手持合同总额",
            type: "line",
            data: [35, 40, 45, 45, 48, 52, 75],
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "rgba(255, 254, 112, 1)",
              borderWidth: 1,
              borderColor: "rgba(255, 254, 112, 1)"
            },
            lineStyle: {
              color: "rgba(255, 254, 112, 1)",
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(255, 254, 112, 0.30)" },
                { offset: 1, color: "rgba(255, 254, 112, 0)" }
              ])
            },
            smooth: true
          }
        ]
      });
    }
  },

  watch: {
    active() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.top3 {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .tabs {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    gap: 6px;

    .tab {
      width: max-content;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 66, 119, 0.4);
      border-radius: 5px;
      border: 1px solid #005090;
      font-weight: normal;
      font-size: 14px;
      color: #6bd8ff;
      cursor: pointer;
    }

    .active {
      background: #004277;
      border: 1px solid #707070;
      color: #ffffff;
    }
  }

  .chart {
    flex: 1 0;
    overflow: hidden;
  }
}
</style>
