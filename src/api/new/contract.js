import axios from "@/request/http"; // 导入http中创建的axios实例
const server = "/znbg-server";
const server2 = "/ysjgl-server";

export default {
  queryJgsdwlb(data) {
    return axios.post(`${server}/api/jjyxjc/queryJgsdwlb`, data);
  },

  queryZhiBiaoList(data) {
    return axios.get(`${server}/api/jjyxjcV2/zhiBiaoList`, { params: data });
  },

  queryHtjebhqk(data) {
    return axios.get(`${server}/api/jjyxjcV2/htjebhqk`, { params: data });
  },

  queryKhdyfbList(data) {
    return axios.get(`${server}/api/jjyxjcV2/khdyfbList`, { params: data });
  },

  queryMltms(data) {
    return axios.post(`${server2}/api/mlgl/getMltm`, data);
  },

  queryMltmsList(data) {
    return axios.post(`${server2}/api/mlgl/queryMltmcj`, data);
  },

  queryKhslList(data) {
    return axios.get(`${server}/api/jjyxjcV2/khslList`, { params: data });
  },

  queryKhlxfx(data) {
    return axios.get(`${server}/api/jjyxjcV2/khlxfx`, { params: data });
  },

  queryKhgxdfx(data) {
    return axios.get(`${server}/api/jjyxjcV2/khgxdfx`, { params: data });
  },

  queryKhgxdfxList(data) {
    return axios.get(`${server}/api/jjyxjcV2/khgxdfxList`, { params: data });
  },

  queryKhpfms(data) {
    return axios.get(`${server}/api/jjyxjcV2/khpfm`, { params: data });
  },

  queryPfmPage(data) {
    return axios.get(`${server}/api/jjyxjcV2/pfmPage`, { params: data });
  },

  queryKhzb(data) {
    return axios.get(`${server}/api/jjyxjcV2/khzb`, { params: data });
  },

  queryKhpfmConfig(data) {
    return axios.get(`${server}/api/jjyxjcV2/khpfmConfig`, { params: data });
  }
};