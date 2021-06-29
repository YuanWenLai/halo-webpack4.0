// webpack.dev.js 主要是，开发环境实现的是热更新，不要压缩代码，完整的soureMap

/* 
1、webpack-merge，合并配置
*/

const Webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge') // 用于合并webpack的配置文件

module.exports = WebpackMerge.merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // 开发环境服务配置
    devServer: {
        port: 3000,
        hot: true, // 热更新
        contentBase: '../dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
})