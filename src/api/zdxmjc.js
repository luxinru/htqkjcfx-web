import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {


  // 获取资产负债率|营业现金比率|净资产收益率|研发投入强度统计
  getJjyxwltj(data) {
    return axios.post(`${server}/api/jjyxjc/getJjyxwltj`, data)
  },
  //
  // 获取投资金额分布统计
  getZdxmtzjefbtj(data) {
    return axios.post(`${server}/api/jjyxjc/getZdxmtzjefbtj`, data)
  },
  //获取投资金额统计
  getZdxmtzjetj(data) {
    return axios.post(`${server}/api/jjyxjc/getZdxmtzjetj`, data)
  },
  //获取投资项目数分布统计
  getZdxmtzxmsfbtj(data) {
    return axios.post(`${server}/api/jjyxjc/getZdxmtzxmsfbtj`, data)
  },
  //获取投资项目数统计
  getZdxmtzxmstj(data) {
    return axios.post(`${server}/api/jjyxjc/getZdxmtzxmstj`, data)
  },
    //获取股权投资统计
    queryZdxmgqtztj(data) {
      return axios.post(`${server}/api/jjyxjc/queryZdxmgqtztj`, data)
    },
    //获取固定资产投资统计
    queryZdxmgdzctztj(data) {
      return axios.post(`${server}/api/jjyxjc/queryZdxmgdzctztj`, data)
    },
  
  //获取年度投资趋势统计
  queryZdxmndtzqstj(data) {
    return axios.post(`${server}/api/jjyxjc/queryZdxmndtzqstj`, data)
  },
   //获取重点项目详情统计
  getZdxmtzxqtj(data) {
    return axios.post(`${server}/api/jjyxjc/getZdxmtzxqtj`, data)
  }
  
};
