<template>
  <div class="ksqyzl" :key="show">
    <div class="top">
      <div class="top-left">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>同方股份总数</span>
        </div>
        <div class="chart-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <!-- 总数列表 -->
          <zs @changezs="changezs" :form="form"  ></zs>
        </div>
        <el-form class="init-form-sty" ref="form" inline :model="form" size="mini">
          <el-form-item   label="截止时间">
            <el-date-picker style="width: 140px" v-model="form.jzsj" :type="unit" placeholder="请选择"
              value-format="yyyy-MM-dd HH:hh:mm" :clearable="false"  @change="changeDate">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="top-right">
        <div class="tit-div">
          <div class="d-left"></div>
          <div class="d-right"></div>
          <div class="bq"></div>
          <div class="tit-g"></div>
          <span>同方股份{{ydksMc}}月度详情</span>
        </div>
        <div class="chart-div">
          <ydxqcharts :form="cyxqMkmc" :isRequest="isRequest"   />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="d-left"></div>
      <div class="d-right"></div>
      <div class="d-top-left"></div>
      <div class="d-top-right"></div>
      <div class="cyxq">
        <div class="cyxq-left">
          <div class="cyxq-left-top">
            <div class="title">产业详情</div>
            <el-input placeholder="请输入产业名称" suffix-icon="el-icon-search" v-model="filtercymc"  @input="changefiltercymc" class="input-with-select"
              clearable>
            </el-input>
          </div>
          <div class="cyxq-chart">
            <cyxqcharts :form="formValue" :isRequest="isRequest" @changecyxqMkmc="changecyxqMkmc"  />
          </div>
        </div>
        <div class="cyxq-right">
          <div class="title"> {{ydksMc=='微利户数'?'微利户':'亏损' }}子企业明细（{{cyxqMkmc.dwmc}}）</div>
          <kszqyTable   :form="cyxqMkmc" ></kszqyTable>
          <div class="title ydksqysqs">月度{{ ydksMc }}趋势（{{cyxqMkmc.dwmc}}）</div>
          <div class="ydksqysqs-chart">
            <ydksqysqscharts :form="cyxqMkmc"  :ydksMc="ydksMc" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import zs from "./compoments/zs.vue";
import ydxqcharts from "./compoments/ydxqcharts"; // 月度详情
import ydksqysqscharts from "./compoments/ydksqysqscharts"; // 月度亏损企业数趋势
import cyxqcharts from "./compoments/cyxqcharts"; // 产业详情
import kszqyTable from "./table/kszqy.vue"; // 亏损企业
import { mapState, mapMutations } from "vuex";
export default {
  name: "ksqyzl",
  components: {
    zs,
    ydxqcharts,
    cyxqcharts,
    ydksqysqscharts,
    kszqyTable
  },
  data() {
    return {
      unit: "month",
      form: {
        jzsj: "2024-12-01 00:12:00",
        dwbm: "",
      },
      formValue: {
        jzsj: "2024-12-01 00:12:00",
        dwbm: "",
      },
      show: 1,
      isRequest: false,
      filtercymc: "",
      ydksMc: "",
      cyxqMkmc: {},
      tfinfo: {},
    };
  },
  methods: {
    ...mapMutations(["SET_CASEINFO"]),
    // 修改单位编码

    handleResize() {
      // 重新渲染页面
      this.show += 1;
    },
    changezs(val) {
      this.formValue={
        jzsj: this.form.jzsj,
        dwbm: this.form.dwbm,
       ...val
      }
      this.ydksMc = val.mkmc;
      // if (val.mkmc == "亏损企业数") {
      //   this.ydksMc = '亏损企业数'
      // } else if (val.mkmc == "亏损额") {
      //   this.ydksMc = '亏损额'

      // } else {
      //   this.ydksMc = '微利户企业数'
      // }

    },
    changecyxqMkmc(val){
      if(!val){
        this.cyxqMkmc = ''   
    return;
      };
  
    this.cyxqMkmc = {
        ...this.formValue,
        dwbm: val.dwbm,
        dwmc: val.dwmc
      };
     
      console.log(this.cyxqMkmc,val, 'zzzz')
      

    },
    changefiltercymc(){
      // 使用 Vue.set 或 this.$set
this.$set(this.formValue, 'gjz', this.filtercymc);
    },
    changeDate(time) {
      sessionStorage.setItem("jzsj",JSON.stringify(time))
    
  }
  },
  created() {
    this.form.jzsj=JSON.parse(sessionStorage.getItem("jzsj"));
    this.formValue.jzsj=JSON.parse(sessionStorage.getItem("jzsj"));
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
 
};
</script>
<style lang="scss" scoped>
.ksqyzl {
  width: calc(100% - 50px);
  height: calc(100% - 142px);
  display: flex;
  flex-direction: column;
  padding: 10px 25px 32px 25px;
  ;

  .top {
    display: flex;
    margin-bottom: 16px;

    .top-left {
      //  height: 100%;
      display: flex;
      flex-direction: column;
      width: 50%;

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
      }
    }
  }

  .top-right {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    width: 50%;
  }

  .bottom {
    flex: 0 0 auto;
    height: calc(100% - 330px);
    // overflow: hidden;  
    display: flex;
    background-color: rgba(27, 76, 136, 0.2);
    padding: 17px 22px 22px 22px;
    position: relative;

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

    .cyxq {
      width: 100%;
      display: flex;

      .cyxq-left {
        // width: 911px;
        width: 50%;
        position: relative;

        .cyxq-left-top {
          width: 100%;
          height: 43px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          top: -10px;
          left: 0;

          .title {
            color: #ffffff;
            font-size: 16px;
            line-height: 53px;
            height: 53px;

            font-family: MicrosoftYaHei-Bold;
            font-weight: normal;
            width: 100px;
            text-align: center;
            background: url("../../../assets/img/LargeScreen/ejbt-d.png");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            /* 可选：设置图片在div中的位置，默认为左上角 */
          }

          .input-with-select {
            position: absolute;
            z-index: 999;
            width: 160px;
            right: 0;

            :deep .el-input__inner {
              height: 32px;
              line-height: 32px;
              background-color: #123b63;
              border: 1px solid #3e74ad;
              color: #88add4;
              font-size: 14px;
            }

            :deep .el-input__icon {
              line-height: 32px;
            }
          }
        }

        .cyxq-chart {
          height: 100%;
        }
      }

      .cyxq-right {
        margin-left: 9px;
        width: 50%;
margin-top: -20px;
        .title {
          color: #ffffff;
          font-size: 16px;
          line-height: 53px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: normal;
          text-align: center;
          height: 53px;
          display: inline-block; /* 使宽度自适应内容 */
          background: url("../../../assets/img/LargeScreen/ejbt.png");
          background-repeat: no-repeat;
          background-position: bottom;
          margin-left: 20px;
          /* 可选：设置图片在div中的位置，默认为左上角 */
        }



        .ydksqysqs-chart {
          height: calc(100% - 265px);
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
    .tit-g{
      background: url("../../../assets/img/LargeScreen/tit-g.png");
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      right: 0;
      height: 34px;
    }
    span{
      position: absolute;
      left: 40px;
      right: 0;
      height: 34px;
    z-index: 2;    }
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
  color: red;
  opacity: 1;
  /* Firefox */
}

:-ms-input-placeholder {
  color: red;
}

::-ms-input-placeholder {
  color: red;
}
</style>
