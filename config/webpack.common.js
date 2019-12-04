const pathLib = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const makePlugins = (configs) => {
  const plugins = [new CleanWebpackPlugin({}),
    new webpack.ProvidePlugin({
      _: 'lodash',
    })];

  Object.keys(configs.entry).forEach((item) => {
    plugins.push(new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: `${item}.html`,
      chunks: [item],
    }));
  });

  const files = fs.readdirSync(pathLib.resolve(__dirname, '../dll'));
  files.forEach((file) => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: pathLib.resolve(__dirname, '../dll', file),
      }));
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: pathLib.resolve(__dirname, '../dll', file),
      }));
    }
  });
  return plugins;
};

const configs = {
  entry: {
    index: './src/index.js',
    react: './src/react.js',
  },
  resolve: {
    extensions: ['.js', 'jsx'],
    alias: {
      delllee: pathLib.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader', {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
          // {loader: "imports-loader?this=>window"}
        ],
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 占位符
            name: '[name]_[hash]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },

    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 异步代码生效
      minSize: 30000, // 分割的最小大小
      minChunks: 3, // 最小分割次数
      maxAsyncRequests: 6, // 同时最大异步数
      maxInitialRequests: 4, // 同时引入最大异步数
      automaticNameDelimiter: '~', // 文件连接符
      automaticNameMaxLength: 30, // 文件长度
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          filename: 'SSSS',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        cacheGroups: {
          test: '/[\\/]node_modules[\\/]/',
          priority: -10,
          name: 'vendors',
        },
      },
    },
  },
  output: {
    path: pathLib.resolve(__dirname, '../dist'),
  },
};

configs.plugins = makePlugins(configs);
module.exports = configs;
