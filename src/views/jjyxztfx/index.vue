<template>
  <div class="htqkjcfx">
    <div class="htqkjcfx-header">
      <div class="mc-div2 title" >
        经济运行监测专题分析
      </div>
    </div>
    <div class="htqkjcfx-container">
      <div class="htqkjcfx-top">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <span>主要财务指标趋势分析</span>
        </div>
        <!-- 合同指标趋势分析 -->
        <div class="qsfx-box">
          <div class="qsfxleft">
            <div class="zb">指标</div>
            <el-checkbox-group v-model="checkList" class="checkbox-group">
              <el-checkbox label="营业收入"></el-checkbox>
              <el-checkbox label="利润总额"></el-checkbox>
              <el-checkbox label="净现金流"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="qsfxright">
            <div class="qsfxright-title">
              <div class="qsfxright-title-left"><img src="../../assets/img/zt/title.png" alt="">{{ zzjginfo.dwmc }}{{ formattedCheckList }}</div>
              <div class="form">
                <el-select class="select" style="width: 140px" v-model="zzjginfo.dwmc" placeholder="组织机构"
                  popper-class="form-item-zzjg" ref="select">
                  <el-option :value="zzjginfo.dwmc" style="height: 200px; overflow: auto">
                    <el-tree :data="treeStructure" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </el-option>
                </el-select>
                <div>
                  时间 <el-date-picker v-model="time" type="monthrange" range-separator="至" start-placeholder="开始月份"
                    end-placeholder="结束月份" @change="changeDate" :clearable="false" >
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="chart-div">
              <htzbqsfxEcharts :form="form" :isRequest="isRequest" :checkList="checkList" />
            </div>
          </div>
        </div>

      </div>
      <!-- <div class="htqkjcfx-top">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <span>主要指标趋势分析</span>
        </div>
        <div class="qsfx-box">
          <div class="qsfxleft">
            <div class="zb">指标</div>
            <div class="checkbox-group">
              <el-radio v-model="radio" label="营业收入">营业收入</el-radio>
              <el-radio v-model="radio" label="利润总额">利润总额</el-radio>
              <el-radio v-model="radio" label="净现金流">净现金流</el-radio>
            </div>
          </div>
          <div class="qsfxright">
            <div class="qsfxright-title">
              <div><img src="" alt="#">同方股份有限公司{{ radio }}产业分布情况</div>
              <div>时间 <el-date-picker style="width: 120px" v-model="time" type="month" placeholder="请选择"
                  value-format="yyyy-MM-dd HH:hh:mm">
                </el-date-picker></div>
            </div>
            <div class="chart-div">
              <htzbcyfbqkEcharts :form="form" :isRequest="isRequest" />
            </div>
          </div>
        </div>

      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import htzbqsfxEcharts from "./components/htzbqsfxEcharts";
// import htzbcyfbqkEcharts from "./components/htzbcyfbqkEcharts";
import api from "@/api/jjyxjcfx";
export default {
  components: {
    htzbqsfxEcharts,
    // htzbcyfbqkEcharts
  },
  data() {
    return {
      // time: new Date(), // 用来存储当前系统时间
      checkList: ["营业收入", "利润总额", "净现金流"],
      form: {
        dwbm: "",
        kssj: "",
        jssj: "",
      }, // 是否请求
      // radio: '营业收入',
      isRequest: false,
      time: [new Date(2024, 0, 10, 8, 40), new Date(2024, 11, 10, 9, 40)],
      zzjginfo: '',
      treeStructure: [],

      defaultProps: {
        children: "children",
        label: "dwmc"
      },
    };
  },
  computed: {
    // 计算属性返回格式化的日期时间字符串
    formattedCheckList() {
      // 如果 checkList 中只有一个元素，直接返回它；否则，用顿号拼接
      return this.checkList.length === 1
        ? this.checkList[0]
        : this.checkList.join('、');
    },
    currentDateTime() {
      return this.formatDateTime(this.time);
    },
   
  },

  created() {
    this.queryJgsdwlb(); // 查询机构单位列表
    this.form.kssj =  this.formatDateTime(this.time[0])  ;
    this.form.jssj =  this.formatDateTime(this.time[1])  ;
   },
  methods: {
    // ...mapMutations(["SET_CASEINFO"]),
    // 定义一个方法用于格式化日期时间
    formatDateTime(date) {
      this.$moment.locale("zh-cn");
      return this.$moment(date).format("YYYY-MM-DD 23:59:59");
    },
    
    // 点击节点
    handleNodeClick(data) {
      this.zzjginfo = data;
      this.form.dwbm = data.dwbm;
      this.$refs.select.handleClose();

    },
    //转换为树形结构方法
    convertToTree(data) {
      const tree = [];
      // 1. 创建一个映射，存储每个节点的引用，key 为 dwbm（节点 ID）
      const map = new Map();
      data.forEach(item => {
        map.set(item.dwbm, { ...item, children: [] });
      });

      // 2. 遍历数据，将每个节点根据父节点（fdwbm）组织成树结构
      data.forEach(item => {
        // 如果父节点存在且不为空，则将该节点加入父节点的 children 数组
        if (item.fdwbm) {
          const parent = map.get(item.fdwbm);
          parent.children.push(map.get(item.dwbm));
        } else {
          // 如果没有父节点（即 fdwbm 为 null），则是根节点，直接加入 tree
          tree.push(map.get(item.dwbm));
        }
      });

      return tree;
    },
     //获取组织树
     async queryJgsdwlb() {
      const res = await api.queryJgsdwlb();
      this.treeStructure = this.convertToTree(res);
      this.zzjginfo = res[0];
      this.form.dwbm = res[0].dwbm;
      // this.SET_CASEINFO(res[0]);    
    },
    changeDate(val) {
      this.$set(this.form, 'kssj',this.formatDateTime(val[0]));
      this.$set(this.form, 'jssj',this.formatDateTime(val[1]));
    },
  }
};
</script>

