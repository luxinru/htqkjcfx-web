const api1 = function() {
  return Promise.resolve([
    {
      label: "EVA",
      value: "153.24",
      unit: "亿元",
      planValue: "255.47",
      completionRate: 75,
      valueColor: "#1bffcc",
      gradientColors: {
        start: "rgba(0, 80, 144, 1)",
        end: "rgba(0, 243, 114, 1)"
      }
    },
    {
      label: "科技投入",
      value: "85.36",
      unit: "亿元",
      planValue: "94.237",
      completionRate: 85,
      valueColor: "rgba(63, 241, 255, 1)",
      gradientColors: {
        start: "rgba(0, 80, 144, 1)",
        end: "rgba(0, 236, 255, 1)"
      }
    }
  ]);
};

const api2 = function() {
  return Promise.resolve({
    title: "威视、数科、能源营收\n占集团外营收比例",
    targetValue: "51.9%",
    completedValue: "47.7%",
    progressData: [
      {
        name: "同方威视",
        value: "9.47",
        chartValue: 0.7
      },
      {
        name: "同方数科",
        value: "1.24",
        chartValue: 0.5
      },
      {
        name: "同方能源",
        value: "4.38",
        chartValue: 0.4
      }
    ]
  });
};

const api3 = function() {
  return Promise.resolve({
    targetValue: 78,
    completedValue: 32.5,
    chart1Value: 65,
    chart2Value: 73
  });
};

const api4 = function() {
  return Promise.resolve([
    {
      label: "营业收入",
      value: "20.24",
      unit: "亿元",
      planValue: "33.47",
      completionRate: 76,
      valueColor: "rgba(27, 255, 204, 1)"
    },
    {
      label: "新签合同额",
      value: "25.24",
      unit: "亿元",
      planValue: "40.47",
      completionRate: 85,
      valueColor: "rgba(63, 241, 255, 1)"
    }
  ]);
};

const api5 = function() {
  return Promise.resolve([
    {
      icon: require("@/assets/img/home/center_bottom2_icon1.png"),
      investment: {
        label: "固投投资金额",
        value: "52.91",
        unit: "亿元",
        planValue: "83亿元",
        completionRate: "45%"
      },
      project: {
        label: "固投投资项目数",
        value: "6",
        unit: "个",
        normal: "5个",
        lagging: "1个"
      }
    },
    {
      icon: require("@/assets/img/home/center_bottom2_icon2.png"),
      investment: {
        label: "股投投资金额",
        value: "45.91",
        unit: "亿元",
        planValue: "123亿元",
        completionRate: "60%"
      },
      project: {
        label: "股投投资项目数",
        value: "7",
        unit: "个",
        normal: "5个",
        lagging: "2个"
      }
    }
  ]);
};

const api6 = function() {
  return Promise.resolve([
    {
      value: 60.71,
      name: "中核医疗",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#4FC3F7" },
            { offset: 0.5, color: "#29B6F6" },
            { offset: 1, color: "#1E88E5" }
          ]
        }
      }
    },
    {
      value: 45.7,
      name: "核技术应用",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#FF8A65" },
            { offset: 0.5, color: "#FF7043" },
            { offset: 1, color: "#FF5722" }
          ]
        }
      }
    },
    {
      value: 30.5,
      name: "智慧能源",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#FFD54F" },
            { offset: 0.5, color: "#FFCA28" },
            { offset: 1, color: "#FFC107" }
          ]
        }
      }
    },
    {
      value: 24.6,
      name: "其他",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#81C784" },
            { offset: 0.5, color: "#66BB6A" },
            { offset: 1, color: "#4CAF50" }
          ]
        }
      }
    },
    {
      value: 23.2,
      name: "核医疗",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#BA68C8" },
            { offset: 0.5, color: "#AB47BC" },
            { offset: 1, color: "#9C27B0" }
          ]
        }
      }
    },
    {
      value: 21.7,
      name: "数字信息",
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#4DB6AC" },
            { offset: 0.5, color: "#26A69A" },
            { offset: 1, color: "#009688" }
          ]
        }
      }
    }
  ]);
};

const api7 = function() {
  return Promise.resolve([
    { value: -2.1, name: "核技术应用", benqi: 120, rate: "8%" },
    { value: 8.2, name: "中核医疗", benqi: 580, rate: "32%" },
    { value: 10.1, name: "数据信息", benqi: 800, rate: "40%" },
    { value: -5.6, name: "同方能源", benqi: 60, rate: "3%" },
    { value: 7.9, name: "其他", benqi: 400, rate: "17%" }
  ]);
};

const api8 = function() {
  return Promise.resolve([
    {
      name: "同方威视",
      currentValue: "782.65",
      planValue: "985.36",
      completionRate: "12%",
      lastYearValue: "269.23",
      growthValue: "124.4",
      growthRate: "-12.69%"
    },
    {
      name: "同方数科",
      currentValue: "55.21",
      planValue: "47.23",
      completionRate: "32%",
      lastYearValue: "147.23",
      growthValue: "13.42",
      growthRate: "-12.69%"
    },
    {
      name: "同方能源",
      currentValue: "412.3",
      planValue: "441.23",
      completionRate: "55.23%",
      lastYearValue: "5.47",
      growthValue: "258",
      growthRate: "-12.69%"
    },
    {
      name: "中核医疗",
      currentValue: "143.2",
      planValue: "46.28",
      completionRate: "47.69%",
      lastYearValue: "14.69",
      growthValue: "36.1",
      growthRate: "-12.69%"
    },
    {
      name: "中核深圳",
      currentValue: "52.0",
      planValue: "25.36",
      completionRate: "51.64%",
      lastYearValue: "4.95",
      growthValue: "63",
      growthRate: "-12.69%"
    },
    {
      name: "同方工业",
      currentValue: "45.96",
      planValue: "456.82",
      completionRate: "14.84%",
      lastYearValue: "44.2",
      growthValue: "57.23",
      growthRate: "-12.69%"
    },
    {
      name: "同方友友",
      currentValue: "412.3",
      planValue: "412.3",
      completionRate: "47.69%",
      lastYearValue: "147.23",
      growthValue: "13.42",
      growthRate: "-12.69%"
    },
    {
      name: "同方科创",
      currentValue: "143.2",
      planValue: "143.2",
      completionRate: "51.64%",
      lastYearValue: "5.47",
      growthValue: "258",
      growthRate: "-12.69%"
    },
    {
      name: "同方科技园",
      currentValue: "52.0",
      planValue: "52.0",
      completionRate: "14.84%",
      lastYearValue: "14.69",
      growthValue: "36.1",
      growthRate: "-12.69%"
    }
  ]);
};

export { api1, api2, api3, api4, api5, api6, api7, api8 };
