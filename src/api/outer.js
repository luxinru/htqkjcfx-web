const api1 = function() {
  return Promise.resolve([
    {
      name: "同方威视",
      id: 1
    },
    {
      name: "同方数科",
      id: 2
    },
    {
      name: "同方能源",
      id: 3
    },
    {
      name: "中核医疗",
      id: 4
    },
    {
      name: "中核深圳",
      id: 5
    },
    {
      name: "同方工业",
      id: 6
    },
    {
      name: "同方友友",
      id: 7
    },
    {
      name: "同方科创",
      id: 8
    },
    {
      name: "同方科技园",
      id: 9
    },
    {
      name: "同方物业",
      id: 10
    }
  ]);
};

const api2 = function(id) {
  return Promise.resolve([
    {
      id: 1,
      icon: require("@/assets/img/home/center_icon1.png"),
      iconActive: require("@/assets/img/home/center_icon1_active.png"),
      title: "集团外营业收入",
      value: "50.24",
      unit: "亿元",
      valueColor: "#1bffcc",
      compareValue: "15.47",
      compareUnit: "亿元",
      comparePercent: "3.4",
      planRate: "72.4",
      planValue: "50.47"
    },
    {
      id: 2,
      icon: require("@/assets/img/home/center_icon2.png"),
      iconActive: require("@/assets/img/home/center_icon2_active.png"),
      title: "利润总额",
      value: "-2.24",
      unit: "亿元",
      valueColor: "rgba(255, 51, 85, 1)",
      compareValue: "1.47",
      compareUnit: "亿元",
      comparePercent: "3.4",
      planRate: "72.4",
      planValue: "50.47"
    },
    {
      id: 3,
      icon: require("@/assets/img/home/center_icon3.png"),
      iconActive: require("@/assets/img/home/center_icon3_active.png"),
      title: "集团外累计新签合同",
      value: "69.24",
      unit: "亿元",
      valueColor: "#1bffcc",
      compareValue: "255.47",
      compareUnit: "亿元",
      comparePercent: "3.4",
      planRate: "72.4",
      planValue: "50.47"
    }
  ]);
};

const api3 = function() {
  return Promise.resolve({
    xAxisData: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    series: [
      {
        name: "完成值",
        data: [2, -4, 5.5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        color: {
          start: "rgba(182, 70, 31, 1)",
          end: "rgba(248, 156, 124, 1)"
        },
        background: "rgba(114, 59, 40, 0.3)"
      },
      {
        name: "计划值",
        data: [1.3, 2.1, 6.2, 1.1, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 1.2],
        color: {
          start: "rgba(0, 76, 214, 1)",
          end: "rgba(0, 165, 234, 1)"
        },
        background: "rgba(0, 80, 144, 0.3)"
      },
      {
        name: "完成率",
        data: [150, 193, 160, 180],
        color: "rgba(37, 255, 80, 1)"
      }
    ]
  });
};

const api4 = function() {
  return Promise.resolve([
    {
      name: "营业收现率",
      value: "14.2%",
      target: "72%",
      compareType: "超年度目标",
      compareValue: "1.2个百分点",
      isNegative: false,
      yearOnYear: {
        value: "15.5%",
        isNegative: true
      }
    },
    {
      name: "净资产收益率",
      value: "17.8%",
      target: "72%",
      compareType: "年度目标差距",
      compareValue: "1.2个百分点",
      isNegative: true,
      yearOnYear: {
        value: "20.5%",
        isNegative: false
      }
    },
    {
      name: "资产负债率",
      value: "17.8%",
      target: "72%",
      compareType: "超年度目标",
      compareValue: "1.2个百分点",
      isNegative: false,
      yearOnYear: {
        value: "15.7%",
        isNegative: false
      }
    },
    {
      name: "研发投入强度",
      value: "17.8%",
      target: "72%",
      compareType: "超年度目标",
      compareValue: "1.2个百分点",
      isNegative: false,
      yearOnYear: {
        value: "2.79%",
        isNegative: true
      }
    },
    {
      name: "全员劳动生产率",
      value: "43万元/人年",
      target: "39万元/人年",
      compareType: "年度目标差距",
      compareValue: "10.1万元/人年",
      isNegative: true,
      yearOnYear: {
        value: "1.5万元/人年",
        isNegative: false
      }
    }
  ]);
};

const api5 = function() {
  return Promise.resolve({
    xData2: ["总数", "正常", "滞后", "需要关注"],
    data1: [32, 27, 13, 10],
    data2: [40, 40, 40, 40]
  });
};

const api6 = function() {
  return Promise.resolve([
    {
      id: 1,
      serial: "D2-01",
      name: "数字化转型",
      plan: "数字化转型基础能力建设",
      target: 3,
      done: 2,
      targetValue: "1.数字化转型基础能力建设...(省略)",
      dept: "科教部",
      progressMonth: "(1) 已经按计划100%完成试点工作...(省略)",
      progressTotal: "(1) 已经按计划100%完成试点工作...(省略)",
      deviation: "否",
      forecast: ""
    },
    {
      id: 2,
      serial: "",
      name: "产业数字化建设",
      plan: "",
      target: "",
      done: "",
      targetValue: "2.产业数字化建设",
      dept: "科教部",
      progressMonth: "",
      progressTotal: "",
      deviation: "",
      forecast: ""
    },
    {
      id: 3,
      serial: "",
      name: "核心工业软件研发与应用",
      plan: "核心工业软件研发与应用",
      target: 2,
      done: 2,
      targetValue: "3.核心工业软件研发与应用",
      dept: "科教部",
      progressMonth: "",
      progressTotal: "",
      deviation: "",
      forecast: ""
    },
    {
      id: 4,
      serial: "D2-11",
      name: "ERP平台建设",
      plan: "ERP平台建设",
      target: 2,
      done: 2,
      targetValue: "按集团公司ERP建设",
      dept: "科教部",
      progressMonth: "",
      progressTotal: "",
      deviation: "",
      forecast: ""
    },
    {
      id: 5,
      serial: "D2-12",
      name: "司库建设",
      plan: "司库建设",
      target: 4,
      done: 1,
      targetValue: '1.按要求完成"司库建设"',
      dept: "科教部",
      progressMonth: '1.按要求完成"司库"',
      progressTotal: '1.按要求完成"司库"',
      deviation: "否",
      forecast: ""
    },
    {
      id: 6,
      serial: "D2-13",
      name: "司库建设",
      plan: "司库建设",
      target: 4,
      done: 3,
      targetValue: "3按集团公司",
      dept: "科教部",
      progressMonth: "",
      progressTotal: "3按集团公司",
      deviation: "否",
      forecast: ""
    }
  ]);
};

export { api1, api2, api3, api4, api5, api6 };
