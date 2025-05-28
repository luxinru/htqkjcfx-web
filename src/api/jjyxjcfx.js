import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";

export default {
    // 获取组织树
    queryJgsdwlb(data) {
      return axios.post(`${server}/api/jjyxjc/queryJgsdwlb`, data)
    },
    //专题分析统计
    queryJjyxjcztfxtj(data){
      return axios.post(`${server}/api/jjyxjc/queryJjyxjcztfxtj`, data)
    }
};
