import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Home/index.vue")
    // children: [
    //   {
    //     path: "/jjyxjc",
    //     name: "jjyxjc",
    //     component: () => import("@/views/LargeScreen/jjyxjc/index.vue"),
    //     meta: {
    //       title: "经济运行监测"
    //      }
    //   },
    //   {
    //     path: "/zdxmjc",
    //     name: "zdxmjc",
    //     component: () => import("@/views/LargeScreen/zdxmjc/index.vue"),
    //     meta: {
    //       title: "投资监测"
    //     }
    //   },
    //   {
    //     path: "/ksqyzl",
    //     name: "ksqyzl",
    //     component: () => import("@/views/LargeScreen/ksqyzl/index.vue"),
    //     meta: {
    //       title: "亏损企业治理"
    //     }
    //   },
    //   {
    //     path: "/htqkjcfx",
    //     name: "htqkjcfx",
    //     component: () => import("@/views/LargeScreen/htqkjcfx/index.vue"),
    //     meta: {
    //       title: "合同情况监测分析"
    //     }
    //   },
    //   {
    //     path: "/gjhjyqk",
    //     name: "ksqyzl",
    //     component: () => import("@/views/LargeScreen/gjhjyqk/index.vue"),
    //     meta: {
    //       title: "国际化经营情况"
    //     }
    //   },
    //   {
    //     path: "/jjyxztfx",
    //     name: "jjyxztfx",
    //     component: () => import("@/views/jjyxztfx"),
    //     meta: {
    //       title: "经济运行监测专题分析"
    //     }
    //   },
    //   {
    //     path: "/htqkjcztfx",
    //     name: "htqkjcztfx",
    //     component: () => import("@/views/htqkjcztfx"),
    //     meta: {
    //       title: "合同情况监测专题分析"
    //     }
    //   },
    //   {
    //     path: "/test",
    //     name: "test",
    //     component: () => import("@/views/test.vue")
    //   }
    // ]
  },

  {
    path: "/outer",
    name: "outer",
    component: () => import("@/views/Outer/index.vue")
  },
  {
    path: "/digitalplatform",
    name: "digitalPlatform",
    component: () => import("@/views/DigitalPlatform/index.vue"),
    meta: {
      title: "数智同方可视化平台"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/stat/htqkjcfx" : "",
  // base: "",
  routes
});

// router.beforeEach((to, from, next) => {
//   const vuex = JSON.parse(sessionStorage.getItem('vuex'))
//   // 不需要在请求返回后统一处理的URL
//   const EXCLUDE_URLS = ['/', '/index', '/404']
//   if (EXCLUDE_URLS.indexOf(to.path) >= 0) {
//     next()
//   } else {
//     if (!vuex) next('/')
//     next()
//     return
//     const gndz = vuex.personInfo.gnList
//     const arr = gndz ? gndz.filter(el => el.gndz === to.path) : []
//     if (arr.length > 0) {
//       next()
//     } else {
//       next('/404')
//     }
//   }
// })

export default router;
