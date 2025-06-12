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
      },
      // 记录点击事件坐标
      clickX: 0,
      clickY: 0
    };
  },
  methods: {
        openModal(e) {
      // 获取页面缩放比例
      const scaleRatio = window.screen.width / 1920;
      
      // 保存点击坐标，转换到未缩放的坐标系
      this.clickX = e.clientX / scaleRatio;
      this.clickY = e.clientY / scaleRatio;
      
      this.visible = true;
      this.$nextTick(() => {
        // 弹窗尺寸使用基准尺寸（不需要缩放，因为CSS会自动跟随页面缩放）
        const modalWidth = 453;
        const modalHeight = 132;
        
        // 计算弹窗位置（在未缩放的坐标系中）
        // 使弹窗中心点与点击位置对齐
        const left = this.clickX - modalWidth / 2;
        const top = this.clickY; // y坐标与鼠标位置一致
        
        // 确保弹窗不会超出视口边缘（在未缩放的坐标系中）
        const viewportWidth = 1920; // 使用基准视口宽度
        const viewportHeight = 1080; // 使用基准视口高度
        
        let adjustedLeft = left;
        let adjustedTop = top;
        
        // 水平边界处理
        if (left + modalWidth > viewportWidth) {
          adjustedLeft = viewportWidth - modalWidth - 10;
        }
        if (adjustedLeft < 10) {
          adjustedLeft = 10;
        }
        
        // 垂直边界处理
        if (top + modalHeight > viewportHeight) {
          // 如果下方空间不足，则显示在点击位置上方
          adjustedTop = this.clickY - modalHeight - 10;
        }
        if (adjustedTop < 10) {
          adjustedTop = 10;
        }

        this.modalStyle = {
          position: "fixed",
          top: adjustedTop + "px",
          left: adjustedLeft + "px",
          width: modalWidth + "px",
          height: modalHeight + "px",
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
  position: fixed;
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
