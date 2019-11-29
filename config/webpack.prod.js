const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
	mode: "production", //是否压缩一行
	devtool: "cheap-module-source-map",
	//定位错误  source-map文件.map inline合并到js最后一行 cheap只精确到行，只精确到业务代码  module精确模块错误  eval速度最快
	//开发 cheap-module-eval-source-map
	//生产 cheap-module-source-map,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2, //走之前的loader
							modules: true
						}
					}, 'postcss-loader']
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},
	output: {
		filename: "[name].[contenthash].js",
		chunkFilename: "[name].[contenthash].js"
	}
}
module.exports = merge(commonConfig, prodConfig)


