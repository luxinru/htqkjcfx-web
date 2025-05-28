import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {
  // 获取组织树
  queryJgsdwlb(data) {
    return axios.post(`${server}/api/jjyxjc/queryJgsdwlb`, data);
  },

  // 获取经济运行营业收入|利润总额|净现金流统计
  getJjyxtj(data) {
    return axios.post(`${server}/api/jjyxjc/getJjyxtj`, data);
  },
  // 获取营业收入|利润总额|净现金流板块详情统计
  queryJjyxbkxqtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxbkxqtj`, data);
  },
  // 获取营业收入|利润总额|净现金流月度趋势统计
  queryJjyxydqstj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxydqstj`, data);
  },
  // 获取经济运行重点任务统计
  queryJjyxzdrwtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxzdrwtj`, data);
  },
  // 获取单位月度五率统计
  queryJjyxdwydwltj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxdwydwltj`, data);
  },
  // 获取下级单位五率统计
  queryJjyxxjdwwltj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxxjdwwltj`, data);
  },
  // 【经济运行】获取经济运行重点任务详情列表
  queryJjyxzdrwxqlb(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxzdrwxqlb`, data);
  },

  // 【经济运行】获取经济运行重点任务详情列表
  queryJjyxdwydlcltj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxdwydlcltj`, data);
  },

  queryJjyxxjdwlcltj(data) {
    return axios.post(`${server}/api/jjyxjc/queryJjyxxjdwlcltj`, data);
  }
};
