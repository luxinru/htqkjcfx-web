<template>
  <div class="gjhjyzbxqEcharts">
    <div class="chart-legend">
      <div class="legend-item" v-for="(item, index) in pieCharArr"  :key="index" @click="changeLegend(item)">
        <div class="item-left">
          <div class="top" >
           <div class="icon"></div>

            <el-tooltip
              class="item"
              effect="dark"
              :content="item.dwmc"
              placement="top-start"
            >
              <span class="legend-text"   >{{ item.dwmc }}</span>
            </el-tooltip>
          </div>
          <div class="xmsl-box">
            <span class="xmsl">{{ $money100m(item.btsjz) }} </span
            ><span class="unit">亿元</span>
            <span class="tb" :class="item.tb >= 0 ? 'up' : 'down'">
              同比 {{ item.tb }}%
            </span>
            <img
              v-if="item.tb >= 0"
              src="../../../../../assets/img/LargeScreen/jjyxjc/up.png"
              alt=""
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
import api from "@/api/gjhjyqk.js";
export default {
  components: { Charts },
  name: "jysrzbxqEcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getData();
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
      const result = await api.queryGjhjysrzbtj(this.form);
      this.pieCharArr = result
    },
    changeLegend(item) {
      this.$emit("changeLegend", item);
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 300px;
  min-width: 300px;
  height: 170px;
}
.gjhjyzbxqEcharts {
  display: flex;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  overflow: hidden;
  margin-top: 20px;
  margin-left: 20px;
}
.legend-color {
  height: 10px;
  width: 10px;
}

.chart-legend {
  width: 100%;
  &:hover {
    overflow-y: auto;
  }
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  margin-left: 10px;
  .legend-item {
    cursor: pointer;  
    display: flex;
    justify-content: center;
    width:calc(100% / 3);
    margin-bottom: 20px;
    background-image: url("../../../../../assets/img/LargeScreen/jjyxjc/bkfb.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 13px 0;
    .icon{
      margin-top: 3px;
      width: 4px;
	    height: 10px;
	    background-color: #00aafc;

      // margin-right: 8px;
    }
    .legend-text {
      width: 160px;
      color: #88add4;
      text-overflow: ellipsis; /* 溢出显示省略号 */
      overflow: hidden; /* 溢出隐藏 */
      white-space: nowrap; /* 强制不换行 */
      line-height: 16px;
      height: 16px;
    }
    .item-left {
      margin-right: 10px;
      .xmsl {
        font-size: 26px;
        color: #fefeff;
        font-weight: 700;
        line-height: 16px;
        height: 16px;
      }
      .unit {
        color: #fefeff;
      }
      .top {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .legend-text {
          margin-left: 8px;
        }
      }
      .xmsl-box {
        margin-left: 10px;
        .tb {
          margin-left: 30px;
          font-size: 12px;
          // color: #00f886;
          &img {
            width: 8px;
            height: 12px;
          }
        }
      }
      .ndjiz {
        margin-top: 17px;
        padding: 4px 20px;
        color: #c9e0ff;
        background-color: #0c3469;
        border-radius: 2px;
        width: fit-content;
      }
    }
    .item-right {
      .legend-text {
        width: 120px;
        margin-bottom: 20px;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .legend-item:hover {
    background-image: url("../../../../../assets/img/LargeScreen/jjyxjc/bkfbactive.png");
  }
}
.up {
  color: #00f886;
}
.down {
  color: #ff5050;
}
</style>
