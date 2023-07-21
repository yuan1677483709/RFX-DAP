/*
 * @Author: your name
 * @Date: 2021-07-16 08:58:10
 * @LastEditTime: 2021-07-23 14:58:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lsp\handy-parent\lps-static\vue.config.js
 */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    publicPath: '/',
    lintOnSave: false,
    chainWebpack: config => { 
        const svgRule = config.module.rule('svg');
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
        const fileRule = config.module.rule('file');
        fileRule.uses.clear();
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icon'))
            .end()
            .use('file-loader')
            .loader('file-loader');
        // const imgRule = config.module.rule('url');
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/theme/blue.less')]
        }
    },
    devServer: {
        port: 9529,
        open: true,
        host: "0.0.0.0",
        proxy: {
            '/log/': {
				target: process.env.VUE_APP_IP, //对应服务器的接口
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    '^/log': 'log'
                }
            },
            '/newApi/':{
                target:process.env.VUE_APP_NEWIP,
                changeOrigin:true,
                secure:false,
                ws:true,
                pathRewrite:{'^/newApi':'log'}
            },
            '/py/':{
                target:process.env.VUE_APP_IP_PY,
                changeOrigin:true,
                secure:false,
                ws:true,
                pathRewrite:{'^/py':''}
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            }),
            new CopyWebpackPlugin([{
                from: path.join(__dirname, './src/assets/3Dzhuzhuang.png'),
                to: path.join(__dirname, './dist/img/3Dzhuzhuang.png')
            }])
        ]
    },
    productionSourceMap: false
};