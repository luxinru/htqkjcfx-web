import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {


  // 获取经营收入统计
  getGjhjysrtj(data) {
    return axios.post(`${server}/api/jjyxjc/getGjhjysrtj`, data)
  },
  //
  // 获取新签合同额统计
  getGjhxqhtetj(data) {
    return axios.post(`${server}/api/jjyxjc/getGjhxqhtetj`, data)
  },
  // 获取经营收入占比详情统计
  queryGjhjysrzbtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryGjhjysrzbtj`, data)
  },
  //获取新签合同额占比详情统计
  queryGjhxqhtezbtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryGjhxqhtezbtj`, data)
  },
  // 获取经营收入|新签合同额月度详情统计
  queryGjhydxqtj(data) {
    return axios.post(`${server}/api/jjyxjc/queryGjhydxqtj`, data)
  },


};
