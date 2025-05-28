export default function pieSolid() {
  const colorGroup = [
    ["#6183c9", "#8657ff"],
    ["#00f3dc", "#00d0f5"],
    ["#ffa200", "#ffc700"],
    ["#2e7987", "#84ecb5"],
    ["#008571", "#00d473"],
    ["#49b4e4", "#16BFC3"],
  ];

  const data = [
    { value: 195, name: '16℃以下' },
    { value: 185, name: '16-18℃' },
    { value: 260, name: '18-20℃' },
    { value: 213, name: '20-22℃' },
    { value: 52, name: '22-24℃' },
    { value: 35, name: '24-26℃' },
    { value: 46, name: '26℃以上' },
  ];

  const options = {
    backgroundColor: '#0c1e55',
    color: colorGroup.map(group => group[0]), // Use the first color from each color group
    tooltip: {
      trigger: 'item',
      formatter: "{b}：{c}"
    },
    legend: {
      orient: 'vertical',
      right: 30,
      icon: 'circle',
      bottom: "20%",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 13,
      data: data.map(item => item.name), // Generate legend data from data
      formatter: name => {
        const item = data.find(d => d.name === name);
        return `${name}：${item.value}`;
      },
      textStyle: {
        fontSize: 14,
        color: '#a6cde8'
      },
      padding: [2, 2]
    },
    grid: {
      top: '20%',
      left: '53%',
      right: '10%',
      bottom: '6%',
      containLabel: true
    },
    series: [{
      label: {
        // normal: {
        //   formatter: '{b|{b}：} {c} \n  {per|{d}%}',
        // },
        emphasis: {
          show: false,
        }
      },
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: data, // Use data directly
      itemStyle: {
        emphasis: {
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
    //   labelLine: {
    //     normal: {
    //       length: 0,
    //       length2: 0,
    //       smooth: false,
    //     }
    //   },
    }]
  };

//   autoFn(options.legend.data.length);

//   function autoFn(dataLen) {
//     let currentIndex = -1;
//     const myChart = echarts.getInstanceByDom(document.getElementById("chart-panel"));
    
//     setInterval(() => {
//       currentIndex = (currentIndex + 1) % dataLen;
      
//       myChart.dispatchAction({
//         type: 'downplay',
//         seriesIndex: 0,
//         dataIndex: (currentIndex - 1 + dataLen) % dataLen, // Reset previous index
//       });

//       myChart.dispatchAction({
//         type: 'highlight',
//         seriesIndex: 0,
//         dataIndex: currentIndex,
//       });

//       myChart.dispatchAction({
//         type: 'showTip',
//         seriesIndex: 0,
//         dataIndex: currentIndex,
//       });
//     }, 3000);
//   }

  return {
    options
  };
}
