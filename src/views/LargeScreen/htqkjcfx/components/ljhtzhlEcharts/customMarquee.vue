<template>
  <div>
    <marquee
      class="ranking"
      behavior="alternate"
      direction="down"
      :style="{ height: height + 'px' }"
      onmouseover="this.stop()"
      onmouseout="this.start()"
      v-if="isScrollingEnabled"
    >
      <slot></slot>
    </marquee>
    <div class="ranking" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "customMarquee",
  props: {
    height: Number | String,
    rankingList: Array
  },
  computed: {
    isScrollingEnabled() {
      return this.rankingList.length * 40 > this.height;
    }
  }
};
</script>
