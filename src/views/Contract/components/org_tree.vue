<template>
  <div class="org_tree">
    <div class="search">
      <div class="input">
        <input type="text" placeholder="请输入单位名称" />
      </div>
      <img src="@/assets/img/contract/search.png" alt="" />
    </div>

    <section class="tree">
      <div
        v-for="item in orgList"
        :key="item.id"
        :style="{
          paddingLeft: 0 + 'px',
          lineHeight: '40px',
          fontSize: '16px',
          color: 'rgba(107, 216, 255, 1)',
          fontWeight: 'normal',
          cursor: 'pointer'
        }"
      >
        {{ item.name }}
        <tree-children
          v-if="item.children && item.children.length"
          :children="item.children"
          :level="1"
        />
      </div>
    </section>
  </div>
</template>

<script>
import treeChildren from "./tree_children.vue";
import api from "@/api/new/contract";

export default {
  name: "OrgTree",

  components: {
    treeChildren
  },

  data() {
    return {
      orgList: []
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      const res = await api.queryJgsdwlb({
        jgsbm: "61C4D1289BD84D179AC848A7279C2959",
        typeList: ["HC", "BK", "CY"]
      });

      // 将数据转换成树形结构
      const buildTree = (items, parentId = null) => {
        return items
          .filter(item => item.fdwbm === parentId)
          .map(item => ({
            name: item.dwmc,
            id: item.dwbm,
            children: buildTree(items, item.dwbm)
          }));
      };

      // 更新orgList数据
      this.orgList = buildTree(res);
    }
  }
};
</script>

<style lang="scss" scoped>
.org_tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .search {
    width: 100%;
    height: 34px;
    background: rgba(0, 80, 144, 0.2);
    border: 1px solid #0069ca;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .input {
      flex: 1 0;
      height: 100%;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-weight: normal;
        font-size: 16px;
        color: #fff;

        &::placeholder {
          color: #0069ca !important;
        }
      }
    }

    img {
      width: 16px;
      height: 16px;
    }
  }

  .tree {
    width: 100%;
    flex: 1 0;
    overflow: auto;
  }
}
</style>
