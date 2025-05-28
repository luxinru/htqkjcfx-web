module.exports = {
  publicPath: "",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    headers: {
      // 设置本地运行的跨域权限
      "Access-Control-Allow-Origin": "*"
    },
    // 当有真实后台接口时，请开启 proxy 配置
    // detail: https://cli.vuejs.org/config/#devserver-proxy
    // 如果你与后台联调，让他把服务注册到网关上，不要配置他的本地地址，尤其不要配置了他的本地地址还提交上去。
    // 如果你与后台联调，让他把服务注册到网关上，不要配置他的本地地址，尤其不要配置了他的本地地址还提交上去。
    // 如果你与后台联调，让他把服务注册到网关上，不要配置他的本地地址，尤其不要配置了他的本地地址还提交上去。
    proxy: {
      "/stat/prod-api/": {
        target: `http://10.10.60.18/`,
        // target: "http://192.168.1.60:58889/",
        changeOrigin: true
        // rewrite: path => {
        //   console.log(path);
        //   return path.replace(/^\/stat\/prod-api/, "");
        // }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].env = process.env.NODE_ENV;
      return args;
    });
    // 全局解析Sass
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // 引入全局sass文件
          resources: ["./src/assets/css/mixin.scss"]
        })
        .end();
    });
  },
  configureWebpack: {
    // 取消打包后文件大于244k警告
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  }
};
