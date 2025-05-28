<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :highlight-current-row="true"
    ref="kszTableRef"
  >
    <el-table-column type="index" width="70" label="序号" align="center" />
    <el-table-column
      prop="qymc"
      label="企业名称"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="ksqyfl"
      label="亏损企业分类"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="bnzkcs"
      label="本年治亏措施"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column
      prop="qnmb"
      label="全年目标"
      align="center"
      show-overflow-tooltip
    />
    <el-table-column prop="kb" width="150" :label="kb" align="center" />
    <el-table-column prop="qnyc" width="200" :label="qnyc" align="center" />
  </el-table>
</template>

<script>
import api from "@/api/ksqyzl.js";
export default {
  name: "kszqy",
  props: {
    form: Object
  },
  data() {
    return {
      tableData: [],
      month: ""
    };
  },
  created() {},
  computed: {
    kb: function() {
      return `${this.month}月快报（万元）`;
    },
    qnyc: function() {
      return `${this.month}月全年预测（万元）`;
    }
  },
  mounted() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    addGroupItem() {
      this.$nextTick(() => {
        this.$refs.kszTableRef.bodyWrapper.scrollBehavior = "smooth";
        this.$refs.kszTableRef.bodyWrapper.scrollTop = 0;
      });
    },
    async getData() {
      const result = await api.queryKsqyzqytj(this.form);
      this.tableData = result;
      this.addGroupItem();
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log(val, "zzzz");
        if (val.jzsj) {
          this.month = val.jzsj.substring(5, 7); // 获取字符位置5到7（从0开始）
        }
        if (!val.dwbm) {
          this.tableData = [];
          return;
        }
        this.getData();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  min-height: 165px;
  height: 165px;
  color: #ffffff9c;
  overflow: hidden;
  background-color: rgba(47, 89, 140, 0.01);
  ::v-deep .has-gutter tr th {
    background-color: #123767;
    color: #bdb3b3;
  }
  .el-table tr {
    background-color: none;
  }
  ::v-deep td {
    padding: 5px 0;
    border-bottom: none;
  }
  ::v-deep &::before {
    border-color: none;
  }
  ::v-deep th.is-leaf {
    border-bottom: 1px solid #ebeef552;
  }
  ::v-deep .el-table__body tr.current-row > td {
    background-color: #0450a2;
  }
  ::v-deep .el-table__cell {
    padding: 5px 0;
    line-height: auto;
  }
  .barcustom {
    width: 100%;
    height: 30px;
  }
  ::v-deep .el-table__body-wrapper {
    height: 100%;
    overflow-y: auto;
    height: calc(100% - 35px);
  }
}
.el-table::before {
  background-color: transparent;
}
::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0450a2;
  border-top: 1px solid #ebeef552;
}
::v-deep.el-table th.el-table__cell > .cell {
  padding: 0;
  color: #a7c0e2;
}
::v-deep.el-table .cell {
  color: #a7c0e2;
}
::v-deep.el-table .warning-row {
  background: #04193c;
}

::v-deep.el-table .success-row {
  background: #082147;
}
</style>
