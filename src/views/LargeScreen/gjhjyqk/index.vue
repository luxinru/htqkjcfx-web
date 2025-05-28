<template>
  <div class="gjhjyqk">
    <div class="gjhjyqk-top">
      <el-form
        class="init-form-sty"
        ref="form"
        inline
        :model="form"
        size="mini"
      >
        <el-form-item label="截止时间">
          <el-date-picker
            style="width: 120px"
            v-model="form.jzsj"
            :type="unit"
            placeholder="请选择"
            value-format="yyyy-MM-dd HH:hh:mm"
            @change="changeDate"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="gjhjyqk-top-item">
        <div class="tzje">
          <div class="tit-div">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="bq"></div>
            <div class="tit-g"></div>
            <span>国际化收入</span>
          </div>
          <div class="tzje-content">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="ztzje">
              <div class="tzje-left">
                <img
                  src="../../../assets/img/LargeScreen/zdxmjc/ztzje.png"
                  alt=""
                />
                <div class="ztz-left">
                  <div class="unit ztzjemc">
                    总收入金额
                  </div>
                  <div>
                    <span class="value">{{ $money100m(zsrje.sjz) }}</span>
                    <span class="unit">亿元 </span>
                    <span class="tb" :class="zsrje.tb >= 0 ? 'up' : 'down'">
                      同比 {{ zsrje.tb }}%</span
                    ><img
                      src="../../../assets/img/LargeScreen/jjyxjc/up.png"
                      alt=""
                      v-if="zsrje.tb >= 0"
                    />
                    <img
                      v-else
                      src="../../../assets/img/LargeScreen/jjyxjc/down.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="tzje-right">
                <div class="ndjhwcl">
                  <div>年度计划完成率</div>
                  <div>{{ zsrje.njhwcl }}%</div>
                </div>
                <el-progress
                  :percentage="
                    Number(zsrje.njhwcl) > 100 ? 100 : Number(zsrje.njhwcl)
                  "
                  color="#00ffa9"
                  :show-text="false"
                  :stroke-width="8"
                ></el-progress>
                <div class="jhz">计划值：{{ $money100m(zsrje.jhz) }}亿元</div>
              </div>
            </div>
          </div>
        </div>

        <div class="jysrzbxq-div">
          <div class="title" >
            各单位国际化收入
          </div>
          <div class="jysrzbxq-chart">
            <jysrzbxqEcharts :form="form" @changeLegend="changeLegend"></jysrzbxqEcharts>
          </div>
        </div>
      </div>
      <div class="gjhjyqk-top-item">
        <div class="tzje">
          <div class="tit-div">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="bq"></div>
            <div class="tit-g"></div>
            <span>新签合同额</span>
          </div>
          <div class="tzje-content">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="ztzje">
              <div class="tzje-left">
                <img src="../../../assets/img/LargeScreen/xqhte.png" alt="" />
                <div class="ztz-left">
                  <div class="unit ztzjemc">
                    总新签合同额
                  </div>
                  <div>
                    <span class="value">{{ $money100m(zxqhte.sjz) }}</span>
                    <span class="unit">亿元 </span>

                    <span class="tb" :class="zsrje.tb >= 0 ? 'up' : 'down'">
                      同比 {{ zxqhte.tb }}%</span
                    ><img
                      src="../../../assets/img/LargeScreen/jjyxjc/up.png"
                      alt=""
                      v-if="zxqhte.tb >= 0"
                    />
                    <img
                      v-else
                      src="../../../assets/img/LargeScreen/jjyxjc/down.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="tzje-right">
                <div class="ndjhwcl">
                  <div>年度计划完成率</div>
                  <div>{{ zxqhte.njhwcl }}%</div>
                </div>
                <el-progress
                  :percentage="
                    Number(zxqhte.njhwcl) > 100 ? 100 : Number(zxqhte.njhwcl)
                  "
                  color="#00ffa9"
                  :show-text="false"
                  :stroke-width="8"
                ></el-progress>
                <div class="jhz">计划值：{{ $money100m(zxqhte.jhz) }}亿元</div>
              </div>
            </div>
          </div>
        </div>
        <div class="jysrzbxq-div">
          <div class="title">
            各单位新签合同额
          </div>
          <div class="jysrzbxq-chart">
            <xqhtezbxqEcharts :form="form"  @changeLegend="changeLegend"></xqhtezbxqEcharts>
          </div>
        </div>
      </div>
    </div>
    <div class="gjhjyqk-bottom">
      <div class="gjhjyqk-bottom-item">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>国际化收入月度详情（{{form.dwmc}}）</span>
        </div>
        <div class="ydqs-chart">
          <charts charType="bars" :charData="jysrydxqData"></charts>
        </div>
      </div>
      <div class="gjhjyqk-bottom-item">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>新签合同额月度详情（{{form.dwmc}}）</span>
        </div>
        <div class="ydqs-chart">
          <charts charType="bars" :charData="xqhtydxqData"></charts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Charts from "@/components/echarts/index.vue"; //图表
