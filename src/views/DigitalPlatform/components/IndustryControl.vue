<template>
  <div class="industry-control">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>产业控制</span>
    </div>
    
    <div class="control-items">
      <div class="control-item">
        <div class="item-label">技术应用营业收入</div>
        <div class="item-subtitle">核医疗</div>
        <div class="progress-container">
          <div class="circular-progress" :style="{ '--progress': '78%' }">
            <span class="progress-value">78%</span>
          </div>
        </div>
        <div class="item-details">
          <div class="detail-row">
            <span class="label">目标值</span>
            <span class="value">52.5%</span>
          </div>
        </div>
      </div>

      <div class="control-item">
        <div class="item-label">核医疗</div>
        <div class="progress-container">
          <div class="circular-progress yellow" :style="{ '--progress': '73%' }">
            <span class="progress-value">73%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndustryControl'
}
</script>

<style scoped lang="scss">
.industry-control {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px;
  backdrop-filter: blur(10px);
  position: relative;
  flex: 1;
  height: calc(33.33vh - 80px);
  max-height: 280px;
  min-height: 240px;
  margin-bottom: 50px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hexagon" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="rgba(0,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hexagon)"/></svg>');
    pointer-events: none;
    border-radius: 12px;
  }
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;

  .title-icon {
    width: 4px;
    height: 16px;
    // background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
    border-radius: 2px;
    margin-right: 10px;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
}

.control-items {
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
  z-index: 1;
  height: calc(100% - 35px);
}

.control-item {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;

  .item-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 3px;
  }

  .item-subtitle {
    font-size: 9px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;
  }

  .progress-container {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    flex: 1;
    align-items: center;
  }

  .circular-progress {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #00ffff 0deg,
      #0080ff calc(var(--progress) * 3.6),
      rgba(255, 255, 255, 0.1) calc(var(--progress) * 3.6),
      rgba(255, 255, 255, 0.1) 360deg
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%);
      border-radius: 50%;
    }

    &.yellow {
      background: conic-gradient(
        from 0deg,
        #ffaa00 0deg,
        #ff6600 calc(var(--progress) * 3.6),
        rgba(255, 255, 255, 0.1) calc(var(--progress) * 3.6),
        rgba(255, 255, 255, 0.1) 360deg
      );

      &::before {
        background: linear-gradient(135deg, rgba(255, 170, 0, 0.1) 0%, rgba(255, 102, 0, 0.1) 100%);
      }
    }

    .progress-value {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      z-index: 1;
      font-family: 'TWIG', monospace;
    }
  }

  .item-details {
    .detail-row {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      margin-bottom: 2px;

      .label {
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        color: #ffffff;
        font-family: 'TWIG', monospace;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .industry-control {
    padding: 16px;
  }

  .control-item {
    .circular-progress {
      width: 80px;
      height: 80px;

      &::before {
        width: 60px;
        height: 60px;
      }

      .progress-value {
        font-size: 16px;
      }
    }
  }
}
</style> 