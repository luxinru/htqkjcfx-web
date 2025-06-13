<template>
  <div class="bottom5">
    <span class="title">
      新签客户合同额
    </span>
    <section class="container_box">
      <div class="chart_box">
        <div ref="chart" class="chart"></div>
        <div class="values">
          <span>{{ (totalAmount / 10000).toFixed(2) }}</span>
          <span>
            亿元
          </span>
        </div>
      </div>

      <div class="list">
        <div class="item" v-for="item in list" :key="item.name">
          <div class="labels">
            <span>
              {{ item.name }}
            </span>
            <span> {{ item.value }}万元 </span>
          </div>
          <progress-bar :value="item.percent" :color="item.color" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/new/contract";
import * as echarts from "echarts";
import progressBar from "@/components/progress-bar/index.vue";

export default {
  name: "bottom5",
  components: {
    progressBar
  },

  data() {
    return {
      chart: null,
      list: [],
      totalAmount: 0
    };
  },

  async mounted() {
    await this.queryKhlxfx();
    this.init();

    
    this.$EventBus.$on("orgChange", async org => {
      await this.queryKhlxfx();
      this.init();
    });
  },

  methods: {
    async queryKhlxfx() {
      const res = await api.queryKhlxfx({
        dwbm: localStorage.getItem("org") || "6B51EA03CC8C4168876E3EA97A29B15E",
        time: "2024-11"
      });

      if (res && Array.isArray(res)) {
        // 计算总金额
        this.totalAmount = res.reduce((sum, item) => sum + item.xqyhhte, 0);

        // 处理数据
        this.list = res.map(item => {
          const percent = ((item.xqyhhte / this.totalAmount) * 100).toFixed(2);
          return {
            value: item.xqyhhte,
            name: item.type,
            color: this.getColorByType(item.type),
            percent: parseFloat(percent)
          };
        });
      }
    },

    getColorByType(type) {
      const colorMap = {
        地方国有企业: "rgba(232, 100, 82, 1)",
        民营企业: "rgba(91, 143, 249, 1)",
        事业单位: "rgba(232, 100, 82, 1)",
        个体工商户: "rgba(148, 95, 185, 1)",
        其他: "rgba(246, 189, 22, 1)"
      };
      return colorMap[type] || "rgba(246, 189, 22, 1)";
    },

    init() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      this.chart = echarts.init(this.$refs.chart);

      const list = this.list;

      const option = {
        tooltip: {
          trigger: "item",
          confine: true
        },
        legend: {
          show: false
        },
        series: [
          {
            name: "新签客户合同额",
            type: "pie",
            radius: ["60%", "90%"],
            center: ["50%", "50%"],
            data: list.map(item => ({
              value: item.percent,
              name: item.name,
              itemStyle: {
                color: item.color,
                borderWidth: 6,
                borderColor: "#0A1B3D"
              }
            })),
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom5 {
  width: 100%;
  height: 100%;
  padding: 16px 40px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: normal;
    font-size: 16px;
    color: #ffffff;
  }

  .container_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .chart_box {
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

    .values {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        color: #ffffff;
        &:nth-child(1) {
          font-weight: normal;
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }

  .list {
    width: 421px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;

    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .labels {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
