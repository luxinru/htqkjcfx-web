<template>
<div class="zdxmgdzcTable">
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :highlight-current-row="true"
         @cell-click="cellClick"
  >
    <el-table-column type="index" width="50" label="序号" align="center" />
    <el-table-column prop="xmmc" label="项目名称" align="center" show-overflow-tooltip />
    <el-table-column prop="xmdw" label="项目单位" align="center" show-overflow-tooltip />
    <el-table-column
      prop="xmztz"
      label="项目总投资（万元）"
      align="center"
       width="180"
       sortable
    />
    <el-table-column
      prop="bnxdtzjh"
      label="本年下达投资计划（万元）"
      align="center"
      width="200"
      sortable
    />
    <el-table-column
      prop="bnywctz"
      label="本年已完成投资（万元）"
      align="center"
     width="180"
     sortable
    />
    <el-table-column
    prop="jhwcl"
    label="计划完成率"
    align="center"
    sortable
     width="120"
  >
    <!-- 使用 scoped-slot 来定制单元格内容 -->
    <template slot-scope="scope">
      <span>{{ scope.row.jhwcl }}%</span>
    </template>
  </el-table-column>

  </el-table>
  <Zdxmxq  ref="refDialog"
     title="股权投资重点项目详情"
      :tableRow="tableRow"
      :isZdrwxqDialog="isZdrwxqDialog"
      @isZdrwxqDialogFun="isZdrwxqDialogFun" />
</div>
</template>

<script>
import api from "@/api/zdxmjc.js";
import Charts from "@/components/echarts/index.vue"; //图表组件
import Zdxmxq from '../components/components/zdxmxq-dialog.vue'
export default {
  name: "zdxmgqtzTable",
  props: {
    form: Object,

  },
  components: {
    Charts,
    Zdxmxq
  },
  data() {
    return {
      tableData: [
      
      ], // 表格数据
      isZdrwxqDialog: false, // 是否显示项目详情弹窗
      tableRow: {}, // 当前行的数据
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
   async queryZdxmgqtztj() {
    const res= await api.queryZdxmgqtztj(this.form)
     this.tableData = res
    

    },
       cellClick(row) {
      console.log(row);
      
      this.tableRow = row;
      this.isZdrwxqDialog = true;
    },
    isZdrwxqDialogFun(newVal) {
      this.isZdrwxqDialog = newVal;
    }
    
  },
  watch: {
    form: {
      handler(val) {
        
       this.queryZdxmgqtztj()
      },
      deep: true,
      immediate: true // 是否在初始化时立即触发一次回调
    }
  }
};
</script>

<style lang="scss" scoped>
.zdxmgdzcTable{
  height: 100%;
  overflow: hidden;
}
.el-table {
  width: 100%;
  height: calc(100% - 20px);
  color: #ffffff9c;
  overflow: hidden;
  background-color: rgba(47, 89, 140, 0.2);
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
::v-deep.el-table th.el-table__cell>.cell{
padding: 0;
color: #a7c0e2;
}
::v-deep.el-table .cell{
  color: #a7c0e2;
}
::v-deep.el-table .warning-row {
  background: #05183a;
}

::v-deep.el-table .success-row {
  background: #082047;
}
::v-deep.el-table th.el-table__cell>.cell{
padding: 0;
}
</style>
