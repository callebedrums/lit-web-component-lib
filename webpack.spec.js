//webpack.spec.js

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|\.spec\.ts$)/,
        enforce: "post",
        use: [
          {
            loader: "coverage-istanbul-loader",
            options: {
              esModules: true,
            },
          },
        ],
      },
      {
        test: /\.style\.s[ac]ss$/i,
        use: [
          "lit-scss-loader",
          "extract-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  stats: { warnings: false },
  performance: {
    hints: false,
  },
};
