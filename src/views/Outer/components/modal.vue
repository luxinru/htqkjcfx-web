<template>
  <div v-show="show" class="modal">
    <div class="modal-content">
      <img
        class="close"
        src="@/assets/img/outer/close.png"
        alt=""
        @click="closeModal"
      />
      <section class="tabs">
        <div :class="{ active: active === 0 }" @click="active = 0">
          总数
        </div>
        <div :class="{ active: active === 1 }" @click="active = 1">
          正常
        </div>
        <div :class="{ active: active === 2 }" @click="active = 2">
          滞后
        </div>
        <div :class="{ active: active === 3 }" @click="active = 3">
          需要关注
        </div>
      </section>

      <section class="table">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>指标名称</th>
              <th>行动计划</th>
              <th>目标节点数</th>
              <th>完成节点数</th>
              <th>目标值</th>
              <th>同步归口部门</th>
              <th>本月工作进展</th>
              <th>累计工作进展</th>
              <th>是否存在偏差</th>
              <th>
                全年预测完成情况<br />
                <p>
                  (如有偏差请说明调整措施)
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, idx) in tableData"
              :key="row.id"
              :class="{ selected: idx === selectedRow }"
              @click="selectedRow = idx"
            >
              <td>{{ row.serial }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.plan }}</td>
              <td>{{ row.target }}</td>
              <td>{{ row.done }}</td>
              <td>{{ row.targetValue }}</td>
              <td>{{ row.dept }}</td>
              <td>{{ row.progressMonth }}</td>
              <td>{{ row.progressTotal }}</td>
              <td>{{ row.deviation }}</td>
              <td>{{ row.forecast }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button
            class="btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            首页
          </button>
          <button :disabled="currentPage === 1" @click="currentPage--">
            &lt;
          </button>
          <span
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }"
            @click="currentPage = page"
            >{{ page }}</span
          >
          <button :disabled="currentPage === totalPages" @click="currentPage++">
            &gt;
          </button>
          <button
            class="btn"
            :disabled="currentPage === totalPages"
            @click="currentPage = totalPages"
          >
            末页
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      active: 0,
      selectedRow: null,
      currentPage: 1,
      totalPages: 10,
      pageSize: 5,
      tableData: [
        {
          id: 1,
          serial: "D2-01",
          name: "数字化转型",
          plan: "数字化转型基础能力建设",
          target: 3,
          done: 2,
          targetValue: "1.数字化转型基础能力建设...(省略)",
          dept: "科教部",
          progressMonth: "(1) 已经按计划100%完成试点工作...(省略)",
          progressTotal: "(1) 已经按计划100%完成试点工作...(省略)",
          deviation: "否",
          forecast: ""
        },
        {
          id: 2,
          serial: "",
          name: "产业数字化建设",
          plan: "",
          target: "",
          done: "",
          targetValue: "2.产业数字化建设",
          dept: "科教部",
          progressMonth: "",
          progressTotal: "",
          deviation: "",
          forecast: ""
        },
        {
          id: 3,
          serial: "",
          name: "核心工业软件研发与应用",
          plan: "核心工业软件研发与应用",
          target: 2,
          done: 2,
          targetValue: "3.核心工业软件研发与应用",
          dept: "科教部",
          progressMonth: "",
          progressTotal: "",
          deviation: "",
          forecast: ""
        },
        {
          id: 4,
          serial: "D2-11",
          name: "ERP平台建设",
          plan: "ERP平台建设",
          target: 2,
          done: 2,
          targetValue: "按集团公司ERP建设",
          dept: "科教部",
          progressMonth: "",
          progressTotal: "",
          deviation: "",
          forecast: ""
        },
        {
          id: 5,
          serial: "D2-12",
          name: "司库建设",
          plan: "司库建设",
          target: 4,
          done: 1,
          targetValue: '1.按要求完成"司库建设"',
          dept: "科教部",
          progressMonth: '1.按要求完成"司库"',
          progressTotal: '1.按要求完成"司库"',
          deviation: "否",
          forecast: ""
        },
        {
          id: 6,
          serial: "D2-13",
          name: "司库建设",
          plan: "司库建设",
          target: 4,
          done: 3,
          targetValue: "3按集团公司",
          dept: "科教部",
          progressMonth: "",
          progressTotal: "3按集团公司",
          deviation: "否",
          forecast: ""
        }
      ]
    };
  },

  methods: {
    closeModal() {
      this.$emit("close", false);
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  width: 1711px;
  height: 850px;
  background: url("~@/assets/img/outer/modal_bg.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 80px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 24px;
    right: 16px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .tabs {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;

    div {
      width: 140px;
      height: 34px;
      background: #004277;
      border-radius: 5px;
      border: 1px solid #005090;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #6bd8ff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #005090;
        transform: translateY(-2px);
      }
    }

    .active {
      background: url("~@/assets/img/outer/btn_active.png") no-repeat center
        center;
      background-size: 100% 100%;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 82, 144, 0.3);
    }
  }

  .table {
    /* 移除 position: relative; */
  }

  .pagination {
    position: absolute;
    right: 32px;
    bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    .btn {
      width: 60px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    margin-top: 24px;
    /* 移除 padding-bottom */
  }

  thead {
    /* 移除 display: flex 等 */
  }

  thead tr {
    /* 移除 display: flex 等 */
    background: rgba(0, 80, 144, 1);
  }

  thead th {
    font-weight: bold;
    font-size: 16px;
    color: #6bd8ff;
    padding: 0 6px;
  }

  thead th:not(:last-child) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tbody tr.selected {
    background: linear-gradient(90deg, #0e5b8c 0%, #1e90ff 100%);
    color: #fff;
  }

  tbody tr:hover:not(.selected) {
    background: rgba(30, 144, 255, 0.15);
  }

  td {
    font-size: 15px;
    color: #bfeaff;
    background: rgba(0, 66, 119, 0.5);
    border: 1px solid #0069ca;
    padding: 8px 6px;
    text-align: center;
  }

  th {
    border: 1px solid #0069ca;

    p {
      font-size: 14px;
    }
  }

  .pagination button {
    background: #00345a;
    color: #6bd8ff;
    border: 1px solid #1e4c7a;
    border-radius: 3px;
    width: 28px;
    height: 28px;
    margin: 0 2px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .pagination button:disabled {
    background: #1a2a3a;
    color: #4a7ca7;
    cursor: not-allowed;
  }

  .pagination span {
    display: inline-block;
    width: 28px;
    height: 28px;
    text-align: center;
    color: #6bd8ff;
    font-size: 15px;
    margin: 0 2px;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    border: 1px solid #0069ca;
    background: #003b6b;
    line-height: 28px;
  }

  .pagination span.active {
    background: #00bbff;
    color: #fff;
  }
}
</style>
