import * as echarts from "echarts";

export default function jjyxjcPieChar(arr) {
  const colorList = arr.map(item => item.color);
  // 计算总和并处理数据
  let sum = arr.reduce((total, item) => total + (item.zb || 0), 0);
  // 生成数据格式
  const chartData = arr.map(item => ({
    name: item.dwmc,
    value: item.zb || sum / 100, // 如果值为 0 或未定义，使用默认值
  }));
  
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}：{c}%" , // 在 tooltip 中显示百分比
      position:'right'
    },
    color: colorList,
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        startAngle: 180,
        minAngle: 0,
        emphasis: {
          scale: true,
          scaleSize: 15,
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        label: {
          show: false,  // 保留内圆的标签显示
          formatter: '{b}：{c}万元 ({d}%)',  // 在饼图上显示百分比
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff',
          position: 'center'  // 标签放置在圆心
        },
        itemStyle: {
          opacity: 0.8
       },
        data: chartData,
        z: 666
      },
      {
        type: 'pie',
        radius: ['60%', '75%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        startAngle: 180,
        minAngle: 0,
        emphasis: {
          scale: true,
          scaleSize: 10,
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        label: {
          show: false  // 不显示外侧标签
        },
        data: chartData,
        z: 1
      }
    ],
    graphic: {
      elements: [
          {
              type: 'image',
              z: -10,
              style: {
                  image: require('../../../assets/img/LargeScreen/btbg.png'),
                  width: 240,
                  height: 240,
              },
              left: 'center',
              top: 'center',
              tooltip: {
                show: false, // 禁用 Tooltip
              },
          },
      ],
  },
  };

  return {
    options
  };
}
