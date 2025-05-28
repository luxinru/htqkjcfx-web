<template>
  <charts
    charType="htzbcyfbqk-Bar"
    :charData="lineChar"
    :xAxis="xAxis"
    :names="radio"

  ></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/htqkjcztfx.js";
import { $money100m } from "../../../../utils/helper";
export default {
  components: { Charts },
  name: "htzbcyfbqkEcharts",
  props: {
    time: String,
    radio: String,
    ishtzbcyfbqk: Boolean,
    form: Object,
 
  },
  watch: {
    time: {
      handler(newVal, oldVal) {
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      // immediate: true // 是否在初始化时立即触发一次回调
    },
    form: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);  
        
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      // immediate: true // 是否在初始化时立即触发一次回调
    },
    radio: {
      handler(newVal, oldVal) {
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      // immediate: true // 是否在初始化时立即触发一次回调
    },
   
  },
  data() {
    return {
      lineChars: [
      ],
      lineChar: [
      ],
      xAxis: [
      ],
    };
  },
  methods: {
    async getData() {
      const params = {
        cxsj: this.time,
        cxdwbm:this.form.cxdwbm,

      };
      const result = await api.queryHtzbcyfbqk(params);
      this.lineChars=result
      this.xAxis = result.map(item => item.cymc);
      this.radioChange();
      // 使用 Vue.set 或 this.$set 来确保响应式更新
      // this.$set(
      //   this.lineChar,
      //   1,
      //   result.map(item => item.htje)
      // );
      // this.$set(
      //   this.lineChar,
      //   1,
      //   result.map(item => item.htjetb)
      // );
      // this.$set(this.lineChar, 2, result.map(item => item.xqhte));
      // this.$set(this.lineChar, 2, result.map(item => item.jxjl));

      // console.log("合同金额分布情况:", result);
      // this.pieChar = result;
    },
    radioChange() {
      if (this.radio == "合同金额") {
        this.$set(
          this.lineChar,
          0,
          this.lineChars.map(item => $money100m(item.htje))
        );
        this.$set(
          this.lineChar,
          1,
          this.lineChars.map(item => item.htjetb)
        );
      }
      if (this.radio == "期末手持合同总额") {
        this.$set(
          this.lineChar,
          0,
          this.lineChars.map(item => $money100m(item.schte))
        );
        this.$set(
          this.lineChar,
          1,
          this.lineChars.map(item => item.schtetb)
        );
      }
      if (this.radio == "累计新签合同额") {

        this.$set(
          this.lineChar,
          0,
          this.lineChars.map(item => $money100m(item.xqhte))
        );
        this.$set(
          this.lineChar,
          1,
          this.lineChars.map(item => item.xqhtetb)
        );
       
      }
      
    }
  }
};
</script>

<style lang="scss" scoped></style>
