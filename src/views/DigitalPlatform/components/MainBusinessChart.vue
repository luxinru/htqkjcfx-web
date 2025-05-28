<template>
  <div class="main-business-chart">
    <!-- 顶部业务卡片 -->
    <div class="business-cards">
      <div class="business-card">
        <div class="card-icon revenue-icon"></div>
        <div class="card-content">
          <div class="card-title">集团外营业收入</div>
          <div class="card-value">50.24 <span class="unit">亿元</span></div>
          <div class="card-details">
            <div class="detail-item">
              <span class="label">同比增幅：</span>
              <span class="value positive">15.47亿元 ↑ 3.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">计划完成率</span>
              <span class="value">72.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">年度计划值：</span>
              <span class="value">50.47亿元</span>
            </div>
          </div>
        </div>
      </div>

      <div class="business-card">
        <div class="card-icon profit-icon"></div>
        <div class="card-content">
          <div class="card-title">营业利润</div>
          <div class="card-value negative">-2.24 <span class="unit">亿元</span></div>
          <div class="card-details">
            <div class="detail-item">
              <span class="label">同比增幅：</span>
              <span class="value positive">1.47亿元 ↑ 3.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">计划完成率</span>
              <span class="value">72.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">年度计划值：</span>
              <span class="value">-5.47亿元</span>
            </div>
          </div>
        </div>
      </div>

      <div class="business-card">
        <div class="card-icon contract-icon"></div>
        <div class="card-content">
          <div class="card-title">集团外新签合同</div>
          <div class="card-value">69.24 <span class="unit">亿元</span></div>
          <div class="card-details">
            <div class="detail-item">
              <span class="label">同比增幅：</span>
              <span class="value positive">255.47亿元 ↑ 3.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">计划完成率</span>
              <span class="value">72.4%</span>
            </div>
            <div class="detail-item">
              <span class="label">年度计划值：</span>
              <span class="value">255.47亿元</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 中央饼图 -->
    <div class="chart-container">
      <div class="chart-title">主要单位集团外营业收入占比</div>
      <div class="pie-chart-wrapper">
        <div ref="pieChart" class="pie-chart"></div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color" style="background: radial-gradient(circle at 30% 30%, #81D4FA 0%, #4FC3F7 40%, #29B6F6 80%, #0288D1 100%); box-shadow: 0 2px 8px rgba(79, 195, 247, 0.3);"></div>
            <span class="legend-label">中核医疗 60.71亿元</span>
            <span class="legend-percent">43%</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: radial-gradient(circle at 30% 30%, #FFAB91 0%, #FF7043 40%, #FF5722 80%, #D84315 100%); box-shadow: 0 2px 8px rgba(255, 112, 67, 0.3);"></div>
            <span class="legend-label">技术应用 45.7亿元</span>
            <span class="legend-percent">16%</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: radial-gradient(circle at 30% 30%, #FFCC80 0%, #FFB74D 40%, #FFA726 80%, #F57C00 100%); box-shadow: 0 2px 8px rgba(255, 183, 77, 0.3);"></div>
            <span class="legend-label">其他 24.6亿元</span>
            <span class="legend-percent">14%</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: radial-gradient(circle at 30% 30%, #A5D6A7 0%, #81C784 40%, #66BB6A 80%, #388E3C 100%); box-shadow: 0 2px 8px rgba(129, 199, 132, 0.3);"></div>
            <span class="legend-label">数字医疗 21.7亿元</span>
            <span class="legend-percent">10%</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: radial-gradient(circle at 30% 30%, #B39DDB 0%, #9575CD 40%, #7E57C2 80%, #5E35B1 100%); box-shadow: 0 2px 8px rgba(149, 117, 205, 0.3);"></div>
            <span class="legend-label">同方能源 30.5亿元</span>
            <span class="legend-percent">17%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'

export default {
  name: 'MainBusinessChart',
  mounted() {
    // 延迟初始化，确保DOM已经渲染完成
    this.$nextTick(() => {
      setTimeout(() => {
        this.initPieChart()
      }, 100)
    })
  },
  methods: {
    initPieChart() {
      const chartDom = this.$refs.pieChart
      if (!chartDom || chartDom.clientWidth === 0 || chartDom.clientHeight === 0) {
        console.warn('Chart container not ready, retrying...')
        setTimeout(() => {
          this.initPieChart()
        }, 200)
        return
      }

      const chart = echarts.init(chartDom)
      
      const option = {
        backgroundColor: 'transparent',
        // 使用普通饼图配置，通过样式实现3D效果
        series: [{
          type: 'pie',
          radius: ['35%', '75%'],
          center: ['50%', '45%'],
          // 数据
          data: [
            {
              name: '中核医疗',
              value: 43,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#81D4FA' },
                  { offset: 0.3, color: '#4FC3F7' },
                  { offset: 0.7, color: '#29B6F6' },
                  { offset: 1, color: '#0288D1' }
                ]),
                borderRadius: 8,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                // 使用阴影创建3D效果
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: -3,
                shadowOffsetY: 15
              }
            },
            {
              name: '同方能源',
              value: 17,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#B39DDB' },
                  { offset: 0.3, color: '#9575CD' },
                  { offset: 0.7, color: '#7E57C2' },
                  { offset: 1, color: '#5E35B1' }
                ]),
                borderRadius: 8,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: -3,
                shadowOffsetY: 15
              }
            },
            {
              name: '技术应用',
              value: 16,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#FFAB91' },
                  { offset: 0.3, color: '#FF7043' },
                  { offset: 0.7, color: '#FF5722' },
                  { offset: 1, color: '#D84315' }
                ]),
                borderRadius: 8,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: -3,
                shadowOffsetY: 15
              }
            },
            {
              name: '其他',
              value: 14,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#FFCC80' },
                  { offset: 0.3, color: '#FFB74D' },
                  { offset: 0.7, color: '#FFA726' },
                  { offset: 1, color: '#F57C00' }
                ]),
                borderRadius: 8,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: -3,
                shadowOffsetY: 15
              }
            },
            {
              name: '数字医疗',
              value: 10,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#A5D6A7' },
                  { offset: 0.3, color: '#81C784' },
                  { offset: 0.7, color: '#66BB6A' },
                  { offset: 1, color: '#388E3C' }
                ]),
                borderRadius: 8,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: -3,
                shadowOffsetY: 15
              }
            }
          ],
          // 标签
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          // 高亮效果
          emphasis: {
            itemStyle: {
              shadowBlur: 40,
              shadowOffsetX: -5,
              shadowOffsetY: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              borderWidth: 3,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              scale: 1.05
            },
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#ffffff',
              formatter: '{b}\n{c}%',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 5,
              textShadowOffsetX: 2,
              textShadowOffsetY: 2
            }
          },
          // 动画
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return idx * 150;
          },
          animationDuration: 1200,
          // 选中效果
          selectedMode: 'single',
          selectedOffset: 15
        }],
        // 提示框
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 255, 255, 0.5)',
          borderWidth: 1,
          borderRadius: 8,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          formatter: function(params) {
            const amounts = {
              '中核医疗': '60.71',
              '同方能源': '30.5',
              '技术应用': '45.7',
              '其他': '24.6',
              '数字医疗': '21.7'
            }
            return `<b>${params.name}</b><br/>占比: ${params.value}%<br/>金额: ${amounts[params.name]}亿元`
          }
        }
      }
      
      chart.setOption(option)
      
      // 保存图表实例
      this.chart = chart
      
      // 响应式
      window.addEventListener('resize', () => {
        if (this.chart) {
          this.chart.resize()
        }
      })
    }
  },
  beforeDestroy() {
    // 清理图表实例
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
.main-business-chart {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 2;
}

.business-cards {
  display: flex;
  gap: 15px;
  height: 140px;
  flex-shrink: 0;
}

.business-card {
  flex: 1;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 128, 255, 0.08) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="circuit" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M10,10 L40,10 L40,40 L10,40 Z" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="1"/><circle cx="25" cy="25" r="2" fill="rgba(0,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23circuit)"/></svg>');
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.15);
  }

  .card-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    position: relative;
    flex-shrink: 0;
    z-index: 1;

    &.revenue-icon {
      background: linear-gradient(135deg, #00ffff 0%, #0080ff 100%);
      
      &::before {
        content: '¥';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
      }
    }

    &.profit-icon {
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
      
      &::before {
        content: '📊';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
      }
    }

    &.contract-icon {
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      
      &::before {
        content: '📋';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
      }
    }
  }

  .card-content {
    flex: 1;
    z-index: 1;

    .card-title {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 8px;
    }

    .card-value {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 12px;
      font-family: 'TWIG', monospace;

      &.negative {
        color: #ff6b6b;
      }

      .unit {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 4px;
      }
    }

    .card-details {
      .detail-item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 4px;

        .label {
          color: rgba(255, 255, 255, 0.6);
        }

        .value {
          color: #ffffff;
          font-family: 'TWIG', monospace;

          &.positive {
            color: #4ecdc4;
          }
        }
      }
    }
  }
}