<style scoped lang="scss">
.htqkjcfx {
  width: calc(100% - 50px);
  height: calc(100% - 42px);
  //   display: flex;
  padding: 10px 25px 32px 25px;
}

.htqkjcfx-header {
  position: relative;
  display: flex;
  height: 105px;
  background-size: 100% 100%;
  justify-content: center;

  .mc-div2 {
    text-align: center;
    width: 880px;
    background-image: url("../../assets/img/default/top.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* 或者 cover，取决于需求 */
    // margin-top: 14px;




  }

  .title {
    font-family: YouSheBiaoTiHei;
    font-size: 30px;
    font-weight: 700;
    font-stretch: normal;
    line-height: 85px;
    letter-spacing: 4px;
    color: #eff7ff;
  }

  .timeing-div {
    padding: 0 30px;
    position: relative;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}

.htqkjcfx-container {
  width: 100%;
  flex: 1;
  overflow: hidden;

  .htqkjcfx-top {
    background-color: rgba(27, 76, 136, 0.1);
    height: 430px;
    margin-bottom: 20px;

    .checkbox-group {
      display: flex;
      flex-direction: column;
      /* 设置为竖直排列 */
      gap: 10px;
      /* 控制复选框之间的间距 */
      margin-right: 20px;

    }
  }

  .qsfx-box {
    padding: 17px;
    height: calc(100% - 60px);
    display: flex;

    .qsfxleft {
      width: 120px;
      height: 100%;
      background: linear-gradient(to bottom, rgba(10, 47, 102, 0) 0%, rgba(10, 47, 102, 0.4) 50%, rgba(10, 47, 102, 0) 100%);

      .zb {
        color: #ffffff;
      }
    }

    .qsfxright {
      flex: 1;

      .qsfxright-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        .qsfxright-title-left{
          display: flex;
          align-items: center;
        padding-left:50px ;
        img{
          margin-right: 10px;
        }

        }

        ::v-deep .el-range-separator {
          color: #88add4;
          line-height: 32px;
          height: 32px;
        }

        .form {
          display: flex;

          .select {
            margin-right: 20px;
          }
        }

      }

      .chart-div {
        width: 100%;
        height: calc(100% - 60px);
      }

    }
  }
}

.tit-div {
  height: 34px;
  line-height: 34px;
  background-color: rgba(27, 76, 136, 0.4);
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  position: relative;
  border-top: 1px solid rgba(47, 89, 140, 0.68);
  border-bottom: 1px solid rgba(47, 89, 140, 0.68);
  display: flex;
  background-image: url("../../assets/img/LargeScreen/ksqyzl/Line-c.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  /* 可选：设置图片在div中的位置，默认为左上角 */
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #2487e3;
    left: 0;
    top: 0;
  }

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #2487e3;
    right: 0;
    top: 0;
  }

  .d-left {
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #2487e3;
    left: 0;
    bottom: 0;
  }

  .d-right {
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #2487e3;
    right: 0;
    bottom: 0;
  }

  .bq {
    background-image: url("../../assets/img/LargeScreen/tit-bq.png");
    width: 36px;
    height: 36px;
    margin-right: 7px;
  }
}
</style>
<style>
/* 改变下拉列表的背景色 */
.el-select-dropdown {
  background-color: #000924;
  border-color: #000924;
}

/* 改变下拉列表的文本颜色 */
.el-select-dropdown__item.selected {
  color: #76a5bd;
  /* 选中项的文本颜色 */
}

/* 未选中项的文本颜色（如果需要） */
.el-select-dropdown__item:not(.selected) {
  color: #135293ea;
  /* 未选中项的文本颜色 */
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #263a4cea;
}

.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #000924;
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #000924;
}

.el-picker-panel {
  background-color: #000924;
  border: #4969b5;
}

.el-date-picker__header--bordered {
  border-color: #4969b5;
}

.el-range-input {
  background: #123b63;
}


::-placeholder {
  /* Firefox, Chrome, Opera 18+ */
  color: red;
  opacity: 1;
  /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}

.el-input__inner {
  height: 32px;
  line-height: 32px;
  background-color: #123b63;
  border: 1px solid #3e74ad;
  color: #88add4;
  font-size: 14px;
}

.el-input__icon {
  line-height: 32px;
  height: 32px;
}

.form-item-zzjg {

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #000924;
  }

  .el-tree-node__content:hover,
  .el-upload-list__item:hover {
    background-color: #263a4cea;
  }

  .el-select-dropdown__item {
    padding: 0;
  }

  .el-tree-node__label {
    font-weight: 400;
  }
}

.el-radio {
  color: #fff;
}

.el-checkbox {
  color: #fff;
}
/* 设置 el-tree 树的样式 */

.el-tree {
  background: none;
}

.el-tree-node__label {
  color: #135293ea;
}

.el-popover {
  background-color: #000924;
  border: #4969b5;
  color: #135293ea;
}
</style>
