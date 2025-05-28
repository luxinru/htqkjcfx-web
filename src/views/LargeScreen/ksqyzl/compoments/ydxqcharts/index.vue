<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\htjellbdqkEcharts\index.vue
-->
<template>
  <div class="ydxqcharts">
    <img class="switch"  :src="islable?require('../../../../../assets/img/LargeScreen/yjxs.png'):require('../../../../../assets/img/LargeScreen/yjyc.png')" @click="isLableFun"></img>
    <charts
    charType="ydxqLine"
    :charData="lineChar"
    :xAxis="xAxis"
    :names="lineNames"
    :islable="islable"
  ></charts>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/ksqyzl.js";
import { $money100m } from "../../../../../utils/helper";
export default {
  components: { Charts },
  name: "ydxqcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    // 只监听 form.dezb 的变化
    "form.dezb": {
      handler(newVal, oldVal) {
        // 只有在 form.dezb 发生变化时才调用 getData
        this.getData();
      }
      // immediate: true // 如果需要在初始化时立即触发，可以取消注释
    }
  },

  data() {
    return {
      lineChar: [],
      xAxis: [],
      lineNames: [],
      islable: false
    };
  },
  methods: {
    async getData() {
      const dwbm = JSON.parse(sessionStorage.getItem("dwlb")).dwbm || "";
      const result = await api.queryKsqyydxqtj({ ...this.form, dwbm });
      this.xAxis = result.map(item => item.yfmc);
      if (this.form.dezb == "ksqys") {
        this.lineNames = ["亏损企业数"];
        this.$set(
          this.lineChar,
          0,
          result.map(item => item.ksqysjz)
        );
      } else if (this.form.dezb == "kse") {
        this.lineNames = ["亏损额"];
        this.$set(
          this.lineChar,
          0,
          result.map(item => $money100m(item.ksesjz))
        );
      } else if (this.form.dezb == "wlh") {
        this.lineNames = ["微利户数"];
        this.$set(
          this.lineChar,
          0,
          result.map(item => item.wlhsjz)
        );
      }
      // 使用 Vue.set 或 this.$set 来确保响应式更新
    },
    isLableFun() {
      this.islable = !this.islable;
    }
  }
};
</script>

<style lang="scss" scoped>
.ydxqcharts{
  width: 100%;
  height: 100%;
  position: relative;
  .switch{
    position: absolute;
    left: 80px;
    top: 12px;
    z-index: 999;
    color:#666;
  }
  ::v-deep .el-switch__core{
    height: 14px;
  }
  ::v-deep .el-switch__core:after{
    top: 0;
    width: 12px;
    height: 12px;
  }
 
}

</style>