.chart-container {
  flex: 1;
  min-height: 300px;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="radar" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="12.5" cy="12.5" r="10" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="0.5"/><line x1="12.5" y1="2.5" x2="12.5" y2="22.5" stroke="rgba(0,255,255,0.03)" stroke-width="0.5"/><line x1="2.5" y1="12.5" x2="22.5" y2="12.5" stroke="rgba(0,255,255,0.03)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23radar)"/></svg>');
    pointer-events: none;
    border-radius: 12px;
  }

  .chart-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  .pie-chart-wrapper {
    display: flex;
    align-items: center;
    gap: 30px;
    flex: 1;
    position: relative;
    z-index: 1;

    .pie-chart {
      width: 280px;
      height: 280px;
      flex-shrink: 0;
      position: relative;
      
      // 添加3D透视效果
      perspective: 1000px;
      perspective-origin: 50% 30%;
      
      // ECharts容器的3D变换
      > div {
        transform: rotateX(15deg) rotateY(-5deg);
        transform-origin: center center;
        transform-style: preserve-3d;
        // 添加阴影增强立体感
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
      }
      
      // 为Highcharts容器添加基础样式
      .highcharts-container {
        border-radius: 8px;
      }
      
      // 添加容器发光效果
      &::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
      }
      
      // 添加顶部高光效果
      &::after {
        content: '';
        position: absolute;
        top: 15%;
        left: 25%;
        width: 30%;
        height: 20%;
        background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        // 配合整体的3D角度
        transform: rotateX(-10deg) rotateY(3deg);
      }
    }

    .chart-legend {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: center;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .legend-label {
          flex: 1;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .legend-percent {
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          font-family: 'TWIG', monospace;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .business-cards {
    height: 120px;
    gap: 12px;
  }

  .business-card {
    padding: 12px;

    .card-icon {
      width: 36px;
      height: 36px;

      &::before {
        font-size: 16px;
      }
    }

    .card-content {
      .card-value {
        font-size: 18px;
      }
    }
  }

  .chart-container {
    padding: 15px;
    min-height: 250px;
    
    .pie-chart-wrapper {
      gap: 20px;
      
      .pie-chart {
        width: 220px;
        height: 220px;
      }
    }
  }
}

@media (max-width: 1366px) {
  .business-cards {
    height: 100px;
    gap: 10px;
  }

  .business-card {
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
    }
  }

  .chart-container {
    padding: 12px;
    min-height: 200px;
    
    .pie-chart-wrapper {
      gap: 15px;
      
      .pie-chart {
        width: 180px;
        height: 180px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .business-cards {
    flex-direction: column;
    height: auto;
    gap: 8px;
  }

  .business-card {
    height: 80px;
    padding: 8px;
  }

  .chart-container {
    min-height: 300px;
    
    .pie-chart-wrapper {
      flex-direction: column;
      gap: 15px;

      .pie-chart {
        width: 200px;
        height: 200px;
      }

      .chart-legend {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
    }
  }
}
</style> 