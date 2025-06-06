<template>
  <div ref="container" class="pie-container"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { SurfaceChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([SurfaceChart, Grid3DComponent, CanvasRenderer]);

export default {
  name: "Pie",
  data() {
    return {
      echartData: [
        {
          value: 43,
          name: "中核医疗"
        },
        {
          value: 17,
          name: "智慧能源"
        },
        {
          value: 16,
          name: "核技术应用"
        },
        {
          value: 14,
          name: "其他"
        },
        {
          value: 10,
          name: "数字信息"
        }
      ]
    };
  },

  mounted() {
    this.seriesData = this.echartData.map((item, index) => {
      return {
        ...item,
        // value: Math.sqrt(item.value).toFixed(0) * 100,
        actValue: item.value,
        label: {
          show: true,
          position: "outside",
          borderRadius: 5,
          padding: [0, 5, 3, -3],
          fontSize: 14
        }
      };
    });

    this.option = this.getPie3D(this.seriesData, 0);

    this.$nextTick(() => {
      this.initEchart();
    });
  },

  methods: {
    initEchart() {
      if (this.echart) {
        this.echart.dispose();
        this.echart = null;
      }
      this.echart = echarts.init(this.$refs.container);
      this.echart.setOption(this.option);

      // 添加点击事件处理
      this.echart.on("click", params => {
        if (params.seriesType === "surface") {
          const series = this.option.series;
          series.forEach((item, index) => {
            if (item.type === "surface") {
              const isSelected = index === params.seriesIndex;
              item.pieStatus.selected = isSelected;
              item.parametricEquation = this.getParametricEquation(
                item.pieData.startRatio,
                item.pieData.endRatio,
                isSelected,
                false,
                item.pieStatus.k,
                10
              );
            }
          });
          this.echart.setOption(this.option);
        }
      });
    },

    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      const midRatio = (startRatio + endRatio) / 2;
      const startRadian = startRatio * Math.PI * 2;
      const endRadian = endRatio * Math.PI * 2;
      const midRadian = midRatio * Math.PI * 2;

      // 如果只有一个扇形，则不实现选中效果
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }

      k = typeof k !== "undefined" ? k : 1 / 3;
      // 修改偏移量，增加展开距离
      const offsetX = isSelected ? Math.cos(midRadian) * 0.5 : 0;
      const offsetY = isSelected ? Math.sin(midRadian) * 0.5 : 0;
      const hoverRate = isHovered ? 1.05 : 1;

      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        x: function(u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function(u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function(u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 40 : -1;
        }
      };
    },

    getPie3D(pieData, internalDiameterRatio) {
      const series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      const legendData = [];
      const k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;
      for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value;
        const seriesItem = {
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: {
            show: false
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k
          },
          label: {
            show: true,
            position: 'outside',
            formatter: params => {
              return `${params.name} ${params.data.actValue}%`;
            },
            color: '#fff',
            fontSize: 12,
            distance: 80,
            alignTo: 'edge',
            edgeDistance: '10%'
          },
          labelLine: {
            show: true,
            length: 80,
            length2: 30,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        };
        if (typeof pieData[i].itemStyle !== "undefined") {
          seriesItem.itemStyle = {
            color: pieData[i].itemStyle.color,
            opacity: pieData[i].itemStyle.opacity
          };
        }
        series.push(seriesItem);
      }
      for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          i === 3,
          false,
          k,
          10
        );
        startValue = endValue;
        legendData.push(series[i].name);
      }

      series.push({
        name: "其他",
        type: "pie",
        label: {
          show: true,
          position: "outside",
          opacity: 1,
          formatter: params => {
            return `${params.name} ${params.data.actValue}%`;
          },
          color: "#fff",
          fontSize: 12,
          distanceToLabelLine: 5,
          alignTo: 'edge',
          edgeDistance: '10%'
        },
        labelLine: {
          show: true,
          length: 80,
          length2: 30,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          smooth: true
        },
        startAngle: 240,
        clockwise: false,
        radius: ["0%", "100%"],
        center: ["50%", "50%"],
        data: pieData,
        itemStyle: {
          opacity: 0
        },
        zlevel: -1,
        silent: true
      });

      // 准备待返回的配置项，把准备好的series 传入。
      const option = {
        title: {
          show: false
        },
        // legend: {
        //   show: false,
        // },
        tooltip: {
          trigger: "item",
          formatter: params => {
            const item = pieData.find(d => d.name === params.seriesName);
            if (item) {
              return `${params.marker}${item.name}：${item.value}%`;
            }
            return params.seriesName;
          }
        },
        xAxis3D: {
          min: -1,
          max: 1
        },
        yAxis3D: {
          min: -1,
          max: 1
        },
        zAxis3D: {
          min: -1,
          max: 1
        },
        grid3D: {
          show: false,
          top: '-10%',
          boxHeight: 1,
          viewControl: {
            alpha: 25,
            beta: 85,
            rotateSensitivity: 5,
            zoomSensitivity: 1,
            panSensitivity: 1,
            autoRotate: false,
            distance: 200
          }
        },
        series
      };
      return option;
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
