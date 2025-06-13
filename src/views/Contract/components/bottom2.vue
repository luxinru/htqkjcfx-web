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

    <section v-if="contractType === 1" class="chart_box">
      <img class="bac" src="~@/assets/img/contract/icon13.png" alt="" />
      <div ref="chart" class="chart"></div>
    </section>

    <section v-if="contractType === 2" class="chart_box">
      <!-- <img class="bac" src="~@/assets/img/contract/word_bac.png" alt="" /> -->
      <div ref="chart" class="chart"></div>
    </section>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinaGeoJson from "./China.json";
import worldGeoJson from "./world.json";

export default {
  name: "bottom2",

  data() {
    return {
      active: 1,
      chart: null,
      contractType: 1
    };
  },

  mounted() {
    this.init();

    this.$EventBus.$on("orgChange", org => {
      this.init();
    });
  },

  methods: {
    init() {
      this.initChina();
      // this.initWorld();

      this.$EventBus.$off("updateContractType");

      this.$EventBus.$on("updateContractType", type => {
        this.contractType = type;
        if (type === 1) {
          this.initChina();
        } else {
          this.initWorld();
        }
      });
    },

    initChina() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      this.chart = echarts.init(this.$refs.chart);
      // var geoJson = echarts.getMap('china').geoJson.features; // 已引入china.js可不使用请求json的方式，直接使用此方法
      echarts.registerMap("China", chinaGeoJson);

      var data = [],
        geoCoordMap = {};
      chinaGeoJson.features.forEach(function(v) {
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
    },

    initWorld() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      this.chart = echarts.init(this.$refs.chart);
      echarts.registerMap("World", worldGeoJson);

      var data = [],
        geoCoordMap = {};
      worldGeoJson.features.forEach(function(v) {
        geoCoordMap[v.properties.name] = v.properties.center;
        var item = {
          name: v.properties.name,
          value: Math.round(Math.random() * 100) // 添加随机值以便显示不同颜色
        };

        // 为中国设置特殊样式
        if (v.properties.name === "China" || v.properties.name === "中国") {
          item.itemStyle = {
            areaColor: "#32A4FF" // 高亮颜色
          };
        }

        data.push(item);
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

      // 生成4个固定点
      var generateRandomPoints = function() {
        var points = [
          {
            name: "中国",
            value: [104.195397, 35.86166, 100] // 中国中心坐标
          },
          {
            name: "刚果",
            value: [21.758664, -4.038333, 80] // 刚果中心坐标
          },
          {
            name: "英国",
            value: [-3.435973, 55.378051, 90] // 英国中心坐标
          },
          {
            name: "美国",
            value: [-95.712891, 37.09024, 110] // 美国中心坐标
          }
        ];
        return points;
      };

      var randomPoints = generateRandomPoints();

      const option = {
        tooltip: {
          show: true, // 显示提示框
          trigger: "item",
          formatter: function(params) {
            return params.name + "<br/>数量：" + params.value;
          }
        },
        geo: [
          {
            show: true,
            map: "World",
            zoom: 1,
            roam: false,
            layoutCenter: ["50%", "50%"], // 设置地图位置居中
            layoutSize: "150%" // 控制地图大小，占容器的百分比
          }
        ],
        series: [
          {
            type: "map",
            mapType: "World", //自定义扩展图表类型
            zoom: 1,
            roam: false,
            layoutCenter: ["50%", "50%"], // 设置地图位置居中
            layoutSize: "150%", // 控制地图大小，占容器的百分比
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                areaColor: "rgba(0, 90, 182, 1)",
                borderWidth: 0
              },
              emphasis: {
                areaColor: "#32A4FF"
              }
            },
            data: data
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAABHNCSVQICAgIfAhkiAAABPhJREFUSEu1lGtsFFUUx8+87sw+Zt/bdlfKUqClDwEBFasgFQmPIEkjKRgVkQSqIsWYaFAwsTFqCO8oPuiHptQvKhqDqAjxQ4kSHlGj2NIWujza0nbbLd3Zx+zO83oXJClSY6lyJ5PJnJl7fvf/v+dcCu7QSO+AkI6t6/ozYoGFUi78ks75+GDkYYq6Ezy9zveEjiwrgOPnYJrxZ5IKnIqN0472zrjvfwVm9uVM4jy+lzTePg9s9jIODKa9CyBlpkEw451vHZk6cVRA+fgz5emk+oAycL5lwbvpprNnz2rEGTzcHf3T0jWmO7jasLtmIJfLkbyahOZ2GXJdlyHoisOF8/zeu19oqxkVMP31Y+PNktk/amJgvBLpMsMnTqb4ZG8HaPrBXnPcl4vLuVcMMTCH8uVN4DiW6Wjrh6HuMBR4u8Hn1mBAsujbvy3K3/7hgb5RAbNK9J/X7JedE1aKHjt/9WIbaFIHJCQMUorHGcpluMZNYV1+J1xpOwde3AwhdwJMjgHEAbR3oNbiVafKsq6MGpj5Zu4iLWfyHj4vUIzlOJhSKwisAWAYoBsUJFIMDMkc+IUk2AUDVGI6a0MgZ2gId8CmGWuPbcsufNTA7L/ykYoDhi+01EJlhFRGAYegkLBJoOTGZEtNE7BJnuQ9gxFYrAxEBrG2/WgouHNnXfR2gaB+Vrw6YfVvdnptRUkZwOa1AQP69VUTpdlhagbhUmCyPHCIgXOtyT+Kn/x+2o0Cux2F0Ptent9q5XexOb4qGhuMllfCiFaSwiQwIpLIA0zUKRoFyGaDVAbg9zOxZ+euO9g4JmB2krKNWSkJgS1eh1oY9czk/BODNEU6BOvXbc0q1FkBeF7AvRFF3tyo5zc0NMTGDMzsFiZqKvWy4LGtStEeBt270GrhCIzsXVadnnUW2YGmGdza3PvD1BWfLB7er7dl6V8TKXUrvcG0OasZgQ0MFSxy+PPzGJzdQ1IvaYUCi+jCCRmbJ4+1LF+08fND/xUI0tvc/ciKNiA7/+iQvcwqTp/nIC13zVaVtmJBsJldnZGrtY39hfX19YmbgNXV1dZgMKjW1tbqIxzkNIkx5DvXk05zosXPGWoaPVgqOHcviT8X8tCVumogunytTxSttG5goJEXA8sZLb+2fnHP47ue/ntOqqamhk8kEha3201Ho1Glq6tLaWpqov1+PxpQVc7Ge5Cp08hkKYRZmuNohDDFoUOvOZeXBdSlIo7nSGg6n1s8067oDAhijhlLqObxY7/NX/b8nhO3AG8EiEJakiS+u7vbPjiYsnb2R9i4pICUlhmOFTiF5hBLLs3AiOV4tGGZrWR9ZegpHx0tUmKyzk1a5hbsXowEh3mp4+KlrY3Ns+rq6ki33jxGLJosPBwOWy5HYjmRWMYrSbKY1DGlmRQDbFYhhRgG8af3Tdt4lxsX0vE+Jqnn07lFFeRQo42WUycbZlW+8eIIW/TvR1tVVRUzoGniQJQKJRRzfFzBHg0ztGoCu//1soXzZ+fOtTMpMdY9IPumVNniCdk4/NWBh1a/+tGZMQGHT8rC2yXBG1dxqayxxUE/Kjj8/pI1TovpUKR+4vbkdGxQCq/dtPcRUgfknLl1jKUPr2WpqKhgo6g0ULelfEdJYe4CwcaJfeGeniud0v45levfHAmWjY0ZODwhxpi6cvqDpT0Jdsl3P/W9Q2qg55+AfwLz8Sz/kEJOMAAAAABJRU5ErkJggg==",
            symbolSize: 20,
            data: randomPoints,
            itemStyle: {
              color: "#ffffff"
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
