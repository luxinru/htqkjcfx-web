<template>
  <charts charType="htzbqsfx" :charData="lineChar" :xAxis="xAxis" :names="checkList"></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/jjyxjcfx.js";
import { $money100m } from "../../../../utils/helper";
export default {
  components: { Charts },
  name: "htzbqsfxEcharts",
  props: {
    form: Object,
    checkList: Array
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (!newVal.dwbm) return
        this.getData();
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    checkList: {
      handler(newVal, oldVal) {
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
      lineChars: [
      ],
      xAxis: [

      ]
    };
  },
  methods: {
    async getData() {
      const result = await api.queryJjyxjcztfxtj(this.form);
      this.lineChars=result
      this.xAxis = result.map(item => item.nymc )
       this.checkChange();
       // 使用 Vue.set 或 this.$set 来确保响应式更新
    },
    checkChange() {
      
      if(this.checkList&&this.checkList.length>0){
          this.lineChar.length = this.checkList.length; // 清空数组
        this.checkList.map((item, index) => {
          if(item=='营业收入'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.yysr)));
          }else if(item=='利润总额'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.lrze)));
          }else if(item=='净现金流'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.jxjl)));
          }
        })
       
   
      }else{
        this.lineChar = [];
        this.xAxis = []
      }
    }
  },
  // mounted() {
  //   this.getData();
  // },
};
</script>

<style lang="scss" scoped></style>
