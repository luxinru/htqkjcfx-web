<template>
  <div class="jjyxjc" :key="show">
    <div class="jjyxjc-left">
      <div class="jjyxjc-left-top">
        <Ysqk :form="form" @changeysqk="changeysqk"></Ysqk>
        <el-form
          class="init-form-sty"
          ref="form"
          inline
          :model="form"
          size="mini"
        >
          <el-form-item label="组织机构">
            <el-select
              style="width: 140px"
              v-model="zzjginfo.dwmc"
              placeholder="组织机构"
              popper-class="form-item-zzjg"
              ref="select"
            >
              <el-option
                :value="zzjginfo.dwmc"
                style="height: 200px; overflow: auto"
              >
                <el-tree
                  :data="treeStructure"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                ></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              style="width: 120px"
              v-model="form.jzsj"
              :type="unit"
              placeholder="请选择"
              value-format="yyyy-MM-dd HH:hh:mm"
              :clearable="false"
              @change="changeDate"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="jjyxjc-left-bottom chart-div">
        <div class="d-left"></div>
        <div class="d-right"></div>
        <div class="d-top-left"></div>
        <div class="d-top-right"></div>
        <div class="cyxp-title" v-show="isbkxq">{{ `${ysqkmc}板块分布` }}</div>
        <div class="pietwo-chatr" v-show="isbkxq">
          <bkfb
            :form="form"
            :isRequest="isRequest"
            :isbkxq="isbkxq"
            :formValue="formValue"
            @changeLegend="changeLegend"
            :treeStructure="treeStructure"
          ></bkfb>
        </div>
        <div class="cyxp-title">{{ ysqkmc }}月度趋势</div>
        <div class="ydqs-chart" :class="isbkxq ? 'ydqs-chart' : 'ydqs-chart1'">
          <ydqsEcharts
            :form="form"
            :formValue="formValue"
            :isRequest="isbkxq"
          ></ydqsEcharts>
        </div>
      </div>
    </div>
    <div class="jjyxjc-right">
      <div class="gotojjzt" @click="gotojjzt">经济专题分析>></div>
      <div class="jjyxjc-right-top">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>五率</span>
        </div>
        <!-- 五率 -->
        <wl
          :form="form"
          :formValue="formValue"
          :treeStructure="treeStructure"
        ></wl>
      </div>
      <div class="jjyxjc-right-bottom">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>重点任务</span>
        </div>
        <div class="zdrwtable">
          <zdrwTable :form="form" :formValue="formValue"></zdrwTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Charts from "@/components/echarts/index.vue"; //图表
