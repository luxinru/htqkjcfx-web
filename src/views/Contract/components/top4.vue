<template>
  <div class="top4">
    <div class="item">
      <div class="title">
        年初手持合同额
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          80
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            5.3%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        累计新签合同额
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          26
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            5.7%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        累计转化收入-年初手持
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          78
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            8.45%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        累计转化收入-累计新签
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          56
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            4.36%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        期末手持合同额-年初剩余
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          77
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            8.2%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        期末手持合同-累计新签剩余
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          45
          <span>
            亿元
          </span>
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            4.25%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        累计合同转化率-年初手持
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          25%
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="down">
            <img src="~@/assets/img/contract/down.png" alt="" />
            4.25%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        累计合同转化率-累计新签
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          44.4%
        </div>
        <div class="value_item" style="color: rgba(0, 236, 255, 1);">
          同比：
          <span class="up">
            <img src="~@/assets/img/contract/up.png" alt="" />
            6.39%
          </span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        完成营收6-12月需签合同额
      </div>

      <div class="values">
        <div class="value_item" style="color: #1bffcc;">
          5
          <span>
            亿元
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top4",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.top4 {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  .item {
    background: url("~@/assets/img/contract/icon21.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;

    .title {
      font-weight: normal;
      font-size: 16px !important;
      color: #ffffff;
    }

    .values {
      display: flex;
      gap: 8px;

      .value_item {
        flex: 1 0;
        display: flex;
        font-weight: normal;
        font-size: 18px;
        align-items: center;

        span {
          font-size: 14px;
          display: flex;
          align-items: center;
          vertical-align: middle;

          img {
            margin-right: 3px;
          }
        }

        .up {
          color: rgba(37, 255, 80, 1);
        }

        .down {
          color: rgba(255, 51, 85, 1);
        }

        &:nth-child(2) {
          flex: 1.5 0;
        }
      }
    }
  }
}
</style>
