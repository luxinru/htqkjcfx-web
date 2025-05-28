<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\bkxqEcharts\index.vue
-->
<template>
  <div class="chart-box">
    <charts
      charType="wlydqsBar"
      :charData="pieCharArr"
      :activeMc="activeMc"
    ></charts>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/jjyxjc.js";
// import { $money100m } from "../../../../../utils/helper";

export default {
  components: { Charts },
  name: "ydqscharts",
  props: {
    form: Object,
    formValue: Object,
    wlData: Object
    // isRequest: Boolean
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
    wlData: {
      handler(newVal, oldVal) {
        this.activeMc = newVal.unit;
        // console.log(newVal, "111");
        // if(new)
        this.getData();
        // return;
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
  },
  data() {
    return {
      pieCharArr: [],
      activeMc: ""
    };
  },
  methods: {
    async getData() {
      const params = {
        ...this.form,
        ...this.wlData
      };
      let result = [];
      if (this.wlData.mkmc.includes("全员劳动生产率")) {
        result = await api.queryJjyxdwydlcltj({
          jzsj: params.jzsj,
          dwbm: params.dwbm
        });
      } else {
        result = await api.queryJjyxdwydwltj(params);
      }
      this.pieCharArr = result.map(item => ({
        ...item,
        qntqz: item.qntqz,
        ydsjz: item.ydsjz
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
.bkxqEcharts {
  width: 100%;
}
</style>
