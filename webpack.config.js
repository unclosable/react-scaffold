const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const configFunc = require(path.join(__dirname, 'conf'));
const webpack = require('webpack');

const config = configFunc(process.env.NODE_ENV);

module.exports = {
    mode: config.isDev ? 'development' : 'production',
    entry: __dirname + '/src/index.js',
    output: {
        publicPath: '/',
        path: __dirname + "/build", //打包后的文件存放的地方
        filename: "[name]-[hash:8].js", //打包后输出文件的文件名
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'kick my ass',
            filename: 'index.html',
            template: __dirname + '/page/index.html',
            inject: true,
            path: '/build'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({ React: "react" }),
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(less|css)$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        }]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        port: 4000,
        https: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'page'), //本地服务器所加载的页面所在的目录
        inline: true, //实时刷新
        hot: true
    }
}