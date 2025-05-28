import * as echarts from "echarts";
export default function customChar(data) {
  const options = {
    color: ["#00be9a", "#0c8ee8", "#f08d19"], // 用不同的颜色显示应完成和实际完成
    grid: {
      left: "0%",
      right: "2%",
      bottom: "0%",
      top: "0%",
      containLabel: true,
      show: false // 去除网格线
    },

    xAxis: [
      // 将原来的 Y 轴配置调整为 X 轴
      {
        type: "value", // 变成数值类型
        axisLine: {
          show: false // 关闭X轴的线条
        },
        axisTick: {
          show: false // 关闭X轴上的刻度线
        },
        axisLabel: {
          formatter: function(params) {
            return params; // 可以根据需要格式化标签
          },
          show: false // 关闭X轴的标签
        },
        splitLine: {
          show: false, // 是否显示分割线
          lineStyle: {
            color: "#ccc", // 分割线颜色
            width: 1, // 分割线宽度
            type: "dashed" // 分割线类型，可选：'solid'、'dashed'、'dotted'
          }
        }
      }
    ],

    yAxis: [
      // 将原来的 X 轴配置调整为 Y 轴
      {
        type: "category", // 变成分类轴
        axisTick: {
          show: false // 关闭Y轴上的刻度线
        },
        axisLine: {
          show: false // 关闭Y轴的线条
        },
        axisLabel: {
          padding: [0, 0, 0, 0],
          show: true // 显示Y轴的标签（显示月份）
        },
        data: [""] // 类别数据（月份）
      }
    ],

    series: []
  };

  var datas = [
    [data[0].jdzc], // 正常
    [data[0].jdzh], // 滞后
    [data[0].jdxygz] // 需要关注
  ];

  // 变量和循环处理
  var categories = ["1月"]; // 分类：1月
  var years = ["正常", "滞后", "需要关注"]; // 数据分类

  // 遍历每个年份（应完成和实际完成）
  for (var i = 0; i < years.length; i++) {
    var year = years[i];
    var yearData = datas[i]; // 获取对应年份的数据
    var seriesData = []; // 用于存储每个年份对应的系列数据

    // 遍历每个月份
    for (var j = 0; j < categories.length; j++) {
      seriesData.push({
        type: "bar",
        stack: "stack1", // 堆叠的关键点，确保同一类数据堆叠在一起
        barWidth: 14, // 设置柱子的宽度
        label: {
          show: true,
          align: "center",
          formatter: function(param) {
            return param.value; // 显示实际的数值
          }
        },
        data: [yearData[j]], // 使用应完成或实际完成的数据
        name: year, // 设置每个系列的名称
        emphasis: {
          // 鼠标悬停时高亮显示
          focus: "series"
        }
      });
    }

    // 合并数据到series中
    Array.prototype.push.apply(options.series, seriesData);
  }

  return {
    options
  };
}
