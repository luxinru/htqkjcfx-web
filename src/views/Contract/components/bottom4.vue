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

      <div class="btn">
        查询
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
              客户名称
            </th>
            <th>
              企业类型
            </th>
            <th>
              所属行业
            </th>
            <th>
              合同总金额(含税)
            </th>
            <th>
              合同数量
            </th>
            <th>
              所属区域
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="index in 8" :key="index">
            <td>
              <img
                v-if="index === 1"
                src="~@/assets/img/contract/icon14.png"
                alt=""
              />
              <img
                v-else-if="index === 2"
                src="~@/assets/img/contract/icon15.png"
                alt=""
              />
              <img
                v-else-if="index === 3"
                src="~@/assets/img/contract/icon16.png"
                alt=""
              />
              <span v-else>{{ index }}</span>
            </td>
            <td>
              沈阳同方科技园消防系统升级改造项目
            </td>
            <td>
              其他
            </td>
            <td>
              批发业
            </td>
            <td>
              123,12345
            </td>
            <td>
              2285
            </td>
            <td>
              中国人民共和国北京市
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
import selectCom from "@/components/select-com/index.vue";
export default {
  name: "bottom4",
  components: {
    selectCom
  },
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
.bottom4 {
  width: 100%;
  height: 100%;
  padding: 16px 0;
  box-sizing: border-box;

  .control_bar {
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    gap: 20px;

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
    flex: 1 0;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;

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
