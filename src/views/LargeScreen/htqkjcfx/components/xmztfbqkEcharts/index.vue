<template>
  <charts charType="bar3D" :charData="lineChar"></charts>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/global.js";

export default {
  components: { Charts },
  name: "XmztfbqkEcharts",
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
      // lineCharCopy: [
      //   {
      //     name: "未开工",
      //     value: 15
      //   },
      //   {
      //     name: "已开工、未竣工",
      //     value: 8
      //   },
      //   {
      //     name: "已竣工、未验收",
      //     value: 6
      //   },
      //   {
      //     name: "已验收、无质保",
      //     value: 30
      //   },
      //   {
      //     name: "已验收、质保期内",
      //     value: 17
      //   },
      //   {
      //     name: "质保结束",
      //     value: 18
      //   }
      // ],
      lineChar: []
    };
  },
  methods: {
    async getData() {
      //
      const result = await api.getHtdpxmztfb(this.form);
      // this.lineChar=  [
      //     {
      //       name: "未开工",
      //       value: 15
      //     },
      //     {
      //       name: "已开工、未竣工",
      //       value: 8
      //     },
      //     {
      //       name: "已竣工、未验收",
      //       value: 6
      //     },
      //     {
      //       name: "已验收、无质保",
      //       value: 30
      //     },
      //     {
      //       name: "已验收、质保期内",
      //       value: 17
      //     },
      //     {
      //       name: "质保结束",
      //       value: 18
      //     }
      //   ]
      console.log("项目状态分布情况:", result);
      this.lineChar = result.map(item => {
        return {
          name: item.zt,
          value: item.sl
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
