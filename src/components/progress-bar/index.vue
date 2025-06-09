<template>
  <div class="progress-bar">
    <div
      class="bar"
      :style="{ '--width': value + '%', width: value + '%', background: color }"
    ></div>
    <span class="value" :style="{ color: color }"> {{ value }}% </span>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: {
    value: {
      type: Number,
      default: 0
    },

    color: {
      type: String,
      default: "#2FC49A"
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background: rgba(0, 80, 144, 0.2);
  border: 1px solid #005090;
  display: flex;
  align-items: center;
  padding: 6px;
  box-sizing: border-box;
  gap: 8px;

  .bar {
    height: 100%;
    width: 0;
    animation: grow 1s ease-out forwards;
  }

  .value {
    font-weight: normal;
    font-size: 14px;
  }
}

@keyframes grow {
  from {
    width: 0;
  }
  to {
    width: var(--width);
  }
}
</style>
