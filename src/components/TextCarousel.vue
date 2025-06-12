<template>
  <div class="text-carousel-container" :style="{ height: height + 'px' }">
    <div class="text-carousel">
      <div
        v-for="(text, index) in textList"
        :key="`${text}-${index}`"
        class="text-item"
        :class="{
          'text-item-active': index === currentIndex,
          'text-item-sliding': index === currentIndex && isSliding
        }"
        :style="{
          zIndex: getZIndex(index),
          transform: getTransform(index),
          opacity: getOpacity(index)
        }"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextCarousel",
  props: {
    // 文字数组
    textList: {
      type: Array,
      required: true,
      default: () => []
    },
    // 轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 3000
    },
    // 容器高度
    height: {
      type: Number,
      default: 60
    },
    // 动画持续时间（毫秒）
    animationDuration: {
      type: Number,
      default: 500
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      isSliding: false,
      timer: null
    };
  },
  computed: {
    totalItems() {
      return this.textList.length;
    }
  },
  mounted() {
    if (this.autoPlay && this.totalItems > 1) {
      this.startCarousel();
    }
  },
  beforeDestroy() {
    this.stopCarousel();
  },
  methods: {
    // 获取Z轴索引
    getZIndex(index) {
      if (this.totalItems === 0) return 0;

      // 计算相对于当前索引的位置
      const diff =
        (index - this.currentIndex + this.totalItems) % this.totalItems;

      // 最上层(当前显示)的z-index最高，依次递减
      return this.totalItems - diff;
    },

    // 获取变换样式
    getTransform(index) {
      if (this.totalItems === 0) return "translateY(0) scale(1)";

      const diff =
        (index - this.currentIndex + this.totalItems) % this.totalItems;

      // 如果是当前项且正在滑动，向上移动
      if (index === this.currentIndex && this.isSliding) {
        return "translateY(-100%) scale(1)";
      }

      // 根据层级设置不同的缩放和位移
      if (diff === 0) {
        // 当前最上层
        return "translateY(0) scale(1)";
      } else if (diff === 1) {
        // 第二层
        return "translateY(0) scale(0.98)";
      } else if (diff === 2) {
        // 第三层
        return "translateY(0) scale(0.96)";
      } else {
        // 更深层
        return "translateY(0) scale(0.94)";
      }
          },

      // 获取透明度
      getOpacity(index) {
        if (this.totalItems === 0) return 1;

        const diff = (index - this.currentIndex + this.totalItems) % this.totalItems;

        // 当前最上层
        if (diff === 0) {
          // 滑动时透明度变为0，否则完全可见
          return this.isSliding ? 0 : 1;
        }

        // 次层
        if (diff === 1) {
          // 当前层滑动时透明度从0变为1，否则完全隐藏
          return this.isSliding ? 1 : 0;
        }

        // 第三层及以下都隐藏
        if (diff === 2) {
          return 0;
        }

        // 其他层完全隐藏
        return 0;
      },

      // 开始轮播
    startCarousel() {
      this.stopCarousel();
      this.timer = setInterval(() => {
        this.nextSlide();
      }, this.interval);
    },

    // 停止轮播
    stopCarousel() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 下一张
    nextSlide() {
      if (this.totalItems <= 1) return;

      this.isSliding = true;

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.isSliding = false;
      }, this.animationDuration);
    },

    // 上一张
    prevSlide() {
      if (this.totalItems <= 1) return;

      this.isSliding = true;

      setTimeout(() => {
        this.currentIndex =
          (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.isSliding = false;
      }, this.animationDuration);
    },

    // 跳转到指定索引
    goToSlide(index) {
      if (index < 0 || index >= this.totalItems || index === this.currentIndex)
        return;

      this.isSliding = true;

      setTimeout(() => {
        this.currentIndex = index;
        this.isSliding = false;
      }, this.animationDuration);
    },

    // 重新开始轮播
    restart() {
      if (this.autoPlay && this.totalItems > 1) {
        this.startCarousel();
      }
    },

    // 暂停轮播
    pause() {
      this.stopCarousel();
    }
  },
  watch: {
    textList: {
      handler() {
        this.currentIndex = 0;
        this.isSliding = false;
        if (this.autoPlay && this.totalItems > 1) {
          this.startCarousel();
        } else {
          this.stopCarousel();
        }
      },
      immediate: false
    },
    autoPlay(newVal) {
      if (newVal && this.totalItems > 1) {
        this.startCarousel();
      } else {
        this.stopCarousel();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.text-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.text-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  font-weight: normal;
  font-size: 14px;
  color: #00ecff;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  user-select: none;

  &.text-item-sliding {
    transform: translateY(-100%) !important;
  }
}
</style>
