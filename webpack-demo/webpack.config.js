const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.js',
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
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于6kb的图片转为base64
            // 优点： 减少请求数量 缺点： 提及会变大
            // 默认为小于 8kb
            maxSize: 6 * 1024,
          },
        },
        // 将输出的图片指定到特定的目录
        // hash表示文件名， ext表示文件扩展名 query是一些其他参数
        // 如果希望文件名可以对hash做一下处理 比如写[hash:10]
        generator: {
          // 输入图片的名字
          filename: 'static/images/[hash][ext][query]',
        },
      },
    ],
  },
  mode: 'development',
}
