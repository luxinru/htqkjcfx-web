<template>
  <div class="largescreen">
    <div
      class="header"
      v-if="
        $route.meta.title !== '经济运行监测专题分析' &&
          $route.meta.title !== '合同情况监测专题分析'
      "
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="index === 2 ? 'mc-div2' : 'mc-div'"
      >
        <div @click="navReturn(index, item)" >
          <div class="title">{{ item.title }}</div>
          <div

            v-if="
              index === 2 &&
                (item.title === '经济运行监测' ||
                  item.title === '合同情况监测分析')
            "
            class="name"
            :class="item.title === '合同情况监测分析' ? 'htqkjccz' : ''"
          >
            （{{ dwmc }}）
          </div>
        </div>
      </div>
      <!-- 右边菜单组件 -->
      <div class="timeing-div">
        <span>{{ currentDateTime }}</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "投资监测", path: "/zdxmjc" },
        { title: "亏损企业治理", path: "/ksqyzl" },
        { title: "经济运行监测", path: "/jjyxjc" },
        { title: "国际化经营情况", path: "/gjhjyqk" },
        { title: "合同情况监测分析", path: "/htqkjcfx" }
      ],
      activeIndex: 0, // 当前选中的项的索引
      time: new Date() // 用来存储当前系统时间
    };
  },
  computed: {
    ...mapState({
      dwmc: state => state.caseInfo.dwmc || state.caseInfo.name|| ""
    }),
    // 计算属性返回格式化的日期时间字符串
    currentDateTime() {
      return this.formatDateTime(this.time);
    }
  },
  mounted() {
    // 系统时间
    setInterval(() => {
      this.time = new Date(); // 更新时间变量以触发计算属性更新
    }, 1000);
  },
  created() {
    const title = this.$route.meta.title;
    this.routeto(title);
  },
  methods: {
    ...mapMutations(["SET_CASEINFO"]),
    // 定义一个方法用于格式化日期时间
    formatDateTime(date) {
      this.$moment.locale("zh-cn");
      return this.$moment(date).format("YYYY年MM月DD日 dddd");
    },
    // 跳转
    navReturn(index, item) {
      if (index === 2&&item.title=== "合同情况监测分析") {
        this.SET_CASEINFO(JSON.parse(sessionStorage.getItem("dwlb")));
        return;
      
      } else if (index === 2&&item.title=== "经济运行监测") {
        this.SET_CASEINFO(JSON.parse(sessionStorage.getItem("dwlb")));
        return;
      } else if (index === 2&&item.title=== "国际化经营情况") {
        
        this.SET_CASEINFO(JSON.parse(sessionStorage.getItem("dwlb")));
        return;
      }
      this.$router.push(item.path); // 跳转到对应的路由
    },
 
    routeto(val) {
      if (val == "经济运行监测") {
        this.items = [
          { title: "投资监测", path: "/zdxmjc" },
          { title: "亏损企业治理", path: "/ksqyzl" },
          { title: "经济运行监测", path: "/jjyxjc" },
          { title: "国际化经营情况", path: "/gjhjyqk" },
          { title: "合同情况监测分析", path: "/htqkjcfx" }
        ];
      } else if (val == "国际化经营情况") {
        this.items = [
          { title: "投资监测", path: "/zdxmjc" },
          { title: "亏损企业治理", path: "/ksqyzl" },
          { title: "国际化经营情况", path: "/gjhjyqk" },
          { title: "经济运行监测", path: "/jjyxjc" },
          { title: "合同情况监测分析", path: "/htqkjcfx" }
        ];
      } else if (val == "亏损企业治理") {
        this.items = [
          { title: "投资监测", path: "/zdxmjc" },
          { title: "国际化经营情况", path: "/gjhjyqk" },
          { title: "亏损企业治理", path: "/ksqyzl" },
          { title: "经济运行监测", path: "/jjyxjc" },
          { title: "合同情况监测分析", path: "/htqkjcfx" }
        ];
      } else if (val == "合同情况监测分析") {
        this.items = [
          { title: "投资监测", path: "/zdxmjc" },
          { title: "国际化经营情况", path: "/gjhjyqk" },
          { title: "合同情况监测分析", path: "/htqkjcfx" },
          { title: "亏损企业治理", path: "/ksqyzl" },
          { title: "经济运行监测", path: "/jjyxjc" }
        ];
      } else if (val == "投资监测") {
        this.items = [
          { title: "国际化经营情况", path: "/gjhjyqk" },
          { title: "合同情况监测分析", path: "/htqkjcfx" },
          { title: "投资监测", path: "/zdxmjc" },
          { title: "亏损企业治理", path: "/ksqyzl" },
          { title: "经济运行监测", path: "/jjyxjc" }
        ];
      }
    }
  },
  watch: {
    $route(to) {
      this.routeto(to.meta.title);
    }
  }
};
</script>

