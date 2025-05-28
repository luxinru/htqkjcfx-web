import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {
  // 获取产业详情统计
  queryKsqycyxqtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryKsqycyxqtj`, data)
  },
  // 获取月度亏损企业数趋势统计
  queryKsqyydkstj(data) {
    return axios.post(`${server}/api/jjyxjc/queryKsqyydkstj`, data)
  },
  // 获取月度详情统计
  queryKsqyydxqtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryKsqyydxqtj`, data)
  },
  // 获取亏损子企业明细统计
  queryKsqyzqytj(data) {
    return axios.post(`${server}/api/jjyxjc/queryKsqyzqytj`, data)
  },
  // 获取亏损企业数|亏损额|微利户统计
  queryKsqyzstj(data) {
    return axios.post(`${server}/api/jjyxjc/queryKsqyzstj`, data)
  },
 

};
