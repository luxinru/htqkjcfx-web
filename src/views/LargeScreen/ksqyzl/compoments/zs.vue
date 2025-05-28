<template>
  <!-- 总数 -->
  <div class="zs-div">
    <div
      class="zs-item"
      :class="item.id === zsactive ? 'active' : ''"
      v-for="item in zsList"
      :key="item.id"
      @click="changezs(item)"
    >
      <div class="zs-item-box">
        <div class="zs-content">
          <div class="top-div">
            <img :src="item.img" alt="" />
            <div class="item-content">
              <div class="item-value">
                <div>
                  <span :class="item.color" class="value">
                    {{
                      /亿元/.test(item.tbunit) ? $money100m(item.sjz) : item.sjz
                    }}
                  </span>
                  <span class="unit"> {{ item.tbunit }}</span>
                </div>
                <!-- <div class="tb-type" :class="item.tb > 0 ? 'up' : 'down'">
                  <img
                    src="../../../../assets/img/LargeScreen/up.png"
                    alt=""
                    v-if="item.tb > 0"
                  />
                  <img
                    src="../../../../assets/img/LargeScreen/down.png"
                    alt=""
                    v-else
                  />
                  <span>{{ item.tb }}</span>
                </div> -->
              </div>
              <div class="item-mkmc">
                <div>{{ item.mkmc }}</div>
                <!-- <div class="tbunit" :class="item.tb > 0 ? 'up' : 'down'">
                  同比 ({{ item.tbunit }})
                </div> -->
              </div>
            </div>
          </div>
          <div class="zs-line"></div>
          <div class="mbz">
            <div class="mbz-item1">
              <span>全年控制值</span>
              <span>
                {{ item.qnmbz }}
                {{ /亿元/.test(item.tbunit) ? "万元" : item.tbunit }}
              </span>
            </div>
            <div :class="item.jlmbz > 0 ? 'up' : 'down'">
              <span>
                {{
                  item.jlmbz == 0 ? "已达" : item.jlmbz > 0 ? "高于" : "低于"
                }}控制值
              </span>
              <span>
                {{ item.jlmbz ? Math.abs(item.jlmbz) : "" }}
                {{ /亿元/.test(item.tbunit) ? "万元" : item.tbunit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//   import Charts from "@/components/echarts/index.vue";
import api from "@/api/ksqyzl.js";

export default {
  name: "zs",
  props: {
    form: Object
  },
  watch: {
    form: {
      handler(val) {
        this.getData();
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      zsactive: 0,
      zsList: [
        {
          id: 0,
          // mkmc: "亏损企业数",
          // sjz: "3",
          tbunit: "户",
          img: require("../../../../assets/img/LargeScreen/ksqyzl/ksqys.png"),
          // qnmbz: "30",
          // jlmbz: "8",
          color: "ksqys"
          // tb: 3
        },
        {
          id: 1,
          // mkmc: "亏损额",
          // sjz: "7814",
          tbunit: "亿元",
          img: require("../../../../assets/img/LargeScreen/ksqyzl/kse.png"),
          // qnmbz: "30",
          // jlmbz: "8",
          color: "kse"
          // tb: -658
        },
        {
          id: 2,
          // mkmc: "微利户",
          // sjz: "",
          tbunit: "户",
          img: require("../../../../assets/img/LargeScreen/ksqyzl/wlh.png"),
          // qnmbz: "30",
          // jlmbz: "8",
          color: "wlh"
          // tb: 3
        }
      ]
    };
  },
  methods: {
    changezs(item) {
      this.zsactive = item.id;
      this.$emit("changezs", item);
    },
    async getData() {
      const parmas = {
        jzsj: this.form.jzsj,
        mkmc: "",
        qymczbdm: "",
        ksqyflzbdm: "",
        bnzkcszbdm: "",
        qnmbzbdm: "",
        kbzbdm: "",
        qnyczbdm: ""
      };
      const result = await api.queryKsqyzstj(parmas);

      this.zsList = result.map((item, index) => {
        return {
          ...this.zsList[index],
          ...item
        };
      });
      this.$emit("changezs", this.zsList[this.zsactive]);
    }
  }
};
</script>

<style lang="scss" scoped>
.zs-div {
  width: calc(100% - 44px);
  display: flex;
  justify-content: space-between;
  padding: 22px 22px 12px 22px;
  gap: 17px; /* 设置子元素之间的间距为 17px */
  .zs-item {
    width: 283px;
    height: 185px;
    flex: 1;
    background: url(../../../../assets/img/LargeScreen/ksqyzl/zs.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: bottom; /* 可选：设置图片在div中的位置，默认为左上角 */
    // position: relative;
    cursor: pointer;
    .zs-item-box {
      width: 100%;
    }
    .line {
      position: absolute;
      width: 10px;
      height: 10px;
    }
    .zs-content {
      padding: 26px 16px 10px 16px;

      .top-div {
        width: 100%;
        display: flex;
        &img {
          width: 50px;
          height: 100%;
        }
        .item-content {
          margin-left: 15px;
          flex: 1;
          .item-value {
            // margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .ksqys {
              color: #00aeff;
            }
            .kse {
              color: #ee8200;
            }
            .wlh {
              color: #00cc82;
            }
            .value {
              font-size: 30px;
              font-weight: 700;
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
            text-align: right;
            font-size: 12px;
          }
        }
      }
      .zs-line {
        margin: 15px 0;
        height: 1px;
        background: url(../../../../assets/img/LargeScreen/ksqyzl/zs-Line.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
      .mbz {
        color: #88add4;
        div {
          display: flex;
          justify-content: space-between;
        }
        .mbz-item1 {
          margin-bottom: 13px;
        }
      }
    }
  }
  .active {
    width: 283px;
    height: 195px;
    // height: 160px;
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
