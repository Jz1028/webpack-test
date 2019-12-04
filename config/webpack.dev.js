const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development', // 是否压缩一行
  devtool: 'cheap-module-eval-source-map',
  // 定位错误  source-map文件.map inline合并到js最后一行 cheap只精确到行，只精确到业务代码  module精确模块错误  eval速度最快
  // 开发 cheap-module-eval-source-map
  // 生产 cheap-module-source-map,
  devServer: {
    overlay: true, // eslint 显示
    historyApiFallback: true, // 路由
    publicPath: '/',
    contentBase: './dist',
    open: true,
    hot: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/220f30ab6dbcc3d4a24def1529149903/three',
        secure: false,
        // eslint-disable-next-line consistent-return
        bypass(req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return './index.html';
          }
        },
        pathRewrite: {
          'header.json': 'demo.json',
        },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 走之前的loader
            modules: true,
          },
        }, 'postcss-loader'],
      },
    ],
  },
  // 运行到某个时刻，做的事情
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

};

module.exports = merge(commonConfig, devConfig);
