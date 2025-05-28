<template>
  <div class="business-indicators">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>经营指标</span>
    </div>
    
    <div class="indicators-grid">
      <!-- EVA指标 -->
      <div class="indicator-card eva-card">
        <div class="card-header">
          <div class="icon eva-icon"></div>
          <div class="eva-content">
            <span class="label">EVA</span>
            <div class="value">153.24 <span class="unit">亿元</span></div>
          </div>
        </div>
         <div class="eva-value">年度计划值：255.47 <span class="unit">亿元</span></div>
        <div class="progress-container">
          <div class="progress-circle" :style="{ '--progress': '75%' }">
            <span class="progress-text">75%</span>
            <span class="progress-label">计划完成率</span>
          </div>
        </div>
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">年度计划值：</span>
            <span class="detail-value">255.47亿元</span>
          </div>
        </div>
      </div>

      <!-- 科技投入指标 -->
      <div class="indicator-card tech-card">
        <div class="card-header">
          <div class="icon tech-icon"></div>
          <span class="label">科技投入</span>
        </div>
        <div class="value">85.36 <span class="unit">亿元</span></div>
        <div class="progress-container">
          <div class="progress-circle" :style="{ '--progress': '85%' }">
            <span class="progress-text">85%</span>
            <span class="progress-label">计划完成率</span>
          </div>
        </div>
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">年度计划值：</span>
            <span class="detail-value">94.237亿元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessIndicators'
}
</script>

<style scoped lang="scss">
.business-indicators {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  // border: 1px solid rgba(0, 255, 255, 0.2);
  // border-radius: 12px;
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="0.5" fill="rgba(0,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    pointer-events: none;
    border-radius: 12px;
  }
}

.section-title {
  width: 100%;
  // height: 34px;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  position: relative;
  z-index: 1;
  background: url('/images/titleBg.png') no-repeat;
  background-size: 100% 100%;
  // padding: 8px 12px;
  border-radius: 6px;

  .title-icon {
    width: 4px;
    height: 16px;
    background: linear-gradient(180deg, #00ffff 0%, #0080ff 100%);
    border-radius: 2px;
    margin-right: 10px;
    opacity: 0;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
    margin-left: 15px;
    margin-bottom: 5px;
  }
}

.indicators-grid {
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
  z-index: 1;
  height: calc(100% - 35px);
  background: url('/images/kuangBg.png') no-repeat;
  background-size: 100% 100%;
}

.eva-card .card-header{
  background: url('/images/zhibao_bg.png') no-repeat;
  background-size: 100% 100%;
}
.tech-card .card-header{
  background: url('/images/right_qz2.png') no-repeat;
  background-size: 100% 100%;
}

.indicator-card {
  // background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  // border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
  flex: 1;
  min-height: auto;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  }
  
  
  .card-header {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    width: 204px;
    height: 69px;
    .eva-content{
      margin-left: 25px;
    }

    .icon {
      width: 23px;
      height: 24px;
      border-radius: 4px;
      margin-left: 16px;
      margin-top: -10px;
      // margin-right: 6px;
      position: relative;

      &.eva-icon {
        background: url('/images/zhibiao1.png') no-repeat;
        background-size: 100% 100%;
      }
    }

    .label {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .eva-value{
    font-size: 13px;
    color: #42c6fa;
    margin-bottom: 6px;
    font-family: 'TWIG', monospace;
    margin-left: 10px;
  }
  .value {
 
    font-size: 16px;
    font-weight: bold;
    color: #0acddb;
    margin-bottom: 6px;
    font-family: 'TWIG', monospace;

    .unit {
      font-size: 9px;
      color: rgba(255, 255, 255, 0.6);
      margin-left: 4px;
    }
  }

  .progress-container {
    display: flex;
    justify-content: center;
    margin-bottom: 6px;
    flex: 1;
    align-items: center;
  }

  .progress-circle {
    width: 45px;
    height: 45px;
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
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%);
      border-radius: 50%;
    }

    .progress-text {
      font-size: 10px;
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

  .details {
    .detail-item {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      margin-bottom: 2px;

      .detail-label {
        color: rgba(255, 255, 255, 0.6);
      }

      .detail-value {
        color: #ffffff;
        font-family: 'TWIG', monospace;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .business-indicators {
    padding: 12px;
    min-height: 260px;
  }

  .indicators-grid {
    gap: 12px;
  }

  .indicator-card {
    padding: 10px;

    .value {
      font-size: 20px;
    }

    .progress-circle {
      width: 60px;
      height: 60px;

      &::before {
        width: 45px;
        height: 45px;
      }

      .progress-text {
        font-size: 12px;
      }
    }
  }
}

@media (max-width: 1366px) {
  .business-indicators {
    padding: 10px;
    min-height: 240px;
  }

  .indicators-grid {
    gap: 10px;
  }

  .indicator-card {
    padding: 8px;

    .value {
      font-size: 18px;
    }

    .progress-circle {
      width: 55px;
      height: 55px;

      &::before {
        width: 40px;
        height: 40px;
      }

      .progress-text {
        font-size: 11px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .business-indicators {
    min-height: 200px;
  }

  .indicators-grid {
    flex-direction: row;
    gap: 8px;
  }

  .indicator-card {
    flex: 1;
  }
}
</style> 