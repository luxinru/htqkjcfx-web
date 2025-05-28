<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\bkxqEcharts\index.vue
-->
<template>
  <div class="chart-box">
    <charts charType="ydqsBar" :charData="pieCharArr"></charts>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/jjyxjc.js";
import { $money100m } from "../../../../../utils/helper";

export default {
  components: { Charts },
  name: "ydqscharts",
  props: {
    form: Object,
    formValue: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if (!newVal.dszb) return;
        this.getData();
        return;
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    formValue: {
      handler(newVal, oldVal) {
        if (!newVal.dszb) return;
        this.getData();
        return;
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    isRequest: {
      handler(newVal, oldVal) {
        this.getData();
        return;
      },
      deep: true // 深度监听对象或数组的变化
    }
  },
  data() {
    return {
      pieCharArr: []
    };
  },
  methods: {
    async getData() {
      const params = {
        ...this.form,
        ...this.formValue
      };
      const result = await api.queryJjyxydqstj(params);
      this.pieCharArr = result.map(item => ({
        ...item,
        qntqz: $money100m(item.qntqz),
        ydsjz: $money100m(item.ydsjz)
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: calc(100% - 100px);
}
.bkxqEcharts {
  width: 100%;
}
</style>
