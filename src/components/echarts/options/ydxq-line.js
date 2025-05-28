import * as echarts from "echarts";

export default function ydxqLineChar(data, xAxis, lineNames,islable) {
  const unit =`单位：${lineNames[0].includes("数")?"户":"亿元"}`;
  // if(lineNames[0]==="亏损企业数"){

  // }
  
  const colors = ["9, 107, 208", "237, 143, 29", "1, 217, 198"];
  // lineNames = [ "亏损企业数","亏损额", "微利户数"];
  const options = {
    grid: {
      top: "20%",
      left: "2%",
      bottom: "10%",
      right: "3%",
      containLabel: true
    },
    title: {
      text: unit,
      textStyle: {
        fontSize: 10,
        color: "#a6e4ff",
      },
      padding: [15, 0, 0,20]
    },
    legend: {
      icon: 'rect',//设置图例的图形形状，circle为圆形，rect为矩形，roundRect为圆角矩形，triangle为三角形，diamond为菱形，pin为钉子形，arrow为箭头形
      right: 20, //距离右侧
      top: 10,    //距离顶部
      itemWidth: 20,
    itemHeight: 10,
    itemGap: 13,
    textStyle: {
      fontSize: 14,
      color: '#fff'
    },
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
      {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#006699"
          }
        },
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
        axisTick: {
          show: false,
          inside: true
        },
        // name: unit,
        // nameTextStyle: {
        //   color: "#a6e4ff",
        // },
        position: "left"
      }
    ],
    series: data.map((el, index) => {
      const series = {
        name: lineNames[0],
        type: "line",
        zlevel: 1,
        smooth: false,
        symbol: "circle",
        symbolSize: 5,
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
          show: islable,
          position: 'top',
          formatter: '{c}',
          color: '#fff',
          fontSize: 10,
        },
        yAxisIndex: 0 // 将“亏损额”绑定到第一个 Y 轴，其他绑定到第二个 Y 轴
      };
      return series;
    })
  };

  return {
    options
  };
}


