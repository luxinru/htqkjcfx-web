<template>
  <div class="zdxmjc">
    <div class="zdxmjc-top">
      <el-form class="init-form-sty" ref="form" inline :model="form" size="mini">
        <!-- <el-form-item label="截止时间">
          <el-select
            style="width: 80px"
            v-model="unit"
            placeholder="请选择活动区域"
          >
            <el-option label="月度" value="month"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="截止时间">
          <el-date-picker style="width: 120px" v-model="form.jzsj" :type="unit" placeholder="请选择"
            value-format="yyyy-MM-dd HH:hh:mm" :clearable="false" @change="changeDate">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="zdxmjc-top-item">
        <div class="tzje">
          <div class="tit-div">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="bq"></div>
            <div class="tit-g"></div>
            <span>投资金额</span>
          </div>
          <div class="tzje-content">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="ztzje">
              <div class="tzje-left">
                <img src="../../../assets/img/LargeScreen/zdxmjc/ztzje.png" alt="" />
                <div class="ztz-left">
                  <div class="unit ztzjemc">
                    总投资金额
                  </div>
                  <div>
                    <span class="value">{{ $money100m(ztzje.sjz) }}</span>
                    <span class="unit">亿元 </span>
                    <span class="tb" :class="ztzje.tb >= 0 ? 'up' : 'down'">
                      同比 {{ ztzje.tb }}%</span>
                    <img src="../../../assets/img/LargeScreen/jjyxjc/up.png" alt="" v-if="ztzje.tb >= 0" />
                    <img v-else src="../../../assets/img/LargeScreen/jjyxjc/down.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="tzje-right">
                <div class="ndjhwcl">
                  <div>年度计划完成率</div>
                  <div>{{ ztzje.njhwcl }}%</div>
                </div>
                <el-progress :percentage="Number(ztzje.njhwcl) > 100 ? 100 : Number(ztzje.njhwcl)
                  " color="#00ffa9" :show-text="false" :stroke-width="8"></el-progress>
                <div class="jhz">计划值：{{ $money100m(ztzje.jhz) }}亿元</div>
              </div>
            </div>
          </div>
        </div>
        <div class="jysrzbxq-div">
          <div class="title">
            投资分布
          </div>
          <div class="jysrzbxq-chart">
            <jetzfbEcharts :form="form" :isRequest="isRequest"></jetzfbEcharts>
          </div>
          <div class="title">
            年度投资趋势
          </div>
          <div class="ndtzqs-chart">
            <jendtzqsEcharts :form="form" :isRequest="isRequest" />
          </div>
        </div>
      </div>
      <div class="zdxmjc-top-item">
        <div class="tzje">
          <div class="tit-div">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="bq"></div>
            <div class="tit-g"></div>
            <span>投资项目数</span>
          </div>
          <div class="tzje-content">
            <div class="d-left"></div>
            <div class="d-right"></div>
            <div class="ztzje">
              <div class="tzje-left">
                <img src="../../../assets/img/LargeScreen/zdxmjc/ztzxms.png" alt="" />
                <div class="ztz-left">
                  <div class="unit ztzjemc">
                    总投资项目数
                  </div>
                  <div>
                    <span class="value">{{ ztzxms.sjz }}</span>
                    <span class="unit">个 </span>
                    <span class="tb" :class="ztzxms.tb >= 0 ? 'up' : 'down'">
                      同比 {{ ztzxms.tb }}%</span><img src="../../../assets/img/LargeScreen/jjyxjc/up.png" alt=""
                      v-if="ztzxms.tb >= 0" />
                    <img v-else src="../../../assets/img/LargeScreen/jjyxjc/down.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="tzje-right">
                <!-- <div class="ndjhwcl">
                  <div>年度计划完成率</div>
                  <div>{{ztzxms.njhwcl}}%</div>
                </div>
                <el-progress
                  :percentage="Number(ztzxms.njhwcl)"
                  color="#00ffa9"
                  :show-text="false"
                  :stroke-width="8"
                ></el-progress>
                <div class="jhz">计划值：{{ztzxms.jhz}}个</div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="jysrzbxq-div">
          <div class="title">
            投资分布
          </div>
          <div class="jysrzbxq-chart">
            <xmstzfbEcharts :form="form" :isRequest="isRequest"></xmstzfbEcharts>
          </div>
          <div class="title">
            年度投资趋势
          </div>
          <div class="ndtzqs-chart">
            <xmsndtzqsEcharts :form="form" :isRequest="isRequest" />
          </div>
        </div>
      </div>
    </div>
    <div class="zdxmjc-bottom">
      <div class="zdxmjc-bottom-item">
        <div class="d-left"></div>
        <div class="d-right"></div>
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>重点项目（固定资产投资）</span>
        </div>
        <div class="ydqs-chart">
          <!-- 重点项目表格 -->
          <zdxmgdzcTable :form="form" :isRequest="isRequest"></zdxmgdzcTable>
        </div>
      </div>
      <div class="zdxmjc-bottom-item">
        <div class="d-left"></div>
        <div class="d-right"></div>
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>重点项目（股权投资） </span>
        </div>
        <div class="ydqs-chart">
          <zdxmgqtzTable :form="form" :isRequest="isRequest"></zdxmgqtzTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Charts from "@/components/echarts/index.vue"; //图表
