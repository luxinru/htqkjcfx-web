<template>
  <div class="bottom1">
    <div class="item" :class="{ active: active === 1 }" @click="handleClick(1)">
      <div class="labels">
        <span>
          客户地域分布
        </span>
        <TextCarousel
          :text-list="['境内', '境外']"
          :height="20"
          :interval="3000"
        />
      </div>

      <div class="values">
        <span>
          2
        </span>
      </div>
    </div>

    <div class="item" :class="{ active: active === 2 }" @click="handleClick(2)">
      <div class="labels">
        <span>
          客户数量
        </span>
      </div>

      <div class="values">
        <span>
          2995
        </span>
      </div>
    </div>

    <div class="item" :class="{ active: active === 3 }" @click="handleClick(3)">
      <div class="labels">
        <span>
          本年新增客户数量
        </span>
      </div>

      <div class="values">
        <span>
          155
        </span>
      </div>
    </div>

    <div class="item" :class="{ active: active === 4 }" @click="handleClick(4)">
      <div class="labels">
        <span>
          客户企业类型
        </span>
        <span>
          <TextCarousel
            :text-list="['个体工商户', '较去年增长11个']"
            :height="20"
            :interval="3000"
          />
        </span>
      </div>

      <div class="values">
        <span>
          29
        </span>
      </div>
    </div>

    <div class="item" :class="{ active: active === 5 }" @click="handleClick(5)">
      <div class="labels">
        <span>
          客户贡献度
        </span>
        <span>
          TOP2厦门国贸...
        </span>
      </div>

      <div class="values">
        <span></span>
        <span>
          合同金额占比4.36%
        </span>
      </div>
    </div>

    <div class="item" :class="{ active: active === 6 }" @click="handleClick(6)">
      <div class="labels">
        <span>
          价值标签
        </span>
        <span>
          重要价值客户
        </span>
      </div>

      <div class="values">
        <span>
          256
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import TextCarousel from "@/components/TextCarousel.vue";

export default {
  name: "bottom1",

  components: {
    TextCarousel
  },

  props: {
    active: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {};
  },

  methods: {
    handleClick(index) {
      this.$emit("update:active", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .item {
    width: 100%;
    height: 76px;
    background: url("~@/assets/img/contract/icon10.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 14px;
    box-sizing: border-box;

    &:hover {
      background: url("~@/assets/img/contract/icon11.png") no-repeat center
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .labels {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        &:nth-child(1) {
          font-weight: normal;
          font-size: 16px;
          color: #caf2ff;
        }

        &:nth-child(2) {
          font-weight: normal;
          font-size: 14px;
          color: #00ecff;
        }
      }
    }

    .values {
      display: flex;
      flex-direction: column;
      gap: 4px;
      span {
        &:nth-child(1) {
          font-family: DIN-1451-Mittelschrift-Regular,
            DIN-1451-Mittelschrift-Regular;
          font-weight: normal;
          font-size: 36px;
          color: #0cdcb2;
        }

        &:nth-child(2) {
          font-weight: normal;
          font-size: 14px;
          color: #00ecff;
        }
      }
    }
  }

  .active {
    background: url("~@/assets/img/contract/icon11.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
