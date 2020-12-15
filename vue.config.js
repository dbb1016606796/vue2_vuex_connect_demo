const vConsolePlugin = require("vconsole-webpack-plugin");
const pxtoviewport = require("postcss-px-to-viewport");

//const Version = new Date().getTime();
const assetsDir = "static";
module.exports = {
  publicPath: "/",
  assetsDir,
  outputDir: "dist",
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
  configureWebpack: (config) => {
    //js文件添加时间戳
    // config.output = {
    //   ...config.output,
    //   filename: `${assetsDir}/js/[name].${Version}.js`,
    //   chunkFilename: `${assetsDir}/js/[name].${Version}.js`,
    // };
    const addPlugin = [
      //添加H5调试插件
      new vConsolePlugin({
        filter: [],
        enable: true,
      }),
    ];
    if (process.env.NODE_ENV === "development") {
      config.plugins = [...config.plugins, ...addPlugin];
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
  },
  css: {
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: [
          //添加vw适配方案
          pxtoviewport({
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*", "!border*", "font-weight"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位
            selectorBlackList: ["px"], // 指定不转换为视窗单位的类名，以px开头将不转化
            minPixelValue: 12, // 小于或者等于24就不转化
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
            replace: true, // 是否转换后直接更换属性值
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
    },
  },
  devServer: {
    host: "192.168.5.31",
    port: "10088",
    open: false,
  },
};
