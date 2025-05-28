<!--
 * @Date: 2024-06-24 08:38:11
 * @LastEditors: linxing
 * @LastEditTime: 2024-08-07 11:22:49
 * @FilePath: \htqkjcfx-web\src\views\LargeScreen\components\bkxqEcharts\index.vue
-->
<template>
  <div class="bkxqEcharts">
    <div class="chart-legend">
      <div
        class="legend-item"
        v-for="(item, index) in pieCharArr"
        :key="index"
        @click="changeLegend(item)"
      >
        <div class="icon"></div>
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
            <div class="btzbz"> {{ $money100m(item.btzbz) }}  </div> <div class="unit"> 亿元</div>
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
import { mapState, mapMutations } from "vuex";
export default {
  components: { Charts },
  name: "bkxqEcharts",
  props: {
    form: Object,
    formValue: Object,
    treeStructure: Array,
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
    ...mapMutations(["SET_CASEINFO"]),
    async getData() {
      const params = {
        ...this.form,
        ...this.formValue
      };
      if (!params.dezb) return;
      const result = await api.queryJjyxbkxqtj(params);
      this.pieCharArr = [...result];
    },


    changeLegend(val) {

      // 使用方法
      const result = this.findMatchingNode(this.treeStructure, val);
      if(result.children.length>0){
        this.$emit("changeLegend", val,true);
     
      }else{

        this.$emit("changeLegend", val,false);
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

      return false; // 如果没找到，返回 null
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-box {
  width: 300px;
  height: 180px;
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
  height: 180px;
  flex: 1;
  padding: 20px 10px 0px 50px;
  .legend-item {
    width:273px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    background-image: url("../../../../../assets/img/LargeScreen/jjyxjc/bkfb.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 13px 0;
    margin-bottom: 20px;
    cursor: pointer;
    .icon{
      margin-top: 3px;
      width: 4px;
	    height: 10px;
	    background-color: #00aafc;
      margin-right: 8px;
    }

    .btzbz {
      font-size: 18px;
      color: #fefeff;
      font-weight: 700;
      line-height: 16px;
      height: 16px;
      margin-right: 4px;

    }
    .unit {
      color: #fefeff;
      line-height: 16px;
      height: 16px;
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
      .zb-text{
      margin-bottom: 10px;
      line-height: 16px;
      height: 16px;

      }
      .zb-value {
        // color: #00f886;down
        // font-weight: 700;
        margin-top: 4px;

      }
    }
    .legend-text-box {
      display: flex;
      flex-direction: column;
      .legend-text {
      width: 120px;
      color: #88add4;
      text-overflow: ellipsis; /* 溢出显示省略号 */
      overflow: hidden; /* 溢出隐藏 */
      white-space: nowrap; /* 强制不换行 */
      margin-bottom: 11px;
      line-height: 16px;
      height: 16px;
    }
    .btzbz-box{
      display: flex;
    }
    }
    .ndjiz {
      margin-top: 17px;
      padding: 4px 20px;
      color: #c9e0ff;
      background-color: #0c3469;
      border-radius: 2px;
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
