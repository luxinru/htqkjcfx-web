import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './styles/common.scss';

// Vue.config.productionTip = false;
// 公共样式
import "./assets/css/common.scss";
// 公共方法
// import './plugin/common.js'
// 时间格式转化
import DateUtil from "./utils/date";
Vue.prototype.$DateUtil = DateUtil;
// 树形数据处理
import TreeUtil from "./utils/tree";
Vue.prototype.$TreeUtil = TreeUtil;
// wps
import wps from "./utils/wps-ext";
Vue.prototype.$Wps = wps;
// http
import "./request/http";
//引入moment
import * as moment from "moment";
Vue.prototype.$moment = moment;

// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { $money100m } from "./utils/helper";
Vue.use(ElementUI);

Vue.prototype.$money100m = $money100m;

// 创建事件总线
export const EventBus = new Vue();
Vue.prototype.$EventBus = EventBus;

// ant-design-vue
// import Antd from 'ant-design-vue';
// import "ant-design-vue/dist/antd.css";
// import { Icon } from 'ant-design-vue';
// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: 'iconfont.js'
// });
// Vue.use(Antd);
// Vue.component('IconFont', IconFont)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
