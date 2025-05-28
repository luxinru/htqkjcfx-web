import * as echarts from "echarts";

export default function cyxqBarChar(data, xAxis) {
//  const unit = data[0]=='亏损额'?'万元':'户';
 let name=''
let sjz = ''
 if (data[0]=='亏损额') {
   name = '亏损额实际值（万元）'
   sjz = '亏损额控制值（万元）'
 }else if (data[0]=='微利户数') {
   name = '微利户实际值（户）'
   sjz = '微利户控制值（户）'
 }else  {
   name='亏损企业实际值（户）'
   sjz='亏损企业控制值（户）'
 }



   const options  = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      snap:false,       //  是否吸附到店上
      status:'show',  // 初始指示器的状态， show 显示， hide 隐藏
    },
    triggerOn: 'mousemove',      // 提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
    showContent: false,     //
    enterable: true,   // 鼠标是否可以进入提示框浮层中，默认为false，如需详情内交互，如添加链接，可设置为true
    alwaysShowContent: false,  // 鼠标离开图表时，tooltip 仍然保持显示
    formatter: function (params) {
      // 遍历所有的参数，将值转为正数
      let result = '';
      params.forEach(function (param) {
        result += `${param.seriesName}: ${Math.abs(param.value)}<br>`;
      });
      return result;
    }
  },
  graphic: [
    {
      type: 'image',
      id: 'customImagePointer', // 图片id
      right: 0, // 图片位置
      bottom: '80%',
      style: {
        image: require('../../../assets/img/LargeScreen/ksqyzl/chatactive.png'), // 设置图片路径
        width: 1200,
        height: 60,
      },
      z: -1, // 确保图片显示在最上层
    }
  ],
 // 滚动条
 dataZoom: [
  {
    show: false,
    right: '1%',
    top: '10%',
    width: 10,
    showDetail: false,
    brushSelect: false,
    orient: 'vertical',
    backgroundColor: '#314d70',
    showDataShadow: false,
    startValue: xAxis.length - 10,
    endValue: xAxis.length - 1,
    borderColor: 'transparent',
    fillerColor: '#1ad3fd',
    zoomLock: true,
    handleSize: '100%',
    handleIcon:
      'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z',
  },
  {
    type: "inside",
    yAxisIndex: [0, 1],
    zoomOnMouseWheel: false, // 关闭滚轮缩放
    moveOnMouseWheel: true, // 开启滚轮平移
    moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
  },
],

  legend: {
    top: 10,    
    itemWidth: 20,
    itemHeight: 10,
    itemGap: 13,
    textStyle: {
      fontSize: 14,
      color: '#fff'
    },
    padding: [2, 2]
  },
  grid: {
    top:'10%',
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: "#335971"
      },
      
    },
    axisLabel: {
      interval: 0,
      color: '#ddebf7',
      fontSize: 14,
      formatter: (m) => {
          return    Math.abs(m);
      },
     },
     // 设置相同的刻度范围，确保0在中间
    //  min: -Math.max(...data[1].map(Math.abs), ...data[2].map(Math.abs)),  // 获取最大绝对值并取负
    //  max: Math.max(...data[1].map(Math.abs), ...data[2].map(Math.abs)),     // 获取最大绝对值
     
  },
  yAxis: {
    type: 'category',
    data: xAxis,
    axisLabel: {
      interval: 0,
      color: "#fff",
      fontSize: 14,
      margin: 20,  // 设置标签与坐标轴的距离，单位为像素
      
    },
    axisTick: {
      show: false,  // 关闭刻度线
    },
  },
  series: [
    {
      name:name ,
      type: 'bar',
      stack: 'total',
      barWidth: 12, // 设置柱状图宽度
      barGap: '-100%',
      label: {
        normal: {
          show: true,
          position: 'left',
          offset: [0, 0],
          textStyle: {
              color: 'white',
              fontSize: 10
          },
          formatter: function (params) {
            return Math.abs(params.value); // 强制显示为正数
          },
      }
      },
      emphasis: {
        focus: 'series'
      },
      data: data[2],
      itemStyle: {
        color: '#07bf81' ,// 设置该系列的柱状图颜色,
        barWidth: 12, // 设置柱状图宽度
      },
    },
      {
        // name: data[0],
        name: sjz,
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            position: 'right',
            offset: [0, 0],
            textStyle: {
                color: 'white',
                fontSize: 10
            },
            formatter: function (params) {
              // 如果为0则不显示label
      if (params.value === 0) {
        return '';  // 返回空字符串，表示不显示label
      }
      return Math.abs(params.value);  // 强制显示为正数
            },
        }

        },
        emphasis: {
          focus: 'series'
        },
        data: data[1],
        itemStyle: {
          color: '#007cfb' // 设置该系列的柱状图颜色
        },
        axisLabel: {
          interval: 0,
          color: "#fff",
          fontSize: 14,
          
        },
    
      },
    
  ],
  
};

  return {
    options
  };
}

