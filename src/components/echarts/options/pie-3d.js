export default function pie3dChar(arr) {
  const colorGroup = ['#f77b66', '#3edce0', '#f94e76', '#018ef1', '#9e60f9', '#006EF5', '#846BCE']
  let pieData = []
  for (let i = 0; i < arr.length; i++) {
    pieData.push({
      name: arr[i].name,
      value: arr[i].value,
      itemStyle: {
        color: colorGroup[i]
      }
    })
  }
  function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;
    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== "undefined" ? k : 1 / 3;
    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },
      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        if (u < startRadian) {
          return (
            offsetX +
            Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      y: function (u, v) {
        if (u < startRadian) {
          return (
            offsetY +
            Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      z: function (u, v) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u) * h * 0.1;
        }
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      },
    };
  };
  //这是一个自定义计算的方法
  function fomatFloat(num, n) {
    var f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    var s = f.toString();
    var rs = s.indexOf(".");
    //判定如果是整数，增加小数点再补0
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + n) {
      s += "0";
    }
    return s;
  };
  //获取3d丙图的最高扇区的高度
  function getHeight3D(series, height) {
    series.sort((a, b) => {
      return b.pieData.value - a.pieData.value;
    });
    return (height * 20) / series[0].pieData.value;
  }
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let legendBfb = [];
  let k = 1 - 0.8;
  pieData.sort((a, b) => {
    return b.value - a.value;
  });
  // 为每一个饼图数据，生成一个 series-surface(参数曲面) 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    let seriesItem = {
      //名称
      name:
        typeof pieData[i].name === "undefined"
          ? `series${i}`
          : pieData[i].name,
      type: "surface",
      //是否为参数曲面（是）
      parametric: true,
      //曲面图网格线（否）上面一根一根的
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },

      //设置饼图在容器中的位置(目前没发现啥用)
      //   center: ['50%', '100%']
    };

    //曲面的颜色、不透明度等样式。
    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle = {};
      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  legendData = [];
  legendBfb = [];
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value * 1;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
    let bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
    legendData.push({
      name: series[i].name,
      value: bfb,
    });
    legendBfb.push({
      name: series[i].name,
      value: bfb,
    });
  }
  //(第二个参数可以设置你这个环形的高低程度)
  let boxHeight = getHeight3D(series, 25); //通过传参设定3d饼/环的高度
  series.push({
    name: "pie2d",
    type: "pie",
    label: {
      opacity: 1,
      // lineHeight: 14,
      textStyle: {
        fontSize: 14,
        color: "#fff",
      },
    },
    labelLine: {
      normal: {
        length: 30,
        length2: 200,
        lineStyle: {
          // color: '#e6e6e6'
          width: 3,
        },
      },
    },
    startAngle: 300, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["36%", "46%"],
    center: ["50%", "50%"],
    data: pieData,
    itemStyle: {
      opacity: 0,
    },
  });
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    //图例组件
    legend: {
      data: legendData,
      color: [
        '#f77b66', '#3edce0', '#f94e76', '#018ef1', '#9e60f9', '#006EF5', '#846BCE'
      ],
      //图例列表的布局朝向。
      orient: "vertical",
      right: 20,
      bottom: 20,
      //图例文字每项之间的间隔
      itemGap: 5,
      show: false,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      textStyle: {
        //图例字体大小
        fontSize: 12,
        color: "#B8DDFF",
        lineHeight: 20,
      },

      //格式化图例文本
      formatter: function (name) {
        var target;
        for (var i = 0, l = pieData.length; i < l; i++) {
          if (pieData[i].name == name) {
            target = pieData[i].value;
          }
        }
        return `${name}   ${target}`;
      },
    },
    //移动上去提示的文本内容
    tooltip: {
      backgroundColor: "rgba(18, 55, 85, 0.8);",
      borderColor: "transparent",
      // formatter: (params) => {
      //   if (params.seriesName !== 'mouseoutSeries') {
      //     return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
      //   }
      // }
      formatter: (params) => {
        if (
          params.seriesName !== "mouseoutSeries" &&
          params.seriesName !== "pie2d"
        ) {
          let bfb = (
            (option.series[params.seriesIndex].pieData.endRatio -
              option.series[params.seriesIndex].pieData.startRatio) *
            100
          ).toFixed(2);
          const value = option.series[params.seriesIndex].pieData.value;
          return (
            `<div style='color:rgba(214, 243, 255, 0.9);'>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${params.seriesName}<br/>` +
            `<span style='margin-right:20px'>${value}</span>` +
            `<span >${bfb}%</span>` +
            `</div>`
          );
        }
      },
    },
    //这个可以变形
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    labelLine: {
      show: true,
      length: 30,
      length2: 140,
      lineStyle: {
        width: 4,
      },
    },
    label: {
      show: true,
      //   position: "outside",
      padding: [0, -200],
      formatter: function (optionsData) {
        return (
          "{name|" +
          optionsData.name +
          "}" +
          "{vlaueA|" +
          optionsData.value +
          "亿元" +
          "}"
          //  +
          // " {value|" +
          // optionsData.percent.toFixed(0) +
          // "%}"
        );
      },
      rich: {
        name: {
          fontSize: 14,
          color: "#ffffff",
          padding: [-25, 0, 0, 0],
        },
        value: {
          fontSize: 14,
          color: "#ffffff",
          padding: [-25, 0, 0, 0],
        },
        vlaueA: {
          fontSize: 14,
          color: "#2CEDCD",
          padding: [-25, 0, 0, 10],
        },
      },
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    //此处是修改样式的重点
    grid3D: {
      show: false,
      boxHeight: boxHeight, //圆环的高度
      //这是饼图的位置
      left: 0,
      top: 0,
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 30, //角度(这个很重要 调节角度的)
        // distance: 200, //调整视角到主体的距离，类似调整zoom(这是整体大小)
        rotateSensitivity: 0, //设置为0无法旋转
        zoomSensitivity: 0, //设置为0无法缩放
        panSensitivity: 0, //设置为0无法平移
        autoRotate: false, //自动旋转
      },
      postEffect: {//配置这项会出现锯齿，请自己去查看官方配置有办法解决 
        enable: true,
        bloom: {
          enable: true,
          bloomIntensity: 0.1
        },
        SSAO: {
          enable: true,
          quality: 'medium',
          radius: 2
        }
      }
    },
    series: series,
  }

  return {
    option
  }
}