const path = require('path')
const pages = require('./build/pages')
const externals = require('./build/externals')
const isProduction = process.env.VUE_APP_MODE === 'production'
const FileManagerPlugin = require('filemanager-webpack-plugin')
console.log(pages)
// 多页配置 End
const DIST_PATH = path.resolve(
  __dirname,
  process.env.VUE_APP_MODE === 'production'
    ? 'dist'
    : 'dist-' + process.env.VUE_APP_MODE
)
let cdn = {
  css: [],
  js: [
    './vue.min.js',
    // './inobounce.min.js'
  ],
}
if (isProduction) {
  cdn = {
    css: [],
    js: [
      './vue.min.js',
      // './inobounce.min.js'
    ],
  }
}
const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: [
            process.env.VUE_APP_MODE === 'production'
              ? './dist.zip'
              : './dist-' + process.env.VUE_APP_MODE + '.zip',
          ],
          archive: [
            {
              source:
                process.env.VUE_APP_MODE === 'production'
                  ? 'dist'
                  : 'dist-' + process.env.VUE_APP_MODE,
              destination:
                process.env.VUE_APP_MODE === 'production'
                  ? './dist.zip'
                  : './dist-' + process.env.VUE_APP_MODE + '.zip',
            },
          ],
        },
      },
    })
  )
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '',
  outputDir: DIST_PATH,
  assetsDir: 'static',
  pages,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1',
    port: 33333,
    static: {
      directory: DIST_PATH,
    },
    proxy: {
      [process.env.VUE_APP_API_URL]: {
        target: 'http://10.131.97.230/',
        // target: 'http://10.131.97.231:8090/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_URL]: '/',
        },
      },
      [process.env.VUE_APP_FRWD_URL]: {
        target: 'http://10.129.129.207:8183/',
        // target: 'http://10.129.156.241:8090/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_FRWD_URL]: '/',
        },
      },
    },
    // 启动开发环境默认打开的文件
    open: ['home.html'],
  },
  chainWebpack: (config) => {
    if (isProduction) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 移除 preload 插件
      config.plugins.delete('preload')
    }
    // pages
    // {
    //   about: {
    //     entry: [ 'src/views/about/index.js' ],
    //     template: 'public/index.html',
    //     title: 'about',
    //     filename: 'about.html'
    //   },
    //   home: {
    //     entry: [ 'src/views/home/index.js' ],
    //     template: 'public/index.html',
    //     title: 'home',
    //     filename: 'home.html'
    //   }
    // }
    const entry = Object.keys(pages)
    for (const iterator of entry) {
      // args
      // [
      //   {
      //     title: 'home',
      //     scriptLoading: 'defer',
      //     templateParameters: [Function: templateParameters],
      //     chunks: [ 'chunk-vendors', 'chunk-common', 'home' ],
      //     template: 'public/index.html',
      //     filename: 'home.html'
      //   }
      // ]
      // config.plugin.tap 是用来修改插件的入参的
      config.plugin(`html-${iterator}`).tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: {
    // 通过config.plugin修改了htmlwebpackplugin的入参，对options添加了一个cdn属性，来载入vue.min.js
    // 在public下的index.html里面使用htmlWebpackPlugin.options引入
    // 所以不需要import vue了，并使用externals将其排除不打包进来
    externals,
    plugins,
  },
  productionSourceMap: false,
}
