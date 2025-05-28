
<template>
  <div class="chats-container">
    <img class="switch"  :src="islable?require('../../../../../assets/img/LargeScreen/yjxs.png'):require('../../../../../assets/img/LargeScreen/yjyc.png')" @click="isLableFun"></img>
    <charts charType="zdxmjcLine" :charData="lineChar" :xAxis="xAxis"   :unit="'个'" :islable="islable"></charts>
  </div>
 
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/zdxmjc.js";

export default {
  components: { Charts },
  name: "xmsndtzqsEcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if(!newVal.xmssjzzbdm) return;
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
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
      const parmas={
        
        sjzzbdm: this.form.xmssjzzbdm,
        jzsj: this.form.jzsj,
      }
      const result = await api.queryZdxmndtzqstj(parmas);
      result.reverse();
      // console.log(result, "xmsndtzqsEcharts");
      
      if(result&&result.length>0){
        this.xAxis=result.map(item=>item.nfmc)
        let resultsjz=result.map(item=>item.sjz)
        this.lineChar=[resultsjz]
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

