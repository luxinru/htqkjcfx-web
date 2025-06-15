<template>
  <div class="App">
    <router-view />
  </div>
</template>

<script>
import Encrypt from "@/utils/Encrypt.js";
import api from "@/api/new/contract";
export default {
  name: "App",

  data() {
    return {};
  },

  mounted() {
    this.getQksm();
  },

  methods: {
    async getQksm() {
      const res = await api.listQksm({});
      localStorage.setItem("em_qksm", JSON.stringify(res || []));
    }
  }
};
</script>
a

<style lang="scss">
.App {
  width: 100%;
  height: 100%;
}
// 统一设置滚动条样式
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #cfcbcb;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 6px;
  background: #092143;
}
</style>
