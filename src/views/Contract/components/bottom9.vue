<template>
  <div class="bottom9">
    <section class="table">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>客户价值划分</th>
              <th>客户名称</th>
              <th>粘性</th>
              <th>忠诚度</th>
              <th>贡献度</th>
              <th>R(最近新签合同时间范围/天）</th>
              <th>F(合同签订数量/个)</th>
              <th>M(签订合同总额/万元）</th>
              <th>采取措施参考</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.khTypeName }}</td>
              <td>{{ item.name }}</td>
              <td>
                {{ item.nx }}
                <img
                  v-if="item.nxtb > 0"
                  src="~@/assets/img/contract/up.png"
                  alt=""
                />
                <img
                  v-else-if="item.nxtb < 0"
                  src="~@/assets/img/contract/down.png"
                  alt=""
                />
              </td>
              <td>
                {{ item.zcd }}
                <img
                  v-if="item.zcdtb > 0"
                  src="~@/assets/img/contract/up.png"
                  alt=""
                />
                <img
                  v-else-if="item.zcdtb < 0"
                  src="~@/assets/img/contract/down.png"
                  alt=""
                />
              </td>
              <td>
                {{ item.gxd }}
                <img
                  v-if="item.gxdtb > 0"
                  src="~@/assets/img/contract/up.png"
                  alt=""
                />
                <img
                  v-else-if="item.gxdtb < 0"
                  src="~@/assets/img/contract/down.png"
                  alt=""
                />
              </td>
              <td>{{ item.R }}</td>
              <td>{{ item.F }}</td>
              <td>{{ item.M }}</td>
              <td>{{ item.cqckcs }}</td>
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
        <template v-for="(item, index) in paginationItems">
          <span
            v-if="item.type === 'number'"
            :class="{ active: item.value === currentPage }"
            @click="handlePageChange(item.value)"
            >{{ item.value }}</span
          >
          <span v-else class="ellipsis">{{ item.value }}</span>
        </template>
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
  name: "bottom9",

  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      total: 0,
      totalPages: 0,
      tableData: []
    };
  },

  computed: {
    paginationItems() {
      const items = [];
      const maxVisiblePages = 5; // 最多显示的页码数

      if (this.totalPages <= maxVisiblePages) {
        // 如果总页数小于等于最大显示页数，显示所有页码
        for (let i = 1; i <= this.totalPages; i++) {
          items.push({ type: "number", value: i });
        }
      } else {
        // 始终显示第一页
        items.push({ type: "number", value: 1 });

        // 计算当前页附近的页码
        let start = Math.max(2, this.currentPage - 1);
        let end = Math.min(this.totalPages - 1, this.currentPage + 1);

        // 调整起始和结束页码，确保显示足够的页码
        if (start > 2) {
          items.push({ type: "ellipsis", value: "..." });
        }

        for (let i = start; i <= end; i++) {
          items.push({ type: "number", value: i });
        }

        if (end < this.totalPages - 1) {
          items.push({ type: "ellipsis", value: "..." });
        }

        // 始终显示最后一页
        items.push({ type: "number", value: this.totalPages });
      }

      return items;
    }
  },

  async mounted() {
    await this.init();
  },

  methods: {
    async init() {
      const options = {
        dwbm: "6B51EA03CC8C4168876E3EA97A29B15E",
        time: "2024-11",
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      const res = await api.queryPfmPage(options);
      if (res) {
        // 制造假数据方便调试
        this.tableData = res.list.concat(res.list).concat(res.list);
        this.total = res.total;
        this.totalPages = res.pages;
      }
    },

    async handlePageChange(page) {
      this.currentPage = page;
      await this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom9 {
  width: 100%;
  height: 100%;
  padding: 16px 0 0 0;
  box-sizing: border-box;
  overflow: hidden;

  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .table-container {
      flex: 1;
      overflow: auto;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      thead {
        width: 100%;
        height: 40px;
        border: 1px solid #0069ca;
        background: rgba(0, 80, 144, 0.6);
        position: sticky;
        top: 0;
        z-index: 1;

        tr {
          th {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
            padding: 8px;
            word-break: break-all;
            white-space: normal;
            min-width: 100px;
          }
        }
      }

      tbody {
        tr {
          height: 40px;
          &:nth-child(even) {
            border-top: 1px solid #0069ca;
            border-bottom: 1px solid #0069ca;
            background: rgba(0, 80, 144, 0.2);
          }

          // 奇数列
          &:nth-child(odd) {
          }
          td {
            font-weight: normal;
            font-size: 16px;
            color: #6bd8ff;
            text-align: center;
            padding: 8px;
            word-break: break-all;
            white-space: normal;
            min-width: 100px;
            height: auto;
            line-height: 1.5;
          }

          &:hover {
            background: rgba(0, 80, 144, 0.4);
            cursor: pointer;
            border: 1px solid #00ecff;

            td {
              color: #fff;
            }
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
    padding: 8px 0;
    position: sticky;
    bottom: 0;
    z-index: 1;

    .btn {
      width: 60px;
    }

    .ellipsis {
      display: inline-block;
      width: 28px;
      height: 28px;
      text-align: center;
      color: #6bd8ff;
      font-size: 15px;
      margin: 0 2px;
      line-height: 28px;
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