import jendtzqsEcharts from "./components/jendtzqsEcharts"; //年度投资趋势
import xmsndtzqsEcharts from "./components/xmsndtzqsEcharts"; //年度投资趋势
import jetzfbEcharts from "./components/jetzfbEcharts"; //金额投资分布
import xmstzfbEcharts from "./components/xmstzfbEcharts"; //项目数投资分布
import zdxmgdzcTable from "./table/zdxmgdzcTable.vue"; //重点项目表格
import zdxmgqtzTable from "./table/zdxmgqtzTable.vue"; //重点项目表格

import api from "@/api/zdxmjc";

export default {
  name: "zdxmjc",
  components: {
    Charts,
    jetzfbEcharts,
    xmstzfbEcharts,
    zdxmgdzcTable,
    zdxmgqtzTable,
    xmsndtzqsEcharts,
    jendtzqsEcharts
  },
  mounted() {
    // this.getCharData();
    window.addEventListener("resize", this.handleResize); // 注册监听器
  },
  created() {
    this.form.jzsj = JSON.parse(sessionStorage.getItem("jzsj"));
  },
  methods: {
    // 获取投资金额统计
    async getZdxmtzjetj() {
      const res = await api.getZdxmtzjetj(this.form);
      this.$set(this.form, "jesjzzbdm", res.sjzzbdm);
      // console.log(res,111);
      // this.form.jesjzzbdm=res.sjzzbdm
      this.ztzje = res;
    },

    // 【重点项目】获取投资项目数统计
    async getZdxmtzxmstj() {
      const res = await api.getZdxmtzxmstj(this.form);
      this.$set(this.form, "xmssjzzbdm", res.sjzzbdm);
      //  this.form.xmssjzzbdm=res.sjzzbdm
      this.ztzxms = res;
    },
    handleResize() {
      // 重新渲染页面
      this.show += 1;
    },
    changeDate(time) {
      sessionStorage.setItem("jzsj", JSON.stringify(time))

    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      show: 1,
      unit: "month",
      form: {
        jzsj: ""
      },

      isRequest: false,
      ztzje: {},
      ztzxms: {},
      jqtzxnmsfbtj: {}
    };
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.getZdxmtzjetj();
        this.getZdxmtzxmstj();
      },
      deep: true, // 深度监听对象或数组的变化
      // immediate: true // 是否在初始化时立即触发一次回调
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

  .zzjgmc {
    width: 80px;
    height: 20px;
    border: 1px solid #093252;
  }
}

