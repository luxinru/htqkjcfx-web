<template>
  <div class="select-com">
    <span class="title">{{ title }}</span>
    <div class="select_box" @click="toggleDropdown">
      <span class="label">{{
        selectedOption ? selectedOption.label : (options.length > 0 ? options[0].label : '请选择')
      }}</span>
      <img
        src="~@/assets/img/contract/select-icon.png"
        alt=""
        :class="{ rotate: isOpen }"
      />
    </div>
    <transition name="dropdown">
      <div v-show="isOpen" class="dropdown-list">
        <div
          v-for="(item, index) in options"
          :key="index"
          class="dropdown-item"
          @click="selectOption(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "select-com",
  props: {
    title: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit("change", option);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style lang="scss" scoped>
.select-com {
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .title {
    font-weight: normal;
    font-size: 16px;
    color: #6bd8ff;
  }

  .select_box {
    width: 240px;
    height: 100%;
    background: rgba(0, 80, 144, 0.2);
    border-radius: 3px;
    border: 1px solid #0069ca;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 6px;
    box-sizing: border-box;
    cursor: pointer;

    .label {
      flex: 1 0;
      font-weight: normal;
      font-size: 16px;
      color: #ffffff;
    }

    img {
      width: 11px;
      transition: transform 0.3s ease;
      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-list {
    position: absolute;
    top: 100%;
    right: 0;
    width: 240px;
    background: rgba(0, 80, 144, 0.9);
    border: 1px solid #0069ca;
    border-radius: 3px;
    margin-top: 5px;
    max-height: v-bind(maxHeight + "px");
    overflow-y: auto;
    z-index: 1000;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #0069ca;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 80, 144, 0.2);
    }

    .dropdown-item {
      padding: 8px 12px;
      color: #ffffff;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background: rgba(0, 105, 202, 0.3);
      }
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
