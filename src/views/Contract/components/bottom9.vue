<template>
  <div class="bottom9">
    <section class="table">
      <table>
        <thead>
          <tr>
            <th>
              序号
            </th>
            <th>
              客户价值划分
            </th>
            <th>
              客户名称
            </th>
            <th>
              粘性
            </th>
            <th>
              忠诚度
            </th>
            <th>
              贡献度
            </th>
            <th>
              R(最近新签合同时间范围/天）
            </th>
            <th>
              F(合同签订数量/个)
            </th>
            <th>
              M(签订合同总额/万元）
            </th>
            <th>
              采取措施参考
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="index in 4" :key="index">
            <td>
              {{ index }}
            </td>
            <td>
              重要价值客户
            </td>
            <td>
              沈阳同方科技园消防系统升级改造项目
            </td>
            <td>
              高
              <img src="~@/assets/img/contract/up.png" alt="" />
            </td>
            <td>
              高
              <img src="~@/assets/img/contract/up.png" alt="" />
            </td>
            <td>
              高
              <img src="~@/assets/img/contract/up.png" alt="" />
            </td>
            <td>
              22
            </td>
            <td>
              22
            </td>
            <td>
              22
            </td>
            <td>
              中国人民共和...
            </td>
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
</template>

<script>
export default {
  name: "bottom9",

  data() {
    return {
      currentPage: 1,
      totalPages: 10,
      options: [
        {
          label: "中央企业",
          value: "1"
        },
        {
          label: "国有企业",
          value: "2"
        }
      ],
      options2: [
        {
          label: "农业",
          value: "1"
        },
        {
          label: "制造业",
          value: "2"
        },
        {
          label: "服务业",
          value: "3"
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
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
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

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
