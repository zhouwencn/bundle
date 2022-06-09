const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                // 其他选项
              },
            ],
          ],
        },
      },
    },
    pre,
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: 'static/js/bundle.js',
  //   clean: true, // 在生成文件之前清空 output 目录
  // },
  module: {
    generator: {},
    parser: {},
    // noParse: '',
    unsafeCache: false,
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            // 执行顺序，从右到左
            // css-loader将css资源编译成commonjs的模块到js中
            // style-loader将js中的css通过创建style标签添加html文件中生效
            use: getStyleLoader(),
          },
          // compiles Less to CSS
          {
            test: /\.less$/,
            use: getStyleLoader('less-loader'),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader('sass-loader'),
          },
          {
            test: /\.styl$/,
            // 换一种写法
            use: getStyleLoader('stylus-loader'),
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
          // 处理字体图标
          {
            test: /\.(eot|svg|ttf|woff2?|mp3|mp4|avi)$/i,
            type: 'asset/resource', // 原封不动的处理，不做base64处理
            // 将输出的图片指定到特定的目录
            // hash表示文件名， ext表示文件扩展名 query是一些其他参数
            // 如果希望文件名可以对hash做一下处理 比如写[hash:10]
            generator: {
              // 输入图片的名字
              filename: 'static/media/[hash:10][ext][query]',
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // exclude和include只能二选一
            include: path.resolve(__dirname, '../src'),
            // 也可以将配置写在外面，不写在里面，方便修改
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
    }),
    new CssMinimizerPlugin(),
  ],
  // 生产模式不需求启后台服务
  devServer: {
    static: {
      // static可以是一个数组，用来配置多个静态资源文件夹
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 9066,
    hot: true, // 开启HMR功能，默认为ture
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
}
