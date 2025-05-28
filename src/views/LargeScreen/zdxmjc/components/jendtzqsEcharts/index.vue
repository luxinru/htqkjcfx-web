<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\htjellbdqkEcharts\index.vue
-->
<template>
<div class="chats-container">
  <img class="switch"  :src="islable?require('../../../../../assets/img/LargeScreen/yjxs.png'):require('../../../../../assets/img/LargeScreen/yjyc.png')" @click="isLableFun"></img>
  <charts
    charType="zdxmjcLine"
    :charData="lineChar"
    :xAxis="xAxis"
    :unit="'亿元'"
    :islable="islable"
  ></charts>
</div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/zdxmjc.js";
import { $money100m } from "../../../../../utils/helper";

export default {
  components: { Charts },
  name: "jendtzqsEcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {

        if (!newVal.jesjzzbdm) return;
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
  },
  data() {
    return {
      lineChar: [],
      xAxis: [],
      islable: false
    };
  },
  methods: {
    async getData() {
      const parmas = {
        sjzzbdm: this.form.jesjzzbdm,
        jzsj: this.form.jzsj
      };
      const result = await api.queryZdxmndtzqstj(parmas);
      result.reverse();
      // console.log("jendtzqsEcharts", result);

      if (result && result.length > 0) {
        this.xAxis = result.map(item => item.nfmc);

        let resultsjz = result.map(item =>item.sjz!==0? $money100m(item.sjz):0);
        this.lineChar = [resultsjz];
      }
    },
    isLableFun() {
      this.islable = !this.islable;
    }
  }
};
</script>

<style lang="scss" scoped>
.chats-container{
  width: 100%;
  height: 100%;
  position: relative;
  .switch{
    position: absolute;
    left: 100px;
    top: 6px;
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
