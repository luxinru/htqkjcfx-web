<template>
  <div class="top1">
    <section class="tabs">
      <div class="tab" :class="{ active: active === 1 }" @click="active = 1">
        年初手持
      </div>
      <div class="tab" :class="{ active: active === 2 }" @click="active = 2">
        累计新签
      </div>
      <div class="tab" :class="{ active: active === 3 }" @click="active = 3">
        期末手持合同总额
      </div>
      <div class="tab" :class="{ active: active === 4 }" @click="active = 4">
        期末手持-年初
      </div>
      <div class="tab" :class="{ active: active === 5 }" @click="active = 5">
        期末手持-新签
      </div>
    </section>

    <div class="chart_box">
      <img src="~@/assets/img/contract/icon12.png" alt="" />
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "top1",

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

      const seriesData = [
        {
          value: 1.9,
          name: "数字信息"
        },
        {
          value: 0.75,
          name: "智慧能源"
        },
        {
          value: 0.2,
          name: "核技术应用"
        },
        {
          value: 6.84,
          name: "中核医疗"
        },
        {
          value: 4.78,
          name: "其他"
        }
      ];

      // 定义一个变量 colorStops，用于存储颜色渐变的停止点
      let colorStops = [
        [
          {
            offset: 0,
            color: "rgba(20, 233, 250, 0.2)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(20, 233, 250, 1)" // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: "rgba(178, 72, 255, 0.2)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(178, 72, 255, 1)" // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: "rgba(255, 167, 36, 0.2)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(255, 167, 36, 1)" // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: "rgba(75, 232, 148, 0.2)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(75, 232, 148, 1)" // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: "rgba(45, 107, 232, 0.2)" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(45, 107, 232, 1)" // 100% 处的颜色
          }
        ]
      ];

      // 定义一个变量 option，用于存储图表的配置项
      const option = {
        // 设置提示框的显示属性
        tooltip: {
          show: false
        },

        // 设置图例的显示属性
        legend: {
          show: false
        },

        // 设置图表的系列
        series: [
          {
            name: "可转化收入额",
            type: "pie",
            // 设置饼图的半径
            radius: ["30%", "60%"],
            // 设置饼图的中心位置
            center: ["50%", "50%"],
            // 设置饼图的数据
            data: seriesData,
            // 设置标签的显示属性
            label: {
              show: true,
              formatter: "{b}: {c}亿元",
              position: "outside",
              fontSize: 16,
              color: "#ffffff",
              distanceToLabelLine: 5
            },

            // 设置图元的样式
            itemStyle: {
              // 设置图元的边框颜色
              borderColor: "rgba(27, 47, 63, 0.6)",
              // 设置图元的边框宽度
              borderWidth: 2,
              // 设置图元的颜色
              color: function(params) {
                return {
                  x: 0,
                  y: 1,
                  x2: 1,
                  y2: 0,
                  // 根据索引值从 colorStops 数组中获取颜色渐变对象
                  colorStops: colorStops[params.dataIndex] // 100% 处的颜色
                };
              }
            }
          }
        ]
      };

      this.chart.setOption(option);
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
.top1 {
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

  .chart_box {
    position: relative;
    flex: 1 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 224px;
      height: 224px;
    }

    .chart {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
