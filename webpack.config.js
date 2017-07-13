const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  source: path.join(__dirname, "src"),
  build: path.join(__dirname, "public")
};

module.exports = {
  entry: paths.source + "/index.js",
  output: {
    path: paths.build,
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: paths.build,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
};
