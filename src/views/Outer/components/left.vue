<template>
  <div class="left">
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
      :class="{ active: active === item.id }"
      @click="onItemClick(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { api1 } from "@/api/outer";

export default {
  name: "Left",

  data() {
    return {
      active: 0,
      list: []
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      api1().then(res => {
        console.log(res);
        this.list = res;
        this.active = this.list[0].id;
      });
    },

    onItemClick(item) {
      this.active = item.id;
      this.$EventBus.$emit("left-item-click", item);
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
