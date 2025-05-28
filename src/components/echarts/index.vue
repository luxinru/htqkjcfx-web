<template>
  <div class="echarts">
    <div class="echarts" ref="echar"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts-gl";
import pieChar from "./options/pie.js";
import pieYqxmqkChar from "./options/pie-yqxmqk.js";
import gjhjyqkPieChar from "./options/gjhjyqk-pie.js";
import pieFlyChar from "./options/pie-fly.js";
import radarChar from "./options/radar";
import pie3dChar from "./options/pie-3d.js";
import lineChar from "./options/line.js";
import zdxmjclinChar from "./options/zdxmjc-line.js";
import barChar from "./options/bar.js";
import customChar from "./options/bar-custom.js";
import barsChar from "./options/bars.js";
import ydqsbarChar from "./options/ydqs-bar.js";
import wlydqsbarChar from "./options/wlydqs-bar.js";
import barChar3D from "./options/bar-3d.js";
import gaugeChar from "./options/gauge.js";
import mapChar from "./options/map.js";
import timerChar from "./options/time.js";
import funnelChar from "./options/funnel.js";
import pieSolidChar from "./options/pie-solid.js";
import ydxqlineChar from "./options/ydxq-line.js";
import cyxqBarChar from "./options/cyxq-bar.js";
import ydksqysqsLineChar from "./options/ydksqysqs-line.js";
import htzbqsfxLineChar from "./options/htzbqsfx-line.js";
import htzbcyfbqkBarChar from "./options/htzbcyfbqk-bar.js";
import zdxmjczcfbPietwoChar from "./options/zdxmjctzfb-pietwo.js";
import jjyxjcPieChar from "./options/jjyxjc-pie.js";

