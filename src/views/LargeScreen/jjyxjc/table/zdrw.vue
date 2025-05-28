<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :highlight-current-row="true"
      @cell-click="cellClick"
    >
      <el-table-column prop="xh" min-width="50" label="DN" align="center"  show-overflow-tooltip />
      <el-table-column
        prop="zbmc"
        label="重点任务"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="xdx"
        label="行动项"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="kszqymxxh"
        min-width="200"
        label="进度"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <div class="">正常:{{ scope.row.jdzc }}</div>
            <div class="">滞后:{{ scope.row.jdzh }}</div>
            <div class="">需要关注:{{ scope.row.jdxygz }}</div>
            <div class="barcustom" slot="reference">
              <charts charType="barcustom" :charData="[scope.row]"></charts>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <zdrwDialog
      ref="refDialog"
      :title="dwmc"
      :formValue="formValue"
      :tableRow="tableRow"
      :iswlDialog="iswlDialog"
      :form="form"
      @iswlDialogFun="iswlDialogFun"
    ></zdrwDialog>
  </div>
</template>

<script>
import api from "@/api/jjyxjc.js";
import Charts from "@/components/echarts/index.vue"; //图表组件
import zdrwDialog from "../compoments/components/zdrw-dialog.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "zdrw",
  props: {
    form: Object,
    formValue: Object
    // iswlDialog: Boolean,
  },
  watch: {
    form: {
      handler(newVal) {
        if (!newVal.dwbm) return;
        // 获取经济运行营业收入|利润总额|净现金流统计
        this.getData();
      },
      deep: true,
      immediate: true
    }
  },

  computed: {
    ...mapState({
      dwmc: state =>
        "重点任务详情(" + state.caseInfo.dwmc + ")" ||
        "重点任务详情" + state.caseInfo.name + ")"
    })
  },
  components: {
    Charts,
    zdrwDialog
  },
  data() {
    return {
      tableData: [], // 表格数据
      pieCharArr: [],
      tableRow: {},
      iswlDialog: false //是否为弹窗
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    async getData() {
      let result = await api.queryJjyxzdrwtj(this.form);

      this.tableData = result;
      //    this.tableData = [ {
      // 	dwbm: "",
      // 	xh: "1",
      // 	zbmc: "指标名称",
      // 	xdx: "运动想",
      // 	jdzc: 5,
      // 	jdzh: 5,
      // 	jdxygz: 2
      // },
      // {
      // 	dwbm: "",
      // 	xh: "1",
      // 	zbmc: "指标名称指标名称指标名称指标名称指标名称",
      // 	xdx: "运动想运动想运动想运动想运动想",
      // 	jdzc: 5,
      // 	jdzh: 8,
      // 	jdxygz: 12
      // }];
      //  console.log(result);
    },
    cellClick(row) {
      this.tableRow = row;
      this.iswlDialog = true;
    },
    iswlDialogFun(newVal) {
      this.iswlDialog = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  height: 100%;
  overflow: hidden;
}
.el-table {
  width: 100%;
  height: calc(100% - 20px);
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
    width: calc(100%);
    // padding:  0 5px;
    height: 24px;
    line-height: 24px;
    border: solid 1px #0b4877;
    overflow: hidden;
  }
  ::v-deep .el-table__body-wrapper {
    height: 100%;
    overflow-y: auto;
    height: calc(100% - 60px);
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
  height: 24px;
  line-height: 24px;
}
::v-deep.el-table .cell {
  color: #a7c0e2;
  line-height: 54px;
}
::v-deep.el-table .warning-row {
  background: #04193c;
}

::v-deep.el-table .success-row {
  background: #082147;
}
</style>
<style>
.el-popover {
  background-color: #04193c;
  border: #4969b5;
  color: #fff;
}
</style>
