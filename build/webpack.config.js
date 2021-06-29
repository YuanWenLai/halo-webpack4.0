// webpack.config.js

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 打包后的文件，插入html中引用的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 打包前删除清理旧文件的插件
const MiniCssExtracrPlugin = require("mini-css-extract-plugin") // CSS样式抽离,整合到一个css中
const vueLoaderPlugin  = require("vue-loader/lib/plugin") // 打包vue文件

// 用于判断是开发环境development，还剩生产环境production
const devMode = process.argv.indexOf("--mode=production") === -1
console.log(" ~ devMode", devMode)

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname,'../src/main.js'),
    },
    // 输出口
    output: {
        path: path.resolve(__dirname,'../dist'), // 打包后的目录
        filename: 'static/js/[name].[hash:8].js', // 打包后的文件名，哈希处理
        chunkFilename:'static/js/[name].[hash:8].js' // 打包嵌入html对应的名字
    },
    // 解析不用的语言or文件配置
    module: {
        rules: [
            // 处理babel，es7
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env']
                        presets: ['es2015']
                    }
                },
                exclude: /node_modules/
            },
            // 处理vue文件
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtracrPlugin.loader,'css-loader','postcss-loader']
            },
            {
                // css方法一，默认写到js中；css方法二，CSS样式在js中抽离,整合到一个css中
                test: /\.less$/,
                // use: [MiniCssExtracrPlugin.loader,'style-loader','css-loader','postcss-loader','less-loader']
                use: [MiniCssExtracrPlugin.loader,'css-loader','postcss-loader','less-loader']
            },
            // 处理图片文件
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            // 处理视频文件
            {
                test: /\.(mpd|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ],
    },
    // 解析文件配置
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname,'../src')
        },
        extensions: ['*','.js','.json','.vue']
    },
    
    plugins: [
        new CleanWebpackPlugin(), // 清理上一次打包的文件
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            filename:'index.html',
            chunks:['main'] // 与入口文件对应的模块名
        }),
        // css方法二，CSS样式在js中抽离,整合到一个css中
        new MiniCssExtracrPlugin({
            filename: devMode ? "static/css/[name].css" : "static/css/[name][hash].css" ,
            chunkFilename: devMode ? "[id].css" : "[id][hash].css"
        }),
        // 解析vue的loader插件
        new vueLoaderPlugin(),
    ],
}
