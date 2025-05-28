<!--
 * @Date: 2024-08-07 15:45:05
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 15:46:20
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\ljzhsreEcharts\index.vue
-->
<template>
  <div class="ljzhsre-echarts-box">
    <div class="label">
      <custom-tabs v-model="tab" :tabsList="tabsList" @changeTab="changeTab" />
    </div>
    <div class="chart">
      <charts
        charType="pie"
        :charData="pieCharArr"
        @changeData="changeData"
      ></charts>
    </div>
    <popFrame ref="refDialog" @openDialog="openDialog" title="可转化合同额" />
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import popFrame from "../components/dialog.vue";
import customTabs from "@/components/customTabs.vue";
import api from "@/api/global.js";

export default {
  components: { Charts, popFrame, customTabs },
  name: "KzhhteEcharts", // 可转化合同额
  props: {
    form: Object,
    isRequest: Boolean,
    treeStructure: Array
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
      pieCharArr: [],
      tabsList: [
        { label: "年初手持", value: 1, prop: "ljzhsrencsc", company: "亿元" },
        { label: "累计新签", value: 2, prop: "ljzhsreljxq", company: "亿元" }
      ],
      tab: 1,
      data: []
    };
  },
  methods: {
    // 打开弹窗
    openDialog() {
      this.$refs.refDialog.tableData = this.data;
      this.$refs.refDialog.tableDataClume = this.tabsList;
    },
    // 点击切换公司
    changeData(data) {
      const result = this.findMatchingNode(this.treeStructure, data, );
      if(result.children.length>0){
        this.$emit("setCaseInfoDwbm", data);
      }
    },
    // 切换tabs
    changeTab(value) {
      const currentTabProp = this.tabsList.find(item => item.value === value)
        .prop;
      this.pieCharArr = this.data.map(item => {
        return {
          name: item.dwmc,
          value: item[currentTabProp] || 0,
          dwbm: item.dwbm
        };
      });
    },
    async getData() {
      const result = await api.getHtdpljzhsre(this.form);
      // console.log("累计转化收入额:", result);
      this.data = result;
      this.changeTab(this.tab);
    },
      // 定义递归函数来查找符合条件的节点
      findMatchingNode(tree, val) {
      // 遍历树结构
      for (let item of tree) {
        // 如果当前节点符合条件
        if (item.dwbm === val.dwbm) {
          return item; // 返回当前节点
        }

        // 如果当前节点有子节点，递归查找
        if (item.children && item.children.length > 0) {
          const foundNode = this.findMatchingNode(item.children, val); // 在子节点中查找
          if (foundNode) {
            return foundNode; // 如果在子节点中找到符合条件的节点，返回该节点
          }
        }
      }

      return false; // 如果没找到，返回 null
    }
  }
};
</script>

<style lang="scss" scoped>
.ljzhsre-echarts-box {
  position: relative;
  width: 100%;
  height: 100%;

  .chart {
    width: 100%;
    height: calc(100% - 34px);
  }
}
</style>
