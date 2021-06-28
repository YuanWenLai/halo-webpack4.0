// webpack.config.js

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 打包后的文件，插入html中引用的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 打包前删除清理旧文件的插件
const MiniCssExtracrPlugin = require("mini-css-extract-plugin") // CSS样式抽离,整合到一个css中
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin") // 拆分一个css成多个css文件
const { url } = require("inspector")
const loader = require("sass-loader")

let IndexCss = new ExtractTextWebpackPlugin("index.css")
let HeaderLess = new ExtractTextWebpackPlugin("header.less")

module.exports = {
    mode: 'development',
    // entry: path.resolve(__dirname,'../src/main.js'), // 单个入口文件
    // 多文件入口
    entry: {
        main: path.resolve(__dirname,'../src/main.js'),
        header: path.resolve(__dirname,'../src/header.js'),
    },
    output: {
        // filename: 'output.js', // 打包后的文件名
        filename: '[name].[hash:8].js', // 打包后的文件名，哈希处理
        path: path.resolve(__dirname,'../dist'), // 打包后的目录
    },
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
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // use: ['style-loader','css-loader'], // 普通打包，css嵌入到js中

                // css方法三，拆分一个css成多个css文件
                use: IndexCss.extract({
                    use: ['css-loader','less-loader']
                })
            },
            {
                // css方法一，默认写到js中；css方法二，CSS样式在js中抽离,整合到一个css中
                test: /\.less$/,
                // use: [MiniCssExtracrPlugin.loader,'style-loader','css-loader','postcss-loader','less-loader']
                use: [MiniCssExtracrPlugin.loader,'css-loader','postcss-loader','less-loader']
            }
            // {
            //     // 方法三，拆分多个css
            //     test: /\.less$/,
            //     // use: [MiniCssExtracrPlugin.loader,'style-loader','css-loader','postcss-loader','less-loader']
            //     use: HeaderLess.extract({
            //         use: ['css-loader','less-loader']
            //     })
            // }

        ],
        
    },
    plugins: [
        new CleanWebpackPlugin(), // 清理上一次打包的文件
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            filename:'index.html',
            chunks:['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/header.html'),
            filename:'header.html',
            chunks:['header'] // 与入口文件对应的模块名
        }),
        // css方法二，CSS样式在js中抽离,整合到一个css中
        new MiniCssExtracrPlugin({
            filename: "css/common.css"
            // filename: "[name].[hash].css",
            // chunkFilename: "[id].css"
        }),
        // css方法三，拆分一个css成多个css文件
        IndexCss,
        HeaderLess
    ],
}
