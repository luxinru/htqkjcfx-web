import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {
  // 获取组织树
  queryJgsdwlb(data) {
    return axios.post(`${server}/api/jjyxjc/queryJgsdwlb`, data);
  },
  // 合同机构树
  queryGlkjdwlb(data) {
    return axios.post(`/tbrw-server/api/cydw/queryGlkjdwlb`, data);
  },
  //【合同情况监测分析】查询合同指标趋势分析
  queryHtzbqsfx(data) {
    return axios.post(`${server}/api/jjyxjc/queryHtzbqsfx`, data);
  },
  //【合同情况监测分析】查询合同指标分析
  queryHtzbcyfbqk(data) {
    return axios.post(`${server}/api/jjyxjc/queryHtzbcyfbqk`, data);
  }
};
