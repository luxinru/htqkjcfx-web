<template>
  <div class="left">
    <div class="item" :class="{ active: active === 0 }" @click="onItemClick(0)">
      同方威视
    </div>
    <div class="item" :class="{ active: active === 1 }" @click="onItemClick(1)">
      同方数科
    </div>
    <div class="item" :class="{ active: active === 2 }" @click="onItemClick(2)">
      同方能源
    </div>
    <div class="item" :class="{ active: active === 3 }" @click="onItemClick(3)">
      中核医疗
    </div>
    <div class="item" :class="{ active: active === 4 }" @click="onItemClick(4)">
      中核深圳
    </div>
    <div class="item" :class="{ active: active === 5 }" @click="onItemClick(5)">
      同方工业
    </div>
    <div class="item" :class="{ active: active === 6 }" @click="onItemClick(6)">
      同方友友
    </div>
    <div class="item" :class="{ active: active === 7 }" @click="onItemClick(7)">
      同方科创
    </div>
    <div class="item" :class="{ active: active === 8 }" @click="onItemClick(8)">
      同方科技园
    </div>
    <div class="item" :class="{ active: active === 9 }" @click="onItemClick(9)">
      同方物业
    </div>
  </div>
</template>

<script>
export default {
  name: "Left",

  data() {
    return {
      active: 0
    };
  },

  methods: {
    onItemClick(index) {
      this.active = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  height: 100%;
  padding: 33px 11px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;

  .item {
    width: 100%;
    height: 60px;
    background: url("~@/assets/img/outer/left_item_bg.png") no-repeat center
      center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #6bd8ff;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);

    &:hover {
      transform: scale(1.02);
    }
  }

  .active {
    background: url("~@/assets/img/outer/left_item_bg_active.png") no-repeat
      center center;
    background-size: 100% 100%;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(107, 216, 255, 0.3);
  }
}
</style>
