const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

function resolve(dir) {
  return path.resolve(__dirname, '../', dir)
}
console.log(process.env.NODE_ENV)
module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        oneOf: [
          // 普通的 `.scss` 文件和 `*.vue` 文件中的
          // `<style lang="scss">` 块都应用它
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  // 你也可以从一个文件读取，例如 `variables.scss`
                  // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
                  // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
                  additionalData: `$color: red; $font-size: 90px;`,
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader'],
          },
          {
            test: /\.styl(us)?$/,
            use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              'postcss-loader',
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于6kb的图片转为base64
            // 优点： 减少请求数量 缺点： 提及会变大
            // 默认为小于 8kb
            maxSize: 10 * 1024,
          },
        },
      },
      // 处理字体图标
      {
        test: /\.(eot|svg|ttf|woff2?|mp3|mp4|avi)$/i,
        type: 'asset/resource', // 原封不动的处理，不做base64处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
    new ESLintPlugin({
      context: resolve('src'),
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  resolve: {
    extensions: ['.vue', '.js', '.json'], // 识别文件扩展名
    alias: {
      '@': resolve('src'), // 别名
    },
  },
  devServer: {
    compress: true,
    port: 9066,
    hot: true, // 开启HMR功能，默认为ture
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
}
