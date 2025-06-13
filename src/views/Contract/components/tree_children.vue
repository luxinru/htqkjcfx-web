<template>
  <div>
    <template v-for="child in children">
      <div
        class="tree-children-item"
        :style="{
          paddingLeft: level * 16 + 'px',
          lineHeight: '40px',
          fontSize: '16px',
          color: 'rgba(107, 216, 255, 1)',
          fontWeight: 'normal',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }"
      >
        <img
          :src="require('@/assets/img/contract/tree_icon1.png')"
          :style="{
            width: '14px',
            height: '7px',
            marginRight: '4px',
            transform: expandedMap[child.id]
              ? 'rotate(-90deg)'
              : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }"
          @click.stop="toggle(child.id)"
        />
        <img
          v-if="child.children && child.children.length"
          src="@/assets/img/contract/folder.png"
          alt=""
          style="width: 18px; height: 16px; margin-right: 4px;"
        />
        <img
          v-else
          src="@/assets/img/contract/unit.png"
          alt=""
          style="width: 18px; height: 16px; margin-right: 4px;"
        />
        <span @click.stop="onNameClick(child)">{{ child.name }}</span>
      </div>
      <transition name="tree-expand">
        <div
          v-show="
            child.children && child.children.length && expandedMap[child.id]
          "
          style="margin-left: 0;"
        >
          <tree-children :children="child.children" :level="level + 1" />
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "tree-children",
  props: {
    children: Array,
    level: Number
  },
  data() {
    return {
      expandedMap: {}
    };
  },
  methods: {
    toggle(id) {
      this.$set(this.expandedMap, id, !this.expandedMap[id]);
    },
    onNameClick(child) {
      this.$EventBus.$emit("orgChange", child);
    }
  }
};
</script>

<style scoped>
.tree-children-item {
  display: flex;
  align-items: center;

  &:hover {
    background: rgba(0, 80, 144, 0.6);
  }
}
.tree-expand-enter-active,
.tree-expand-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  overflow: hidden;
}
.tree-expand-enter,
.tree-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.tree-expand-enter-to,
.tree-expand-leave {
  max-height: 500px;
  opacity: 1;
}
</style>