export default {
  props: {
    charType: String,
    charData: Array,
    xAxis: Array,
    activeMc: String,
    names: [String, Array],
    unit: String,
    islable: Boolean,
  },
  components: {},
  data() {
    return {
      char: null
    };
  },
  mounted() {
    this.init(this.charData);
    window.addEventListener("resize", this.resizeChar);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChar);
  },
  watch: {
    charData: {
      handler(newVal, oldVal) {
        this.init(newVal);
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    activeMc() {
      this.init(this.charData);
    },
    islable() {
      console.log("islable", this.islable);
      
      this.init(this.charData);
    }
  },
  methods: {
    /*
    char图初始化
     */
    init(arr) {
      if (this.char) {
        this.char.dispose();
      }
      if (arr && arr.length > 0) {
        if (!this.$refs.echar) return;
        this.char = echarts.init(this.$refs.echar);
        if (this.charType === "pie") {
          const { options } = pieChar(arr);
          this.char.setOption(options);
          this.char.on("click", params => {
            this.$emit("changeData", params.data);
          });
        } else if (this.charType === "pieyqxmqk") {
          const { options } = pieYqxmqkChar(arr);
          this.char.setOption(options);
          this.char.on("click", params => {
            this.$emit("changeData", params.data);
          });
        } else if (this.charType === "pieFly") {
          const { options } = pieFlyChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "gjhjyqkpie") {
          const { options } = gjhjyqkPieChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "jjyxjcPie") {
          const { options } = jjyxjcPieChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "zdxmjczcfbPie") {
          const { options } = zdxmjczcfbPietwoChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "radar") {
          const { options } = radarChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "char3d") {
          const { option } = pie3dChar(arr);
          this.char.setOption(option);
          this.pie3d(option);
        } else if (this.charType === "line") {
          const { options } = lineChar(arr, this.xAxis,this.activeMc,this.islable);
          // this.char.setOption(options);
          this.islabelEchar(options)
        } else if (this.charType === "zdxmjcLine") {
          const { options } = zdxmjclinChar(arr, this.xAxis, this.unit,this.islable);
          
          this.char.setOption(options);
          this.islabelEchar(options)
        } else if (this.charType === "cyxqBar") {
          // this.xAxis=[1,3,5,67778,8]
          const { options } = cyxqBarChar(arr, this.xAxis);
          this.cyxqBar(options);
        } else if (this.charType === "bars") {
          const { options } = barsChar(arr, this.xAxis);
          this.char.setOption(options);
        } else if (this.charType === "ydqsBar") {
          const { options } = ydqsbarChar(arr, this.xAxis);
          this.char.setOption(options);
        }  else if (this.charType === "wlydqsBar") {
          const { options } = wlydqsbarChar(arr, this.xAxis,this.activeMc);
          this.char.setOption(options);
        } else if (this.charType === "htzbcyfbqk-Bar") {
          const { options } = htzbcyfbqkBarChar(arr, this.xAxis, this.names);
          this.char.setOption(options);
        } else if (this.charType === "barcustom") {
          const { options } = customChar(arr, this.xAxis);
          this.char.setOption(options);
        } else if (this.charType === "ydksqysqsLine") {
          const { options } = ydksqysqsLineChar(arr, this.xAxis, this.activeMc,this.islable);
          this.char.setOption(options);
          this.islabelEchar(options)
        } else if (this.charType === "ydxqLine") {
          const { options } = ydxqlineChar(arr, this.xAxis,this.names,this.islable);
          this.char.setOption(options);
          this.islabelEchar(options)
        } else if (this.charType === "htzbqsfx") {
          const { options } = htzbqsfxLineChar(arr, this.xAxis, this.names);
          this.char.on("click", params => {
            this.$emit(
              "htzbqsfxclick",
              JSON.parse(
                JSON.stringify({
                  seriesName: params.seriesName,
                  name: params.name
                })
              )
            );
          });
          this.char.setOption(options);
        } else if (this.charType === "bar") {
          const { options } = barChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "bar3D") {
          const { options } = barChar3D(arr);
          this.char.setOption(options);
        } else if (this.charType === "gauge") {
          const { options } = gaugeChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "map") {
          const { options } = mapChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "time") {
          const { options } = timerChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "funnel") {
          const { options } = funnelChar(arr);
          this.char.setOption(options);
        } else if (this.charType === "pieSolid") {
          const { options } = pieSolidChar(arr);
          this.char.setOption(options);
        }
      }
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let isSelecteds = isSelected;
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelecteds = false;
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelecteds ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelecteds ? Math.sin(midRadian) * 0.1 : 0;
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
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
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },
    pie3d(option) {
      let myChart = this.char;
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      let selectedIndex = "";
      let hoveredIndex = "";
      let self = this;
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", function(params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;

          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            k = option.series[hoveredIndex].pieStatus.k;

            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[
              hoveredIndex
            ].parametricEquation = self.getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              option.series[hoveredIndex].pieData.value
            );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }

          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== "mouseoutSeries") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio = option.series[params.seriesIndex].pieData.startRatio;
            endRatio = option.series[params.seriesIndex].pieData.endRatio;
            k = option.series[params.seriesIndex].pieStatus.k;

            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            option.series[
              params.seriesIndex
            ].parametricEquation = self.getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              option.series[params.seriesIndex].pieData.value + 5
            );
            option.series[params.seriesIndex].pieStatus.hovered = isHovered;

            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }

          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        }
      });

      // 修正取消高亮失败的 bug
      myChart.on("globalout", function() {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = option.series[hoveredIndex].pieStatus.k;
          startRatio = option.series[hoveredIndex].pieData.startRatio;
          endRatio = option.series[hoveredIndex].pieData.endRatio;

          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          option.series[
            hoveredIndex
          ].parametricEquation = self.getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[hoveredIndex].pieData.value
          );
          option.series[hoveredIndex].pieStatus.hovered = isHovered;

          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }

        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
      });
    },
    //柱状图
    cyxqBar(options) {
      this.char.setOption(options);

      // 获取图表宽高
      const refheight = this.$refs.echar.getBoundingClientRect().height;
      const refwidth = this.$refs.echar.getBoundingClientRect().width;
      const cherHeight = refheight * 0.84; //剩余高度
      const YAxisData = options.yAxis.data;
      // 获取当前可视区域的数据范围 (如果有dataZoom的话)
      const startIndex = options.dataZoom[0].startValue; // 起始索引
      const endIndex = options.dataZoom[0].endValue; // 结束索引
      // 获取当前窗口数据点
      let visibleData = YAxisData.slice(startIndex, endIndex + 1);

      // 获取最大值和最小值
      // 获取 data[1] 和 data[2] 中的最大绝对值
       const maxValue = Math.max(...options.series[0].data.map(Math.abs), ...options.series[1].data.map(Math.abs));
       
       // 计算当前可见数据的最大绝对值
       const visibleMax = Math.max(...visibleData.map(Math.abs));
       
       // 最小值和最大值的设置
       const min = -Math.max(visibleMax, maxValue); // 最小值为负的最大绝对值
       const max = Math.max(visibleMax, maxValue);  // 最大值为正的最大绝对值
       // 更新 xAxis 的 min 和 max，只做一次 setOption 调用
       options.xAxis.min=min, options.xAxis.max=max
      //  this.char.setOption(options);
      // 获取 Y 轴刻度值
      let yScale = "";
      // 定义一个底部位置映射数组，包含各个长度对应的偏移量
      const bottomOffsets = [
        { length: 10, offset: 0.065, value: 9 },
        { length: 9, offset: 0.055, value: 9 },
        { length: 8, offset: 0.055, value: 9 },
        { length: 7, offset: 0.045, value: 9 },
        { length: 6, offset: 0.07, value: 8.5 },
        { length: 5, offset: 0.1, value: 8 },
        { length: 4, offset: 0.08, value: 8 },
        { length: 3, offset: 0.05, value: 8 },
        { length: 2, offset: 0.06, value: 7 },
        { length: 1, offset: 0.1, value: 4 }
      ];

      // 获取对应 xAxis 长度的偏移量
      const xAxisLength = this.xAxis.length;

      // 如果 xAxis 长度 >= 10，设置特殊的处理逻辑
      let offsetEntry;
      if (xAxisLength >= 10) {
        offsetEntry = bottomOffsets[0]; // 使用 10 对应的偏移量
      } else {
        // 否则，查找数组中的对应值
        offsetEntry = bottomOffsets.find(entry => entry.length === xAxisLength);
      }

      // 如果找到对应的偏移量，设置图形选项
      if (offsetEntry) {
        // 计算 bottom 值
        const bottom =
          refheight * offsetEntry.offset +
          (offsetEntry.value * cherHeight) / 10;

        this.char.setOption({
          graphic: [
            {
              bottom: bottom,
              style: {
                height: (cherHeight / 10) * 1,
                width: refwidth
              }
            }
          ]
        });
      }

      let dataIndex = options.yAxis.data.length - 1;
      this.char.getZr().on("click", param => {
        //获取自定义变量barIds的值,barIds要和option的series里自定义的一样
        const pointInPixel = [param.offsetX, param.offsetY];
        if (this.char.containPixel("grid", pointInPixel)) {
          const xIndex = this.char.convertFromPixel(
            { seriesIndex: 0 },
            pointInPixel
          )[1];
          yScale = this.char.convertFromPixel(
            { xAxisIndex: 0, yAxisIndex: 0 },
            pointInPixel
          )[1];
          this.$emit("changecyxqMkmc", options.yAxis.data[xIndex]);
          // dataIndex = xIndex;
          // 计算点击位置在可视区域中的第几个点

          // const startIndex = this.char.getOption().dataZoom[0].startValue; // 获取 yAxis 数据的最小值
          // const visibleIndex = xIndex - startIndex;
          // console.log('在可视区域的第几个数据点:', visibleIndex);
        }

        dataIndex = yScale;
        // const endIndex = this.char.getOption().dataZoom[0].endValue; // 获取 yAxis 数据的最大值
        visibleData = YAxisData;
        // 获取当前视口区域内的数据点切换
        visibleData.map((item, index) => {
          if (item == options.yAxis.data[yScale]) {
            if (visibleData.length == 9) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 9.9) * index +
                      (visibleData.length - index) * 4,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 8) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 8.7) * index +
                      (visibleData.length - index) * 5.5,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 7) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 7.7) * index +
                      (visibleData.length - index) * 6,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 6) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 6.5) * index +
                      (visibleData.length - index) * 8,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 5) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 5.4) * index +
                      (visibleData.length - index) * 12,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 4) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 4.2) * index +
                      (visibleData.length - index) * 15,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 3) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 3) * index +
                      (visibleData.length - index) * 26,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 2) {
              this.char.setOption({
                graphic: [
                  {
                    bottom:
                      (refheight / 2.3) * index +
                      (visibleData.length - index) +
                      110,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            } else if (visibleData.length == 1) {
              this.char.setOption({
                graphic: [
                  {
                    bottom: refheight * 0.43,
                    style: {
                      height: refheight * 0.09,
                      width: refwidth
                    }
                  }
                ]
              });
            }
            if (visibleData.length >= 10) {
              // 获取当前的 visible 数据范围
              const startIndex = this.char.getOption().dataZoom[0].startValue; // 获取 yAxis 数据的最小值
              const endIndex = this.char.getOption().dataZoom[0].endValue; // 获取 yAxis 数据的最大值
              // 判断是否在视口内
              const inViewport =
                startIndex <= dataIndex && dataIndex <= endIndex;
              const pointInPixel = [param.offsetX, param.offsetY];
              if (this.char.containPixel("grid", pointInPixel)) {
                yScale = this.char.convertFromPixel(
                  { xAxisIndex: 0, yAxisIndex: 0 },
                  pointInPixel
                )[1];
              }
              visibleData = YAxisData.slice(startIndex, endIndex + 1);
              // 获取当前视口区域内的数据点
              visibleData.map((item, index) => {
                if (item == options.yAxis.data[yScale]) {
                  // 大于等于10
                  this.char.setOption({
                    graphic: [
                      {
                        bottom: refheight * 0.065 + (index * cherHeight) / 10,
                        style: {
                          height: refheight * 0.08,
                          width: refwidth
                        }
                      }
                    ]
                  });
                }
              });
            }
          }
        });
      });
      // 在鼠标离开后手动触发高亮
      this.char.on("globalout", params => {
        this.char.setOption({
          tooltip: {
            showContent: false // 鼠标移出时隐藏 tooltip
          }
        });
      });
      this.char.on("dataZoom", param => {
        // 获取当前的 visible 数据范围
        const startIndex = this.char.getOption().dataZoom[0].startValue; // 获取 yAxis 数据的最小值
        const endIndex = this.char.getOption().dataZoom[0].endValue; // 获取 yAxis 数据的最大值
        // 判断是否在视口内
        const inViewport = startIndex <= dataIndex && dataIndex <= endIndex;
        const pointInPixel = [param.offsetX, param.offsetY];
        if (this.char.containPixel("grid", pointInPixel)) {
          yScale = this.char.convertFromPixel(
            { xAxisIndex: 0, yAxisIndex: 0 },
            pointInPixel
          )[1];
        }
        visibleData = YAxisData.slice(startIndex, endIndex + 1);

        if (!inViewport) {
          this.char.setOption({
            graphic: [
              {
                bottom: 0,
                style: {
                  height: 0,
                  width: 0
                }
              }
            ]
          });
        } else {
          // 获取当前视口区域内的数据点
          visibleData.map((item, index) => {
            if (item == options.yAxis.data[yScale]) {
              console.log(item, index, options.yAxis.data[yScale]);
              // 大于等于10
              this.char.setOption({
                graphic: [
                  {
                    bottom: refheight * 0.065 + (index * cherHeight) / 10,
                    style: {
                      height: refheight * 0.08,
                      width: refwidth
                    }
                  }
                ]
              });
            }
          });
        }

        // if (inViewport) {
        //   visibleData.map((item, index) => {
        //     if (item == options.yAxis.data[yScale]) {
        //       console.log(item, 111111);
        //       console.log(options.yAxis.data[yScale], '111111');
        //       // 大于等于10
        //       this.char.setOption({
        //         graphic: [
        //           {
        //             bottom: refheight * 0.065 + (index * cherHeight) / 10,
        //             style: {
        //               height: refheight * 0.08,
        //               width: refwidth
        //             }
        //           }
        //         ]
        //       });
        //     }
        //   });
        //   console.log(visibleData);

        //   // this.char.dispatchAction({
        //   //   type: "showTip",
        //   //   seriesIndex: 0, // 根据需要指定系列索引
        //   //   dataIndex: dataIndex // 判断该点在不在视口内
        //   // });
        // } else {

        // }
      });
      this.char.on("mouseover", params => {
        console.log(params);

        // 动态更新 tooltip 配置项
        this.char.setOption({
          tooltip: {
            showContent: true // 鼠标移入时显示 tooltip
          }
        });
      });

      this.char.on("mousemove", params => {
        // 动态更新 tooltip 配置项
        this.char.setOption({
          tooltip: {
            showContent: true // 鼠标移入时显示 tooltip
          }
        });
      });
    },
    /*
    重置char图
     */
    resizeChar() {
      if (this.char) {
        this.char.resize();
      }
    },
    /*
    是否显示label
     */
    islabelEchar(options) {
      this.char.setOption(options);
    }
  },
  created() {
    this.init(this.charData);
  }
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
