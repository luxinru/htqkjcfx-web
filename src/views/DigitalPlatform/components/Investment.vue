<template>
  <div class="investment">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>投资</span>
    </div>
    
    <div class="investment-metrics">
      <div class="metric-item">
        <div class="metric-icon fixed-icon"></div>
        <div class="metric-content">
          <div class="metric-label">固投投资金额</div>
          <div class="metric-value">52.91 <span class="unit">亿元</span></div>
          <div class="metric-details">
            <div class="detail-row">
              <span class="label">年度计划值：</span>
              <span class="value">83亿元</span>
            </div>
            <div class="detail-row">
              <span class="label">计划完成率：</span>
              <span class="value">45%</span>
            </div>
          </div>
          <div class="metric-status">
            <div class="status-item">
              <span class="status-label">正常：</span>
              <span class="status-value">5个</span>
            </div>
            <div class="status-item">
              <span class="status-label">滞后：</span>
              <span class="status-value">1个</span>
            </div>
          </div>
        </div>
      </div>

      <div class="metric-item">
        <div class="metric-icon stock-icon"></div>
        <div class="metric-content">
          <div class="metric-label">股投投资金额</div>
          <div class="metric-value">45.91 <span class="unit">亿元</span></div>
          <div class="metric-details">
            <div class="detail-row">
              <span class="label">年度计划值：</span>
              <span class="value">123亿元</span>
            </div>
            <div class="detail-row">
              <span class="label">计划完成率：</span>
              <span class="value">60%</span>
            </div>
          </div>
          <div class="metric-status">
            <div class="status-item">
              <span class="status-label">正常：</span>
              <span class="status-value">5个</span>
            </div>
            <div class="status-item">
              <span class="status-label">滞后：</span>
              <span class="status-value">2个</span>
            </div>
          </div>
        </div>
      </div>

      <div class="projects-summary">
        <div class="summary-title">固投投资项目数</div>
        <div class="summary-value">6 <span class="unit">个</span></div>
        <div class="projects-status">
          <div class="status-item">
            <span class="status-label">正常：</span>
            <span class="status-value">5个</span>
          </div>
          <div class="status-item">
            <span class="status-label">滞后：</span>
            <span class="status-value">1个</span>
          </div>
        </div>
      </div>

      <div class="projects-summary">
        <div class="summary-title">股投投资项目数</div>
        <div class="summary-value">7 <span class="unit">个</span></div>
        <div class="projects-status">
          <div class="status-item">
            <span class="status-label">正常：</span>
            <span class="status-value">5个</span>
          </div>
          <div class="status-item">
            <span class="status-label">滞后：</span>
            <span class="status-value">2个</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Investment'
}
</script>

<style scoped lang="scss">
.investment {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 15px;
  backdrop-filter: blur(10px);
  position: relative;
  flex: 1;
  min-height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="investment" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="10" y="10" width="20" height="20" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="1"/><circle cx="20" cy="20" r="3" fill="rgba(0,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23investment)"/></svg>');
    pointer-events: none;
    border-radius: 12px;
  }
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  .title-icon {
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
    border-radius: 2px;
    margin-right: 12px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
}

.investment-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  position: relative;
  z-index: 1;
  height: calc(100% - 50px);
}

.metric-item {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  }

  .metric-icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    position: relative;
    flex-shrink: 0;

    &.fixed-icon {
      background: linear-gradient(135deg, #00ffff 0%, #0080ff 100%);
      
      &::before {
        content: '🏗️';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
      }
    }

    &.stock-icon {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
      
      &::before {
        content: '📈';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
      }
    }
  }

  .metric-content {
    flex: 1;

    .metric-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 5px;
    }

    .metric-value {
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 6px;
      font-family: 'TWIG', monospace;

      .unit {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 4px;
      }
    }

    .metric-details {
      margin-bottom: 6px;

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

    .metric-status {
      display: flex;
      gap: 6px;

      .status-item {
        font-size: 9px;

        .status-label {
          color: rgba(255, 255, 255, 0.6);
        }

        .status-value {
          color: #ffffff;
          font-family: 'TWIG', monospace;
        }
      }
    }
  }
}

.projects-summary {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  }

  .summary-title {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 6px;
  }

  .summary-value {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 8px;
    font-family: 'TWIG', monospace;

    .unit {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.6);
      margin-left: 4px;
    }
  }

  .projects-status {
    display: flex;
    justify-content: center;
    gap: 8px;

    .status-item {
      font-size: 9px;

      .status-label {
        color: rgba(255, 255, 255, 0.6);
      }

      .status-value {
        color: #ffffff;
        font-family: 'TWIG', monospace;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .investment {
    padding: 12px;
    min-height: 180px;
  }

  .investment-metrics {
    gap: 10px;
  }

  .metric-item {
    padding: 10px;

    .metric-icon {
      width: 30px;
      height: 30px;

      &::before {
        font-size: 14px;
      }
    }

    .metric-content {
      .metric-value {
        font-size: 14px;
      }
    }
  }

  .projects-summary {
    padding: 10px;

    .summary-value {
      font-size: 18px;
    }
  }
}

@media (max-width: 1366px) {
  .investment {
    padding: 10px;
    min-height: 160px;
  }

  .investment-metrics {
    gap: 8px;
  }

  .metric-item {
    padding: 8px;

    .metric-content {
      .metric-value {
        font-size: 12px;
      }
    }
  }

  .projects-summary {
    padding: 8px;

    .summary-value {
      font-size: 16px;
    }
  }
}

@media (max-width: 1024px) {
  .investment-metrics {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style> 