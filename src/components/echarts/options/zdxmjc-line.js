import * as echarts from "echarts";
export default function zdxmjclinChar(data, xAxis,unit,islable) {
  console.log(islable,"islable");
  
  const colors = ["249,143, 21" ];
  const lineNames = ["年度投资趋势" ];
  const options = {
    title: {
      text: `单位：${unit}`,
      textStyle: {
        fontSize: 10,
        color: "#a6e4ff"
      },
      padding: [10, 0, 5, 40]
    },
    grid: {
      top: "18%",
      left: "5%",
      bottom: "10%",
      right: "5%",
      containLabel: true
    },
    legend: {
      show: false
      // //图例形状
      // icon: "roundRect",
      // top: "2%",
      // right: "2%",
      // show: true,
      // itemWidth: 12,
      // itemHeight: 12,
      // itemGap: 30,
      // textStyle: {
      //   fontSize: 14,
      //   color: "#a6e4ff"
      // }
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
        // axisLine: {
        //   show: false,
        //   lineStyle: {
        //     color: "#306eb4"
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
          margin: 20
        },
        // axisTick: {
        //   show: true,
        //   inside: true
        // }
      }
    ],
    series: data.map((el, index) => {
      const series = {
        name: lineNames[index],
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
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
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
            shadowColor: `rgba(${colors[index]}, 1)`, //阴影颜色
            shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        label: {
          show: islable,
          position: 'top',
          formatter: '{c}',
          color: '#fff',
          fontSize: 10,
        },
      };
      return series;
    })
  };
  return {
    options
  };
}
