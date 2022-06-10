const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: './src/app.js',
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // webpack命名方式，【name】以entry的key作为文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        default: {
          minSize: 0, // 为了测试把这里改为0
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: 'production',
}
