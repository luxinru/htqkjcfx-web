<template>
  <div class="key-indicators">
    <!-- 时间选择器 -->
    <div class="time-selector">
      <div class="selector-label">截止时间：</div>
      <div class="time-controls">
        <el-select v-model="selectedYear" size="mini" style="width: 80px;">
          <el-option label="2025" value="2025"></el-option>
          <el-option label="2024" value="2024"></el-option>
        </el-select>
        <span class="time-text">年</span>
        <el-select v-model="selectedMonth" size="mini" style="width: 60px;">
          <el-option label="4" value="4"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="1" value="1"></el-option>
        </el-select>
        <span class="time-text">月</span>
      </div>
    </div>

    <!-- 五率标题 -->
    <div class="section-title">
      <div class="title-icon"></div>
      <span>五率</span>
    </div>

    <!-- 指标卡片 -->
    <div class="indicators-list">
      <div class="indicator-card">
        <div class="card-header">
          <div class="indicator-name">营业收现率</div>
          <div class="indicator-value">14.2%</div>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="label">年度目标值</span>
            <span class="value">72%</span>
          </div>
          <div class="detail-row">
            <span class="label">超年度目标</span>
            <span class="value positive">↑ 15.5%</span>
          </div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="card-header">
          <div class="indicator-name">净资产收益率</div>
          <div class="indicator-value">17.8%</div>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="label">年度目标值</span>
            <span class="value">72%</span>
          </div>
          <div class="detail-row">
            <span class="label">超年度目标</span>
            <span class="value positive">↑ 20.5%</span>
          </div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="card-header">
          <div class="indicator-name">资产负债率</div>
          <div class="indicator-value">17.8%</div>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="label">超年度目标</span>
            <span class="value">1.2个百分点</span>
          </div>
          <div class="detail-row">
            <span class="label">同比</span>
            <span class="value positive">↑ 15.7</span>
          </div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="card-header">
          <div class="indicator-name">研发投入强度</div>
          <div class="indicator-value">17.8%</div>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="label">超年度目标</span>
            <span class="value">1.2个百分点</span>
          </div>
          <div class="detail-row">
            <span class="label">同比</span>
            <span class="value negative">↓ 2.79</span>
          </div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="card-header">
          <div class="indicator-name">全员劳动生产率</div>
          <div class="indicator-value">43<span class="unit">万元/人年</span></div>
        </div>
        <div class="card-details">
          <div class="detail-row">
            <span class="label">年度目标值</span>
            <span class="value">10.1万元/人年</span>
          </div>
          <div class="detail-row">
            <span class="label">年度目标值</span>
            <span class="value">39万元/人年</span>
          </div>
          <div class="detail-row">
            <span class="label">同比</span>
            <span class="value positive">↑ 1.5万元/人年</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyIndicators',
  data() {
    return {
      selectedYear: '2025',
      selectedMonth: '4'
    }
  }
}
</script>

<style scoped lang="scss">
.key-indicators {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.time-selector {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .selector-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
  }

  .time-controls {
    display: flex;
    align-items: center;
    gap: 6px;

    .time-text {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.section-title {
  display: flex;
  align-items: center;

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

.indicators-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.3);
    border-radius: 2px;
  }
}

.indicator-card {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="indicator" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(0,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23indicator)"/></svg>');
    pointer-events: none;
    border-radius: 8px;
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  }

  .card-header {
    margin-bottom: 10px;
    position: relative;
    z-index: 1;

    .indicator-name {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 6px;
    }

    .indicator-value {
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      font-family: 'TWIG', monospace;

      .unit {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 4px;
      }
    }
  }

  .card-details {
    position: relative;
    z-index: 1;

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        color: #ffffff;
        font-family: 'TWIG', monospace;

        &.positive {
          color: #4ecdc4;
        }

        &.negative {
          color: #ff6b6b;
        }
      }
    }
  }
}

// Element UI 样式覆盖
:deep(.el-select) {
  .el-input__inner {
    background: rgba(0, 255, 255, 0.1) !important;
    border: 1px solid rgba(0, 255, 255, 0.3) !important;
    color: #ffffff !important;
    font-size: 12px !important;
  }

  .el-input__suffix {
    .el-select__caret {
      color: rgba(255, 255, 255, 0.6) !important;
    }
  }
}

:deep(.el-select-dropdown) {
  background: rgba(10, 26, 46, 0.95) !important;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;

  .el-select-dropdown__item {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 12px !important;

    &:hover {
      background: rgba(0, 255, 255, 0.1) !important;
    }

    &.selected {
      background: rgba(0, 255, 255, 0.2) !important;
      color: #ffffff !important;
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .key-indicators {
    gap: 12px;
  }

  .time-selector {
    padding: 10px;
  }

  .indicators-list {
    gap: 10px;
  }

  .indicator-card {
    padding: 10px;

    .card-header {
      .indicator-value {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 1366px) {
  .key-indicators {
    gap: 10px;
  }

  .time-selector {
    padding: 8px;
  }

  .indicators-list {
    gap: 8px;
  }

  .indicator-card {
    padding: 8px;

    .card-header {
      .indicator-value {
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .indicators-list {
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: visible;
  }

  .indicator-card {
    min-width: 200px;
    flex: 1;
  }
}
</style> 
</style> 