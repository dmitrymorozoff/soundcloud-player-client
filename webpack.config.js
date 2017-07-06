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
    contentBase: path.resolve(__dirname, "./public"),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["es2015"] }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "app.css",
      allChunks: true,
      disable: process.env.NODE_ENV !== "production"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
