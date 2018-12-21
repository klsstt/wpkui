const path = require('path')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
	test: /\.(js)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [resolve('src'), resolve('test')],
	options: {
		emitWarning: !false
	}
})

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		index: './src/main.js',
		login: './src/login.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
	},
	resolve: {
		extensions: ['.js', '.html', '.json'],
		alias: {
			'@': resolve('src'),
			'images': resolve('src/images'),
			'fonts': resolve('src/fonts')
		}
	},
	module: {
		rules: [
			...(true ? [createLintingRule()] : []),
			{
				test: require.resolve('jquery'),
				loader: 'expose-loader?jQuery!expose-loader?$'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					publicPath: '/',
					use: 'css-loader'
				})
				/*
        loader: [
          'style-loader',
          'css-loader'
        ]
				use: [
					'style-loader',
					'css-loader'
				]*/
			},
			/* 	{
      		test: /\.html$/,
      		loader: 'html-withimg-loader'
      	}, */
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('images/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}