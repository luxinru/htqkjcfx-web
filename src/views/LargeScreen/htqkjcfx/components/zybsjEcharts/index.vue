<template>
  <div class="top-content">
    <div
      class="tj-div"
      :class="index < 4 ? 'mb20' : ''"
      v-for="(item, index) in tjxList"
      :key="index"
    >
      <div class="sjtj-div">
        <div class="sl-div">
         <!-- {{
            item.mc.includes("率")
              ? (item.je * 100).toFixed(2)
              : (item.je).toFixed(2)
          }}-->
              {{ (item.je).toFixed(2) }}
          <span class="jldw-span">{{ formatterCompany(item.mc) }}</span>
        </div>
        <div class="tb-div">
          同比：{{ item.tb }}%<span :class="tbClass(item.tb)"></span>
        </div>
      </div>
      <div class="sjdz-div"></div>
      <div class="tb-mc">{{ item.mc }}</div>
    </div>
  </div>
</template>

<script>
import api from "@/api/global.js";
export default {
  name: "HtjefbqkEcharts",
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
  data() {
    return {
      // tjxListCopy: [
      //   {
      //     je: "80",
      //     tb: "0",
      //     mc: "年初手持合同额"
      //   },
      //   {
      //     je: "80",
      //     tb: "5.3",
      //     mc: "累计新签合同额 "
      //   },
      //   {
      //     je: "18",
      //     tb: "5.3",
      //     mc: "累计转化收入-年初手持"
      //   },
      //   {
      //     je: "20",
      //     tb: "5.3",
      //     mc: "累计转化收入-累计新签"
      //   },
      //   {
      //     je: "60",
      //     tb: "5.3",
      //     mc: "期末手持合同额-年初手持"
      //   },
      //   {
      //     je: "10",
      //     tb: "5.3",
      //     mc: "期末手持合同额-累计新签"
      //   },
      //   {
      //     je: "25",
      //     tb: "5.3",
      //     mc: "累计合同转化率-年初手持"
      //   },
      //   {
      //     je: "44.4",
      //     tb: "-5.3",
      //     mc: "累计合同转化率-累计新签"
      //   }
      // ], // 假数据
      tjxList: []
    };
  },
  methods: {
    async getData() {
      const dwlb=JSON.parse(sessionStorage.getItem("dwlb"));
      const param=this.form
      if (this.form.dwbm===dwlb.dwbm){
        param.dwbm=''
      }
      const result = await api.getHtdpzyxq(param);
      // console.log("中央8颗小球监测列表:", result);
      this.tjxList = result.map(item => {
        return {
          je: item.je,
          tb: item.tb,
          mc: item.mc
        };
      });
    },
    formatterCompany(mc) {
      return mc.includes("率") ? "%" : "亿元";
    },
    tbClass(tb) {
      const taNum = +tb;
      const tbClass = taNum === 0 ? "" : taNum < 0 ? "down" : "up";
      return tbClass;
    }
  }
};
</script>

<style lang="scss" scoped>
.top-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  .tj-div {
    width: calc(100% / 4);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // padding-top: 15px;
    .sjtj-div {
      display: flex;
      flex-direction: column;
      // animation: bounce 2s infinite;
      z-index: 3;
    }
    .sl-div {
      font-family: TWIG;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      font-weight: 700;
      background-image: linear-gradient(to bottom, #e1f9ff, #4ffcff);
      -webkit-background-clip: text;
      color: transparent;
      text-align: center;
      .jldw-span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0;
        color: #4dc3c8;
      }
    }
    .tb-div {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
      .up,
      .down {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-repeat: no-repeat;
        margin-left: 2px;
      }
      .up {
        background-image: url("../../../../../assets/img/LargeScreen/down.png");
        transform: rotate(180deg); /* 旋转 180 度 */
      }
      .down {
        background-image: url("../../../../../assets/img/LargeScreen/up.png");
        transform: rotate(180deg); /* 旋转 180 度 */
      }
    }
    .tb-mc {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      // font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0;
      color: #ffffff;
      width: 100%;
      text-align: center;
      bottom: 0;
      position: absolute;
    }
    .sjdz-div {
      position: absolute;
      width: 146px;
      height: 99px;
      background-image: url("../../../../../assets/img/LargeScreen/sjdz.png");
      z-index: 0;
      bottom: 0px;
    }
  }
  .mb20 {
    margin-bottom: 20px;
  }
  /* 定义一个名为bounce的动画 */
  // @keyframes bounce {
  //   0%,
  //   100% {
  //     transform: translateY(0);
  //   }
  //   50% {
  //     transform: translateY(-10px); /* 向上移动10像素 */
  //   }
  // }
}
</style>
