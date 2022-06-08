const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    generator: {},
    parser: {},
    // noParse: '',
    unsafeCache: false,
    rules: [
      {
        test: /\.css$/,
        // 执行顺序，从右到左
        // css-loader将css资源编译成commonjs的模块到js中
        // style-loader将js中的css通过创建style标签添加html文件中生效
        use: ['style-loader', 'css-loader'],
      },
      // compiles Less to CSS
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        // 换一种写法
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'stylus-loader', // compiles Stylus to CSS
          },
        ],
      },
    ],
  },
  mode: 'development',
}
