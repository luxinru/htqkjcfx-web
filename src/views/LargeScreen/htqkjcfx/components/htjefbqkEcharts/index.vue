<template>
  <charts charType="funnel" :charData="pieChar"></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/global.js";

export default {
  components: { Charts },
  name: "HtjefbqkEcharts",
  props: {
    form: Object
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
      // pieCharCopy: [
      //   {
      //     jefw: "5000万元以上",
      //     xmsl: 3,
      //     xmzb: "10.77%"
      //   },
      //   {
      //     jefw: "2000-5000万元",
      //     xmsl: 4,
      //     xmzb: "20.12%"
      //   },
      //   {
      //     jefw: "1000-2000万元",
      //     xmsl: 8,
      //     xmzb: "20.27%"
      //   },
      //   {
      //     jefw: "1000万元以下",
      //     xmsl: 11,
      //     xmzb: "30.77%"
      //   }
      // ],
      pieChar: []
    };
  },
  methods: {
    async getData() {
      const result = await api.getHtdphtjefb(this.form);
      // console.log("合同金额分布情况:", result);
      this.pieChar = result.reverse();
    }
  }
};
</script>

<style lang="scss" scoped></style>
