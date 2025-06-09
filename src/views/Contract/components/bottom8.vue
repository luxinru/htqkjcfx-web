<template>
  <div class="bottom8">
    <div class="part">
      <div ref="chart" class="chart"></div>
    </div>
    <div class="part">
      <section class="table">
        <table>
          <thead>
            <tr>
              <th>
                价值客户
              </th>
              <th>
                客户合同签订数量（个）
              </th>
              <th>
                客户签订合同总额（万元）
                <img src="@/assets/img/home/select.png" alt="" @click="onOpenModal" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="index in 4" :key="index">
              <td>
                重要价值客户
              </td>
              <td>
                >=3
              </td>
              <td>
                >=500
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <transition name="modal-fade">
      <section v-if="isShowModal" class="modal">
        <div class="content">
          <div class="title">
            <img src="~@/assets/img/contract/close.png" alt="" class="close" />
          </div>

          <div class="form">
            <table>
              <tbody>
                <tr>
                  <td>客户最近新签合同时间范围（天）</td>
                  <td>
                    低<=
                    <input v-model="low" placeholder="请输入" />
                    <=高
                  </td>
                </tr>
                <tr>
                  <td>
                    客户合同签订数量（个)
                  </td>
                  <td>
                    低<=
                    <input v-model="num" placeholder="请输入" />
                    <=高
                  </td>
                </tr>
                <tr>
                  <td>
                    客户签订合同总额（万元）
                  </td>
                  <td>
                    低<=
                    <input v-model="money" placeholder="请输入" />
                    <=高
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="btns">
            <div class="btn" @click="isShowModal = false">
              取消
            </div>
            <div class="btn confirm" @click="handleConfirm">
              确定
            </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "bottom8",

  data() {
    return {
      chart: null,
      list: [
        {
          value: 29123.68,
          name: "重要价值客户",
          color: "rgba(232, 100, 82, 1)",
          percent: 17.73
        },
        {
          value: 13845.32,
          name: "潜力价值客户",
          color: "rgba(91, 143, 249, 1)",
          percent: 7.13
        },
        {
          value: 29123.68,
          name: "中等价值客户",
          color: "rgba(246, 189, 22, 1)",
          percent: 65.75
        },
        {
          value: 29123.68,
          name: "一般价值客户",
          color: "rgba(232, 100, 82, 1)",
          percent: 9.43
        }
      ],
      low: "365",
      num: "3",
      money: "566",
      isShowModal: false
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      this.chart = echarts.init(this.$refs.chart);

      const list = this.list;

      const option = {
        tooltip: {
          trigger: "item",
          confine: true
        },
        legend: {
          show: true,
          orient: "vertical",
          right: "15%",
          top: "center",
          formatter: function(name) {
            const item = list.find(item => item.name === name);
            return `${name} ${item.percent}% ${item.value.toFixed(2)}`;
          },
          textStyle: {
            color: "#ffffff",
            fontSize: 16,
            lineHeight: 30
          }
        },
        series: [
          {
            name: "客户贡献度",
            type: "pie",
            radius: "90%",
            center: ["30%", "50%"],
            data: list.map(item => ({
              value: item.percent,
              name: item.name,
              itemStyle: {
                color: item.color,
                borderWidth: 6,
                borderColor: "RGBA(17, 51, 87, 1)"
              }
            })),
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        ]
      };

      this.chart.setOption(option);
    },

    onOpenModal() {
      this.low = "365";
      this.num = "3";
      this.money = "566";
      this.isShowModal = true;
    },

    handleConfirm() {
      this.isShowModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom8 {
  width: 100%;
  height: 100%;
  padding: 16px 0;
  box-sizing: border-box;
  display: flex;

  .part {
    flex: 1 0;
    height: 100%;

    .chart {
      width: 100%;
      height: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        width: 100%;
        height: 40px;
        border: 1px solid #0069ca;
        background: rgba(0, 80, 144, 0.6);
        tr {
          th {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
            line-height: 40px;

            img {
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }

      tbody {
        tr {
          height: 40px;
          background: linear-gradient(
            0,
            rgba(0, 66, 119, 0.6) 0%,
            rgba(12, 43, 75, 0.6) 100%
          );
          border: 1px solid #707070;
          td {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
          }

          &:hover {
            background: linear-gradient(
              0,
              rgba(0, 105, 202, 0.8) 0%,
              rgba(0, 105, 202, 0) 50%,
              rgba(0, 105, 202, 0) 100%
            );
            cursor: pointer;

            td {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all 0.3s ease;
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    .content {
      width: 630px;
      height: 320px;
      background: url("~@/assets/img/contract/modal_bac.png") no-repeat center
        center;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      box-sizing: border-box;
      animation: modalZoomIn 0.3s ease;

      .title {
        position: relative;
        width: 597px;
        height: 35px;
        background: url("~@/assets/img/contract/modal_title.png") no-repeat
          center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;

        .close {
          position: absolute;
          right: 0;
          cursor: pointer;
        }
      }

      .form {
        width: 100%;
        flex: 1 0;
        display: flex;
        align-items: center;
        justify-content: center;

        table {
          width: 100%;
          border-collapse: collapse;

          tbody {
            tr {
              height: 40px;
              td {
                border: 1px solid #0069ca;
                font-weight: normal;
                font-size: 16px;
                color: #6bd8ff;
                text-align: center;

                input {
                  width: 100px;
                  height: 28px;
                  box-sizing: border-box;
                  background: rgba(0, 80, 144, 0.2);
                  border-radius: 3px;
                  border: 1px solid #0069ca;
                  text-align: center;
                  line-height: 28px;
                  font-weight: normal;
                  font-size: 16px;
                  color: #ffffff;
                  outline: none;
                }
              }
            }
          }
        }
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;

        .btn {
          width: 120px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
          background: url("~@/assets/img/contract/btn_default.png") no-repeat
            center center;
          background-size: 100% 100%;
          cursor: pointer;
        }

        .confirm {
          background: url("~@/assets/img/contract/btn_confirm.png") no-repeat
            center center;
          background-size: 100% 100%;
        }
      }
    }
  }
}

@keyframes modalZoomIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
