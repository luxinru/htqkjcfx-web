<template>
  <div class="htqkjcfx" :key="show">
    <div class="top">
      <div class="top-left">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>可转化合同额</span>
        </div>
        <div class="chart-div">
          <!-- 可转化合同额 -->
          <kzhhte-echarts
            @setCaseInfoDwbm="setCaseInfoDwbm"
            :form="formValue"
            :isRequest="isRequest"
            :treeStructure="treeStructure"
          />
        </div>
        <el-form
          class="init-form-sty"
          ref="form"
          inline
          :model="form"
          size="mini"
        >
          <!-- <el-form-item label="截止时间">
            <el-select style="width: 80px" v-model="unit" placeholder="请选择活动区域">
              <el-option label="月度" value="month"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="截止时间">
            <el-date-picker
              style="width: 120px"
              v-model="form.rq"
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
      <zybsj-echarts :form="formValue" :isRequest="isRequest"></zybsj-echarts>
      <div class="top-right">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>

          <span>累计转化收入额</span>
        </div>
        <div class="chart-div">
          <ljzhsre-echarts
            @setCaseInfoDwbm="setCaseInfoDwbm"
            :form="formValue"
            :isRequest="isRequest"
            :treeStructure="treeStructure"

          />
        </div>
      </div>
      <div class="gotojjzt" @click="gotohtzt">合同专题分析>></div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>累计合同转化率</span>
        </div>
        <div class="chart-div">
          <ljhtzhl-echarts
            @setCaseInfoDwbm="setCaseInfoDwbm"
            :form="formValue"
            :isRequest="isRequest"
          />
        </div>
      </div>
      <div class="bottom-right">
        <div class="bottom-right-div">
          <div class="bottom-content">
            <div class="tit-div">
              <div class="d-left"></div>
              <div class="d-right"></div>
              <div class="bq"></div>
              <div class="tit-g"></div>
              <span>合同金额历月变动情况</span>
            </div>
            <div class="chart-div">
              <htjellbdqk-echarts :form="formValue" :isRequest="isRequest" />
            </div>
          </div>
          <div class="top-right">
            <div class="tit-div">
              <div class="d-left"></div>
              <div class="d-right"></div>
              <div class="bq"></div>
              <div class="tit-g"></div>
              <span>合同金额分布情况</span>
            </div>
            <div class="chart-div">
              <htjefbqk-echarts :form="formValue" />
            </div>
          </div>
        </div>
        <div class="bottom-right-div">
          <div class="content-div">
            <div class="tit-div">
              <div class="d-left"></div>
              <div class="d-right"></div>
              <div class="bq"></div>
              <div class="tit-g"></div>
              <span>逾期项目情况</span>
            </div>
            <div class="chart-div">
              <yqxmqk-echarts
                @setCaseInfoDwbm="setCaseInfoDwbm"
                :form="formValue"
                :isRequest="isRequest"
                :treeStructure="treeStructure"
              />
            </div>
          </div>
          <div class="content-div">
            <div class="tit-div">
              <div class="d-left"></div>
              <div class="d-right"></div>
              <div class="bq"></div>
              <div class="tit-g"></div>
              <span>项目状态分布情况</span>
            </div>
            <div class="chart-div">
              <xmztfbqk-echarts :form="formValue" :isRequest="isRequest" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import KzhhteEcharts from "./components/kzhhteEcharts/index.vue"; // 可转化合同额
