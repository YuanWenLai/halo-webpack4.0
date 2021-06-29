// webpack.prod.js 主要压缩代码，提取css文件，合理的soureMap，分割代码

// cnpm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin

/* 
1、webpack-merge，合并配置
2、copy-webpack-plugin，拷贝静态资源
3、optimize-css-assets-webpack-plugin，压缩css
4、uglifyjs-webpack-plugin，压缩js
*/

// tips: webpack mode 设置位production时，会自动压缩js
//       原则上不需再用uglifyjs来进行压缩js，重复工作
//       但是optimize-css-assets-webpack-plugin压缩css时，会破坏原有的压缩js，因此需要引入uglifyjs进行压缩

const path = require("path")
const webpackConfig = require("./webpack.config")
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsJsPlugin = require('uglify-js')
console.log("🚀 ~ file: webpack.prod.js ~ line 22 ~ UglifyjsJsPlugin", UglifyjsJsPlugin)

module.exports = WebpackMerge.merge(webpackConfig,{
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        // 从public拷贝静态资源到dist
        new CopyWebpackPlugin({
            patterns:[{
                from:path.resolve(__dirname,'../public'),
                to:path.resolve(__dirname,'../dist')
            }]
        }
        ),
    ],
    optimzation: {
        minizer:[
            new UglifyjsJsPlugin({ // 压缩js
                caches: true,
                parallel: true, // 使用多进程并发运行以提高构建速,并发运行可以显著提高构建速度，因此强烈建议添加此配置 
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin(), // 压缩css
        ],
        // 对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略
        // 默认情况下，它只会影响到按需加载的 chunks
        /* 
        webpack 将根据以下条件自动拆分 chunks：
            新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
            新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
            当按需加载 chunks 时，并行请求的最大数量小于或等于 30
            当加载初始化页面时，并发请求的最大数量小于或等于 30
        当尝试满足最后两个条件时，最好使用较大的 chunks
        */
        splitChunks: {
            chunks: 'all',
            cacheGroups: { // 缓存组可以继承和/或覆盖来自
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    }
})


