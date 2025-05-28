<template>
  <el-dialog
    class="custom-dialog"
    :title="title"
    :visible.sync="value"
    :width="width"  
    :before-close="handleClose"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  model: {
    prop: "iswlDialog",
    event: "change"
  },
  props: {
    iswlDialog: {
      type: String | Number,
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: '847px'
    }
  },
  computed: {
    value: {
      get() {
        return this.iswlDialog;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>

.custom-dialog {
    ::v-deep .el-dialog__header {
    height: 34px;
    width: 100%;
    padding: 0px;
    background-image: url("../assets/img/LargeScreen/popFram-bg.png");
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
}
</style>
