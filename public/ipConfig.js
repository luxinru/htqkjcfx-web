//开发用
// window.BASEURL = "http://192.168.8.173:58086"; //后端本地地址
// window.BASEURL = "http://192.168.1.60:58888"; //后端本地地址
window.BASEURL = "/stat/prod-api"; //test 环境
// window.BASEURL = "http://10.10.60.18/stat/prod-api";

/**
 * @description 用于覆盖生产环境的BASEURL
 * 默认取 location.origin + stat/prod-api
 * 如果有值会覆盖掉上面的默认值
 */
window.PRO_BASEURL = "";
