/*
 * @Author: Haojin Sun
 * @Date: 2019-12-05 13:57:24
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2019-12-18 09:19:05
 */

const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  mode: 'development',
  /**
   * 在这里配置输入输出   输出名: 输入文件的地址
   */
  entry: fs.readdirSync(`${__dirname}/src`).reduce((entries, dir) => {
    const fullDir = path.join(`${__dirname}/src`, dir)
    if (fs.existsSync(fullDir)) {
        entries[dir] = fullDir
    }
    return entries
}, {}),
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use:[
            "babel-loader"
        ],
        exclude: /node_modules/, 
      },
    ],
  },
  devtool: 'source-map',
  // 出口
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,  // 混淆
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,  // true  保存类名
                keep_fnames: true,    //保留名称
            }
        }),
    ]
  }
}