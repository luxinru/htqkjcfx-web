<template>
  <charts charType="htzbqsfx" :charData="lineChar" :xAxis="xAxis" :names="checkList"  @htzbqsfxclick="htzbqsfxclick"  ></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/htqkjcztfx.js";
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
    },
   
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
      if(!this.form.cxdwbm) return
      const params = {
        cxdwbm: this.form.cxdwbm,
      rq: this.form.rq
      }
      const result = await api.queryHtzbqsfx(params);
      this.lineChars=result
      this.xAxis = result.map(item => item.htqsrq )
       this.checkChange();
    },
    checkChange() {
      
      if(this.checkList&&this.checkList.length>0){
        this.lineChar.length = this.checkList.length; // 清空数组
        this.checkList.map((item, index) => {
          if(item=='合同金额'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.htje)));
          }else if(item=='期末手持合同总额'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.schte)));
          }else if(item=='累计新签合同额'){
            this.$set(this.lineChar, index, this.lineChars.map(item => $money100m(item.xqhte)));
          }
        })
       
   
      }else{
        this.lineChar = [];
        this.xAxis = []
      }
    },
    htzbqsfxclick(val) {
      this.$emit("htzbqsfxclick", val);
      
      
    }
  },
  // mounted() {
  //   this.getData();
  // },
};
</script>

<style lang="scss" scoped></style>
