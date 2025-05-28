import * as echarts from "echarts";

export default function htzbcyfbqkBarChar(data, xAxis,names) {
  
  const colors = ["240, 141, 25", "12, 142, 232"];  // 增加第二种颜色（假设需要双坐标轴）
  const lineNames = [ names,'同比'];  // 假设第二个系列为亏损额，名称修改为实际需求
  const options = {
    grid: {
      top: "13%",
      left: "1.5%",
      bottom: "5%",
      right: "2%",  // 调整右侧边距
      containLabel: true
    },
    legend: {
      icon: 'rect',  // 设置图例的图形形状，circle为圆
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 13,
      textStyle: {
        fontSize: 14,
        color: '#fff'
      },
    },
    title: {
      text: "单位：亿元",
      textStyle: {
        fontSize: 10,
        color: "#a6e4ff"
      },
      padding: [10, 0, 5, 25]
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
      },
      formatter: function (params) {
        // 假设第二个指标在 params 中为 params[1]，且它是一个数值类型
        var secondValue = params[1].value;
        
        // 这里根据需要加上百分比单位
        params[1].value = secondValue + "%";
    
        // 返回自定义的 tooltip 格式
        return params.map(function (param) {
          return param.seriesName + ": " + param.value;
        }).join("<br>");
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
        // name: "单位：亿元",
        nameTextStyle: {
          color: "#a6e4ff"
        },
        axisLabel: {
          color: "#a6e4ff",
          margin: 10
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(130, 201, 231, 0.2)",
            z: -1  // 设置较低的层级
          }
        },
        
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#306eb4"
          },
          z: 1  // 设置更高的层级
        },
        // splitNumber: ,  // 设置 Y 轴的分段数（可以根据需要调整）
      },
      {
        type: "value",
        // name: "百分比",
        nameTextStyle: {
          color: "#096bd0"
        },
        axisLabel: {
          color: "#096bd0",
          margin: 20,
          formatter: function (value) {
            return value + '%'; // 将数值乘以100，并加上百分号
        }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(130, 201, 231, 0.2)",
            z: -1  // 设置较低的层级
          }
        },
        position: "right",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#096bd0"
          },
          z: 1  // 设置更高的层级
        },
        // splitNumber: ,  // 设置 Y 轴的分段数（可以根据需要调整）
      }
    ]
    ,
      series: data.map((el, index) => {
        const series = {
          name: lineNames[index],
          type: "bar",
          // zlevel: 1,
          smooth: true, // 使线条更平滑
          symbol: "circle",
        barWidth: 24, //柱图宽度

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
            show: false
          },
          yAxisIndex: index === 0 ? 0 : 1  // 第一个系列绑定到第一个 Y 轴，第二个系列绑定到第二个 Y 轴
        };
        return series;
      })
  };

  return {
    options
  };
}