.zdxmjc {
  width: calc(100% - 50px);
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  padding: 10px 25px 32px 25px;
  overflow: hidden;

  .zdxmjc-top {
    display: flex;
    width: 100%;
    gap: 17px;
    position: relative;

    .zdxmjc-top-item {
      width: 50%;
      background-color: rgba(47, 89, 140, 0.2);
    }

    .tzje {
      .tzje-content {
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

        .ztzje {
          display: flex;
          justify-content: space-between;
          margin: 10px 50px 0 30px;
          background: linear-gradient(to right,
              rgba(17, 46, 91, 0) 0%,
              /* 从 0% 位置开始完全透明 */
              rgba(17, 46, 91, 0.6) 50%,
              /* 在 50% 位置使用背景颜色 #112e5b 和透明度 0.6 */
              rgba(17, 46, 91, 0) 100%
              /* 在 100% 位置回到完全透明 */
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
              background-clip: text;
              /* 关键：将背景裁剪到文本区域 */
              -webkit-background-clip: text;
              /* 为Safari浏览器添加前缀 */
              color: transparent;
              /* 使文字透明，背景色成为字体的填充 */
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
              background-clip: text;
              /* 关键：将背景裁剪到文本区域 */
              -webkit-background-clip: text;
              /* 为Safari浏览器添加前缀 */
              color: transparent;
              /* 使文字透明，背景色成为字体的填充 */
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

      // .ling-c{
      //   height: 42px;
      //   width: 130px;
      //   position: absolute;
      //   left: 0;
      //   top:-10px;
      //   background: url("../../../assets/img/LargeScreen/tit-long.png");
      //   background-position: left ; /* 可选：设置图片在div中的位置，默认为左上角 */
      // }
    }

    .jysrzbxq-div {
      .title {
        width: 153px;
        height: 53px;
        line-height: 53px;
        font-size: 14px;
        color: #ffffff;
        // margin-left: 13px;
        text-align: center;
        background-image: url(../../../assets/img/LargeScreen/ejbt.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* 可选：设置图片在div中的位置，默认为左上角 */
      }

      .jysrzbxq-chart {
        width: 100%;
        height: 140px;
      }

      .ndtzqs-chart {
        height: 190px;
      }
    }
  }

  .zdxmjc-bottom {
    margin-top: 16px;
    display: flex;
    width: 100%;
    gap: 17px;
    flex: 1;
    overflow: hidden;

    .zdxmjc-bottom-item {
      background-color: rgba(47, 89, 140, 0.2);
      position: relative;
      width: 100%;
      max-width: calc(50% - 8px);
      height: 100%;

      .d-left {
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #2487e3;
        left: 0;
        bottom: 2px;
      }

      .d-right {
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: #2487e3;
        right: 0;
        bottom: 2px;
      }

      .ydqs-chart {
        width: calc(100% - 36px);
        height: calc(100% - 36px);
        padding: 18px;

        .el-table {
          width: 100%;
          height: calc(100% - 36px);
          color: #ffffff9c;
          background-color: rgba(47, 89, 140, 0.01);

          ::v-deep .has-gutter tr th {
            background-color: #123767;
            color: #bdb3b3;
            padding: 0;
          }

          ::v-deep td {
            padding: 5px 0;
            border-bottom: none;
          }

          ::v-deep &::before {
            border-color: none;
          }

          ::v-deep th.is-leaf {
            border: none;
          }

          ::v-deep .el-table__body tr.current-row>td {
            background-color: #0450a2;
          }

          ::v-deep .el-table__cell {
            padding: 5px 0;
            line-height: auto;
          }

          .barcustom {
            width: 100%;
            height: 30px;
          }

          ::v-deep .el-table__body-wrapper {
            height: calc(100% - 32px);
            overflow-y: auto;
          }
        }

        .el-table::before {
          background-color: transparent;
        }

        ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
          background-color: #0450a2;
          border-top: 1px solid #ebeef552;
        }
      }
    }
  }

  .tit-div {
    height: 34px;
    line-height: 34px;
    // background-color: rgba(27, 76, 136, 0.4);
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    position: relative;
    display: flex;
    background: url("../../../assets/img/LargeScreen/tit-z.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    /* 可选：设置图片在div中的位置，默认为左上角 */
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

.el-table .warning-row {
  background: #05183a;
}

.el-table .success-row {
  background: #082047;
}

.up {
  color: #00f886;
}

.down {
  color: #ff5050;
}

.ztz-left {
  margin-left: 10px;
}
</style>
