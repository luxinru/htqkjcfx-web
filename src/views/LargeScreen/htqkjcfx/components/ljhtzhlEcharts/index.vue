<template>
  <div class="ljhtzhl-echarts-box">
    <div class="label">
      <custom-tabs v-model="tab" :tabsList="tabsList" @changeTab="changeTab" />
    </div>
    <custom-marquee class="ranking" :height="height" :rankingList="rankingList">
      <div class="item" v-for="(item, index) in rankingList" :key="item.id">
        <div class="title">
          <!-- <span :class="index < 3 ? 'c00f3fc' : 'cfff'"
            >TOP.{{ index + 1 }}</span
          >
          <em></em> -->
          <p>{{ item.name }}</p>
        </div>
        <el-progress
          class="item-container"
          :percentage="Number(item.value) > 100 ? 100 : Number(item.value)"
          :define-back-color="'#1f4375'"
          :text-color="'#fff'"
          :format="''"
          :text-inside="true"
        ></el-progress>
        <div class="value">{{ item.value }}%</div>
      </div>
    </custom-marquee>
    <popFrame ref="refDialog" @openDialog="openDialog" title="累计合同转化率" />
  </div>
</template>

<script>
import customTabs from "@/components/customTabs.vue";
import popFrame from "../components/dialog.vue";
import customMarquee from "./customMarquee.vue";
import api from "@/api/global.js";

export default {
  components: { customTabs, popFrame, customMarquee },
  name: "LjhtzhlEcharts",
  props: {
    form: Object,
    isRequest: Boolean
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
  computed: {
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1 // 0向下 1向上 2向左 3向右
      };
    }
  },
  data() {
    return {
      tabsList: [
        { label: "整体", value: 1, prop: "ljhtzhlzt", company: "%" },
        { label: "年初手持", value: 2, prop: "ljhtzhlncsc", company: "%" },
        { label: "累计新签", value: 3, prop: "ljhtzhlljxq", company: "%" }
      ],
      tab: 1,
      // rankingListCopy: [
      //   { id: 1, name: "同方智慧能源有限责任公司（合并）", value: 78 },
      //   { id: 2, name: "hnovatorIntemationalLimited（合并)", value: 68 },
      //   { id: 3, name: "人工环境有限公司（合并）", value: 58 },
      //   { id: 4, name: "同方智慧能源有限责任公司（合并）", value: 49 },
      //   { id: 5, name: "hnovatorIntemationalLimited（合并)", value: 38 },
      //   { id: 6, name: "人工环境有限公司（合并）", value: 22 },
      //   { id: 7, name: "智慧能源有限责任公司（合并）", value: 84 },
      //   { id: 8, name: "人工环境有限公司（合并）", value: 69 },
      //   { id: 9, name: "hnovatorIntemationalLimited（合并)", value: 36 },
      //   { id: 10, name: "人工环境有限公司（合并）", value: 25 },
      //   { id: 11, name: "智慧能源有限责任公司（合并）", value: 24 },
      //   { id: 12, name: "人工环境有限公司（合并）", value: 94 },
      //   { id: 15, name: "hnovatorIntemationalLimited（合并)", value: 38 },
      //   { id: 16, name: "人工环境有限公司（合并）", value: 25 },
      //   { id: 17, name: "智慧能源有限责任公司（合并）", value: 81 },
      //   { id: 18, name: "人工环境有限公司（合并）", value: 99 }
      // ],
      rankingList: [],
      data: [],
      height: ""
    };
  },
  methods: {
    // 打开弹窗
    openDialog() {
      this.$refs.refDialog.tableData = this.data;
      this.$refs.refDialog.tableDataClume = this.tabsList;
    },
    // 切换tabs
    changeTab(value) {
      const currentTabProp = this.tabsList.find(item => item.value === value)
        .prop;
      this.rankingList = this.data.map(item => {
        return {
          name: item.dwmc,
          value: item[currentTabProp] | 0,
          dwbm: item.dwbm
        };
      });
      this.rankingList = this.rankingList.sort((a, b) => b.value - a.value);
    },
    async getData() {
      const result = await api.getHtdpljhtzhl(this.form);
      // console.log("累计合同转化率:", result);
      this.data = result;
      this.changeTab(this.tab);
    },
    // 计算滚动区域高度
    getEleHei() {
      const myElement = document.querySelector(".bottom-left");
      const height = myElement.offsetHeight - 90; // 获取元素高度
      this.height = height;
    }
  },
  mounted() {
    this.getEleHei();
  }
};
</script>

<style lang="scss" scoped>
.ljhtzhl-echarts-box {
  width: 100%;
  height: 100%;
  padding: 0 17px 0px 10px;
  box-sizing: border-box;
  .ranking {
    // height: calc(100% - 34px);
    // height: 396px;
    margin-top: 10px;
    box-sizing: border-box;
    font-size: 14px;
    padding-left: 17px;
    // background-color: #14294e;
    // transform: translate(0px, 0px);
    transition: all 0ms ease-in 0s;
    overflow: auto;

    .item {
      margin: 13px 0;
      position: relative;

      .title {
        display: flex;
        align-content: center;
        color: white;
        position: relative;
        .cfff {
          color: #fff;
        }
        .c00f3fc {
          color: #00f3fc;
        }

        > span {
          display: inline-block;
          transform: rotate(1deg);
          // font-weight: 600;
          font-family: DingTalk-JinBuTi;
        }

        > em {
          display: block;
          margin: 2px 5px 0;
          width: 15px;
          height: 15px;
          background-image: url("../../../../../assets/img/LargeScreen/ranking.png");
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
      .item-container {
        display: flex;
        margin-top: 5px;
        border: 1px solid #3aefe72e;
        border-radius: 3px;
        padding: 5px 10px;
        ::v-deep .el-progress__text {
          position: absolute;
          top: -22px;
          right: 0px;
          color: white;
          font-size: 16px !important;
          font-weight: 500;
        }
        ::v-deep .el-progress-bar {
          padding-right: 0px;
          .el-progress-bar__outer {
            background-color: #1f4375;
            overflow: visible;
            .el-progress-bar__inner {
              background: linear-gradient(
                to right,
                #166d95,
                rgb(155, 222, 236)
              );
              &::after {
                display: block;
                width: 6px;
                height: 6px;
                background-color: #c5f5f9;
                border-radius: 50%;
                position: absolute;
                top: 0px;
                left: 98%;
                box-shadow: 0px 0px 5px 2px #fff;
              }
            }
          }
        }
      }
      .value {
        position: absolute;
        right: 0px;
        top: 0px;
        color: #fff;
        font-family: DINMittelschriftLTW1G;
        font-size: 16px;
      }
    }
    /* 适用于 WebKit 和 Blink 引擎的浏览器 */
    &::-webkit-scrollbar {
      width: 0px; /* 设置滚动条的宽度 */
    }

    /* 滚动条的轨道样式 */
    &::-webkit-scrollbar-track {
      background: #142b51; /* 设置滚动条轨道的背景色 */
    }

    /* 滚动条的滑块样式 */
    &::-webkit-scrollbar-thumb {
      background: #6680ab; /* 设置滚动条滑块的颜色 */
      border-radius: 10px; /* 可选：设置滚动条滑块的圆角 */
    }

    /* 当鼠标悬停在滑块上时，滑块的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #6680ab; /* 设置鼠标悬停时滑块的颜色 */
    }
  }
  ::v-deep .dialog .popFram {
    top: 11px;
  }
}
::-webkit-scrollbar {
  height: 0px;
}
::v-deep .el-progress-bar__innerText {
  display: none;
}
</style>
