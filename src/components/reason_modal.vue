<template>
  <div
    style="display: inline-block; position: relative;"
    @contextmenu.prevent="openModal($event)"
  >
    <slot></slot>
    <div v-if="visible" class="modal-mask" @click.self="closeModal">
      <div class="modal-content" :style="modalStyle">
        <div class="modal-header">
          <span class="modal-close" @click="closeModal">×</span>
        </div>
        <div class="modal-body">
          {{ reason }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reason_modal",
  props: {
    reason: { type: String, default: "" },
    ZBBM: { type: String, default: "" },
    DWBM: { type: String, default: "" }
  },
  data() {
    return {
      visible: false,
      modalStyle: {
        top: "100px",
        left: "100px"
      }
    };
  },
  methods: {
    openModal(e) {
      this.visible = true;
      this.$nextTick(() => {
        // 获取包裹元素的位置信息
        const wrapper = this.$el;
        const rect = wrapper.getBoundingClientRect();
        const modalWidth = 453; // 弹窗宽度，需与样式一致
        const left = rect.left + (rect.width - modalWidth) / 2;
        const top = rect.bottom + 8; // 距离底部8px

        this.modalStyle = {
          position: "fixed",
          top: top + "px",
          left: left + "px",
          minWidth: modalWidth + "px",
          zIndex: 1001
        };
      });
    },
    closeModal() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.modal-content {
  width: 453px;
  height: 132px;
  background-image: url("~@/assets/img/home/reason_top.png"),
    url("~@/assets/img/home/reason_bottom.png");
  background-position: top, bottom;
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 50%, 100% 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modal-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}
.modal-close {
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}

.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #ffffff;
  padding: 0 20px;
  text-align: center;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
