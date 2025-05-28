import * as echarts from 'echarts'
export default function barChar(data) {
  const options = {
    grid: {
      top: '18%',
      left: '5%',
      bottom: '10%',
      right: '5%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(3,50,86,0.8)',
      borderColor: '#2eb8ce',
      textStyle: {
        fontSize: 16,
        color: '#ffffff',
      },
      axisPointer: {
        type: 'shadow',
        z: -1,
        shadowStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: 'rgba(0, 92, 138, 0.2)',
            },
            {
              offset: 1,
              color: '#005c8a',
            },
          ]),
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        nameLocation: 'end',
        nameTextStyle: {
          fontSize: 14,
          color: '#a6e4ff',
          align: 'right',
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#306eb4',
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#a6e4ff',
          fontSize: 14,
        },
        data: data.map(el => el.name),
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#306eb4',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#306eb4',
          },
        },
        axisLabel: {
          color: '#a6e4ff',
          margin: 20,
        },
        axisTick: {
          show: true,
          inside: true,
        },
      }
    ],
    series: [
      {
        name: '资产总额',
        type: 'bar',
        data: data.map(el => el.value),
        barWidth: 20,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: '#0085f6' },
            {
              offset: 0.57, color: '#129dfb'
            },
            { offset: 0, color: '#23b4ff' },
          ]),
        },
      },
    ]
  }
  return {
    options
  }
}