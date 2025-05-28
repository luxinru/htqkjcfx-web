<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\htjellbdqkEcharts\index.vue
-->
<template>
  <charts charType="cyxqBar" :charData="lineChar" :xAxis="xAxis"  @changecyxqMkmc="changecyxqMkmc"></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/ksqyzl.js";

export default {
  components: { Charts },
  name: "cyxqcharts",
  props: {
    form: Object,
    isRequest: Boolean,
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if(!newVal.dezb) return
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
      cyxqLIst:[],
      // lineChar: [],
      // xAxis: []
    };
  },
  methods: {
    async getData() {
//       this.lineChar  = [
//     "亏损额",  
//     [
//         0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//         1493, 871, 0, 0, 0, 0, 0, 948, 1854, 0,
//         2163, 2771, 13720, 0, 0, 0, 0, 0, 18837, 0,
//         5179, 33, 16623 
//     [
//         0, 0, 0, 0, 0, 0, 0, 0, 0, 400,
//         1900, 0, 0, 0, 0, 0, 0, 210, 0, 0,
//         1950, 1500, 15570, 0, 0, 0, 0, 0, 16600, 0,
//         9000, 0, 180
//     ]   
// ] ]
// this.xAxis=[1,3,2,4,5,6,7,8,9]
// return

      this.$set(this.lineChar, 0, this.form.mkmc);
      const result = await api.queryKsqycyxqtj(this.form);
      if(!result.length) {
        this.cyxqLIst=''
      }
      result.reverse();
      this.$emit('changecyxqMkmc',result[result.length-1])
      this.cyxqLIst= result
      this.xAxis= result.map(item=>item.dwmc)
      this.$set(this.lineChar, 1, result.map(item => item.ksqymbz));
      this.$set(this.lineChar, 2, result.map(item => -1*item.ksqysjz));
    },
    changecyxqMkmc(val){
      const finddwbm = this.cyxqLIst.find(item=>item.dwmc===val)
     this.$emit('changecyxqMkmc',finddwbm)
    }
  },
  // created() {
  //   this.getData();
  // }
};
</script>

<style lang="scss" scoped></style>
