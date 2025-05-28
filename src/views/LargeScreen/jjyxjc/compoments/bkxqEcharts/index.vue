<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\bkxqEcharts\index.vue
-->
<template>
  <div class="bkxqEcharts">
    <!-- <div class="chart-box"> 
      <charts charType="jjyxjcPie" :charData="pieCharArr"></charts>
    </div> -->
    <div class="chart-legend">
      <div class="legend-item" v-for="(item, index) in pieCharArr" :key="index">
        <span class="legend-color" :style="{ background: item.color }"></span>
        <div class="legend-text-box">
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.dwmc"
            placement="top-start"
          >
            <span class="legend-text">{{ item.dwmc }}</span>
          </el-tooltip>
          <div class="btzbz-box">
            <span class="btzbz">{{ $money100m(item.btzbz) }} </span>
            <span class="unit">亿元</span>
          </div>
        </div>
        <div class="zb">
          <span class="zb-text" :class="item.tb >= 0 ? 'up ' : 'down'"
            >同比</span
          >
          <div>
            <span class="zb-value" :class="item.tb >= 0 ? 'up ' : 'down'"
              >{{ item.tb }}%</span
            >
            <img
              src="../../../../../assets/img/LargeScreen/jjyxjc/up.png"
              alt=""
              v-if="item.tb >= 0"
            />
            <img
              v-else
              src="../../../../../assets/img/LargeScreen/jjyxjc/down.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/jjyxjc.js";

export default {
  components: { Charts },
  name: "bkxqEcharts",
  props: {
    form: Object,
    formValue: Object,
    isbkxq: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getData();
        return;
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    },
    formValue: {
      handler(newVal, oldVal) {
        if (!newVal.dezb) return;
        this.getData();
        return;
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
  },
  data() {
    return {
      pieCharArr: []
    };
  },
  methods: {
    async getData() {
      const params = {
        ...this.form,
        ...this.formValue
      };
      if (!params.dezb) return;
      const result = await api.queryJjyxbkxqtj(params);
      const colors = result.map(() => this.getRandomHexColor());
      this.pieCharArr = result.map((item, index) => ({
        ...item,
        color: colors[index]
      }));
      // this.pieCharArr =[{
      //   btzbz:777,
      //   tb:-22,
      //   dwmc:'张三',
      //   zb:42,
      //   color: 'red'
      // }]
    },

    getRandomHexColor() {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0") + // 红色分量，范围 0-255
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0") + // 绿色分量，范围 0-255
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0"); // 蓝色分量，范围 0-255
      return randomColor;
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 300px;
  height: 260px;
}
.bkxqEcharts {
  display: flex;
  width: 100%;
}
.legend-color {
  height: 10px;
  width: 10px;
  margin-top: 5px;
  margin-right: 5px;
  border-radius: 2px;
}
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: auto;
  height: 220px;
  flex: 1;
  padding: 50px 10px 0px 30px;
  .legend-item {
    // width: 200px;
    width: calc(100% / 3);
    // max-width:calc(100% / 3);
    display: flex;
    font-size: 14px;
    height: 50%;

    .btzbz {
      font-size: 18px;
      color: #fefeff;
      font-weight: 700;
    }
    .unit {
      color: #fefeff;
    }
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .legend-text {
        margin-left: 10px;
      }
    }
    .zb {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      > img {
        width: 8px;
        height: 12px;
      }
      // .zb-text{
      //   color: #88add4;
      // }
      .zb-value {
        // color: #00f886;down
        // font-weight: 700;
        margin-top: 4px;
      }
    }
    .legend-text-box {
      display: flex;
      flex-direction: column;
    }
    .ndjiz {
      margin-top: 17px;
      padding: 4px 20px;
      color: #c9e0ff;
      background-color: #0c3469;
      border-radius: 2px;
    }
    .legend-text {
      width: 120px;
      color: #88add4;
      text-overflow: ellipsis; /* 溢出显示省略号 */
      overflow: hidden; /* 溢出隐藏 */
      white-space: nowrap; /* 强制不换行 */
    }
    // .item-left {

    // }
    // .item-right{
    //   .legend-text{
    //     margin-bottom: 20px;
    //   }
    //  display: flex;
    //  flex-direction: column;
    //  align-items: center;

    // }
  }
}
.up {
  color: #00f886;
}
.down {
  color: #ff5050;
}
</style>
