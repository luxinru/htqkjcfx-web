<template>
  <div class="wl">
    <div
      class="wl-item"
      v-for="(item, index) in wlList"
      :key="index"
      @click="wlhandleClick(item)"
    >
    <img :src="item.img" class="img"   alt="">
      <div class="wl-item-title">
        {{ item.mkmc }}：{{ item.sjz }}{{ item.unit }}
      </div>
      <div class="ndjhz">
        <span>年度计划值：{{ item.ndjhz }}{{ item.unit }}</span>
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
    <wlDialog
      ref="refDialog"
      title="详情"
      :formValue="formValue"
      :iswlDialog="iswlDialog"
      :treeStructure="treeStructure"
      :wlData="wlData"
      :form="form"
      @iswlDialogFun="iswlDialogFun"
    ></wlDialog>
  </div>
</template>

<script>
import api from "@/api/zdxmjc.js";
import wlDialog from "./components/wl-dialog.vue";
export default {
  name: "wl",
  props: {
    form: Object,
    formValue: Object,
    treeStructure: Array
  },
  components: {
    wlDialog
  },
  data() {
    return {
      wlList: [
        {
          mkmc: "资产负债率",
          unit: "%",
          title: "wl-zcfzl",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/1.png")
        },
        {
          mkmc: "营业现金比率",
          unit: "%",
          title: "wl-yyxjbl",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/2.png")

        },
        {
          mkmc: "净资产收益率",
          unit: "%",
          title: "wl-jzcsyl",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/3.png")

        },
        {
          mkmc: "研发投入强度",
          unit: "%",
          title: "wl-yftjzsjd",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/4.png")

        },
        {
          mkmc: "全员劳动生产率",
          unit: "万元/人年",
          title: "wl-qyldscl",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/5.png")

        }
      ],
      iswlDialog: false,
      wlData: {
        mkmc: "",
        unit: ""
      }
    };
  },
  watch: {
    form: {
      handler(newVal) {
        if (!newVal.dwbm) return;
        // 获取数据统计
        this.getJjyxwltj();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 资产负债率统计
    async getJjyxwltj() {
      let result = await api.getJjyxwltj(this.form);
      this.wlList = this.wlList.map((item, index) => {
        result[index].mkmc = this.wlList[index].mkmc;
        const resultItem = result[index];
        if (resultItem && item.mkmc == resultItem.mkmc) {
          item.ndjhz = resultItem.ndjhz;
          item.sjz = resultItem.sjz;
          item.jhpc = resultItem.jhpc;
          item.tb = resultItem.tb;
          item.dezb = resultItem.dezb;
          item.dyzb = resultItem.dyzb;
        }
        return item;
      });
    },
    wlhandleClick(val) {
      console.log(val, "wlhandleClick");

      this.iswlDialog = true;
      this.wlData = {
        ...val
      };
    },
    iswlDialogFun(newVal) {
      this.iswlDialog = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.wl{
  width: 100%;
}
.wl-item {
  font-size: 14px;
  width: calc(100% - 110px);
  min-width: calc(100% - 110px);
  height: 60px;
  margin: 0px 16px 20px 60px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  background-image: url("../../../../assets/img/LargeScreen/jjyxjc/wl-bg.png");
  padding: 0px 0px 0 42px;
  cursor: pointer;
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
  .img{
    width: 68px;
    height: 60px;
    position: absolute;
    left: -34px;
    // top: 5px;
  }
  .wl-item-title {
    width: 210px;
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
}
.wl-item:hover {
  background-image: url("../../../../assets/img/LargeScreen/jjyxjc/wl-bg-active.png");
}
.up {
  color: #ff5050;
}
.down {
  color: #00f886;
}
.wl-right-wrap {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
</style>
