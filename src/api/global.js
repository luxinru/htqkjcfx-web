import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/sjhz-server/api/htqkjcfx/";

export default {
  // 合同机构树
  queryGlkjdwlb(data) {
    return axios.post(`/tbrw-server/api/cydw/queryGlkjdwlb`, data);
  },
  // 获取合同大屏初始化
  getDpzxjg(data) {
    return axios.post(`${server}getDpzxjg`, data)
  },
  // 获取合同大屏-可转换合同额
  getHtdpKzhhte(data) {
    return axios.post(`${server}getHtdpKzhhte`, data);
  },
  // 获取合同大屏-中央8颗小球监测列表
  getHtdpzyxq(data) {
    return axios.post(`${server}getHtdpzyxq`, data);
  },
  // 获取合同大屏-累计转化收入额
  getHtdpljzhsre(data) {
    return axios.post(`${server}getHtdpljzhsre`, data);
  },
  // 获取合同大屏-累计合同转化率
  getHtdpljhtzhl(data) {
    return axios.post(`${server}getHtdpljhtzhl`, data);
  },
  // 获取合同大屏-合同金额历年变动情况列表
  getHtdphtjeln(data) {
    return axios.post(`${server}getHtdphtjeln`, data);
  },
  // 获取合同大屏-合同金额分布情况列表
  getHtdphtjefb(data) {
    return axios.post(`${server}getHtdphtjefb`, data);
  },
  // 获取合同大屏-逾期项目情况
  getHtdpyqqkzs(data) {
    return axios.post(`${server}getHtdpyqqkzs`, data);
  },
  // 获取合同大屏-项目状态分布情况列表
  getHtdpxmztfb(data) {
    return axios.post(`${server}getHtdpxmztfb`, data);
  }
};