import Ysqk from "./compoments/ysqk.vue"; //收入详情
import wl from "./compoments/wl.vue"; //五率
import bkxqEcharts from "./compoments/bkxqEcharts"; //分布详情
import bkfb from "./compoments/bkfb"; //利润和现金流分布情况
import ydqsEcharts from "./compoments/ydqsEcharts"; //图表
import zdrwTable from "./table/zdrw.vue"; //重点任务表格
import { mapState, mapMutations } from "vuex";
import api from "@/api/jjyxjc.js";
export default {
  name: "jjyxjc",
  components: {
    Ysqk,
    Charts,
    wl,
    bkxqEcharts,
    zdrwTable,
    ydqsEcharts,
    bkfb
  },
  // watch: {
  //   mapMutations(newValue) {
  //     console.log(newValue, "newValue");

  //   }
  // },
  data() {
    return {
      unit: "month",
      form: {
        jzsj: "2024-11-01 00:12:00",
        dwbm: ""
      },
      formValue: {
        dezb: "",
        dszb: "",
        zbz: ""
      },
      show: 1,
      isRequest: false,
      input1: "",
      treeStructure: [],

      defaultProps: {
        children: "children",
        label: "dwmc"
      },
      zzjginfo: "",
      iszzjg: false,
      isbkxq: true,
      ysqkmc: "集团外营业收入"
    };
  },
  computed: {
    ...mapState({
      dwbm: state => state.caseInfo.dwbm
    })
  },
  watch: {
    dwbm(newVal, oldVal) {
      if (newVal == JSON.parse(sessionStorage.getItem("dwlb")).dwbm) {
        this.isbkxq = true;

        this.queryJgsdwlb();
      }
      // this.zzjginfo.dwmc = newVal.dwmc;
      this.form.dwbm = this.dwbm;
      this.formValue.dwbm = this.dwbm;
    }
  },
  methods: {
    ...mapMutations(["SET_CASEINFO"]),
    // 修改单位编码

    handleResize() {
      // 重新渲染页面
      this.show += 1;
    },
    // 点击节点
    handleNodeClick(data, node) {
      this.isbkxq = Boolean(node.childNodes.length);
      this.zzjginfo = data;
      this.form.dwbm = data.dwbm;
      this.iszzjg = !this.iszzjg;
      this.$refs.select.handleClose();
      this.SET_CASEINFO(data);
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
    // 总数传值
    changeysqk(val) {
      this.ysqkmc = val.mkmc;
      this.formValue.zbz = val.zbz;
      this.formValue.dezb = val.dezb;
      this.formValue.dszb = val.dszb;
    },
    //获取组织树
    async queryJgsdwlb() {
      const res = await api.queryJgsdwlb();
      this.treeStructure = this.convertToTree(res);
      this.zzjginfo = res[0];
      this.form.dwbm = res[0].dwbm;
      this.SET_CASEINFO(res[0]);
      sessionStorage.setItem("dwlb", JSON.stringify(res[0]));
    },
    gotojjzt() {
      window.open("/stat/htqkjcfx/jjyxztfx", "_blank"); // 打开新窗口
    },
    changeLegend(val,len) {                              
      // console.log(val,len);                                       
      this.isbkxq=len                                          
      this.zzjginfo = val;
      this.SET_CASEINFO(val);
      this.form.dwbm = val.dwbm;
    },
    //  定义递归函数来查找符合条件的节点
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
    },
    changeDate(time) {
      sessionStorage.setItem("jzsj", JSON.stringify(time));
    }
  },
  created() {
    if (!sessionStorage.getItem("jzsj")) {
      // console.log("没有时间");

      sessionStorage.setItem("jzsj", JSON.stringify(this.form.jzsj));
    } else {
      this.form.jzsj = JSON.parse(sessionStorage.getItem("jzsj"));
    }
    this.queryJgsdwlb();
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style lang="scss" scoped>
.jjyxjc {
  width: calc(100% - 50px);
  height: calc(100% - 162px);
  display: flex;
  padding: 10px 25px 32px 25px;
  gap: 17px;

  /* 设置子元素之间的间距为 17px */
  .jjyxjc-left {
    display: flex;
    flex-direction: column;

    .jjyxjc-left-top {
      display: flex;
      flex-direction: column;

      .init-form-sty {
        position: absolute;
        top: 95px;
        left: 40px;

        ::v-deep .el-form-item__label {
          color: #76a5bd;
        }

        ::v-deep .el-input__inner {
          background-color: rgba(255, 0, 0, 0);
          /* 半透明的红色 */
          border-color: #093252;
          color: #76a5bd;
        }

        ::v-deep .el-input__icon {
          color: #76a5bd;
        }

        .zzjgmc {
          width: 80px;
          height: 28px;
          border: 1px solid #093252;
          border-radius: 3px;
          color: #76a5bd;
          line-height: 28px;
          padding-left: 10px;
        }
      }
    }

    .jjyxjc-left-bottom {
      // flex: 1;
      width: 992px;
      position: relative;
      padding-top: 10px;
      margin-top: 10px;
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

      .d-top-left {
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #2487e3;
        top: 0;
        left: 0;
      }

      .d-top-right {
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #2487e3;
        top: 0;
        right: 0;
      }

      .cyxp-title {
        color: #ffffff;
        font-size: 16px;
        line-height: 53px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: normal;
        width: 120px;
        white-space: nowrap;
        margin-left: 20px;
        text-align: left;
        background-image: url(../../../assets/img/LargeScreen/ejbt.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
        /* 可选：设置图片在div中的位置，默认为左上角 */
      }

      .pietwo-chatr {
        // width: ;
        height: 190px;
      }

      .ydqs-chart {
        height: calc(100% - 200px);
        width: 100%;
      }
      .ydqs-chart1 {
        height: calc(100% - 50px);
        width: 100%;
        .chart-box {
          height: 100%;
        }
        .chart-div {
          height: 100%;
        }
      }
    }
  }

  .jjyxjc-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    .jjyxjc-right-top {
      background-color: rgba(27, 76, 136, 0.4);
      margin-bottom: 20px;
    }

    .jjyxjc-right-bottom {
      flex: 1;
      .zdrwtable {
        padding: 10px 17px 17px 17px;
        height: 100%;
        overflow: hidden;
        background-color: rgba(27, 76, 136, 0.2);
      }
      overflow: hidden;
    }
    .gotojjzt {
      position: fixed;
      top: 80px;
      right: 64px;
      color: #409eff;
      cursor: pointer;
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
    // border-top: 1px solid rgba(47, 89, 140, 0.68);
    // border-bottom: 1px solid rgba(47, 89, 140, 0.68);
    display: flex;
    background-image: url("../../../assets/img/LargeScreen/ksqyzl/Line-c.png");
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
      top: 1;
    }

    &::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 2px;
      background-color: #2487e3;
      right: 0;
      top: 1;
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
      background-image: url("../../../assets/img/LargeScreen/tit-bq.png");
      width: 36px;
      height: 36px;
      margin-right: 7px;
    }
    .tit-g {
      background: url("../../../assets/img/LargeScreen/tit-g.png");
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      right: 0;
      height: 34px;
    }
    span {
      position: absolute;
      left: 40px;
      right: 0;
      height: 34px;
      z-index: 2;
    }
  }

  .chart-div {
    flex: auto;
    background-color: rgba(47, 89, 140, 0.2);
    position: relative;
  }

  .chart-div::before,
  .chart-div::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #2487e3;
    bottom: 0;
  }

  .chart-div::before {
    left: 0;
  }

  .chart-div::after {
    right: 0;
  }
}
</style>

<style lang="scss">
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

/* 设置 el-tree 树的样式 */

.el-tree {
  background: none;
}

.el-tree-node__label {
  color: #135293ea;
}
</style>
