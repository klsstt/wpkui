const webpack = require('webpack')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist', //本地服务器加载的页面所在的目录
		inline: true, //设置实时刷新
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new htmlWebpackPlugin({
			/*当指定了chunks属性，webpack会按照这个属性定义的数组，
            将数组中所有片段完成打包，并用script标签将打包的js插入到生成的页面中，
            没有在数组中的片段，则不插入页面,数组定义为”entry“定义的数组名称！*/
			chunks: ['index'],
			filename: 'index.html', //生成的文件名称
			template: './index.html', //html模板路径
			title: 'KUI',
			keywords: 'KUI，是一款轻量级扁平化响应式UI框架。',
			description: 'KUI ADMIN，网站后台模版,上手简单,扩展方便,为企业级平台提供高效解决方案！',
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
		new htmlWebpackPlugin({
			/*当指定了chunks属性，webpack会按照这个属性定义的数组，
            将数组中所有片段完成打包，并用script标签将打包的js插入到生成的页面中，
            没有在数组中的片段，则不插入页面,数组定义为”entry“定义的数组名称！*/
			chunks: ['login'],
			filename: 'login.html', //生成的文件名称
			template: './src/login.html', //html模板路径
			//template: 'html-withimg-loader!' + path.resolve(__dirname, '../src/login.html'),
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
		// name 是根据entry中的入口名字
		new ExtractTextPlugin({
			filename: '[name].css?rd=[hash:8]'
		}),
	]
})