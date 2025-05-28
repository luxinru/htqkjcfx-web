import * as echarts from "echarts";
import { $money100m } from "../../../utils/helper";
export default function pieChar(arr) {
  const colorGroup = [
    ["#6183c9", "#8657ff"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"],
    ["#49b4e4", "#16BFC3"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"],
    ["#6183c9", "#8657ff"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"],
    ["#6183c9", "#8657ff"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"],
    ["#6183c9", "#8657ff"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"]
  ];
  const count = arr.reduce((a, b) => {
    if (typeof a === "number") {
      return a + b.value;
    } else {
      return a.value + b.value;
    }
  });
  // 模仿阴影效果,内环圈
  // 外环圈
  const data = arr.map((item, index) => {
    return {
      ...item,
      itemStyle: {
        color: colorGroup[index][0]
      },
      label: {
        normal: {
          formatter: function(params) {
            // var cValue = $money100m(params.value); // 假设 params.value 是 c 的原始值
            var cValue = params.value;
            return `{b|${params.name}}\n{hr|}\n{c|${cValue}}{dw|亿元}`;
          },
          padding: [11, -5, 0, -5],
          rich: {
            b: {
              borderColor: colorGroup[index][0],
              fontSize:12,
              color: colorGroup[index][1],
              align: "left",
              padding: 4
            },
            hr: {
              borderColor: colorGroup[index][0],
              width: "100%",
              borderWidth: 2,
              height: 0,
              borderType: [5, 5],
              borderDashOffset: 4
            },
            c: {
              fontSize: 22,
              color: colorGroup[index][1],
              align: "left",
              padding: [10, 0, 0, 0],
              fontWeight: 700
            },
            dw: {
              color: colorGroup[index][1],
              align: "left",
              fontSize: 10,
              padding: [14, 0, 0, 0]
            }
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 30,
          length2: 30,
          showAbove: true,
          lineStyle: {
            type: "dashed",
            width: 2
          }
        }
      },
      labelLayout: function(params) {
        const isLeft = params.labelRect.x < myChart.getWidth() / 2;
        const points = params.labelLinePoints;
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;
        return {
          labelLinePoints: points
        };
      }
    };
  });
  const options = {
    title: {
      // text: "专业类别",
      top: "56%",
      left: "29%",
      itemGap: 15,
      textStyle: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: 400
      },
      z: 1000
    },
    // tooltip: {
    //   trigger: "item"
    // },

    tooltip: {
      trigger: "item",
        backgroundColor: 'rgba(3,50,86,0.8)',
      borderColor: '#2eb8ce',
      textStyle: {
        fontSize: 16,
        color: '#ffffff',
      },
      formatter: function(params) {
        const cValue = params.value; // 假设 params.value 是 c 的原始值
        return `${params.name}：${cValue}亿元`;
      }
    },
    legend: {
      show: false,
      icon: "roundRect",
      orient: "vertical",
      itemWidth: 8,
      itemHeight: 8,
      right: "right",
      textStyle: {
        color: "#fff"
      },
      formatter: e => {
        let str = e;
        for (let el of arr) {
          if (el.name === e) {
            str += ` ${((el.value / count) * 100).toFixed(0)}% (${el.value})`;
          }
        }
        return str;
      }
    },
    series: [
      {
        type: "pie",
        radius: ["55%", "70%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        startAngle: 180,
        minAngle: 0,
        emphasis: {
          scale: true,
          scaleSize: 10,
          focus: "series",
          blurScope: "coordinateSystem"
        },
        // label: {
        //   show: true,  // 保留内圆的标签显示
        //   formatter: '{b|{b}}：{c|{c}}万元 ({d|{d}}%)',  // 在饼图上显示百分比
        //   rich: {
        //     b: {
        //       fontSize: 14,  // 单独设置 {b} 的字体大小
        //       // fontWeight: 'bold'  // 可以进一步设置字体粗细
        //     },
        //     c: {
        //       fontSize: 24,  // 设置 {c} 的字体大小
        //       // fontWeight: 'bold'  // 可以进一步设置字体粗细
        //     },
        //     d: {
        //       fontSize: 14,  // 设置 {d} 的字体大小
        //     }
        //   }
        // },
        // emphasis: {
        //   scale: false //鼠标划上不展示高亮放大效果
        // },
        data: data,
        z: 1
      },
      {
        type: "pie",
        radius: ["40%", "55%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        startAngle: 180,
        minAngle: 0,
        emphasis: {
          scale: true,
          scaleSize: 15,
          focus: "series",
          blurScope: "coordinateSystem"
        },
        label: {
          show: false
        },
        itemStyle: {
          opacity: 0.8
        },
        data: data,
        z: 10
      }
    ],
    graphic: {
      elements: [
        {
          type: "image",
          z: -10,
          style: {
            image: require("../../../assets/img/LargeScreen/btbg.png"),
            width: 180,
            height: 180
          },
          left: "center",
          top: "center"
        }
      ]
    }
    // series: [
    //   {
    //     type: "pie",
    //     radius: ["25%", "60%"],
    //     center: ["50%", "50%"],
    //     // avoidLabelOverlap: false,
    //     label: {
    //       show: false,
    //       position: "center"
    //     },
    //     labelLine: {
    //       show: false
    //     },
    //     emphasis: {
    //       scale: false //鼠标划上不展示高亮放大效果
    //     },
    //     itemStyle: {
    //       color: "rgba(0,180,255,.05)"
    //     },
    //     tooltip: {
    //       show: false //划上不显示提示框
    //     },
    //     data: data,

    //     // data: [100],
    //     z: 1
    //   },
    //   {
    //     type: "pie",
    //     itemStyle: {
    //       borderColor: "#013668",
    //       borderWidth: 0
    //     },
    //     radius: ["30%", "55%"],
    //     center: ["50%", "50%"],
    //     data: data,
    //     z: -1,
    //     itemStyle: {
    //       opacity: 0.6
    //    },
    //   }
    // ]
  };
  return {
    options
  };
}
