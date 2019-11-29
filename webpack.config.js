const pathLib = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	mode: "development", //是否压缩一行
	devtool: "cheap-module-eval-source-map",
	//定位错误  source-map文件.map inline合并到js最后一行 cheap只精确到行，只精确到业务代码  module精确模块错误  eval速度最快
	//开发 cheap-module-eval-source-map
	//生产 cheap-module-source-map,
	entry: './src/index.js',
	devServer: {
		publicPath: "/",
		contentBase: "./dist",
		open: true,
		hot: true,
		hotOnly: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
				
			},
			{
				test: /\.(jpg|gif|png)$/,
				use: {
					loader: "url-loader",
					options: {
						//占位符
						name: '[name]_[hash]',
						outputPath: 'images/',
						limit: 2048
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', {
					loader: 'css-loader',
					options: {
						importLoaders: 2, //走之前的loader
						modules: true
					}
				}, 'postcss-loader']
			},
		]
	},
	//运行到某个时刻，做的事情
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin({}),
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true
	},
	output: {
		publicPath: "/",
		filename: "bundle.js",
		path: pathLib.resolve(__dirname, 'dist')
	}
}
