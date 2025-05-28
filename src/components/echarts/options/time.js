import * as echarts from 'echarts'
export default function timeChar (arr) {
  let data = []
  let categories = []
  arr.map(cur => {
    categories.push(cur.name)
  })
  for (var i = 0; i < arr.length; i++) {
    const typeItem = arr[i]
    typeItem.value.map(cur => {
      data.push({
        name: typeItem.name,
        value: [
          i,
          Date.parse(cur[0]),
          Date.parse(cur[1]),
          (Date.parse(cur[1]) - Date.parse(cur[0]) / 1000 / 60).toFixed(2)
        ],
        itemStyle: {
          normal: {
            color: '#a6e501'
          }
        }
      })
    })
  }
  function renderItem (params, api) {
    var categoryIndex = api.value(0)
    var start = api.coord([api.value(1), categoryIndex])
    var end = api.coord([api.value(2), categoryIndex])
    var height = 20
    return {
      type: 'rect',
      shape: echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        }
      ),
      style: api.style()
    }
  }

  const options = {
    tooltip: {
      formatter: function (params) {
        return (
          params.marker +
          params.name +
          ': ' +
          new Date(params.value[1]) +
          '~' +
          new Date(params.value[2])
        )
      },
      confine: true
    },
    title: {
      text: '2023年11月',
      left: 'center',
      textStyle: {
        color: '#ffffff'
      }
    },
    grid: {
      left: '20%',
      height: 300
    },
    xAxis: {
      type: 'time',
      interval: 24 * 60 * 60 * 1000,
      position: 'top',
      axisLabel: {
        formatter: function (val) {
          return new Date(val).getDate() + '日'
        },
        textStyle: {
          color: '#ffffff', //更改坐标轴文字颜色
          fontSize: 14 //更改坐标轴文字大小
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      }
    },
    yAxis: {
      data: categories,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#ffffff', //更改坐标轴文字颜色
          fontSize: 14 //更改坐标轴文字大小
        }
      }
    },
    series: [
      {
        type: 'custom',
        renderItem: renderItem,
        encode: {
          x: [1, 2],
          y: 0
        },
        data: data
      }
    ]
  }
  return {
    options
  }
}
