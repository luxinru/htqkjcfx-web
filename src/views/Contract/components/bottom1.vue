<template>
  <div class="bottom1">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="item"
      :class="{ active: active === index + 1 }"
      @click="handleClick(index + 1)"
    >
      <div class="labels">
        <span>
          {{ item.name }}
        </span>
        <TextCarousel
          v-if="item.values && item.values.length > 0"
          :text-list="
            item.values ? item.values.map(v => v.name + ' ' + v.value) : []
          "
          :height="20"
          :interval="3000"
        />
      </div>

      <div v-if="item.value" class="values">
        <span>
          {{ item.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/new/contract";
import TextCarousel from "@/components/TextCarousel.vue";

export default {
  name: "bottom1",

  components: {
    TextCarousel
  },

  props: {
    active: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      list: []
    };
  },

  mounted() {
    this.getKhzb();

    this.$EventBus.$on("orgChange", org => {
      this.getKhzb();
    });
  },

  methods: {
    handleClick(index) {
      this.$emit("update:active", index);
    },

    async getKhzb() {
      const res = await api.queryKhzb({});
      this.list = res || [];
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .item {
    width: 100%;
    height: 76px;
    background: url("~@/assets/img/contract/icon10.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 14px;
    box-sizing: border-box;

    &:hover {
      background: url("~@/assets/img/contract/icon11.png") no-repeat center
        center;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .labels {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        &:nth-child(1) {
          font-weight: normal;
          font-size: 16px;
          color: #caf2ff;
        }

        &:nth-child(2) {
          font-weight: normal;
          font-size: 14px;
          color: #00ecff;
        }
      }
    }

    .values {
      display: flex;
      flex-direction: column;
      gap: 4px;
      span {
        &:nth-child(1) {
          font-family: DIN-1451-Mittelschrift-Regular,
            DIN-1451-Mittelschrift-Regular;
          font-weight: normal;
          font-size: 36px;
          color: #0cdcb2;
        }

        &:nth-child(2) {
          font-weight: normal;
          font-size: 14px;
          color: #00ecff;
        }
      }
    }
  }

  .active {
    background: url("~@/assets/img/contract/icon11.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
