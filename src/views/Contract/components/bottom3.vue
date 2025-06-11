<template>
  <div class="bottom3">
    <section class="tabs">
      <div class="tab" :class="{ active: active === 1 }" @click="active = 1">
        境内
      </div>
      <div class="tab" :class="{ active: active === 2 }" @click="active = 2">
        境外
      </div>
    </section>

    <section class="table">
      <table>
        <thead>
          <tr>
            <th>
              排名
            </th>
            <th>
              地区
            </th>
            <th>
              合同总金额(含税)
            </th>
            <th>
              合同数量
            </th>
            <th>
              客户数量
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in dataList" :key="index">
            <td>
              <img
                v-if="(currentPage - 1) * pageSize + index + 1 === 1"
                src="~@/assets/img/contract/icon14.png"
                alt=""
              />
              <img
                v-else-if="(currentPage - 1) * pageSize + index + 1 === 2"
                src="~@/assets/img/contract/icon15.png"
                alt=""
              />
              <img
                v-else-if="(currentPage - 1) * pageSize + index + 1 === 3"
                src="~@/assets/img/contract/icon16.png"
                alt=""
              />
              <span v-else>{{ (currentPage - 1) * pageSize + index + 1 }}</span>
            </td>
            <td>
              {{ item.dq }}
            </td>
            <td>
              {{ formatNumber(item.htje) }}
            </td>
            <td>
              {{ item.htsl }}
            </td>
            <td>
              {{ item.yhsl }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
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
</template>

<script>
import api from "@/api/new/contract";
export default {
  name: "bottom3",

  data() {
    return {
      active: 1,
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      dataList: []
    };
  },

  watch: {
    currentPage() {
      this.getData();
    },

    active() {
      this.currentPage = 1;
      this.getData();
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      const res = await api.queryKhdyfbList({
        dwbm: "61C4D1289BD84D179AC848A7279C2959",
        time: "2024-11",
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: this.active === 1 ? 0 : 1
      });

      if (res) {
        this.dataList = res.list || [];
        this.totalPages = res.pages || 1;
      }
    },

    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom3 {
  width: 100%;
  height: 100%;
  aspect-ratio: 659 / 479;
  display: flex;
  flex-direction: column;
  padding: 16px 0 16px 16px;
  box-sizing: border-box;

  .tabs {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    gap: 6px;

    .tab {
      width: max-content;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 66, 119, 0.4);
      border-radius: 5px;
      border: 1px solid #005090;
      font-weight: normal;
      font-size: 14px;
      color: #6bd8ff;
      cursor: pointer;
    }

    .active {
      background: #004277;
      border: 1px solid #707070;
      color: #ffffff;
    }
  }

  .table {
    width: 100%;
    flex: 1 0;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;
      overflow-y: auto;
      flex: 1;
      display: block;
      max-height: calc(100% - 50px);

      thead {
        width: 100%;
        height: 40px;
        border: 1px solid #0069ca;
        background: rgba(0, 80, 144, 0.6);
        position: sticky;
        top: 0;
        z-index: 1;
        display: table;
        table-layout: fixed;
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
        display: table;
        width: 100%;
        table-layout: fixed;
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
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    height: 50px;
    margin-top: 10px;

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
</style>
