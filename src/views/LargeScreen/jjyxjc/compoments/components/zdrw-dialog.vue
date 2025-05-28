<template>
  <div class="dialog">
    <Dialog v-model="iswlDialog" :title="title" :width="'95%'" >
      <el-table
        :data="tableData"
        style="width: 100%; border-collapse: collapse;"
        row-class-name="warningRow"
        :highlight-current-row="true"
        :span-method="objectSpanMethod"
        border
        resizable
      >
        <el-table-column
          prop="zdrwbh"
          label="序号"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="zdrwmc"
          label="指标名称"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="xdjhmc"
          label="行动计划"
          align="center"
         
        > <template slot-scope="scope">
            <el-tooltip :content="scope.row.xdjhmc" placement="top">
              <p class="showOverTooltip">{{ scope.row.xdjhmc }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="mbjds"
          label="目标节点数"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="wcjds"
          label="完成节点数"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mbjdjh"
          label="目标值"
          align="center"
          class="showOverTooltip"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.mbjdjh" placement="top">
              <p class="showOverTooltip">{{ scope.row.mbjdjh }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="rwly"
          label="同方归口部门"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="bjgzjd"
          label="本月工作进展"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.bjgzjd" placement="top">
              <p class="showOverTooltip">{{ scope.row.bjgzjd }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="ljgzjd"
          label="累计工作进展"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.ljgzjd" placement="top">
              <p class="showOverTooltip">{{ scope.row.ljgzjd }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="sfczpc"
          label="是否存在偏差"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column prop="qnycwcqk" align="center" show-overflow-tooltip>
          <template #header>
            <div>全年预测完成情况</div>
            <!-- Custom label here -->
            <div class="fz12">（如有风险提出纠偏举措）</div>
            <!-- Custom label here -->
          </template>
        </el-table-column>
      </el-table>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/dialog.vue";
import api from "@/api/jjyxjc";
export default {
  components: {
    Dialog
  },
  props: {
    title: String,
    iswlDialog: Boolean,
    tableRow: Object,
    form: Object,
    formValue: Object
  },
  data() {
    return {
      // iswlDialog: false,
      tableData: [
      ]
    };
  },

  watch: {
    tableRow: {
      handler(val) {
        this.queryJjyxzdrwxqlb();
      },
      deep: true
    },
    iswlDialog: {
      handler(val) {
        this.$emit("iswlDialogFun", val);
      },
      deep: true
    }
  },
  methods: {
    handleClose(done) {
      done();
    },
    async queryJjyxzdrwxqlb() {
      const parmas = {
        ...this.form,
        ...this.formValue,
        ...this.tableRow
      };
      const res = await api.queryJjyxzdrwxqlb(parmas);
      this.tableData = [...res];
      // console.log(res);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6) {
        if (rowIndex % this.tableData.length === 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .popFram {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: -25px;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-image: url("../../../../../assets/img/LargeScreen/popFrame.png");
    &:hover {
      background-image: url("../../../../../assets/img/LargeScreen/popFrame-moveIn.png");
    }
    z-index: 999;
  }
  .custom-dialog {
    ::v-deep .el-dialog{
height: 60%;
overflow: hidden;
    
    }
    ::v-deep .el-table__body-wrapper {
      height: 100%;
        // height: calc(100% - 220px);
        overflow: auto;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
    ::v-deep .el-dialog__header {
      height: 34px;
      width: 100%;
      background: #1862dd;
      padding: 0px;
      background-image: url("../../../../../assets/img/LargeScreen/popFram-bg.png");
      background-repeat: no-repeat;
      // background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      .el-dialog__title {
        margin-left: 40px;
        font-size: 16px;
        color: white;
      }
      .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff63;
        &:hover {
          color: #ffffffb5;
        }
      }
      .el-dialog__headerbtn {
        top: 54%;
        transform: translate(0, -50%);
        font-size: 20px;
      }
    }
    ::v-deep .el-dialog__body {
      padding: 0px 23px 20px 20px;
      background-color: #08254a;
      height: calc(100% - 34px);
      overflow: hidden;
      // border: 1px solid #ffffff38;
    }
    .el-table {
      margin-top: 20px;
      color: #ffffff9c;
      background-color: #08254a;
      height: calc(100% - 34px);
      // overflow:auto;
      ::v-deep .has-gutter tr th {
        background-color: #123767;
        color: #bdb3b3;
      }
      // ::v-deep tr {
      //   background-color: #08254a;
      // }
      ::v-deep td {
        padding: 10px 0;
        // border-bottom: none;
      }
      ::v-deep &::before {
        border-color: none;
      }
      ::v-deep th.is-leaf {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
     
      ::v-deep .el-table__body tr.current-row > td {
        background-color: #0450a2;
      }
    }

    .el-table::before {
      background-color: transparent;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #0450a2;
      // border-top: 1px solid #ebeef552;
    }
  }
  .cyxp-title {
    color: #ffffff;
    font-size: 16px;
    line-height: 53px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: normal;
    width: 185px;
    text-align: center;
    background-image: url(../../../../../assets/img/LargeScreen/ejbt.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
    /* 可选：设置图片在div中的位置，默认为左上角 */
  }
}
::v-deep.el-table th.el-table__cell > .cell {
  padding: 0;
  color: #a7c0e2;
}
::v-deep.el-table .cell {
  color: #a7c0e2;
}

::v-deep.el-table td {
  border: 1px solid rgba(255, 255, 255, 0.2);
}
// ::v-deep .el-table {
//   border-collapse: collapse; /* 合并边框 */
// }
::v-deep .el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
::v-deep.el-table--border,
.el-table--group {
  border: 1px solid rgba(255, 255, 255, 0.2);
}
::v-deep.el-table--border::after,
.el-table--group::after {
  height: 0;
}

</style>
<style>
.el-table .warningRow {
  background: #082047;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
/* .el-table .warningRow:hover {
  background: #082047;
  border: 1px solid rgba(255, 255, 255, 0.2);
} */
/* .el-table .success-row {
  background: #082047;
  border: 1px solid #fff;
} */

.fz14 {
  font-size: 14px;
}
.fz12 {
  font-size: 12px;
}
.showOverTooltip {
  display: -webkit-box;
  text-decoration: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
}
</style>
