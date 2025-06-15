<template>
  <div class="pie-container">
    <div ref="container" class="pie-container-inner"></div>
  </div>
</template>

<script>
export default {
  name: "Pie",
  data() {
    return {
      chartOptions: {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 70,
            beta: 0
          },
          backgroundColor: "transparent",
          margin: [0, 0, 0, 0]
        },
        title: {
          text: ""
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 35,
            dataLabels: {
              enabled: true,
              format: "{point.name}: {point.y}%",
              style: {
                color: "#fff",
                fontSize: "14px"
              }
            }
          }
        },
        series: [
          {
            type: "pie",
            name: "占比",
            data: [
              {
                name: "中核医疗",
                y: 43,
                color: "#5470c6"
              },
              {
                name: "智慧能源",
                y: 17,
                color: "#91cc75"
              },
              {
                name: "核技术应用",
                y: 16,
                color: "#fac858"
              },
              {
                name: "其他",
                y: 14,
                color: "#ee6666"
              },
              {
                name: "数字信息",
                y: 10,
                color: "#73c0de"
              }
            ]
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  },
  mounted() {
    this.waitForHighcharts();
  },
  methods: {
    waitForHighcharts() {
      if (window.Highcharts) {
        this.initChart();
      } else {
        setTimeout(() => {
          this.waitForHighcharts();
        }, 100);
      }
    },
    initChart() {
      if (!window.Highcharts) {
        console.error("Highcharts not loaded");
        return;
      }
      window.Highcharts.chart(this.$refs.container, this.chartOptions);
    }
  }
};
</script>

<style lang="scss" scoped>
.pie-container {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
