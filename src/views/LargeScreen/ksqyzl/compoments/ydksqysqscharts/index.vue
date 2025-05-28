<!-- 月度趋势 -->

<template>
  <div class="chats-container">
    <img class="switch"  :src="islable?require('../../../../../assets/img/LargeScreen/yjxs.png'):require('../../../../../assets/img/LargeScreen/yjyc.png')" @click="isLableFun"></img>
    <charts
    charType="ydksqysqsLine"
    :charData="lineChar"
    :xAxis="xAxis"
     :activeMc="ydksMc"
    :islable="islable"
  ></charts>
  </div>

</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/ksqyzl.js";

export default {
  components: { Charts },
  name: "ydksqysqscharts",
  props: {
    form: Object,
    isRequest: Boolean,
    ydksMc: String,
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (!newVal.dwbm) {
          this.lineChar= [];
          this.xAxis = [];
          return;
        }
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    isRequest: {
      handler(newVal, oldVal) {
        if (!newVal) {
          return;
        };
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    
  },
  data() {
    return {
      lineChar: [
        
      ],
      xAxis: [

      ],
      islable: false,
    };
  },
  methods: {

    async getData() {
      // 
      const result = await api.queryKsqyydkstj(this.form);
      this.lineChar = [result.map(item => item.zbz)];
      this.xAxis = result.map(item => item.yfmc);
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
    left: 80px;
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
