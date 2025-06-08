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
          <tr>
            <td>
              1
            </td>
            <td>
              黑龙江省
            </td>
            <td>
              123,12345
            </td>
            <td>
              2285
            </td>
            <td>
              532
            </td>
          </tr>
          <tr>
            <td>
              2
            </td>
            <td>
              山东省
            </td>
            <td>
              123,12345
            </td>
            <td>
              987
            </td>
            <td>
              412
            </td>
          </tr>
          <tr>
            <td>
              3
            </td>
            <td>
              甘肃省
            </td>
            <td>
              123,12345
            </td>
            <td>
              752
            </td>
            <td>
              255
            </td>
          </tr>
          <tr>
            <td>
              4
            </td>
            <td>
              云南省
            </td>
            <td>
              123,12345
            </td>
            <td>
              651
            </td>
            <td>
              222
            </td>
          </tr>
          <tr>
            <td>
              5
            </td>
            <td>
              河南省
            </td>
            <td>
              123,12345
            </td>
            <td>
              400
            </td>
            <td>
              112
            </td>
          </tr>
          <tr>
            <td>
              6
            </td>
            <td>
              河北省
            </td>
            <td>
              123,12345
            </td>
            <td>
              200
            </td>
            <td>
              111
            </td>
          </tr>
          <tr>
            <td>
              7
            </td>
            <td>
              重庆
            </td>
            <td>
              123,12345
            </td>
            <td>
              150
            </td>
            <td>
              100
            </td>
          </tr>
          <tr>
            <td>
              8
            </td>
            <td>
              天津
            </td>
            <td>
              123,12345
            </td>
            <td>
              140
            </td>
            <td>
              50
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
  name: "bottom3",

  data() {
    return {
      active: 1,
      currentPage: 1,
      totalPages: 10
    };
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
