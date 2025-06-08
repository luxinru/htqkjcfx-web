<template>
  <div class="top2">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="label">
        {{ item.label }}
      </div>
      <div class="value">
        {{ item.value }}
        <span class="unit">
          {{ item.unit }}
        </span>
      </div>
      <div
        class="proportion"
        :class="{ up: item.status === 'up', down: item.status === 'down' }"
      >
        <span>
          同比：
        </span>
        <img
          v-if="item.status === 'up'"
          src="~@/assets/img/contract/up.png"
          alt=""
        />
        <img
          v-if="item.status === 'down'"
          src="~@/assets/img/contract/down.png"
          alt=""
        />
        {{ item.proportion }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top2",

  data() {
    return {
      list: [
        {
          label: "年初手持合同额",
          value: 80,
          unit: "亿元",
          proportion: "5.3%",
          status: "up"
        },
        {
          label: "累计新签合同额",
          value: 26,
          unit: "亿元",
          proportion: "5.7%",
          status: "up"
        },
        {
          label: "累计转化收入-年初手持",
          value: 78,
          unit: "亿元",
          proportion: "8.45%",
          status: "up"
        },
        {
          label: "累计转化收入-累计新签",
          value: 56,
          unit: "亿元",
          proportion: "4.36%",
          status: "up"
        },
        {
          label: "期末手持合同额-年初剩余",
          value: 77,
          unit: "亿元",
          proportion: "8.2%",
          status: "up"
        },
        {
          label: "期末手持合同-累计新签剩余",
          value: 45,
          unit: "亿元",
          proportion: "4.25%",
          status: "up"
        },
        {
          label: "累计合同转化率-年初手持",
          value: 25,
          unit: "%",
          proportion: "4.25%",
          status: "down"
        },
        {
          label: "累计合同转化率-累计新签",
          value: 44.4,
          unit: "%",
          proportion: "6.39%",
          status: "up"
        },
        {
          label: "完成营收6-12月需签合同额",
          value: 5,
          unit: "亿元",
          proportion: "",
          status: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.top2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .item {
    width: 100%;
    height: 40px;
    background: url("~@/assets/img/contract/icon9.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;

    .label {
      flex: 3 0;
      font-weight: normal;
      font-size: 18px;
      color: #ffffff;
    }

    .value {
      flex: 1 0;
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 18px;
      color: #1bffcc;

      .unit {
        font-size: 14px;
        margin-left: 3px;
      }
    }

    .proportion {
      flex: 1 0;
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 16px;
      color: #25ff50;

      span {
        color: rgba(0, 236, 255, 1);
      }

      img {
        margin-right: 3px;
      }
    } 

    .up {
      color: #25ff50;
    }

    .down {
      color: rgba(255, 51, 85, 1);
    }
  }
}
</style>
