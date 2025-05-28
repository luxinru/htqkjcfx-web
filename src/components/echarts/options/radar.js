export default function radarChar(arr) {
  // 找数据最大值
  const max = Math.max(...arr.map(item => item.value))
  const options = {
    color: ['#00D0FF', '#FFD34D'],
    radar: [
      {
        indicator: arr.map(el => {
          return { text: el.name, max: max }
        }),
        radius: 60,
        splitNumber: 4,
        splitArea: {
          show: false,
        },
        axisLine: {

          lineStyle: {
            color: '#0575b7',
          },
        },
        splitLine: {
          lineStyle: {
            width: 1.5,
            color: '#0575b7',
          },
        },
        axisName: {
          color: 'rgba(255, 255, 255, 1)',
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'radar',
        radarIndex: 0,
        symbol: 'none',
        data: [
          {
            value: arr.map(el => el.value),
            areaStyle: {
              color: 'rgba(13, 255, 207, 0.4)'
            },
          },
          {
            value: [200, 200, 20, 30],
            areaStyle: {
              color: 'rgba(254, 192, 0, 0.4)'
            },
          },
        ]
      }
    ]
  }
  return {
    options
  }
}