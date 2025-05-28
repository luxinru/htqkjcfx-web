import * as echarts from "echarts";

export default function ydksqysqsLineChar(data, xAxis,activeMc,islable) {
  const colors = ["9, 107, 208", ];
  console.log(data);
  console.log(xAxis);
  
  const lineNames = [activeMc ];
  const unit=  activeMc == "亏损额" ? "单位：万元" : "单位：户";
  
  const options = {
    grid: {
      top: "18%",
      left: "2%",
      bottom: "0%",
      right: "0%",
      containLabel: true
    },
    legend: {
      show: true,
      icon: "roundRect",
      orient: "horizontal",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
         fontSize: 12, //字体大小
         color: "#b9c8d4", //字体颜色
      },
      right: 0, //距离右侧
      top: 0,    //距离顶部
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
      // 亏损额的 Y 轴
      {
        type: "value",
       
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(130, 201, 231, 0.2)"
          }
        },
        axisLabel: {
          color: "#a6e4ff",
          margin: 20
        },
       
        // name: unit,
        // nameTextStyle: {
        //   color: "#a6e4ff",
        //   // padding: [120, 0, 0, 0],
        // },
        
      },
    
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
          color: `rgba(${colors[0]}, 1)`
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
    }),
    title: {
      text: unit,
      textStyle: {
        fontSize: 10,
        color: "#a6e4ff",
      },
      padding: [10, 0, 0,20]
    },
  };

  return {
    options
  };
}

