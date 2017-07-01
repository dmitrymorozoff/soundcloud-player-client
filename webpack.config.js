const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {
        app: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name].bundle.js",
        publicPath: "./public"
    },
    watch: true,
    devServer: {
        contentBase: path.resolve(__dirname, "./public")
    },
    module: {
        rules: [{
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                }]
            }
        ]
    },
    plugins: [new ExtractTextPlugin("app.css")]
};