<template>
  <div class="bottom4">
    <section class="control_bar">
      <select-com
        title="企业类型："
        :options="options"
        @change="handleChange"
      />
      <select-com
        title="所属行业："
        :options="options2"
        @change="handleChange"
      />

      <div class="btn" @click="handleSearch">
        查询
      </div>
    </section>

    <section class="table">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>客户名称</th>
              <th>企业类型</th>
              <th>所属行业</th>
              <th>合同总金额(含税)</th>
              <th>合同数量</th>
              <th>所属区域</th>
            </tr>
          </thead>
        </table>
        <div class="table-body-wrapper">
          <table>
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
                <td>{{ item.khmc }}</td>
                <td>{{ item.qylx }}</td>
                <td>{{ item.syhy }}</td>
                <td>{{ formatAmount(item.htze) }}</td>
                <td>{{ item.htsl || 0 }}</td>
                <td>{{ item.ssqy }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="pagination">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
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
import selectCom from "@/components/select-com/index.vue";
import api from "@/api/new/contract";
export default {
  name: "bottom4",
  components: {
    selectCom
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPages: 1,
      options: [],
      options2: [],
      tableData: [],
      selectedType: "",
      selectedIndustry: "",
      loading: false
    };
  },

  mounted() {
    this.queryMltmsFun();
    this.queryMltmsListFun();
    this.getData();
  },

  methods: {
    async queryMltmsFun() {
      const res = await api.queryMltms({
        mlbm: "9B911F3C07A74A5DA8A740433026A821"
      });
      this.options = res.map(item => ({
        label: item.tmzwmc,
        value: item.tmbm
      }));
    },

    async queryMltmsListFun() {
      const res = await api.queryMltmsList({
        mlbm: "33E0059767634F74A177179B622C97E9",
        parentItemCode: ""
      });
      this.options2 = res.map(item => ({
        label: item.tmbm,
        value: item.tmbm
      }));
    },

    async getData() {
      try {
        this.loading = true;
        const res = await api.queryKhslList({
          mlbm: "9B911F3C07A74A5DA8A740433026A821",
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          qytm: this.selectedType,
          hytm: this.selectedIndustry
        });

        if (res) {
          this.tableData = res.list || [];
          this.total = res.total || 0;
          this.totalPages = res.pages || 1;
        }
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        this.loading = false;
      }
    },

    handleChange(value) {
      if (value) {
        if (this.options.find(item => item.value === value)) {
          this.selectedType = value;
        } else if (this.options2.find(item => item.value === value)) {
          this.selectedIndustry = value;
        }
      }
    },

    handleSearch() {
      this.currentPage = 1;
      this.getData();
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getData();
    },

    formatAmount(amount) {
      if (!amount) return "0.00";
      return amount.toLocaleString("zh-CN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom4 {
  width: 100%;
  height: 100%;
  padding: 16px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .control_bar {
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;

    .btn {
      width: 120px;
      height: 34px;
      background: url("~@/assets/img/contract/btn.png") no-repeat center center;
      background-size: 100% 100%;
      cursor: pointer;
      font-weight: normal;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .table {
    width: 100%;
    flex: 1;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    min-height: 0;

    .table-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .table-body-wrapper {
      flex: 1;
      overflow-y: auto;
      overflow-x: auto;
      min-height: 0;
      max-height: calc(100% - 40px);

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #0069ca;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 80, 144, 0.2);
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1200px;

      thead {
        position: sticky;
        top: 0;
        z-index: 1;
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
            padding: 0 10px;
            white-space: nowrap;

            &:nth-child(1) {
              width: 80px;
            } // 排名
            &:nth-child(2) {
              width: 300px;
            } // 客户名称
            &:nth-child(3) {
              width: 150px;
            } // 企业类型
            &:nth-child(4) {
              width: 150px;
            } // 所属行业
            &:nth-child(5) {
              width: 180px;
            } // 合同总金额
            &:nth-child(6) {
              width: 120px;
            } // 合同数量
            &:nth-child(7) {
              width: 150px;
            } // 所属区域
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
            padding: 0 10px;
            white-space: nowrap;

            &:nth-child(1) {
              width: 80px;
            } // 排名
            &:nth-child(2) {
              width: 300px;
            } // 客户名称
            &:nth-child(3) {
              width: 150px;
            } // 企业类型
            &:nth-child(4) {
              width: 150px;
            } // 所属行业
            &:nth-child(5) {
              width: 180px;
            } // 合同总金额
            &:nth-child(6) {
              width: 120px;
            } // 合同数量
            &:nth-child(7) {
              width: 150px;
            } // 所属区域
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
    margin-top: 16px;
    flex-shrink: 0;

    .btn {
      width: 60px;
    }

    button {
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

      &:disabled {
        background: #1a2a3a;
        color: #4a7ca7;
        cursor: not-allowed;
      }
    }

    span {
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

      &.active {
        background: #00bbff;
        color: #fff;
      }
    }
  }

  .loading {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6bd8ff;
    font-size: 16px;
  }
}
</style>
