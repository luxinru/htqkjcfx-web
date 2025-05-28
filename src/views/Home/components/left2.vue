<template>
  <div class="left2">
    <div class="title">
      <div class="label">
        威视、数科、能源营收
        <br />
        占集团外营收比例
      </div>
      <div class="values">
        <div class="item">
          <span class="label1">
            目标值
          </span>
          <div class="schedule">
            <div class="val"></div>
          </div>
          <span class="label2">
            58.6%
          </span>
        </div>
        <div class="item">
          <span class="label1">
            完成值
          </span>
          <div class="schedule">
            <div class="val"></div>
          </div>
          <span class="label2">
            58.6%
          </span>
        </div>
      </div>
    </div>

    <div class="progress">
      <div class="item">
        <div class="labels">
          <span>
            同方威视
          </span>
          <div>
            9.47
            <span>
              亿元
            </span>
          </div>
        </div>
        <div ref="chart1" class="chart"></div>
      </div>
      <div class="item">
        <div class="labels">
          <span>
            同方威视
          </span>
          <div>
            9.47
            <span>
              亿元
            </span>
          </div>
        </div>
        <div ref="chart2" class="chart"></div>
      </div>
      <div class="item">
        <div class="labels">
          <span>
            同方威视
          </span>
          <div>
            9.47
            <span>
              亿元
            </span>
          </div>
        </div>
        <div ref="chart3" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Left2",

  data() {
    return {
      chart1: null,
      chart2: null,
      chart3: null
    };
  },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      this.chart1 = echarts.init(this.$refs.chart1);
      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart3 = echarts.init(this.$refs.chart3);

      this.chart1.setOption(this.getOptions(0.7));
      this.chart2.setOption(this.getOptions(0.5));
      this.chart3.setOption(this.getOptions(0.4));
    },

    getOptions(val) {
      var data = ["数据一"];
      var value = [val];
      var arr = new Array(value.length).fill(1);
      var option = {
        tooltip: { show: false },
        grid: {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true
        },
        xAxis: {
          type: "value",
          min: 0,
          max: 1,
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: "category",
          inverse: true,
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: false
          },
          axisTick: { show: false },
          data: data
        },
        series: [
          {
            type: "bar",
            barWidth: "60%", // 增加柱状图宽度
            animationDuration: 2000,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(32, 255, 132, 0.2)"
                    },
                    {
                      offset: 1,
                      color: "rgba(32, 255, 132, 1)"
                    }
                  ]
                }
              }
            },
            label: {
              show: false
            },
            data: value,
            z: 0
          },
          {
            type: "bar",
            barWidth: "60%", // 增加背景柱状图宽度
            barGap: "-100%",
            animation: false,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: "rgba(0,202,255,0.2)"
              }
            },
            data: arr,
            z: 0
          },
          {
            type: "pictorialBar",
            barWidth: "60%", // 增加分割图形宽度
            symbol: "rect",
            symbolMargin: "100%",
            symbolSize: [4, "100%"],
            symbolRepeat: true,
            animation: false,
            itemStyle: {
              normal: {
                color: "#000"
              }
            },
            label: {
              show: false
            },
            data: arr,
            z: 1
          }
        ]
      };

      return option;
    }
  }
};
</script>

<style lang="scss" scoped>
.left2 {
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
        }

        .label2 {
          font-weight: 400;
          font-size: 18px;
          color: #00ecff;
        }
      }
    }
  }

  .progress {
    width: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .item {
      flex: 1 0;
      display: flex;
      flex-direction: column;

      .labels {
        flex: 1 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 16px;
          color: #ffffff;
        }

        div {
          display: flex;
          align-items: baseline;
          font-weight: 400;
          font-size: 24px;
          color: #ffffff;

          span {
            font-size: 14px;
          }
        }
      }

      .chart {
        width: 100%;
        height: 12px;
      }
    }
  }
}
</style>
