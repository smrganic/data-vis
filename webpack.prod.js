const { merge } = require("webpack-merge")
const base = require("./webpack.base")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(base, {
    mode: "production",
    plugins: [new MiniCssExtractPlugin({ filename: "style.css" })],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
})