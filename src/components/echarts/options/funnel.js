// 漏斗图
import * as echarts from "echarts";
export default function funnelChar(arr) {
  const base64_1 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAA4CAYAAACmL0VxAAAFO0lEQVRogeWbeYhVVRzHPzNjow6W9gpzWizDamwv6A8Lo0XCymghMCsqCiopaCOLsqKIhBImsXDKqbRlTBOtbBMtsY0WsHJyyQjUivdsGRszm3Jy4jd87/B4451337vnLm/8woWBufec3/283/md3/mdc6sy2Rwp0H7ANGBq3Ka01Y/o+bs6DSSA84E7gIOSNCINMI4AmoABwHNAVVKGJA2jFlgIbAC6gGOBW5MyJmkYM+QRHwpGM/AIcEISxiQJ43JgMjBPIEy/AUuAFmBw3AYlBWO04sQzwN8F//sM2Ak8EbdRScAYpDixDNjic495xiRgYpyGJQHjSaATWNXHPeYtzyuG1MdlWNwwrgQuAV4OcO8PwBeKKbFMt3HCaABmAc8CHQGfeQc4ErgzYtu6FReMOmAR8BbwUwnP7VYiZqn6KRHa1624YMwG2oFPynj2d4FsEdTIFAeMG4DxwPwQbXwJbAMaHdrVS1HDOFH5guUT/4Zs61UF30sd2dZLUcLYV/nEYsBFnaBD8cPAHuKgvV6KEobNGls1PbrSJsWdl6KwPSoYU4Az5BmutUye4bwQFAWMU4HH5Bm7Imh/t7LTe4DTXDbsGsZQ4DVgAfCL47bztU192HQ7xFWjLmFU6RfbDKx22K6fViswz3LVoEsYt2uILHLYZjEtVP10kovGXMEYCzygONHpqM0g+kcr26eAw8M25gLGAcouW5Q6x60tKgfYdFuTJAyLEy+qoLsmARCelgMHAveFaSQsDJvejgZeD9lOWFkN9QUt9ceW21YYGOMEY47m/qTVrqH6inboYoMxXHHChsgfKQDh6RvFkNnlPFwOjBqV7azjteV0GrEs6TsbuLrUbsqBcT8wElia9Fv7aJem25kqGQZWqTDGK7lqTkmc8JOVFlcofgwI+lApMA7WXG4p93ZnZkenD7RueShoD0Fh1KjSZLtdG1P20n7q0jbDLcCZQR4ICuNRIAO859zkaLVdwd6g7F+spyAwLgBu1PDoCnB/2vStNqSawsIYqczOAuaOCgThyeqwpwPX93VTXzBqFSc+EtlKVqd+0BlaPpQMY7o2bZZXOAhPWeBdTbe1e7rBD4btT1wDzK3QOOEnOyG0j04H9dKeYIzS4muODo30J3VpPWUTwjnFYAxU2W6F9ij6o3Zoqp2nwpQvjEbRW9lPQXhaD6xTUO1RPowrgMvkRnuD3rBjDpls7qZCGMcATytOBD1IUunq1N7t9Ew21+DBqFPJ3U7J/LiXgPC0VQdo5meyuYHVOnB2lIq7RfP3fqaheu8xtv6ytf69wPs6ZniXzlFYPt+qzDPNdYtyZKWIk3QN00b2dZaQGYw27Vsu0LCxzdwLtVM1RZF3reD8WXnv3v1Oo/MA7FTwtBi5qq1+RM/meGEVyLzgc10PAvYxxgR5zTQVfz2v2Zzi7HSQDuXbyx8PfCcAdwNf+z1UrCSWU0o+V/eOk8dcpO28VnnNuhRkq8N0bOpkfbbxsdKEN4GfgzQQuD6oqWilrqnq0POayVoItcpzAnXuQIfmARiihdjDKkKVPKRLgVGoTSqYNMktz1KsuUpVMQ/MegeH2zxVawnujf92uf9MlRpCbXqHgZGvDv0aXlmwQcPJvOZaxRcPTqmHWOxTi+P064/RkDQAt6k9Z3IFo1AbdDXKfc8TnJu1hF6jWLPR59fM5Ln/Ydplb9ZeTTYim4n768UqveAEBWFz9e+BX4FzgbcFoU6Z4VLlAX9FZVD+14tReYafbCr+SpdV0swDDMzFGmrmTY8DnwL/xWoZ8D8NAh/jYi+Y9AAAAABJRU5ErkJggg==";
  const base64_2 =
    "data:image/png;base64,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";
  const base64_3 =
    "data:image/png;base64,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";
  const base64_4 =
    "data:image/png;base64,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";

  var loadingFunnel = {
    title: "",
    arrDataX: [],
    arrDataY: []
  };
  arr.forEach(el => {
    loadingFunnel.arrDataX.push( `${el.jefw}项目数量:${el.xmsl}个 `    );
    loadingFunnel.arrDataY.push(`项目总金额：${(el.xmzje / 10000).toFixed(2)}亿元 占比：（${el.xmzb}%） `);
  });
  const seriesData = [
    {
      name: loadingFunnel.arrDataX[0],
      z: 100,
      value: 10,
      number: loadingFunnel.arrDataY[0],
      symbolSize: ["55%", "110%"],
      symbolOffset: ["130%", "-405%"],
      symbol: "image://" + base64_1,
      emphasis: {
        focus: "self"
      },
      // markLine: {
      //   symbol: "none",
      //   data: [
      //     [
      //       {
      //         name: "两个坐标之间的标线",
      //         coord: [10, 20]
      //       },
      //       {
      //         coord: [20, 30]
      //       }
      //     ]
      //   ]
      // }
    },
    {
      name: loadingFunnel.arrDataX[1],
      // z: 90,
      value: 20,
      number: loadingFunnel.arrDataY[1],
      emphasis: {
        focus: "self"
      },
      symbolSize: ["90%", "80%"],
      symbolOffset: ["-79%", "-200%"],
      symbol: "image://" + base64_2
    },
    {
      name: loadingFunnel.arrDataX[2],
      // z: 80,
      value: 30,
      number: loadingFunnel.arrDataY[2],
      emphasis: {
        focus: "self"
      },
      symbolSize: ["150%", "75%"],
      symbolOffset: ["-143%", "-80%"],
      symbol: "image://" + base64_3
    },
    {
      name: loadingFunnel.arrDataX[3],
      // z: 80,
      value: 50,
      number: loadingFunnel.arrDataY[3],
      emphasis: {
        focus: "self"
      },
      symbolSize: ["200%", "50%"],
      symbolPosition: "left",
      symbolOffset: ["-180%", "40%"],
      symbol: "image://" + base64_4
    }
  ];
  //title标示文字,标示线
  loadingFunnel.title = (text, top, left, color) => {
    return {
      text: text,
      top: top,
      left: left,
      textStyle: {
        color: color,
        fontStyle: "normal",
        fontFamily: "serif",
        fontSize: 12,
        fontWeight: "400"
      }
    };
  };

  const options = {
    title: [
      loadingFunnel.title(loadingFunnel.arrDataX[0], "5%", "35%", "#1DE6F1"),
      loadingFunnel.title(loadingFunnel.arrDataY[0], "13%", "35%", "#ffffff"),
      loadingFunnel.title(loadingFunnel.arrDataX[1], "27%", "40%", "#1DE6F1"),
      loadingFunnel.title(loadingFunnel.arrDataY[1], "35%", "40%", "#ffffff"),
      loadingFunnel.title(loadingFunnel.arrDataX[2], "49%", "45%", "#1DE6F1"),
      loadingFunnel.title(loadingFunnel.arrDataY[2], "57%", "45%", "#ffffff"),
      loadingFunnel.title(loadingFunnel.arrDataX[3], "70%", "50%", "#1DE6F1"),
      loadingFunnel.title(loadingFunnel.arrDataY[3], "78%", "50%", "#ffffff")
    ],
    tooltip: {
      show: true,
      formatter: function(params) {
        console.log(params, "params");
        
        // 找到 "项" 字符的位置
        let index = params.name.indexOf('项');
        
        // 截取从字符串开头到 "项" 前的部分
            let result = params.name.substring(0, index);

        // 使用 replace 方法将 "项目总金额：" 替换为空
        let resultNum = params.data.number.replace("占比：", "");

        return params.marker +  result + resultNum;
      }
    },
    grid: {
      left: "0%",
      top: "19%",
      bottom: "0%"
    },
    xAxis: {
      show: false,
      data: ["", "", "", ""],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#5EA2ED",
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: "#1B5BBA"
        }
      }
    },
    yAxis: {
      show: false,
      splitLine: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: "#1B5BBA"
        }
      },
      axisLabel: {
        color: "#5EA2ED",
        interval: 0
      }
    },
    series: [
      {
        type: "pictorialBar",
        data: seriesData
        // 添加graphic元素绘制一条线
      }
    ],
    // graphic: {
    //   elements: [
    //     {
    //       type: "polyline", // 改为 'polyline' 用于绘制折线
    //       z: -10, // 设置层级
    //       style: {
    //         stroke: "#ff0000", // 线条颜色
    //         lineWidth: 2 // 线条宽度
    //       },
    //       // shape: {
    //       //   points: [
    //       //     // 定义多个点来绘制折线
    //       //     [-110, -252], // 第一个点
    //       //     [-110, -252] // 第二个点
    //       //   ]
    //       // },
    //       left: "center", // 水平居中
    //       top: "center" // 垂直居中
    //     }
    //   ]
    // }
  };

  return {
    options
  };
}
