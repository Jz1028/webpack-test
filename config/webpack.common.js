const pathLib = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
	entry: {
		index: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{loader: "babel-loader"},
					{loader: "imports-loader?this=>window"}
				]
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
		
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin({}),
		new webpack.ProvidePlugin({
			_: 'lodash'
		})
	],
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all',  //异步代码生效
			minSize: 30000, //分割的最小大小
			minChunks: 3, //最小分割次数
			maxAsyncRequests: 6,  //同时最大异步数
			maxInitialRequests: 4,  //同时引入最大异步数
			automaticNameDelimiter: '~',  //文件连接符
			automaticNameMaxLength: 30, //文件长度
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,  //优先级
					filename: 'SSSS'
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				cacheGroups: {
					test: '/[\\/]node_modules[\\/]/',
					priority: -10,
					name: 'vendors'
				}
			}
		}
	},
	output: {
		publicPath: "/",
		
		path: pathLib.resolve(__dirname, '../dist')
	}
}


