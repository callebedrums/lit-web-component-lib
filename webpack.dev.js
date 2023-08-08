//webpack.dev.js
const path = require("path");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Micro-Frontend Shell",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
  },
});