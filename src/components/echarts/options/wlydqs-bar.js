import * as echarts from "echarts";
export default function wlbarsChar(data, xAxis,activeMc) {
  activeMc=='%'?activeMc='%':activeMc=''
  // console.log(activeMc);
  
  let yValue = [];
  // yValue[0] = data.map((item) => item.ydjhz);
  yValue[0] = data.map(item => item.ydsjz);
  yValue[1] = data.map(item => item.qntqz);
  // console.log(yValue,'555555');
  
  // let names = ["计划值", "实际值", "去年同期"];
  let names = ["今年实际值", "去年实际值"];
  let xValue = data.map(item => item.yfmc);
  let colorList = [
    {
      top: "#35bfff",
      end: "#0080e2"
    },
    {
      top: "#38f8d4",
      end: "#05a98a"
    }
  ];

  // 自定义函数，根据柱子索引返回不同的图片
  function getImageForBar(idx) {
    // 假设每个 bar 有三个柱子，可以为 idx 分配不同的图片
    if (idx === "计划值") {
      return "jhz.png"; // 第一个柱子使用 image1.png
    } else if (idx === "今年实际值") {
      return "sjz.png"; // 第二个柱子使用 image2.png
    } else {
      return "tq.png"; // 第三个柱子使用 image3.png
    }
  }
  let series = [];
  names.forEach((item, index) => {
    series.push({
      name: item,
      type: "bar",
      barWidth: 12,
      z: 1,
      data: yValue[index].map(value => ({
        value, // 使用 yValue 数组中的每个值
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: value > 0 ? 0 : 1, color: colorList[index].top },
              { offset: value > 0 ? 1 : 0, color: colorList[index].end }
            ]),
            // 动态设置 barBorderRadius
            barBorderRadius: value > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4],
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      })),
      tooltip: {
        show: true
      },
      markPoint: {
        symbolSize: [12, 8], // 设置图片的大小，宽24px，高18px
        data: yValue[index]
          .map((value, idx) => ({
            name: "",
            coord: [idx, value], // 通过 yValue 数组的值来设置每个标记点的纵坐标
            symbol:
              "image://" +
              require(`../../../assets/img/LargeScreen/${getImageForBar(
                item
              )}`), // 根据柱子索引设置不同的图片
            symbolRotate: value < 0 ? 180 : 0, // 判断纵坐标是否小于 0，若小于 0 则旋转 180 度
            symbolOffset: value < 0 ? [0, 5] : [0, -5]
          }))
          .filter(item => item.coord[1] != 0.00) // 过滤掉纵坐标为 0 的标记点
      }
    });
  });
  const options = {
    // title: {
    //   text: `单位：${activeMc}`,
    //   textStyle: {
    //     fontSize: 10,
    //     color: "#a6e4ff"
    //   },
    //   padding: [20, 0, 5, 40]
    // },

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(3,50,86,0.8)",
      borderColor: "#2eb8ce",
      textStyle: {
        fontSize: 16,
        color: "#ffffff"
      },
      // formatter:'',
      formatter: function (params) {
        let items ='';

        params.forEach((item)=>{
          items +=  item.seriesName + ' : ' +item.value+activeMc+'</br>';

        })
        return items
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

    grid: {
      left: "5%",
      right: "3%",
      bottom: "1%",
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
        color: "#b9c8d4" //字体颜色
      },
      right: "3%", //距离右侧
      data: [
        {
          name: "今年实际值",
          itemStyle: {
            color: "#0080e2" // 设置"实际值"图例项的图标颜色
          }
        },
        {
          name: "去年实际值",
          itemStyle: {
            color: "#38f8d4" // 设置"去年同期"图例项的图标颜色
          }
        }
      ]
    },
    calculable: true,
    animation: true,

    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        },
        data: xValue,
       
      }
    ],
    yAxis: [
      {
        type: "value",
        nameGap: 8,
        nameTextStyle: {
          color: "#d1d1d1"
        },

        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          symbol: ["none", "arrow"],
          symbolSize: [5, 10],
          lineStyle: {
            color: "#b2e7ff",
            opacity: 0.3
          }
        },
        splitLine: {
          //保留网格线
          show: true,
          lineStyle: {
            //y轴网格线设置
            color: "#1d4065",
            width: 2
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#d1d1d1" //字体颜色
          },
          formatter:function(value){
            return value+activeMc
          }
        },
       
      }
    ],
    series: series
  };
  return {
    options
  };
}
