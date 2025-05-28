import * as echarts from 'echarts'
export default function gaugeChar(data) {
  let dataArr = [
    {
      value: 96.8,
      name: '合格率',
    },
  ];
  let color = new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: '#AEFC8F', // 0% 处的颜色
    },
    {
      offset: 1,
      color: '#1EB491', // 100% 处的颜色
    },
  ]);
  let colorSet = [
    [0.8, color],
    [1, '#0B2B43'],
  ];
  const options = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },

    series: [
      //由外往内第四层刻度部分
      {
        type: 'gauge',
        radius: '70%', // 1行3个
        center: ['50%', '60%'],
        splitNumber: 4,
        min: 0,
        max: 100,
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          show: true,
          lineStyle: {
            width: 0,
            color: '#1EB491',
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#1EB491',
            width: 1,
          },
          length: 8,
          splitNumber: 10,
        },
        splitLine: {
          show: true,
          length: 8,
          lineStyle: {
            fontWeight: 400,
            color: '#1EB491',
          },
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: 0,
        },
        detail: {
          show: 0,
        },
      },
      {
        type: 'gauge',
        name: '外层辅助',
        radius: '90%',
        center: ['50%', '60%'],
        startAngle: '180',
        endAngle: '0',
        splitNumber: '100',
        pointer: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        title: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, '#1EB491']],
            width: 2,
            opacity: 1,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      {
        type: 'gauge',
        radius: '80%',
        center: ['50%', '60%'],
        startAngle: '180',
        endAngle: '0',
        pointer: {
          show: false,
        },
        title: {
          //标题
          show: true,
          offsetCenter: [0, '16%'], // x, y，单位px
          textStyle: {
            color: '#C2DDEE',
            fontSize: 16, //表盘上的标题文字大小
            fontFamily: 'PingFang',
          },
        },
        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, '-20%'],
          color: '#ffffff',
          formatter: function (params) {
            return params + '%';
          },
          textStyle: {
            fontSize: 20,
            fontFamily: 'PingFang',
          },
        },
        data: dataArr,
        axisLine: {
          show: true,
          lineStyle: {
            color: colorSet,
            width: 15,
            // shadowBlur: 15,
            // shadowColor: '#fff',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
  }
  return {
    options
  }
}