<style scoped lang="scss">
.largescreen {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/default/bj.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  background-color: rgba(0, 29, 66, 0.85);
}

.header {
  position: relative;
  display: flex;
  height: 127px;
  background-size: 100% 100%;
  justify-content: space-between;
  padding: 0 57px;

  .mc-div {
    top: 0px;
    font-size: 20px;
    font-stretch: normal;
    font-family: DingTalk-JinBuTi;
    text-align: center;
    line-height: 100px;
    letter-spacing: 2px;
    color: #eff7ff;
    // margin-top: 15px;
    position: relative;
    cursor: pointer;
    width: 225px;

    &:nth-child(1) {
      width: 250px;
      // assets/img/default/.png
      background-image: url("../../assets/img/default/navleft.png");
      background-position: center 26px;
      background-repeat: no-repeat;
      background-size: contain;
      /* 或者 cover，取决于需求 */

      &:hover {
        background-image: url("../../assets/img/default/navLeftHover.png");

        .title {
          color: #daedff;
        }
      }
    }

    &:nth-child(2) {
      background-image: url("../../assets/img/default/navleft.png");
      background-position: center 26px;
      background-repeat: no-repeat;

      // background-size: contain;  /* 或者 cover，取决于需求 */
      &:hover {
        background: url("../../assets/img/default/navLeftHover.png");
        background-position: center 26px;
        background-repeat: no-repeat;
        background-size: contain;

        /* 或者 cover，取决于需求 */
        .title {
          color: #daedff;
        }
      }
    }

    &:nth-child(4) {
      background-image: url("../../assets/img/default/navright.png");
      background-position: center 26px;
      background-repeat: no-repeat;
      background-size: contain;

      /* 或者 cover，取决于需求 */
      &:hover {
        background-image: url("../../assets/img/default/navRightHover.png");

        .title {
          color: #daedff;
        }
      }
    }

    &:nth-child(5) {
      background-image: url("../../assets/img/default/navright.png");
      background-position: center 26px;
      background-repeat: no-repeat;
      background-size: contain;

      /* 或者 cover，取决于需求 */
      &:hover {
        background-image: url("../../assets/img/default/navRightHover.png");

        .title {
          color: #daedff;
        }
      }
    }

    .title {
      color: rgba(141, 191, 238, 0.85);
    }
  }

  .mc-div2 {
    text-align: center;
    width: 880px;
    background-image: url("../../assets/img/default/top.png");
    background-repeat: no-repeat;
    background-size: contain;
    /* 或者 cover，取决于需求 */
    margin-top: 14px;
cursor: pointer;
    .title {
      font-family: DingTalk-JinBuTi;
      font-size: 30px;
      font-weight: 700;
      font-stretch: normal;
      letter-spacing: 4px;
      color: #eff7ff;
    }

    .name {
      font-family: DingTalk-JinBuTi;
      height: 18px;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 43px;
      letter-spacing: 2px;
      color: #eff7ff;
    }
  }

  .timeing-div {
    padding: 0 30px;
    position: relative;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
.htqkjccz {
  cursor: pointer;
}
</style>
