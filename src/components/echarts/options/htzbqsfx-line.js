import * as echarts from "echarts";

export default function htzbqsfxLineChar(data, xAxis,names) {
  
  const colors = ["237, 143, 29", "9, 107, 208", "1, 217, 198"];
  const lineNames = names;
  const options = {
    grid: {
      top: "15%",
      left: "1.5%",
      bottom: "2%",
      right: "0%",
      containLabel: true
    },
    legend: {
      icon: 'rect',//设置图例的图形形状，circle为圆形，rect为矩形，roundRect为圆角矩形，triangle为三角形，diamond为菱形，pin为钉子形，arrow为箭头形
      itemWidth: 20,
    itemHeight: 10,
    itemGap: 13,
    textStyle: {
      fontSize: 14,
      color: '#fff'
      },
      right: 0,  // 将图例放在右侧，0 表示贴近右边缘
      top: 15, //
    itemStyle: {
      borderRadius: 5, // 设置圆角的大小
    }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(3,50,86,0.8)",
      borderColor: "rgba(3,50,86,0.8)",
      textStyle: {
        fontSize: 14,
        color: "#ffffff"
      },
      axisPointer: {
        type: "shadow",
        z: -1,
        shadowStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: "rgba(0, 92, 138, 0.2)"
            },
            {
              offset: 1,
              color: "#005c8a"
            }
          ])
        }
      }
    },
    title: {
      text: "单位：亿元",
      textStyle: {
        fontSize: 10,
        color: "#a6e4ff"
      },
      padding: [20, 0, 5, 25]
    },
    xAxis: [
      {
        type: "category",
        nameLocation: "end",
        nameTextStyle: {
          fontSize: 14,
          color: "#a6e4ff",
          align: "right"
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#306eb4"
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          color: "#fff",
          fontSize: 14
        },
        data: xAxis
      }
    ],
    yAxis: [
      // 亏损额的 Y 轴
      {
        type: "value",
        // axisLine: {
        //   show: false,
        //   lineStyle: {
        //     color: "rgba(130, 201, 231, 0.1)"
        //   }
        // },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(130, 201, 231, 0.2)"
          }
        },
        axisLabel: {
          color: "#a6e4ff",
          margin: 10
        },
        // axisTick: {
        //   show: false,
        //   inside: false
        // },
        // name: "单位：亿元",
        nameTextStyle: {
          color: "#a6e4ff"
        },
        position: "left"
      },
    ],
    series: data.map((el, index) => {
      const series = {
        name: lineNames[index],
        type: "line",
        zlevel: 1,
        smooth: false,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: `rgba(${colors[index]}, 1)`
        },
        data: el,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: `rgba(${colors[index]}, 1)`
                },
                {
                  offset: 1,
                  color: `rgba(${colors[index]}, 0)`
                }
              ],
              false
            ),
            shadowColor: `rgba(${colors[index]}, 1)`,
            shadowBlur: 10
          }
        },
        label: {
          show: false
        },
      };
      return series;
    })
  };

  return {
    options
  };
}




