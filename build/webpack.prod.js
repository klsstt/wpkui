'use strict'
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: true,
			parallel: true
		}),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true,
				map: {
					inline: false
				}
			}
		}),
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new htmlWebpackPlugin({
			/*当指定了chunks属性，webpack会按照这个属性定义的数组，
            将数组中所有片段完成打包，并用script标签将打包的js插入到生成的页面中，
            没有在数组中的片段，则不插入页面,数组定义为”entry“定义的数组名称！*/
			chunks: ['index'],
			filename: 'index.html', //生成的文件名称
			template: './index.html', //html模板路径
			title: 'KUI',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		new htmlWebpackPlugin({
			/*当指定了chunks属性，webpack会按照这个属性定义的数组，
            将数组中所有片段完成打包，并用script标签将打包的js插入到生成的页面中，
            没有在数组中的片段，则不插入页面,数组定义为”entry“定义的数组名称！*/
			chunks: ['login'],
			filename: 'login.html', //生成的文件名称
			template: './src/login.html', //html模板路径
			title: 'KUI Login',
			inject: true,
			hash: true,
			cache: true,
			minify: { // 压缩 HTML 的配置
				minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
				minifyJS: true, // 压缩 HTML 中出现的 JS 代码
				removeComments: true, // 移除注释
				collapseWhitespace: true, // 缩去空格
				removeAttributeQuotes: true // 移除属性引号
			}
		}),
		// 缓存没有变动的模块
		new webpack.HashedModuleIdsPlugin(),
		// enable scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
          	path.join(__dirname, '../node_modules')
          ) === 0
				)
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: 'static',
			ignore: ['.*']
		}]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
})