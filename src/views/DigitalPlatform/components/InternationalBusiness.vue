<template>
  <div class="international-business">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>国际化经营</span>
    </div>
    
    <div class="business-metrics">
      <div class="metric-card">
        <div class="card-icon revenue-icon"></div>
        <div class="card-content">
          <div class="card-title">营业收入</div>
          <div class="card-value">20.24 <span class="unit">亿元</span></div>
          <div class="card-details">
            <div class="detail-item">
              <span class="label">年度计划值：</span>
              <span class="value">35.47亿元</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-circle" :style="{ '--progress': '76%' }">
              <span class="progress-text">76%</span>
              <span class="progress-label">计划完成率</span>
            </div>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="card-icon contract-icon"></div>
        <div class="card-content">
          <div class="card-title">新签合同额</div>
          <div class="card-value">25.24 <span class="unit">亿元</span></div>
          <div class="card-details">
            <div class="detail-item">
              <span class="label">年度计划值：</span>
              <span class="value">40.47亿元</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-circle" :style="{ '--progress': '85%' }">
              <span class="progress-text">85%</span>
              <span class="progress-label">计划完成率</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternationalBusiness'
}
</script>

<style scoped lang="scss">
.international-business {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 15px;
  backdrop-filter: blur(10px);
  position: relative;
  flex: 1;
  min-height: 180px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="world" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="1"/><path d="M7,15 Q15,7 23,15 Q15,23 7,15" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23world)"/></svg>');
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

.business-metrics {
  display: flex;
  gap: 15px;
  position: relative;
  z-index: 1;
  height: calc(100% - 50px);
}

.metric-card {
  flex: 1;
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

  .card-icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    position: relative;
    flex-shrink: 0;

    &.revenue-icon {
      background: linear-gradient(135deg, #00ffff 0%, #0080ff 100%);
      
      &::before {
        content: '💰';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
      }
    }

    &.contract-icon {
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      
      &::before {
        content: '📄';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
      }
    }
  }

  .card-content {
    flex: 1;

    .card-title {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 6px;
    }

    .card-value {
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 6px;
      font-family: 'TWIG', monospace;

      .unit {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 4px;
      }
    }

    .card-details {
      margin-bottom: 10px;

      .detail-item {
        display: flex;
        justify-content: space-between;
        font-size: 10px;

        .label {
          color: rgba(255, 255, 255, 0.6);
        }

        .value {
          color: #ffffff;
          font-family: 'TWIG', monospace;
        }
      }
    }

    .progress-container {
      display: flex;
      justify-content: center;
    }

    .progress-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        #00ffff 0deg,
        #0080ff calc(var(--progress) * 3.6),
        rgba(255, 255, 255, 0.1) calc(var(--progress) * 3.6),
        rgba(255, 255, 255, 0.1) 360deg
      );
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%);
        border-radius: 50%;
      }

      .progress-text {
        font-size: 11px;
        font-weight: bold;
        color: #ffffff;
        z-index: 1;
        font-family: 'TWIG', monospace;
      }

      .progress-label {
        font-size: 7px;
        color: rgba(255, 255, 255, 0.6);
        z-index: 1;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .international-business {
    padding: 12px;
    min-height: 160px;
  }

  .business-metrics {
    gap: 12px;
  }

  .metric-card {
    padding: 10px;

    .card-icon {
      width: 32px;
      height: 32px;

      &::before {
        font-size: 14px;
      }
    }

    .card-content {
      .card-value {
        font-size: 16px;
      }

      .progress-circle {
        width: 45px;
        height: 45px;

        &::before {
          width: 34px;
          height: 34px;
        }

        .progress-text {
          font-size: 10px;
        }

        .progress-label {
          font-size: 6px;
        }
      }
    }
  }
}

@media (max-width: 1366px) {
  .international-business {
    padding: 10px;
    min-height: 140px;
  }

  .business-metrics {
    gap: 10px;
  }

  .metric-card {
    padding: 8px;

    .card-content {
      .card-value {
        font-size: 14px;
      }

      .progress-circle {
        width: 40px;
        height: 40px;

        &::before {
          width: 30px;
          height: 30px;
        }

        .progress-text {
          font-size: 9px;
        }

        .progress-label {
          font-size: 5px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .business-metrics {
    flex-direction: column;
    gap: 8px;
  }

  .metric-card {
    flex-direction: row;
  }
}
</style> 