import china from '../map/china.json'
import * as echarts from 'echarts'
export default function mapChar(arr) {
  echarts.registerMap('china', china)
  // 计算最大值
  const max = Math.max(...arr.map(item => item.value))
  const options = {
    visualMap: {
      left: 'right',
      min: 0,
      max: max,
      inRange: {
        color: [
          '#56b5e8',
          '#2696d4',
          '#217adf',
          '#236aa8',
          '#165dab',
        ]
      },
      text: ['', ''],
      calculable: false,
      textStyle: {
        color: '#bbe1f5'
      }
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    geo: {
      show: true,
      map: "china",
      roam: false,
      zoom: 1.2,
      itemStyle: {
        normal: {
          borderColor: "#04BEF4",
          borderWidth: 0,
          shadowColor: "#032A81",
          shadowOffsetX: 5,
          shadowOffsetY: 5
        }
      }
    },
    series: [
      {
        type: 'map',
        mapType: 'china', //自定义扩展图表类型
        roam: false,
        zoom: 1.2,
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            textStyle: {
              color: "#bbe1f5"
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#bbe1f5"
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#56b5e8',
            borderColor: '#0f355f',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: "#2e9ef4",
            textStyle: {
              color: "#bbe1f5"
            }
          }
        },
        data: arr
      },
    ]
  }
  return {
    options
  }
}