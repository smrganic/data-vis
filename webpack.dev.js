const { merge } = require("webpack-merge")
const base = require("./webpack.base")
const path = require('path')

module.exports = merge(base, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        publicPath: "/dist/",
        contentBase: path.join(__dirname, "public"),
        port: 8080,
        compress: true,
        open: true,
        watchContentBase: true,
    }
})