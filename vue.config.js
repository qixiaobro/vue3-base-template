const path = require("path");

const CompressionWebpackPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const resolve = dir => path.join(__dirname, dir);

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./",
  outputDir: process.env.outputDir || "dist", //生产环境构建文件的目录
  assetsDir: "", //// 相对于outputDir的静态资源(js、css、img、fonts)目录
  indexPath: "index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  lintOnSave: process.env.NODE_ENV !== "production",
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, //该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {},

  chainWebpack: config => {
    /**
     * @TODO 修复HMR(热更新)失效
     */
    config.resolve.symlinks(true);

    /**
     * @TODO 添加别名
     */
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@utils", resolve("src/utils"));

    /**
     * @TODO 压缩图片
     */
    if (IS_PROD) {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        });
    }

    /**
     * @TODO 打包后文件大小分析
     */
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
  },

  /**
   * @TODO 比 gzip 体验更好的 Zopfli 压缩
   */
  configureWebpack: config => {
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99,
          test: productionGzipExtensions
        })
      );
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },

  /**
   * @TODO 配置proxy代理解决跨域问题
   */
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    open: true, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理端口
    // https: false,
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        target:
          "https://www.fastmock.site/mock/1f35985adb58af2c3341fd7803d8540f", // 目标代理接口地址
        secure: false,
        changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        // pathRewrite: {
        //   "^/api": "/"
        // }
      }
    }
  }
};
