<template>
  <div
    style="display: inline-block; position: relative;"
    :class="{ 'yellow-text': shouldShowYellow }"
    @contextmenu.prevent="openModal($event)"
  >
    <slot></slot>
    <div v-if="visible" class="modal-mask" @click.self="closeModal">
      <div class="modal-content" :style="modalStyle">
        <div class="modal-header">
          <img
            v-if="canEdit"
            src="@/assets/img/home/select.png"
            alt=""
            @click="handleEditToggle"
          />
          <span class="modal-close" @click="closeModal">×</span>
        </div>
        <div class="modal-body">
          <span v-if="!isEdit">
            {{ currentReason }}
          </span>
          <div v-else class="edit-container">
            <input
              ref="editInput"
              type="text"
              v-model="currentReason"
              class="tech-input"
              placeholder="请输入内容"
              @keyup.enter="handleConfirm"
              @keyup.esc="handleCancel"
            />
            <div class="tech-buttons">
              <button class="tech-btn confirm-btn" @click="handleConfirm">
                <span class="btn-icon">✓</span>
              </button>
              <button class="tech-btn cancel-btn" @click="handleCancel">
                <span class="btn-icon">✗</span>
              </button>
            </div>
          </div>
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
    DWBM: { type: String, default: "" },
    xy: { type: String, default: "" },
    canEdit: { type: Boolean, default: false }
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
      clickY: 0,
      isEdit: false,
      originalReason: "", // 保存原始reason值，用于取消编辑时恢复
      currentReason: "", // 当前编辑的reason值
    };
  },

  computed: {
    shouldShowYellow() {
      if (this.xy) {
        return this.qksm.some(
          item =>
            item.ZBBM === this.ZBBM &&
            item.DWBM === this.DWBM &&
            item.xy === this.xy
        );
      } else {
        return this.qksm.some(
          item => item.ZBBM === this.ZBBM && item.DWBM === this.DWBM
        );
      }
    },

    qksm() {
      return JSON.parse(localStorage.getItem("em_qksm") || "[]");
    }
  },

  methods: {
    openModal(e) {
      // 获取页面缩放比例
      const scaleRatio = window.screen.width / 1920;

      // 保存点击坐标，转换到未缩放的坐标系
      this.clickX = e.clientX / scaleRatio;
      this.clickY = e.clientY / scaleRatio;

      // 初始化reason值
      this.currentReason = this.reason;
      this.originalReason = this.reason;
      this.isEdit = false;

      this.visible = true;
      this.$nextTick(() => {
        // 弹窗尺寸使用基准尺寸（不需要缩放，因为CSS会自动跟随页面缩放）
        const modalWidth = 453;
        const modalHeight = this.isEdit ? 150 : 132;

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
    },
    // 切换编辑状态
    handleEditToggle() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        // 进入编辑状态时，保存原始值
        this.originalReason = this.currentReason;
        // 调整模态框高度并聚焦输入框
        this.$nextTick(() => {
          // 聚焦到输入框
          if (this.$refs.editInput) {
            this.$refs.editInput.focus();
            this.$refs.editInput.select();
          }
        });
      }
    },
    // 确认编辑
    handleConfirm() {
      // 触发事件，通知父组件reason已更新
      this.$emit("update:reason", this.currentReason, this.ZBBM, this.DWBM);
      this.isEdit = false;
    },
    // 取消编辑
    handleCancel() {
      // 恢复原始值
      this.currentReason = this.originalReason;
      this.isEdit = false;
    }
  }
};
</script>

<style scoped>
.yellow-text {
  color: yellow;
}

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
  transition: height 0.3s ease;
}
.modal-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
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
  min-height: 40px;

  > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}

.edit-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 0 10px;
}

.tech-input {
  flex: 1;
  height: 32px;
  line-height: 32px;
  background: linear-gradient(
    135deg,
    rgba(18, 59, 99, 0.9) 0%,
    rgba(18, 59, 99, 0.7) 100%
  );
  border: 1px solid #3e74ad;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  color: #ffffff;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(136, 173, 212, 0.5);
    font-size: 13px;
  }

  &:focus {
    border-color: #2487e3;
    box-shadow: 0 0 8px rgba(36, 135, 227, 0.3);
    background: linear-gradient(
      135deg,
      rgba(18, 59, 99, 1) 0%,
      rgba(18, 59, 99, 0.8) 100%
    );
  }

  &:hover {
    border-color: rgba(62, 116, 173, 0.8);
  }
}

.tech-buttons {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.tech-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-icon {
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
    position: relative;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transition: all 0.3s ease;
  }

  &.confirm-btn {
    background: linear-gradient(
      135deg,
      rgba(36, 135, 227, 0.9) 0%,
      rgba(36, 135, 227, 0.7) 100%
    );
    border: 1px solid rgba(36, 135, 227, 0.8);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(36, 135, 227, 0.2);

    &::before {
      background: radial-gradient(
        circle at center,
        rgba(0, 255, 255, 0.3) 0%,
        rgba(0, 255, 255, 0) 70%
      );
      opacity: 0;
      transform: scale(0.8);
    }

    &:hover {
      border-color: #2487e3;
      box-shadow: 0 0 16px rgba(36, 135, 227, 0.5),
        0 0 24px rgba(36, 135, 227, 0.3), inset 0 0 8px rgba(0, 255, 255, 0.1);
      transform: translateY(-1px) scale(1.05);

      &::before {
        opacity: 1;
        transform: scale(1);
      }

      .btn-icon {
        text-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
      }
    }

    &:active {
      transform: translateY(0) scale(1.02);
      box-shadow: 0 0 12px rgba(36, 135, 227, 0.7),
        inset 0 0 12px rgba(0, 255, 255, 0.2);
    }
  }

  &.cancel-btn {
    background: linear-gradient(
      135deg,
      rgba(255, 80, 80, 0.9) 0%,
      rgba(255, 80, 80, 0.7) 100%
    );
    border: 1px solid rgba(255, 80, 80, 0.8);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(255, 80, 80, 0.2);

    &::before {
      background: radial-gradient(
        circle at center,
        rgba(255, 100, 100, 0.3) 0%,
        rgba(255, 100, 100, 0) 70%
      );
      opacity: 0;
      transform: scale(0.8);
    }

    &:hover {
      border-color: #ff5050;
      box-shadow: 0 0 16px rgba(255, 80, 80, 0.5),
        0 0 24px rgba(255, 80, 80, 0.3), inset 0 0 8px rgba(255, 150, 150, 0.1);
      transform: translateY(-1px) scale(1.05);

      &::before {
        opacity: 1;
        transform: scale(1);
      }

      .btn-icon {
        text-shadow: 0 0 8px rgba(255, 150, 150, 0.8);
      }
    }

    &:active {
      transform: translateY(0) scale(1.02);
      box-shadow: 0 0 12px rgba(255, 80, 80, 0.7),
        inset 0 0 12px rgba(255, 150, 150, 0.2);
    }
  }
}
</style>
