/**
 * Created by 扬 on 2016/7/19.
 */
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CssSourcemapPlugin = require('css-sourcemaps-webpack-plugin')
module.exports = {
    entry: {
      app:  './js/ngapp.js',
      leadapp:  './js/leaderapp.js',
    },
    output: {
        path: '../webapp/assets',
        filename: '/[name].bundle.js',
        chunkFilename: "/[name].chunk.js",
        publicPath:"/assets/"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // Transpile any JavaScript file:
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000&name=images/[name].[ext]'
            }, {
                test   : /\.(ttf|eot|svg|woff[2]?)(\?.*)?$/,
                loader : 'file-loader?name=fonts/[name].[ext]'
            }/*,{
                test:  /\.html$/,
                loader : 'file-loader?name=templates/[name].[ext]'
            }*/
        ]
    },
    // vue-loader configurations
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
        }
    },
    watch: true,
    watchOptions:{
        aggregateTimeout:300,
        poll:true
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new CssSourcemapPlugin()
    ],
    externals:{
        "jquery":"jQuery",
        "bootstrap":"'bootstarp'",
        "angular":"angular",
        "vue":"Vue",
        "vue-chartjs":"VueChartJs",
        "vue-resource":"VueResource",
        "angular-route":"'angular-route'",
        "angular-animate":"'angular-animate'",
        "angular-resource":"'angular-resource'",
        "angular-ui-bootstrap":"'angular-ui-bootstrap'",
        "angular-xeditable":"'angular-xeditable'"
    }
}