<template>
  <div class="kzhhte-echarts-box">
    <div class="label">
      <custom-tabs v-model="tab" :tabsList="tabsList" @changeTab="changeTab"/>
    </div>
    <div class="chart">
      <charts
        charType="pie"
        :charData="pieCharArr"
        @changeData="changeData"
      ></charts>
    </div>
    <popFrame ref="refDialog" @openDialog="openDialog" title="可转化合同额"/>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import popFrame from "../components/dialog.vue";
import customTabs from "@/components/customTabs.vue";
import api from "@/api/global.js";

export default {
  components: {Charts, popFrame, customTabs},
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
      // pieCharArrCopy: [
      //   {
      //     name: "同方智意能源有限责任公司（合并）",
      //     value: 16
      //   },
      //   {
      //     name: "同方人工环境有限公司 (合并)",
      //     value: 26
      //   },
      //   {
      //     name: "TechnovatorIntemational (合并)",
      //     value: 32
      //   }
      // ],
      pieCharArr: [],
      tabsList: [
        {label: "年初手持", value: 1, prop: "kzhhtencsc", company: "亿元"},
        {label: "累计新签", value: 2, prop: "kzhhteljxq", company: "亿元"},
        {label: "期末手持合同总额", value: 3, prop: "kzhhteqmschte", company: "亿元"},
        {
          label: "期末手持-年初",
          value: 4,
          prop: "kzhhteqmscnc",
          company: "亿元"
        },
        {
          label: "期末手持-新签",
          value: 5,
          prop: "kzhhteqmscxq",
          company: "亿元"
        }
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
      // 使用方法
      const result = this.findMatchingNode(this.treeStructure, data);
      delete data.itemStyle;
      if (result.children.length > 0) {
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
      
      const result = await api.getHtdpKzhhte(this.form);
      // console.log("可转化合同额:", result);
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
  },
};
</script>

<style lang="scss" scoped>
.kzhhte-echarts-box {
  position: relative;
  width: 100%;
  height: 100%;

  .label {
    margin-left: 10px;
    margin-right: 20px;
    width: calc(100% - 30px);
  }

  // padding-left: 10px;
  .chart {
    width: 100%;
    height: calc(100% - 34px);
  }
}
</style>