import jysrzbxqEcharts from "./components/jysrzbxqEcharts"; //图表
import xqhtezbxqEcharts from "./components/xqhtezbxqEcharts"; //图表
import api from "@/api/gjhjyqk";
import { $money100m } from "../../../utils/helper";
import { mapState, mapMutations } from "vuex";
export default {
  name: "gjhjyqk",
  components: {
    Charts,
    jysrzbxqEcharts,
    xqhtezbxqEcharts,
    xqhtezbxqEcharts
  },
  computed: {
    ...mapState({
      dwbm: state => state.caseInfo.dwbm,
      dwmc: state => state.caseInfo.dwmc,
    })
  },
  mounted() {
    this.form.dwbm=JSON.parse(sessionStorage.getItem('dwlb')).dwbm
    this.form.dwmc=JSON.parse(sessionStorage.getItem('dwlb')).dwmc
    this.SET_CASEINFO(JSON.parse(sessionStorage.getItem('dwlb'))); 
      
  },
  created() {
    console.log(JSON.parse(sessionStorage.getItem("jzsj")),"jzsj");
    
    this.form.jzsj=JSON.parse(sessionStorage.getItem("jzsj")); 
    
  },
  methods: {
    ...mapMutations(["SET_CASEINFO"]),
    // 获取金额
    async getGjhjysrtj() {
      const res = await api.getGjhjysrtj(this.form);
      this.zsrje = res;
      const params = {
        jzsj: this.form.jzsj,
        dyzb: res.dyzb,
        dezb: res.dezb,
        dwbm: this.form.dwbm 
      };
      // 获取经营收入月度详情统计
      const result = await api.queryGjhydxqtj(params);
      this.jysrydxqData = result.map(item => ({
        ...item,
        qntqz: $money100m(item.qntqz),
        ydsjz: $money100m(item.ydsjz)
      }));
    },
    // 获取投资金额统计
    async getGjhxqhtetj() {
      const res = await api.getGjhxqhtetj(this.form);
      this.zxqhte = res;
      const params = {
        dwbm: this.form.dwbm ,
        jzsj: this.form.jzsj,
        dyzb: res.dyzb || 0,
        dezb: res.dezb || 0
      };
      // 新签合同额月度详情统计
      const result = await api.queryGjhydxqtj(params);
      this.xqhtydxqData = result.map(item => ({
        ...item,
        qntqz: $money100m(item.qntqz),
        ydsjz: $money100m(item.ydsjz)
      }));
    },
    changeLegend(val){  
      this.form.dwbm = val.dwbm;
      this.form.dwmc = val.dwmc;
      // this.SET_CASEINFO(val);   
      this.getGjhjysrtj(); //
      this.getGjhxqhtetj();
    },
    changeDate(time) {
      sessionStorage.setItem("jzsj", JSON.stringify(time))

    }
  },
  data() {
    return {
      unit: "month",
      form: {
        jzsj: "2024-12-01 00:00:00",
        dwbm: "",
        dwmc: ""
      },

      zsrje: {
        tb: ""
      }, //总收入
      zxqhte: "", //总新合同额
      jysrydxqData: [], //经营收入月度详情
      xqhtydxqData: [] //经营收入月度详情
    };
  },
  watch: {
    form: {
      handler(newVal) {
        this.getGjhjysrtj(); //
        this.getGjhxqhtetj();
      },
      deep: true, // 深度监听对象或数组的变化
      // immediate: true // 是否在初始化时立即触发一次回调
    },
    
    dwbm: {
      handler(newVal) {
        this.form.dwbm = newVal;
        this.form.dwmc = this.dwmc;
        this.getGjhjysrtj(); //
        this.getGjhxqhtetj();
      },
      deep: true, // 深度监听对象或数组的变化
    }
  }
};
</script>
<style lang="scss" scoped>
.tzje-right {
  ::v-deep .el-progress {
    .el-progress-bar__outer {
      border-radius: initial;
      background: rgba(94, 167, 255, 0.3) !important;
    }
    .el-progress-bar__inner {
      border-radius: initial;
    }
  }
}
.ztz-left {
  margin-left: 10px;
}
.init-form-sty {
  position: absolute;
  top: 95px;
  left: 40px;
  ::v-deep .el-form-item__label {
    color: #76a5bd;
  }
  ::v-deep .el-input__inner {
    background-color: rgba(255, 0, 0, 0); /* 半透明的红色 */
    border-color: #093252;
    color: #76a5bd;
  }
  ::v-deep .el-input__icon {
    color: #76a5bd;
  }
  .zzjgmc {
    width: 80px;
    height: 20px;
    border: 1px solid #093252;
  }
}
.gjhjyqk {
  width: calc(100% - 50px);
  height: calc(100% - 150px);

  display: flex;
  flex-direction: column;
  padding: 10px 25px 32px 25px;
  .gjhjyqk-top {
    display: flex;
    width: 100%;
    gap: 17px;
    .gjhjyqk-top-item {
      position: relative;
      width: 50%;
      background-color: rgba(47, 89, 140, 0.2);
    }
    .tzje {
      .tzje-content {
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
        .ztzje {
          display: flex;
          justify-content: space-between;
          margin: 15px 50px 0 30px;
          background: linear-gradient(
            to right,
            rgba(17, 46, 91, 0) 0%,
            /* 从 0% 位置开始完全透明 */ rgba(17, 46, 91, 0.6) 50%,
            /* 在 50% 位置使用背景颜色 #112e5b 和透明度 0.6 */
              rgba(17, 46, 91, 0) 100% /* 在 100% 位置回到完全透明 */
          );
          .tzje-left {
            display: flex;
            .value {
              font-family: DINMittelschriftLTW1G;
              color: #00e4ff;
              font-size: 30px;
              font-weight: 400;
            }
            .unit {
              font-size: 12px;
              background: linear-gradient(to top, #7ecdfb 0%, #fff 100%);
              background-clip: text; /* 关键：将背景裁剪到文本区域 */
              -webkit-background-clip: text; /* 为Safari浏览器添加前缀 */
              color: transparent; /* 使文字透明，背景色成为字体的填充 */
            }
            .ztzjemc {
              font-size: 14px;
            }
            .tb {
              margin-left: 10px;
              font-size: 12px;
              // color: #00f886;
              &img {
                width: 8px;
                height: 12px;
              }
            }
          }
          .tzje-right {
            .ndjhwcl {
              font-size: 14px;
              background: linear-gradient(to top, #7ecdfb 0%, #fff 100%);
              background-clip: text; /* 关键：将背景裁剪到文本区域 */
              -webkit-background-clip: text; /* 为Safari浏览器添加前缀 */
              color: transparent; /* 使文字透明，背景色成为字体的填充 */
              display: flex;
              justify-content: space-between;
              min-width: 343px;
              margin-bottom: 6px;
            }
            .jhz {
              margin-top: 6px;
              font-size: 14px;
              color: #88add4;
            }
          }
        }
      }
    }
    .jysrzbxq-div {
      margin-top: 12px;
      .title {
        width: 153px;
        height: 53px;
        line-height: 53px;
        font-size: 14px;
        color: #ffffff;
        // margin-left: 13px;
        background-image: url(../../../assets/img/LargeScreen/ejbt.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
        text-align: center;
      }
      .jysrzbxq-chart {
        width: 100%;
        height: 280px;
      }
    }
  }
  .gjhjyqk-bottom {
    margin-top: 16px;
    display: flex;
    width: 100%;
    gap: 17px;
    flex: 1;
    overflow: hidden;
    .gjhjyqk-bottom-item {
      background-color: rgba(47, 89, 140, 0.2);
      position: relative;
      width: 50%;
      .ydqs-chart {
        margin-top: 16px;
        width: 100%;
        height: calc(100% - 53px);
      }
    }
  }
  .tit-div {
    height: 33px;
    line-height: 33px;
    background-color: rgba(27, 76, 136, 0.4);
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    position: relative;
    display: flex;
    background: url("../../../assets/img/LargeScreen/tit-long.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 1px;
      background-color: #2487e3;
      left: 0;
      top: 1px;
    }
    &::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 1px;
      background-color: #2487e3;
      right: 0;
      top: 1px;
    }
    .d-left {
      position: absolute;
      width: 10px;
      height: 1px;
      background-color: #2487e3;
      left: 0;
      bottom: 0;
    }
    .d-right {
      position: absolute;
      width: 10px;
      height: 1px;
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
.up {
  color: #00f886;
}
.down {
  color: #ff5050;
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
  color: #76a5bd; /* 选中项的文本颜色 */
}

/* 未选中项的文本颜色（如果需要） */
.el-select-dropdown__item:not(.selected) {
  color: #135293ea; /* 未选中项的文本颜色 */
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
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
::v-deep.el-table th.el-table__cell > .cell {
  padding: 0;
  color: #a7c0e2;
}
::v-deep.el-table .cell {
  color: #a7c0e2;
}
.el-table .warning-row {
  background: #05183a;
}

.el-table .success-row {
  background: #082047;
}
</style>
