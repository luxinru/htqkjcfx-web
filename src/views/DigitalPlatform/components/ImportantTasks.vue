<template>
  <div class="important-tasks">
    <div class="section-title">
      <div class="title-icon"></div>
      <span>重点任务</span>
    </div>
    
    <div class="tasks-chart">
      <div ref="barChart" class="bar-chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ImportantTasks',
  mounted() {
    this.initBarChart()
  },
  methods: {
    initBarChart() {
      const chart = echarts.init(this.$refs.barChart)
      
      const option = {
        grid: {
          top: 20,
          left: 40,
          right: 20,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          data: ['总数', '正常', '滞后', '需要关注'],
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          max: 50,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        series: [{
          type: 'bar',
          data: [
            { value: 40, itemStyle: { color: '#FFB74D' } },
            { value: 32, itemStyle: { color: '#4FC3F7' } },
            { value: 27, itemStyle: { color: '#FF7043' } },
            { value: 2, itemStyle: { color: '#81C784' } },
            { value: 1, itemStyle: { color: '#9575CD' } }
          ],
          barWidth: '60%',
          label: {
            show: true,
            position: 'top',
            color: '#ffffff',
            fontSize: 12,
            fontFamily: 'TWIG'
          }
        }]
      }
      
      chart.setOption(option)
      
      // 响应式
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.important-tasks {
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="tasks" width="15" height="15" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="11" height="11" fill="none" stroke="rgba(0,255,255,0.03)" stroke-width="0.5"/><circle cx="7.5" cy="7.5" r="1" fill="rgba(0,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23tasks)"/></svg>');
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

.tasks-chart {
  height: calc(100% - 50px);
  min-height: 120px;
  position: relative;
  z-index: 1;

  .bar-chart {
    width: 100%;
    height: 100%;
  }
}

// 响应式设计
@media (max-width: 1600px) {
  .important-tasks {
    padding: 12px;
    min-height: 160px;
  }

  .tasks-chart {
    min-height: 100px;
  }
}

@media (max-width: 1366px) {
  .important-tasks {
    padding: 10px;
    min-height: 140px;
  }

  .tasks-chart {
    min-height: 90px;
  }
}

@media (max-width: 1024px) {
  .important-tasks {
    min-height: 200px;
  }

  .tasks-chart {
    min-height: 150px;
  }
}
</style> 