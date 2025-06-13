<template>
  <div class="bottom6">
    <section class="tabs">
      <div class="tab" :class="{ active: active === 1 }" @click="onChange(1)">
        合同总金额
      </div>
      <div class="tab" :class="{ active: active === 2 }" @click="onChange(2)">
        合同营收总额
      </div>
    </section>

    <section class="list">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="labels">
          <div class="index">
            {{ index + 1 }}
          </div>
          <div class="name">
            {{ item.name }}
          </div>
          <div class="value">
            {{ (item.zb * 100).toFixed(0) }}%
          </div>
        </div>

        <div class="percent">
          <div class="value" :style="{ '--width': (item.zb * 100) + '%' }"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/new/contract";
export default {
  name: "bottom6",

  data() {
    return {
      active: 1,
      listData: []
    };
  },

  async mounted() {
    this.queryKhgxdfx();
    
    this.$EventBus.$on("orgChange", async org => {
      this.queryKhgxdfx();
    });
  },

  methods: {
    onChange(type) {
      this.active = type;
      this.queryKhgxdfx();
    },
    
    async queryKhgxdfx() {
      const res = await api.queryKhgxdfx({
        dwbm: "6B51EA03CC8C4168876E3EA97A29B15E",
        time: "2024-11",
        // 0 合同总金额 1 合同营收总额
        type: this.active === 1 ? "0" : "1"
      });

      if (res && Array.isArray(res)) {
        this.listData = res;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom6 {
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .tabs {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    gap: 6px;

    .tab {
      width: max-content;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 66, 119, 0.4);
      border-radius: 5px;
      border: 1px solid #005090;
      font-weight: normal;
      font-size: 14px;
      color: #6bd8ff;
      cursor: pointer;
    }

    .active {
      background: #004277;
      border: 1px solid #707070;
      color: #ffffff;
    }
  }

  .list {
    width: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;
    // gap: 6px;
    justify-content: space-between;

    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .labels {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;

        .index {
          width: 26px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          font-size: 12px;
          color: #ffffff;
          background: url("~@/assets/img/contract/04.png") no-repeat center
            center;
          background-size: 100% 100%;
        }

        .name {
          flex: 1 0;
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
        }

        .value {
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
        }
      }

      .percent {
        width: 100%;
        height: 10px;
        background: rgba(0, 80, 144, 0.4);
        display: flex;
        align-items: center;

        .value {
          height: 100%;
          background: linear-gradient(90deg, #04407d 0%, #419fff 100%);
          animation: growWidth 1s ease-out forwards;
          transform-origin: left;
        }
      }

      @keyframes growWidth {
        from {
          width: 0;
        }
        to {
          width: var(--width, 78%);
        }
      }

      &:nth-child(1) {
        .index {
          background: url("~@/assets/img/contract/01.png") no-repeat center
            center;
        }

        .percent {
          .value {
            background: linear-gradient(90deg, #971616 0%, #e43128 100%);
          }
        }
      }

      &:nth-child(2) {
        .index {
          background: url("~@/assets/img/contract/02.png") no-repeat center
            center;
        }

        .percent {
          .value {
            background: linear-gradient(90deg, #914100 0%, #ff7e37 100%);
          }
        }
      }

      &:nth-child(3) {
        .index {
          background: url("~@/assets/img/contract/03.png") no-repeat center
            center;
        }

        .percent {
          .value {
            background: linear-gradient(90deg, #896702 0%, #ffe243 100%);
          }
        }
      }
    }
  }
}
</style>
