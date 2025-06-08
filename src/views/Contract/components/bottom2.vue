<template>
  <div class="bottom2">
    <section class="tabs">
      <div class="tab" :class="{ active: active === 1 }" @click="active = 1">
        合同总金额(含税)
      </div>
      <div class="tab" :class="{ active: active === 2 }" @click="active = 2">
        合同数量
      </div>
      <div class="tab" :class="{ active: active === 3 }" @click="active = 3">
        客户数量
      </div>
    </section>

    <section class="chart_box">
      <img class="bac" src="~@/assets/img/contract/icon13.png" alt="" />
      <div ref="chart" class="chart"></div>
    </section>
  </div>
</template>

<script>
import * as echarts from "echarts";
import geoJson from "./China.json";

export default {
  name: "bottom2",

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
      // var geoJson = echarts.getMap('china').geoJson.features; // 已引入china.js可不使用请求json的方式，直接使用此方法
      echarts.registerMap("China", geoJson);

      var data = [],
        geoCoordMap = {};
      geoJson.features.forEach(function(v) {
        geoCoordMap[v.properties.name] = v.properties.center;
        data.push({
          name: v.properties.name,
          value: Math.round(Math.random() * 100) // 添加随机值以便显示不同颜色
        });
      });

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      const option = {
        tooltip: {
          show: true, // 显示提示框
          trigger: "item",
          formatter: function(params) {
            return params.name + "<br/>数量：" + params.value;
          }
        },
        visualMap: {
          show: false,
          seriesIndex: [0],
          min: 0,
          max: 100,
          calculable: true,
          inRange: {
            color: [
              "rgba(28, 160, 255, 1)",
              "rgba(0, 90, 182, 1)",
              "rgba(0, 50, 111, 1)"
            ] // 设置渐变色范围
          }
        },
        geo: [
          {
            show: true,
            map: "China",
            zoom: 1,
            roam: false,
            layoutCenter: ["52.5%", "51%"], // 设置地图位置居中
            layoutSize: "128%" // 控制地图大小，占容器的百分比
          }
        ],
        series: [
          {
            type: "map",
            mapType: "China", //自定义扩展图表类型
            zoom: 1,
            roam: false,
            layoutCenter: ["52.5%", "51%"], // 设置地图位置居中
            layoutSize: "128%", // 控制地图大小，占容器的百分比
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#0A2E66",
                borderWidth: 0
              },
              emphasis: {
                areaColor: "#32A4FF"
              }
            },
            data: data
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom2 {
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 0;
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
    width: 100%;
    flex: 1 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .bac {
      height: 100%;
      aspect-ratio: 659 / 479;
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
