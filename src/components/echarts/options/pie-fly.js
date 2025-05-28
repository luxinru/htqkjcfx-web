export default function pieFlyChar(arr) {
  const colorGroup = ["#ffac26", "#1890ff", "#7d5afb", "#1ee7e7"];
  const count = arr.reduce((a, b) => {
    if (typeof a === "number") {
      return a + b.value;
    } else {
      return a.value + b.value;
    }
  });
  const data = arr.map((item, index) => {
    return {
      ...item,
      itemStyle: {
        color: colorGroup[index % 4]
      }
    };
  });
  const options = {
    title: {
      // text: '专业类别',
      top: "56%",
      left: "29%",
      itemGap: 15,
      textStyle: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: 400
      },
      z: 1000
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      icon: "roundRect",
      orient: "vertical",
      itemWidth: 8,
      itemHeight: 8,
      right: "right",
      textStyle: {
        color: "#fff"
      },
      formatter: e => {
        let str = e;
        for (let el of arr) {
          if (el.name === e) {
            str += ` ${((el.value / count) * 100).toFixed(0)}% (${el.value})`;
          }
        }
        return str;
      }
    },
    series: [
      {
        type: "pie",
        roseType: "radius",
        radius: ["15%", "60%"],
        center: ["40%", "60%"],
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        data: data,
        z: 100
      },
      {
        type: "pie",
        radius: ["15%", "35%"],
        center: ["40%", "60%"],
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0.4)"
          }
        },
        data: arr,
        z: 101
      }
    ]
  };
  return {
    options
  };
}
