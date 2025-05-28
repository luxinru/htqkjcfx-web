<template>
  <div class="costus-Tabs" ref="tabsContainer">
    <div
      class="label-item"
      :class="{ active: value === item.value }"
      v-for="item in tabsList"
      :key="item.value"
      @click="chengeTabs(item.value, $event)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "tabValue",
    event: "change"
  },
  props: {
    tabsList: {
      type: Array,
      default: () => [],
      require: true
    },
    tabValue: {
      type: String | Number,
      default: ""
    }
  },
  computed: {
    value: {
      get() {
        return this.tabValue;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    chengeTabs(value) {
      this.value = value;
      this.$emit("changeTab", value);
      
    // 获取点击的标签元素
    const clickedTab = event.target;
    
    // 获取标签容器
    const tabsContainer = this.$refs.tabsContainer;

    // 滚动到点击的标签
    clickedTab.scrollIntoView({
      behavior: 'smooth',  // 平滑滚动
      block: 'nearest'     // 滚动到最近的边界
    });
    }
  }
};
</script>
<style lang="scss" scoped>
.costus-Tabs {
  display: flex;
  padding-top: 10px;
  // padding-left: 10px;
  width: 100%;
  overflow: auto;
  .label-item {
    font-size: 12px;
    color: #568fc9;
    border: 1px solid #396da4;
    border-radius: 20px;
    padding: 3px 15px;
    background: #123960;
    cursor: pointer;
    margin: 0 5px;
    white-space: nowrap;  /* 防止文字换行 */
  display: inline-block; /* 让宽度自适应内容 */
  }
  .active {
    color: #fef8f8;
  }
}
</style>
