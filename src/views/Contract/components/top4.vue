<template>
  <div class="top4">
    <div class="item" v-for="(item, index) in dataList" :key="index">
      <div class="title">
        {{ item.mkmc }}
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          <span>
            {{ formatValue(item.ndjhz) }}
          </span>
          <p v-if="!item.mkmc.includes('率')">
            亿元
          </p>
          <p v-else>
            %
          </p>
        </div>
        <div
          class="value_item"
          style="color: rgba(0, 236, 255, 1);"
          v-if="item.tb"
        >
          <span>
            同比：
          </span>
          <p :class="item.tb >= 0 ? 'up' : 'down'">
            <img
              :src="
                require(`@/assets/img/contract/${
                  item.tb >= 0 ? 'up' : 'down'
                }.png`)
              "
              alt=""
            />
            {{ Math.abs(item.tb) }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/new/contract";

export default {
  name: "top4",
  data() {
    return {
      dataList: []
    };
  },

  mounted() {
    this.init();

    
    this.$EventBus.$on("orgChange", () => {
      this.init();
    });
  },

  methods: {
    async init() {
      const res = await api.queryZhiBiaoList({
        dwbm: "61C4D1289BD84D179AC848A7279C2959",
        time: "2024-11"
      });
      if (res && Array.isArray(res)) {
        this.dataList = res;
      }
    },
    formatValue(value) {
      if (typeof value === "number") {
        // 如果数值大于等于1亿，转换为亿元单位
        if (value >= 10000) {
          return (value / 10000).toFixed(2);
        }
        // 其他情况直接返回原值
        return value.toFixed(2);
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
.top4 {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  .item {
    background: url("~@/assets/img/contract/icon21.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;

    .title {
      font-weight: normal;
      font-size: 16px !important;
      color: #ffffff;
    }

    .values {
      display: flex;
      gap: 8px;

      .value_item {
        flex: 1 0;
        display: flex;
        font-weight: normal;
        font-size: 18px;
        align-items: center;

        span {
          font-size: 18px;
        }

        p {
          font-size: 14px;
          display: flex;
          align-items: center;

          img {
            margin-right: 3px;
          }
        }

        .up {
          color: rgba(37, 255, 80, 1);
        }

        .down {
          color: rgba(255, 51, 85, 1);
        }

        &:nth-child(2) {
          flex: 1.5 0;
        }
      }
    }
  }
}
</style>
