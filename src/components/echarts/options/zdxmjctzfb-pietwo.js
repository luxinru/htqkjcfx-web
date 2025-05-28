import * as echarts from "echarts";

export default function zdxmjczcfbPietwoChar(arr) {
  
  const colorList = arr.map(item => item.color);
  // 计算总和并处理数据
  let sum = arr.reduce((total, item) => total + (item.zb || 0), 0);
  // 生成数据格式
  const chartData = arr.map(item => ({
    name: item.jefw,
    value: item.zb || sum / 100, // 如果值为 0 或未定义，使用默认值
  }));
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: "{b}：{c}%",
      position: 'right'  // 将 放在右侧
    },
    color:colorList,
    series: [
      {
        type: 'pie',
        radius: ['46%', '70%'],
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
          show: false
        },
        itemStyle: {
          opacity: 0.8
       },
        data: chartData,
        z: 666
      },
      {
        type: 'pie',
        radius: ['65%', '80%'],
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
          show: false
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
                  width: 150,
                  height: 150,
              },
              left: '0px',
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
