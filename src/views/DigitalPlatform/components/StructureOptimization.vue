<template>
  <div class="structure-optimization">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>结构优化</span>
    </div>
    
    <div class="optimization-items">
      <div class="item">
        <div class="item-header">
          <span class="category">威胁、数科、能源等优化</span>
          <span class="status positive">自主可控</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 51.9%"></div>
          <span class="progress-text">51.9%</span>
        </div>
        <div class="item-footer">
          <span class="label">占集团外营业收入比例</span>
          <span class="target">目标值</span>
          <span class="value">47.7%</span>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">同方威视</div>
          <div class="metric-value">9.47<span class="unit">亿元</span></div>
          <div class="metric-bar">
            <div class="bar-fill" style="width: 65%"></div>
          </div>
        </div>

        <div class="metric-item">
          <div class="metric-label">同方数科</div>
          <div class="metric-value">1.24<span class="unit">亿元</span></div>
          <div class="metric-bar">
            <div class="bar-fill" style="width: 35%"></div>
          </div>
        </div>

        <div class="metric-item">
          <div class="metric-label">同方能源</div>
          <div class="metric-value">4.38<span class="unit">亿元</span></div>
          <div class="metric-bar">
            <div class="bar-fill" style="width: 55%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StructureOptimization'
}
</script>

<style scoped lang="scss">
.structure-optimization {
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="lines" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 0 20 L 20 0" stroke="rgba(0,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23lines)"/></svg>');
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
    background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
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

.optimization-items {
  position: relative;
  z-index: 1;
  height: calc(100% - 35px);
}

.item {
  margin-bottom: 10px;

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .category {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.8);
    }

    .status {
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9px;
      
      &.positive {
        background: rgba(0, 255, 0, 0.2);
        color: #00ff00;
        border: 1px solid rgba(0, 255, 0, 0.3);
      }
    }
  }

  .progress-bar {
    position: relative;
    height: 5px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin-bottom: 5px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #00ffff 0%, #0080ff 100%);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .progress-text {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 9px;
      color: #ffffff;
      font-family: 'TWIG', monospace;
    }
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;

    .label {
      color: rgba(255, 255, 255, 0.6);
    }

    .target {
      color: rgba(255, 255, 255, 0.6);
    }

    .value {
      color: #ffffff;
      font-family: 'TWIG', monospace;
    }
  }
}

.metrics-grid {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.metric-item {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  padding: 6px;
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
  }

  .metric-label {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 4px;
    text-align: center;
  }

  .metric-value {
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 4px;
    font-family: 'TWIG', monospace;
    text-align: center;

    .unit {
      font-size: 8px;
      color: rgba(255, 255, 255, 0.6);
      margin-left: 2px;
    }
  }

  .metric-bar {
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00ffff 0%, #0080ff 100%);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .structure-optimization {
    padding: 16px;
  }

  .metric-item {
    padding: 10px;

    .metric-value {
      font-size: 18px;
    }
  }
}
</style> 