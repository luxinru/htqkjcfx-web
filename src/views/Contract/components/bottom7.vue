<template>
  <div class="bottom7">
    <section class="table">
      <div class="tbody-scroll">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>地区</th>
              <th>合同总金额(含税)</th>
              <th>合同总金额占比</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                <img
                  v-if="index === 0"
                  src="~@/assets/img/contract/icon14.png"
                  alt=""
                />
                <img
                  v-else-if="index === 1"
                  src="~@/assets/img/contract/icon15.png"
                  alt=""
                />
                <img
                  v-else-if="index === 2"
                  src="~@/assets/img/contract/icon16.png"
                  alt=""
                />
                <span v-else>{{ index + 1 }}</span>
              </td>
              <td>
                {{ item.khmc }}
              </td>
              <td>
                {{ formatNumber(item.htzje) }}
              </td>
              <td>{{ item.htzjezb }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="handlePageChange(1)"
        >
          首页
        </button>
        <button
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          &lt;
        </button>
        <span
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="handlePageChange(page)"
          >{{ page }}</span
        >
        <button
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          &gt;
        </button>
        <button
          class="btn"
          :disabled="currentPage === totalPages"
          @click="handlePageChange(totalPages)"
        >
          末页
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/new/contract";
export default {
  name: "bottom7",

  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      tableData: [],
      totalAmount: 0
    };
  },

  async mounted() {
    this.init();
  },

  methods: {
    async init() {
      const res = await api.queryKhgxdfxList({
        dwbm: "6B51EA03CC8C4168876E3EA97A29B15E",
        time: "2024-11",
        pageNum: this.currentPage,
        pageSize: this.pageSize
      });

      console.error(res);

      this.tableData = res.list || [];
      this.total = res.total || 0;
      this.totalPages = res.pages || 0;
      this.calculateTotalAmount();
    },

    calculateTotalAmount() {
      this.totalAmount = this.tableData.reduce(
        (sum, item) => sum + item.htje,
        0
      );
    },

    calculatePercentage(amount) {
      if (!this.totalAmount) return "0.00";
      return ((amount / this.totalAmount) * 100).toFixed(2);
    },

    formatNumber(num) {
      if (num === undefined || num === null) return '0';
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async handlePageChange(page) {
      this.currentPage = page;
      await this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom7 {
  width: 100%;
  height: 100%;
  padding: 16px 0 16px 16px;
  box-sizing: border-box;
  overflow: hidden;

  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;

    .tbody-scroll {
      flex: 1 1 0%;
      overflow-y: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        width: 100%;
        height: 40px;
        border: 1px solid #0069ca;
        background: rgba(0, 80, 144, 0.6);
        tr {
          th {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
          }
        }
      }

      tbody {
        tr {
          height: 40px;
          background: linear-gradient(
            0,
            rgba(0, 66, 119, 0.6) 0%,
            rgba(12, 43, 75, 0.6) 100%
          );
          border: 1px solid #707070;
          td {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
          }

          &:hover {
            background: linear-gradient(
              0,
              rgba(0, 105, 202, 0.8) 0%,
              rgba(0, 105, 202, 0) 50%,
              rgba(0, 105, 202, 0) 100%
            );
            cursor: pointer;

            td {
              color: #fff;
            }
          }
        }
      }
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      flex-shrink: 0;
      margin-top: 8px;

      .btn {
        width: 60px;
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
}
</style>
