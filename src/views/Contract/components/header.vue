<template>
  <div class="header">
    <div class="back" @click="$router.back()"></div>

    <img src="@/assets/img/home/header_title.png" alt="" />

    <div class="org" @click="toggleOrgList">
      组织机构
    </div>

    <section class="date">
      截止日期:
      <div class="select_box" @click="toggleYearDropdown">
        <span>{{ year }}</span>
        <div class="dropdown" v-if="showYearDropdown">
          <div
            v-for="y in years"
            :key="y"
            class="dropdown-item"
            @click="selectYear(y)"
          >
            {{ y }}
          </div>
        </div>
      </div>
      年
      <div class="select_box" @click="toggleMonthDropdown">
        <span>{{ month }}</span>
        <div class="dropdown" v-if="showMonthDropdown">
          <div
            v-for="m in 12"
            :key="m"
            class="dropdown-item"
            @click="selectMonth(m)"
          >
            {{ m }}
          </div>
        </div>
      </div>
      月
    </section>

    <section class="org_list" :class="{ show: isShowOrgList }">
      <OrgTree />
    </section>
  </div>
</template>

<script>
import OrgTree from "./org_tree.vue";
export default {
  name: "Header",

  components: {
    OrgTree
  },

  data() {
    return {
      isShowOrgList: false,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      showYearDropdown: false,
      showMonthDropdown: false,
      years: Array.from({ length: 100 }, (_, i) => 2000 + i)
    };
  },

  mounted() {
    // 点击其他地方关闭下拉框
    document.addEventListener("click", e => {
      if (!e.target.closest(".select_box")) {
        this.showYearDropdown = false;
        this.showMonthDropdown = false;
      }
    });
  },

  methods: {
    toggleOrgList() {
      this.isShowOrgList = !this.isShowOrgList;
    },

    toggleYearDropdown() {
      this.showYearDropdown = !this.showYearDropdown;
      this.showMonthDropdown = false;
    },

    toggleMonthDropdown() {
      this.showMonthDropdown = !this.showMonthDropdown;
      this.showYearDropdown = false;
    },

    selectYear(year) {
      this.year = year;
      this.showYearDropdown = false;
      this.$EventBus.$emit("updateDate", `${year}年${this.month}月`);
    },
    
    selectMonth(month) {
      this.month = month;
      this.showMonthDropdown = false;
      this.$EventBus.$emit("updateDate", `${this.year}年${month}月`);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 90px;
  background: url("~@/assets/img/home/header.png") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .back {
    position: absolute;
    left: 20px;
    margin-bottom: 26px;
    width: 20px;
    height: 18px;
    background: url("~@/assets/img/outer/back.png") no-repeat center center;
    background-size: 100% 100%;

    &:hover {
      cursor: pointer;
      background: url("~@/assets/img/outer/back_active.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }

  .org {
    position: absolute;
    left: 128px;
    margin-bottom: 26px;
    width: 140px;
    height: 34px;
    background: url("~@/assets/img/contract/header_btn.png") no-repeat center
      center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
  }

  // .text {
  //   font-weight: bold;
  //   font-size: 42px;
  //   background: linear-gradient(to bottom, #97d4ff 0%, #ffffff 100%);
  //   -webkit-background-clip: text;
  //   -webkit-text-fill-color: transparent;
  // }

  .date {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 20px !important;

    .select_box {
      position: relative;
      width: 86px;
      height: 28px;
      background: #005090;
      border: 1px solid #0069ca;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 10px;
      cursor: pointer;

      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        background: #005090;
        border: 1px solid #0069ca;
        z-index: 1000;

        .dropdown-item {
          padding: 8px 10px;
          color: #ffffff;
          cursor: pointer;

          &:hover {
            background: #0069ca;
          }
        }
      }
    }
  }

  .org_list {
    position: fixed;
    left: 0;
    bottom: 16px;
    width: 374px;
    height: 1018px;
    background: url("~@/assets/img/contract/org_bac.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    padding: 30px 16px;
    box-sizing: border-box;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    
    &.show {
      left: 10px;
      transform: translateX(0);
    }
  }
}
</style>
