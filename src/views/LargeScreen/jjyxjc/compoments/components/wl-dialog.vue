<template>
  <div class="dialog">
    <Dialog v-model="iswlDialog" :title="title" :width="'847px'">
      <div class="title" v-show="iswibkxq">{{ wlData.mkmc }}板块分布</div>
      <div class="wl-div" v-show="iswibkxq">
        <div
          class="wl-item"
          v-for="(item, index) in wlList"
          :key="index"
          @click="wlhandleClick(item)"
        >
          <img
            src="@/assets/img/LargeScreen/jjyxjc/wl-icon.png"
            class="wl-icon"
            alt=""
          />

          <el-tooltip
            :content="`${item.dwmc}：${item.sjz}${wlData.unit}`"
            placement="top"
          >
            <div class="wl-item-title">
              {{ `${item.dwmc}：${item.sjz}${wlData.unit}` }}
            </div>
          </el-tooltip>
          <div class="ndjhz">
            <span>年度计划值：{{ item.ndjhz }}{{ wlData.unit }}</span>
          </div>
          <div class="wl-right-wrap">
            <div class="jhpc">
              <div>{{ item.jhpc >= 0 ? "高于" : "低于" }}计划值</div>
              <div :class="item.jhpc >= 0 ? 'down' : 'up'">
                {{ Math.abs(item.jhpc ?? 0)
                }}{{ item.mkmc !== "全员劳动生产率" ? "个百分比" : "" }}
              </div>
            </div>
            <div class="tb">
              <div>{{ item.tb >= 0 ? "高于" : "低于" }}去年同期</div>
              <div :class="item.tb >= 0 ? 'down' : 'up'">
                {{ Math.abs(item.tb ?? 0)
                }}{{ item.mkmc !== "全员劳动生产率" ? "个百分比" : "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">{{ wlData.mkmc }}月度趋势（{{ dwmc }}）</div>
      <div class="ydqs-chart">
        <wlydqsEcharts
          :form="form"
          :wlData="wlData"
          :formValue="formValue"
        ></wlydqsEcharts>
      </div>
    </Dialog>
  </div>
</template>

<script>
import api from "@/api/jjyxjc";
import Dialog from "@/components/dialog.vue";
import wlydqsEcharts from "../wlydqsEcharts";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Dialog,
    wlydqsEcharts
  },
  props: {
    title: String,
    iswlDialog: Boolean,
    wlData: Object,
    form: Object,
    formValue: Object,
    treeStructure: Array
  },
  computed: {
    ...mapState({
      dwbm: state => state.caseInfo.dwbm
    })
  },
  watch: {
    wlData: {
      handler(val) {
        if (!val.dezb && !this.wlData.mkmc.includes("全员劳动生产率")) {
          this.wlList = [];
          return;
        }
        this.queryJjyxxjdwwltj();
      },
      deep: true
    },
    iswlDialog: {
      handler(val) {
        const result = this.findMatchingNode(this.treeStructure, this.form);
        if (result.children && result.children.length > 0) {
          this.iswibkxq = true;
        } else {
          this.iswibkxq = false;
        }
        this.$emit("iswlDialogFun", val);
      }, 
      deep: true
    }
    // form: {
    //   handler(val) {
    //     console.log(val,'333');

    //   },
    //   deep: true

    // }
  },
  data() {
    return {
      wlList: [],
      iswibkxq: true,
      loading: false
    };
  },
  methods: {
    async queryJjyxxjdwwltj() {
      this.loading = true;
      const parmas = {
        dwbm: this.form.dwbm,
        jzsj: this.form.jzsj,
        dyzb: this.wlData.dyzb,
        dezb: this.wlData.dezb
      };
      let result = [];
      try {
        if (this.wlData.mkmc.includes("全员劳动生产率")) {
          result = await api.queryJjyxxjdwlcltj({
            jzsj: parmas.jzsj,
            dwbm: parmas.dwbm
          });
        } else {
          result = await api.queryJjyxxjdwwltj(parmas);
        }

        this.wlList = result;
      } finally {
        this.loading = false;
      }

      // handleClose(done) {
      //   done();
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
      padding: 0px 23px 20px 0px;
      background-color: #08254a;
      border: 1px solid #ffffff38;
    }
  }
  .title {
    color: #ffffff;
    font-size: 16px;
    line-height: 53px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: normal;
    width: 180px;
    white-space: nowrap;
    // text-align: left;
    margin-left: 20px;
    background-image: url(../../../../../assets/img/LargeScreen/ejbt.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
    /* 可选：设置图片在div中的位置，默认为左上角 */
  }
  .wl-div {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .wl-item {
    font-size: 14px;
    // width: 100%;
    width: calc(100% - 90px);
    // min-width: calc(100% - 110px);
    height: 66px;
    margin: 0px 16px 0 55px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0px 0px 0 34px;
    cursor: pointer;
    background: linear-gradient(
      180deg,
      rgba(10, 62, 136, 0) 0%,
      rgba(10, 62, 136, 0) 50%,
      rgba(13, 56, 116, 0.75) 80%,
      #103160 100%
    );
    position: relative;
    div {
      background: linear-gradient(to top, #7ecdfb 0%, #fff 100%);
      background-clip: text; /* 关键：将背景裁剪到文本区域 */
      -webkit-background-clip: text; /* 为Safari浏览器添加前缀 */
      color: transparent; /* 使文字透明，背景色成为字体的填充 */
      background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
    }
    .ndjhz {
      width: 220px;
      span {
        background: #1b4986;
        color: #c9e0ff;
        padding: 1px 6px;
        border-radius: 2px;
      }
    }
    .wl-item-title {
      margin-left: 12px;
      width: 210px;
      overflow: hidden; /* 隐藏超出容器的文本 */
      white-space: nowrap; /* 保持文本在一行内显示 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
    }
    .jhpc {
      text-align: center;
    }
    .up {
      color: #ff5050;
    }
    .down {
      color: #00f886;
    }
    .tb {
      text-align: center;
    }
    .wl-icon {
      position: absolute;
      left: -34px;
      top: 0;
    }
  }
  .ydqs-chart {
    height: 270px;
    width: 100%;
  }
}

.wl-right-wrap {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
</style>
