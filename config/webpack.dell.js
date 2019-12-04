const pathLib = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendors: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: '[name].dll.js',
    path: pathLib.resolve(__dirname, '../dll'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: pathLib.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
};