import LjzhsreEcharts from "./components/ljzhsreEcharts/index.vue"; // 累计转化收入额
import LjhtzhlEcharts from "./components/ljhtzhlEcharts/index.vue"; // 累计合同转化率
import HtjellbdqkEcharts from "./components/htjellbdqkEcharts/index.vue"; // 合同金额历年变动情况
import HtjefbqkEcharts from "./components/htjefbqkEcharts/index.vue"; // 合同金额分布情况
import YqxmqkEcharts from "./components/yqxmqkEcharts/index.vue"; // 逾期项目情况
import XmztfbqkEcharts from "./components/xmztfbqkEcharts/index.vue"; // 项目状态分布情况
import ZybsjEcharts from "./components/zybsjEcharts/index.vue"; // 中央八个小球
import { mapState, mapMutations } from "vuex";
import api from "@/api/global.js";
import { Message } from "element-ui";
export default {
  name: "htqkjcfx",
  components: {
    KzhhteEcharts,
    LjzhsreEcharts,
    LjhtzhlEcharts,
    HtjellbdqkEcharts,
    HtjefbqkEcharts,
    YqxmqkEcharts,
    XmztfbqkEcharts,
    ZybsjEcharts
  },
  computed: {
    ...mapState({
      dwbm: state => state.caseInfo.dwbm
    })
  },
  watch: {
    dwbm(newVal, oldVal) {
      this.form.dwbm = this.dwbm;
      this.formValue.dwbm = this.dwbm;
    },
    unit(newVal, oldVal) {
      const str = newVal === "year" ? "年度" : "月度";
      api
        .getDpzxjg({ pd: str, rq: this.form.rq })
        .then(res => {
          this.formValue.pd = str;
        })
        .catch(err => {
          Message({
            type: "error",
            message: err.message
          });
        });
    },
    "form.rq": {
      handler(newVale, oldVal) {
        if (newVale && oldVal) {
          api
            .getDpzxjg({ pd: this.form.pd, rq: newVale })
            .then(() => {
              this.isRequest = true;
              this.formValue.rq = newVale;
            })
            .catch(err => {
              Message({
                type: "error",
                message: err.message
              });
            });
        }
      }
    }
  },
  data() {
    return {
      unit: "month",
      form: {
        rq: "",
        dwbm: "",
        pd: "月度"
      },
      formValue: {
        rq: "",
        dwbm: "",
        pd: "月度"
      },
      show: 1,
      isRequest: true,
      treeStructure:[]
    };
  },
  methods: {
    ...mapMutations(["SET_CASEINFO"]),
    // 修改单位编码
    setCaseInfoDwbm(target) {
      this.SET_CASEINFO(target);
    },
    handleResize() {
      // 重新渲染页面
      this.show += 1;
    },
    gotohtzt() {
      window.open("/stat/htqkjcfx/htqkjcztfx", "_blank"); // 打开新窗口
    },
    //获取组织树
    async queryGlkjdwlb() {
      const res = await api.queryGlkjdwlb({ fdwbm: "" });
      sessionStorage.setItem("dwlb", JSON.stringify(res[0]));
      this.SET_CASEINFO(res[0]); // 默认选中第一个节点
      this.treeStructure = this.convertToTree(res); // 转换为树形结构
    },
    changeDate(time) {
      sessionStorage.setItem("jzsj", JSON.stringify(time));
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
  },
  created() {
    this.form.rq = JSON.parse(sessionStorage.getItem("jzsj"));
    this.queryGlkjdwlb(); // 查询机构单位列表
    const { pd, rq } = this.form;
    api
      .getDpzxjg({ pd, rq })
      .then(() => {
        this.formValue.rq = rq;
        this.isRequest = true;
      })
      .catch(err => {
        this.isRequest = true;
        Message({
          type: "error",
          message: err.message
        });
      });
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
.htqkjcfx {
  width: calc(100% - 50px);
  height: calc(100% - 152px);
  display: flex;
  flex-direction: column;
  padding: 10px 25px 32px 25px;
  .top {
    height: 285px;
    display: flex;
    margin-bottom: 16px;
    position: relative;
    .gotojjzt {
      position: fixed;
      top: 80px;
      right: 64px;
      color: #409eff;
      cursor: pointer;
    }
    .top-left {
      display: flex;
      flex-direction: column;
      margin-right: 16px;
      width: 485px;

      .init-form-sty {
        position: fixed;
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
      }
    }
  }

  .top-right {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    width: 485px;
  }

  .bottom {
    // flex: 0 0 auto;
    height: calc(100% - 285px);
    overflow: hidden;
    display: flex;

    .bottom-left {
      display: flex;
      flex-direction: column;
      margin-right: 16px;
      width: 485px;
      height: 100%;
      position: relative;
    }

    .bottom-right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .bottom-right-div {
        flex: 1;
        display: flex;

        &:first-child {
          margin-bottom: 16px;
        }

        .bottom-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

  .content-div {
    flex: 1;
    display: flex;
    flex-direction: column;

    &:first-child {
      margin-right: 16px;
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
    background-image: url("../../../assets/img/LargeScreen/tit.png");
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
      z-index: 1;
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
    background-color: rgba(27, 76, 136, 0.2);
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
</style>
