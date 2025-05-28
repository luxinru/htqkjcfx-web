<template>
  <div class="dialog">
    <Dialog v-model="isZdrwxqDialog" :title="title" :width="'1037px'">
      <div class="zdxmxq-dialog">
        <!-- <div class="title">项目名称</div> -->
        <div class="content xmmc">{{ wlList.xmmc ? wlList.xmmc : "-" }}</div>
        <div class="content-top">
          <div>
            <div class="title">项目单位</div>
            <div class="content">{{ wlList.xmdw ? wlList.xmdw : "-" }}</div>
          </div>
          <div>
            <div class="title">项目总投资</div>
            <div class="content">{{ wlList.xmztz ? wlList.xmztz : "-" }}</div>
          </div>
          <div>
            <div class="title">本年下达投资计划</div>
            <div class="content">
              {{ wlList.bnxdtzjh ? wlList.bnxdtzjh : "-" }}
            </div>
          </div>
        </div>
        <div class="content-top">
          <div>
            <div class="title">本年已完成投资</div>
            <div class="content">
              {{ wlList.bnywctz ? wlList.bnywctz : "-" }}
            </div>
          </div>
          <div>
            <div class="title">计划完成率</div>
            <div class="content">
              {{ wlList.jhwcl || wlList.jhwcl == 0 ? wlList.jhwcl : "-" }}
            </div>
          </div>
          <div></div>
        </div>
        <div class="title">建设内容</div>
        <div class="content">{{ wlList.jsnr ? wlList.jsnr : "-" }}</div>

        <div class="title">项目进展情况</div>
        <div class="content">{{ wlList.xmjz ? wlList.xmjz : "-" }}</div>
        <div class="title">问题、建议和措施</div>
        <div class="content">
          {{ wlList.wtjy ? wlList.wtjy : "-" }}
        </div>
        <div class="title">备注</div>
        <div class="content">{{ wlList.bz ? wlList.bz : "-" }}</div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import api from "@/api/zdxmjc";
import Dialog from "@/components/dialog.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Dialog
  },
  props: {
    title: String,
    isZdrwxqDialog: Boolean,
    wlData: Object,
    tableRow: Object
  },
  computed: {
    ...mapState({
      dwbm: state => state.caseInfo.dwbm
    })
  },
  watch: {
    tableRow: {
      handler(val) {
        console.log(val);

        this.getZdxmtzxqtj();
      },
      deep: true
    },
    isZdrwxqDialog: {
      handler(val) {
        this.$emit("isZdrwxqDialogFun", val);
      },
      deep: true
    }
  },
  data() {
    return {
      wlList: {},
      loading: false
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    async getZdxmtzxqtj() {
      this.loading = true;
      const parmas = {
        ...this.tableRow
      };
      let result = [];
      try {
        result = await api.getZdxmtzxqtj(parmas);
        this.wlList = result;
      } finally {
        this.loading = false;
      }
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

      return null; // 如果没找到，返回 null
    }
  },
  computed: {
    ...mapState({
      dwmc: state => state.caseInfo.dwmc || state.caseInfo.name || ""
    })
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  .custom-dialog {
    ::v-deep .el-dialog {
      height: calc(80% - 10px);
      overflow: hidden;
    }
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
      padding: 0px;
      background-color: #08254a;
      border: 1px solid #ffffff38;
      height: 100%;
      overflow: hidden;
    }
  }
}
.zdxmxq-dialog {
  padding: 30px 30px 0px 30px;
  height: calc(100% - 60px);
  overflow: scroll;
  font-size: 14px;

  .title {
    padding: 7px 16px;
    color: #c9e0ff;
    background-color: #1b4986;
    border-radius: 4px;
    white-space: nowrap;
    display: inline-block; /* 让宽度自适应内容 */
  }
  .content {
    padding: 8px 0px 30px;
    color: #ffffff;
  }
  .xmmc {
    text-align: center;
    font-size: 18px;
    padding-top: 0px;
  }
  .content-top {
    display: flex;
  }
  .content-top > div:nth-child(1) {
    flex: 1;
    // width: 50%;
  }
  .content-top > div:nth-child(2) {
    flex: 1;
    // width: 30%;
  }

  .content-top > div:nth-child(3) {
    width: 144px;
  }
}
</style>
