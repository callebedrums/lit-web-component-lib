//webpack.config.js
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

const namespace = 'my-lib';
const nameSpace = 'myLib';

module.exports = merge(common, {
  entry: {
    "my-component": {
      import: path.resolve(__dirname, "src/my-component/index.ts"),
      library: {
        name: {
          root: [nameSpace, 'myComponent'],
          amd: `@${namespace}/my-component`,
          commonjs: `@${namespace}/my-component`,
        },
        type: "umd",
        umdNamedDefine: true,
      },
    }
  },
  output: {
    filename: `${namespace}.[name].js`,
    clean: true,
    library: {
      name: {
        root: [nameSpace, "[name]"],
        amd: `@${namespace}/[name]`,
        commonjs: `@${namespace}/[name]`,
      },
      type: "umd",
      umdNamedDefine: true,
    },
    path: path.resolve(__dirname, "dist/my-component"),
  },
});