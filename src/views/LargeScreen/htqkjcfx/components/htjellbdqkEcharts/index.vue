<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\htjellbdqkEcharts\index.vue
-->
<template>
   <div class="htjellbdqkEcharts">
    <div class="label">
      <custom-tabs v-model="tab" :tabsList="tabsList" @changeTab="changeTab" />
    </div>
    <img class="switch"  :src="islable?require('../../../../../assets/img/LargeScreen/yjxs.png'):require('../../../../../assets/img/LargeScreen/yjyc.png')" @click="isLableFun"></img>
  <charts charType="line" :charData="lineChar" :xAxis="xAxis"   :activeMc="activeMc" :islable="islable"></charts>
   </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/global.js";
// import { $money100m } from "../../../../../utils/helper";
import customTabs from "@/components/customTabs.vue";
export default {
  components: { Charts,customTabs },
  name: "HtjellbdqkEcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (newVal.pd && newVal.rq) {
          this.getData();
        }
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
  },
  data() {
    return {
      // lineChar: [
      //   [120, 132, 101, 134, 90, 230, 210],
      //   [220, 182, 191, 234, 290, 330, 310]
      // ],
      // xAxis: [
      //   "2014年",
      //   "2015年",
      //   "2016年",
      //   "2017年",
      //   "2018年",
      //   "2019年",
      //   "2020年"
      // ]
      lineChar: [],
      lineCharcopy: [],
      xAxis: [],
      activeMc: [],
      tabsList: [
        { label: "累计新签合同额", value: 1, prop: "xqhte", },
        { label: "期末手持合同总额", value: 2, prop: "qmschtze", },
      
      ],
      tab: 1,
      islable: false,
    };
  },
  methods: {
    async getData() {
      const result = await api.getHtdphtjeln(this.form);
      this.data = result;
      this.changeTab(this.tab);
    
      const lineCharXqhte = [];
      const lineCharQmschtze = [];
      const xAxis = [];
      result.forEach(item => {
        xAxis.push(item.rq);
        lineCharXqhte.push(item.xqhte);
        lineCharQmschtze.push(item.qmschtze);
      });
      // this.lineChar = lineCharXqhte.concat(lineCharQmschtze);
      this.lineCharcopy = [lineCharXqhte, lineCharQmschtze];
      this.lineChar= this.lineCharcopy[this.tab-1]
      this.xAxis = xAxis;
      this.activeMc= this.tabsList[this.tab-1].label
      // console.log(this.lineChar, this.xAxis,'lineCharXqhte');
    },
       // 切换tabs
       changeTab(value) { 
        this.lineChar= this.lineCharcopy[value-1]
        this.activeMc= this.tabsList[this.tab-1].label
      // const currentTabProp = this.lineChar.find(item => item.value === value)
      //   .prop;
      // this.pieCharArr = this.data.map(item => {
      //   return {
      //     name: item.dwmc,
      //     value: item[currentTabProp] | 0,
      //     // dwbm: item.dwbm
      //   };
      // });
    },
    isLableFun() {
      this.islable=!this.islable
    }
  }
};
</script>

<style lang="scss" scoped>
.htjellbdqkEcharts{
  width: 100%;
  height: 180px;
  // height: 100%;
  position: relative;
  .switch{
    position: absolute;
    left: 100px;
    top: 40px;
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
