<!-- 收入tab -->
<template>
  <div class="ysqk-div">
    <div
      class="ysqk-item"
      :class="item.mkmc === zsactive ? 'active' : ''"
      v-for="item in JjyxList"
      :key="item.img"
      @click="changeysqk(item)"
    >
      <div class="ysqk-item-box">
        <div class="ysqk-content">
          <div class="top-div">
            <img :src="item.img" alt="" />
            <div class="item-content">
              <div class="item-mkmc">
                <div>{{ item.mkmc }}</div>
              </div>
              <div class="item-value">
                <div>
                  <span :class="item.color" class="value">
                    {{ $money100m(item.zbz || 0) }}
                  </span>
                  <span class="unit"> 亿元</span>
                </div>
                <div class="tb-type" :class="item.tb >= 0 ? 'down' : 'up'">
                  <div class="tbunit" :class="item.tb >= 0 ? 'down ' : 'up'">
                    同比
                  </div>
                  <div>
                    <span>{{ item.tb }}%</span>
                    <img
                      src="../../../../assets/img/LargeScreen/jjyxjc/up.png"
                      alt=""
                      v-if="item.tb >= 0"
                    />
                    <img
                      src="../../../../assets/img/LargeScreen/jjyxjc/down.png"
                      alt=""
                      v-else
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ysqk-line"></div>
          <div class="mbz tzje-progress">
            <div class="jhwcl">
              <div>计划完成率</div>
              <div>{{ item.njhwcl }}%</div>
            </div>
            <el-progress
              :percentage="Number(item.njhwcl)"
              color="#00ffa9"
              :show-text="false"
            ></el-progress>
            <div class="mbz-item1">
              <span>年度计划值</span>
              <span>
                {{ $money100m(item.jhz || 0) }}
                亿元
              </span>
            </div>
            <!-- <div>
              <span> {{ item.ndjhbfd==0?'等于':item.ndjhbfd>0?'高于':'低于'}}年度计划</span
              >
              <span>
                <span class="dyndjhz"> {{  item.ndjhbfd>=0? Math.abs(item.ndjhbfd):'' }}</span> 个百分点</span
              >
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/jjyxjc.js";

export default {
  name: "ysqk",
  props: {
    form: Object
  },
  data() {
    return {
      zsactive: "集团外营业收入",
      JjyxList: [
        {
          mkmc: "集团外营业收入",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/yysr.png")
        },
        {
          mkmc: "利润总额",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/lrze.png")
        },
        {
          mkmc: "净现金流",
          img: require("../../../../assets/img/LargeScreen/jjyxjc/jxjl.png")
        }
      ]
    };
  },
  watch: {
    form: {
      handler(newVal) {
        if (!newVal.dwbm) return;
        // 获取经济运行营业收入|利润总额|净现金流统计
        this.getJjyxtj();
      },
      deep: true,
      immediate: true
    }
    // formValue: {
    //   handler(newVal) {
    //     if( newVal.dszb)  return;
    //   // 获取经济运行营业收入|利润总额|净现金流统计
    //     this.getJjyxtj();
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    // 获取经济运行营业收入|利润总额|净现金流统计
    async getJjyxtj() {
      let result = await api.getJjyxtj(this.form);

      this.JjyxList = this.JjyxList.map((item, index) => {
        const resultItem = result[index];
        if (resultItem && item.mkmc == resultItem.mkmc) {
          item.jhz = resultItem.jhz;
          item.ndjhbfd = resultItem.ndjhbfd;
          item.njhwcl = Number(resultItem.njhwcl);
          item.tb = resultItem.tb;
          item.zbz = resultItem.zbz;
          item.dezb = resultItem.dezb;
          item.dszb = resultItem.dszb;
        }
        return item;
      });
      if (this.zsactive == "集团外营业收入") {
        this.$emit("changeysqk", result[0]);
      } else if (this.zsactive == "利润总额") {
        this.$emit("changeysqk", result[1]);
      } else if (this.zsactive == "净现金流") {
        this.$emit("changeysqk", result[2]);
      }
    },

    changeysqk(item) {
      this.zsactive = item.mkmc;
      this.$emit("changeysqk", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.tzje-progress {
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
.ysqk-div {
  display: flex;
  justify-content: space-between;
  gap: 7px; /* 设置子元素之间的间距为 7px */
  .ysqk-item {
    width: 320px;
    min-width: 320px;
    height: 215px;
    // flex: 1;
    background: url(../../../../assets/img/LargeScreen/ksqyzl/zs.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // position: relative;
    .ysqk-item-box {
      width: 100%;
    }
    .line {
      position: absolute;
      width: 10px;
      height: 10px;
    }
    .ysqk-content {
      padding: 10px 16px 10px 0;

      .top-div {
        width: 100%;
        display: flex;
        &img {
          width: 50px;
          height: 100%;
        }
        .item-content {
          margin-top: 15px;
          flex: 1;
          .item-value {
            // margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .value {
              font-family: DINMittelschriftLTW1G;
              color: #00e4ff;
              font-size: 34px;
              font-weight: 400;
            }
            .unit {
              font-size: 12px;
              background: linear-gradient(to top, #7ecdfb 0%, #fff 100%);
              background-clip: text; /* 关键：将背景裁剪到文本区域 */
              -webkit-background-clip: text; /* 为Safari浏览器添加前缀 */
              color: transparent; /* 使文字透明，背景色成为字体的填充 */
            }
            .tb-type {
              &img {
                width: 8px;
                height: 12px;
              }
            }
          }
          .item-mkmc {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            background: linear-gradient(to top, #7ecdfb 0%, #fff 100%);
            background-clip: text; /* 关键：将背景裁剪到文本区域 */
            -webkit-background-clip: text; /* 为Safari浏览器添加前缀 */
            color: transparent; /* 使文字透明，背景色成为字体的填充 */
          }
          .tbunit {
            text-align: left;
            font-size: 12px;
          }
        }
      }
      .ysqk-line {
        margin: 10px 0;
        height: 1px;
        background: url(../../../../assets/img/LargeScreen/ksqyzl/zs-Line.png);
        background-repeat: no-repeat;
        background-size: cover;
        margin-left: 16px;
      }
      .mbz {
        color: #88add4;
        font-size: 14px;
        margin-left: 16px;
        margin-top: 20px;
        .jhwcl {
          margin-bottom: 10px;
        }
        div {
          display: flex;
          justify-content: space-between;
        }
        .mbz-item1 {
          margin: 10px 0 5px 0;
        }
        .dyndjhz {
          color: #ffa018;
        }
      }
    }
  }
  .active {
    width: 320px;
    height: 230px;
    background: url(../../../../assets/img/LargeScreen/ksqyzl/active.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center; /* 可选：设置图片在div中的位置，默认为左上角 */
  }
}
.up {
  color: #ff5050;
}
.down {
  color: #00f886;
}
</style>
