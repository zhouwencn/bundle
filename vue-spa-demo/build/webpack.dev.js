const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')

function resolve(dir) {
  return path.resolve(__dirname, '../', dir)
}

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
        test: /\.js$/,
        exclude: /node_modules/,
        // 也可以将配置写在外面babel.config.js
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
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
    open: true,
  },
  mode: 'development',
}
