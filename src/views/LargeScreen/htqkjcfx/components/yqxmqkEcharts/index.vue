<template>
  <div class="yqxmqk-echarts-box">
    <div class="yqxmqk-echarts-left">
      <div class="item">
        <span>逾期项目数</span>
        <h4>
          <em>{{ yqxmgszs }}</em> 个
        </h4>
      </div>
      <div class="item">
        <span>逾期待支付金额</span>
        <h4>
          <em>{{ yqxmdzfjezs }}</em> 万元
        </h4>
      </div>
    </div>
    <div class="yqxmqk-echarts-right">
      <charts
        charType="pieyqxmqk"
        :charData="pieChar"
        @changeData="changeData"
      ></charts>
    </div>
    <popFrame ref="refDialog" @openDialog="openDialog" title="可转化合同额" />
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import popFrame from "../components/dialog.vue";
import api from "@/api/global.js";

export default {
  components: { Charts, popFrame },
  name: "YqxmqkEcharts",
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
      pieChar: [],
      tabsList: [
        { label: "逾期项目数", value: 1, prop: "yqxmgs", company: "个" },
        { label: "逾期待支付金额", value: 2, prop: "yqdzfje", company: "万元" }
      ],
      yqxmgszs: "", // 逾期项目个数总树
      yqxmdzfjezs: "" // 逾期项目待支付金额总数
    };
  },
  methods: {
    // 打开弹窗
    openDialog() {
      this.$refs.refDialog.tableData = this.pieChar;
      this.$refs.refDialog.tableDataClume = this.tabsList;
    },
    // 点击切换公司
    changeData(data) {
      const result = this.findMatchingNode(this.treeStructure, data, );
      if(result.children.length>0){
        this.$emit("setCaseInfoDwbm", data);
      }
    },
    async getData() {
      const result = await api.getHtdpyqqkzs(this.form);
      this.pieChar = result.yqxmqkList?.map(item => {
        return {
          name: item.dwmc,
          value: item.yqdzfje > 0 ? item.yqdzfje : 0,
          dwbm: item.dwbm
        };
      });
      this.yqxmgszs = result.yqxmgszs;
      this.yqxmdzfjezs = result.yqxmdzfjezs;
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
.yqxmqk-echarts-box {
  position: relative;
  width: 100%;
  height: 100%;
  .yqxmqk-echarts-left {
    float: left;
    height: 100%;
    margin: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      width: 125px;
      height: 70px;
      padding-left: 75px;
      color: white;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 14px;
      &:nth-child(1) {
        background-image: url("../../../../../assets/img/LargeScreen/overdueProjects.png");
      }
      &:nth-child(2) {
        background-image: url("../../../../../assets/img/LargeScreen/latePayment.png");
        margin-top: 20px;
      }
      > h4 {
        margin: 5px 0 0 0;
        > em {
          font-style: normal;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          background-image: linear-gradient(to bottom, #e1f9ff, #4ffcff);
          -webkit-background-clip: text;
          color: transparent;
        }
      }
    }
  }
  .yqxmqk-echarts-right {
    float: right;
    width: calc(100% - 280px);
    height: 100%;
  }
}
</style>
