<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\htjellbdqkEcharts\index.vue
-->
<template>
  <div class="htjellbdqkEcharts">
    <div class="chart-box">
      <charts charType="zdxmjczcfbPie" :charData="pieCharArr"></charts>
    </div>
    <div class="chart-legend">
      <div class="legend-item" v-for="(item, index) in pieCharArr" :key="index">
        <div class="item-left">
          <div class="top">
            <span
              class="legend-color"
              :style="{ background: item.color }"
            ></span>
            <span class="legend-text">{{ item.jefw }}</span>
          </div>
          <div class="xmsl-box" ><span class="xmsl">{{ item.xmsl }} </span><span class="unit">个</span></div>
          <!-- <div class="ndjiz">年度计划值：{{item.ndjhz}}个</div> -->
        </div>
        <!-- <div class="item-right">
          <div class="legend-text">年度计划完成率</div>
          <el-progress type="circle" :percentage="Number(item.xmzb)"  :text-color="'#00f886'"  :stroke-width="5"  :width="80" :define-back-color="'#153e75'"    :color="'#9afffe'"></el-progress>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import api from "@/api/zdxmjc.js";
export default {
  components: { Charts },
  name: "xmstzfbEcharts",
  props: {
    form: Object,
    isRequest: Boolean
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        if(newVal.jesjzzbdm&&newVal.xmssjzzbdm){
          this.getData();
        }
      },
      deep: true, // 深度监听对象或数组的变化
      immediate: true // 是否在初始化时立即触发一次回调
    }
  },
  data() {
    return {
    pieCharArr: [
        // {
        //   jefw: "固定资产投资金额",
        //   // xmsl: 31,
        //   // xmzb: 10.77,
        //   color: "#00FF00",
        // },
        // {
        //   jefw: "股权投资金额",
        //   // xmsl: 14,
        //   // xmzb: 40.12,
        //   color: "#FF00FF",
        // }
      ]
    };
  },
  mounted() {
  },
  methods: {
    async getData() {
      this.xmssjzzbdm=''
      const result = await api.getZdxmtzxmsfbtj(this.form);
         // 更新第一个元素的属性
         this.$set(this.pieCharArr, 0, {
           xmsl: result.gdzcsjz,
           xmzb: Number(result.gdzcnjhwcl),
           ndjhz: result.gdzcjhz,
           jefw: "固定资产投资项目数",
           color: "#0b7fff",
           zb: Number(result.gdzcZb  ),});
         
         // 更新第二个元素的属性
         this.$set(this.pieCharArr, 1, {
           xmsl: result.gqtzsjz,
           xmzb: Number(result.gqtznjhwcl),
           ndjhz: result.gqtzjhz,
           jefw: "股权投资金项目数",
           color: "#ffc811",
           zb: Number(result.gqtzZb),

         });
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 150px;
  min-width: 150px;
  height: 150px;
}
.htjellbdqkEcharts {
  display: flex;
  width: 100%;
}
.legend-color {
  height: 10px;
  width: 10px;
}
.chart-legend {
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 50px;
  .legend-item {
    display: flex;
    width: 50%;
    .legend-text {
          color: #88add4;
        }
    .item-left {
      margin-right: 30px;
      .xmsl{
        font-size: 26px;
        color: #fefeff;
        font-weight: 700;
      }
      .unit{
        color: #fefeff;
      }
      .top {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .legend-text{
          margin-left: 10px;
        }
      }
      .xmsl-box{
        margin-left: 25px;
        
      }
      .ndjiz{
        margin-top: 17px;
        padding: 4px 10px;
        color: #c9e0ff;
        background-color: #0c3469;
	      border-radius: 2px;
      }
    }
    .item-right{
      .legend-text{
        margin-bottom: 20px;
      }
     display: flex;
     flex-direction: column;
     align-items: center;
   
    }
  }
}
</style>
