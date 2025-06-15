// HTTP拦截器
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Message, MessageBox } from "element-ui";
import VueRouter from "vue-router";

// 部署时，动态获取
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL =
    window.PRO_BASEURL || `${location.origin}`;
} else {
  // 本地时，调试用
  axios.defaults.baseURL = window.BASEURL;
}

// 创建axios实例
const instance = axios.create({
  // // 是否跨站点访问控制请求
  // withCredentials: true,
  timeout: 1000 * 60
});
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 请求前拦截
instance.interceptors.request.use(
  config => {
    // 获取token，并将其添加至请求头中
    const tokenName = window.sessionStorage.getItem("tokenName") || "tf_token";
    const token = window.sessionStorage.getItem("token");
    const dwbm = window.sessionStorage.getItem("dwbm");
    config.headers["dwbm"] = dwbm || "";
    config.headers[tokenName] = token || "";

    if (process.env.NODE_ENV !== "production") {
      const env = "!DEV";
      const testToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiI1RjUxMDUxMjNEN0Q0QzAxQUM3NEY0QTEyMTBGOTM5MSIsInJuU3RyIjoiYXZ3RktZektPcGUzcVVBNHBYOTFIcExJY2dFaEI3QW0ifQ.fOctqa7POUfn9XiEPycsq4DaD5-hDcHmkAM3XZgTBrw";

      const devToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiIxNEQxRDlEQjk0MjQ0MjJFOEFDRkMwODVFRUNCQzNFQiIsInJuU3RyIjoiYTNySFdmTm1hWktsUFMxQXgyTm16UUdScFhyRnA3anYifQ.Pzt2hLAJkyZEfM2eKTm2Bj1B9jq3qExarIOnVFjSZTM";
      config.headers[tokenName] = env === "DEV" ? devToken : testToken;
      config.headers["dwbm"] = "1BBCC8DE0C0C4A9E8A4BECD3FD26AC95";
      document.cookie = `tf_token=${env === "DEV" ? devToken : testToken}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 不需要在请求返回后统一处理的URL
const EXCLUDE_URLS = ["/file/dowload"];

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // 请求结果不做处理，直接返回
    if (res.config.url && EXCLUDE_URLS.indexOf(res.config.url) >= 0) {
      return Promise.resolve(res.data);
    }

    console.log("请求成功:", res.data.code, res.config.baseURL, res.config.url);

    if (res.data.code === 0) {
      if (res.data.data && res.data.data.token) {
        // 缓存令牌信息
        window.sessionStorage.setItem("tokenName", res.data.data.tokenName);
        window.sessionStorage.setItem("token", res.data.data.token);
        // 清空令牌信息
        res.data.data.tokenName = "";
        res.data.data.token = "";
      }
      return Promise.resolve(res.data.data);
    } else if (res.data.code === 200) {
      return Promise.resolve(res.data.data);
    } else {
      // 服务端返回异常
      console.log(
        "请求失败:",
        res.data.code,
        res.config.baseURL,
        res.config.url
      );
      console.log("返回值", res.data);
      const errMsg = HTTP_STATUS[
        `CODE_${res.data.code === -1 ? "_1" : res.data.code}`
      ]
        ? HTTP_STATUS[`CODE_${res.data.code === -1 ? "_1" : res.data.code}`].msg
        : "";
      /*
        当msg存在说明此错误在这已经处理
        msg没值的错误需要功能处自行判断处理方式
         */
      if (errMsg) {
        processError(
          res.data.code,
          HTTP_STATUS[`CODE_${res.data.code === -1 ? "_1" : res.data.code}`]
        );
      }
      return Promise.reject({
        code: res.data.code,
        isError: !!errMsg, // true:错误不做处理，false:错误由业务代码处理
        message: res.data.message
      });
    }
  },
  // 请求失败
  error => {
    // 请求超时
    const status =
      (error.response && error.response.status && error.response.status) || "";
    const errMsg = status
      ? HTTP_STATUS["CODE_" + status].msg
      : `连接出错(${error.code})`;
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      isError: false,
      code: error.response ? error.response.status : "",
      message: error.response.data.message
    });
  }
);
/*
  对接口错误处理
  区分业务和功能
  业务错误在具体代码中处理
  功能性错误直接处理
 */
function processError(code, error) {
  switch (error.handler) {
    case "message":
      Message({
        type: error.type === "warning" ? "warning" : "error",
        message: error.msg
      });
      break;
    case "toLogin":
      // eslint-disable-next-line no-case-declarations
      const dom = document.getElementsByClassName("el-overlay-message-box");
      if (dom && dom.length > 0) {
        return;
      }
      MessageBox.confirm(error.msg, "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        // 跳回登录
        VueRouter.push("/");
      });
      break;
    default:
      break;
  }
}
const HTTP_STATUS = {
  CODE__1: {
    msg: "程序运行发生异常，请联系管理员",
    handler: "message"
  },
  CODE_400: {
    msg: "请求错误(400)，请联系管理员",
    handler: "message"
  },
  CODE_401: {
    msg: "未授权，请重新登录(401)，请联系管理员",
    handler: "toLogin"
  },
  CODE_403: {
    msg: "拒绝访问(403)，请联系管理员",
    handler: "message"
  },
  CODE_404: {
    msg: "未找到(404)，请联系管理员",
    handler: "message"
  },
  CODE_408: {
    msg: "请求超时(408)，请联系管理员",
    handler: "message"
  },
  CODE_500: {
    msg: "服务器错误(500)，请联系管理员",
    handler: "message"
  },
  CODE_501: {
    msg: "服务未实现(501)，请联系管理员",
    handler: "message"
  },
  CODE_502: {
    msg: "网络错误(502)，请联系管理员",
    handler: "message"
  },
  CODE_503: {
    msg: "服务不可用(503)，请联系管理员",
    handler: "message"
  },
  CODE_504: {
    msg: "网络超时(504)，请联系管理员",
    handler: "message"
  },
  CODE_505: {
    msg: "HTTP版本不受支持(505)，请联系管理员",
    handler: "message"
  },
  CODE_10000: {
    msg: "未登录，请先登录",
    handler: "toLogin"
  },
  CODE_10001: {
    msg: "签名验证失败，请联系管理员",
    handler: "message"
  },
  CODE_10002: {
    msg: "访问口令过期，请重新登录",
    handler: "toLogin"
  },
  CODE_10003: {
    msg: "参数无效，请重新输入",
    handler: "message",
    type: "warning"
  },
  CODE_10004: {
    msg: "已登录，请勿重复登录",
    handler: "message"
  },
  CODE_10005: {
    msg: "访问口令过期，请重新登录",
    handler: "toLogin"
  },
  CODE_10006: {
    msg: "无资源访问权限，请联系管理员",
    handler: "message"
  },
  CODE_10007: {
    msg: "缺少必要的签证参数",
    handler: "message"
  },
  CODE_10008: {
    msg: "无效的请求，URL不存在",
    handler: "message"
  },
  CODE_99998: {
    msg: "请求取消后报的异常，无需处理",
    handler: ""
  },
  CODE_99999: {
    msg: "返回参数无效，请联系管理员",
    handler: "message"
  }
};

export default instance;
