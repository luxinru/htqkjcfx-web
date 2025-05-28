<template>
  <div class="dialog">
    <span class="popFram" @click="openDialog"></span>
    <custom-dialog v-model="dialogVisible" :title="title">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :highlight-current-row="true"
      >
        <el-table-column
          prop="dwmc"
          label="责任单位"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          v-for="item in tableDataClume"
          :key="item.prop"
          :label="item.label"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            {{
              row[item.prop] || row[item.prop] === 0
                ? row[item.prop] + item.company
                : "-"
            }}
          </template>
        </el-table-column>
      </el-table>
    </custom-dialog>
  </div>
</template>

<script>
import CustomDialog from "@/components/customDialog.vue";
export default {
  components: {
    CustomDialog
  },
  props: {
    title: String
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      tableDataClume: []
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    openDialog() {
      this.dialogVisible = true;
      this.$emit("openDialog");
    }
  }
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
    ::v-deep .el-dialog__header {
      height: 34px;
      width: 100%;
      background: #1862dd;
      padding: 0px;
      background-image: url("../../../../../assets/img/LargeScreen/popFram-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
      padding: 20px;
      background-color: #08254a;
      border: 1px solid #ffffff38;
    }
    .el-table {
      color: #ffffff9c;
      background-color: #08254a;
      ::v-deep .has-gutter tr th {
        background-color: #123767;
        color: #bdb3b3;
      }
      // ::v-deep tr {
      //   background-color: #08254a;
      // }
      ::v-deep td {
        padding: 10px 0;
        border-bottom: none;
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
      border-top: 1px solid #ebeef552;
    }
  }
}
::v-deep.el-table th.el-table__cell > .cell {
  padding: 0;
  color: #a7c0e2;
}
::v-deep.el-table .cell {
  color: #a7c0e2;
}
</style>
<style>
.el-table .warning-row {
  background: #05183a;
}

.el-table .success-row {
  background: #082047;
}
</style>
