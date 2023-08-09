# How to Generating this project.

This is the documentation on how this project was generated from the ground up.

## Env

When this project was created, we used node v18.17.0 and npm 9.6.7

## Empty repo

For this PoC, we started by creating an empty github repository having only the README.md and .gitignore files.

## Basic configuration

1. `npm init -y` to initiate an npm project and generate the package.json
2. `npm install webpack webpack-cli --save-dev` installed webpack and webpack-cli as dev dependencies to bundle the code
3. src folder created. src/index.html and src/index.js files created

```HTML
<!--src/index.html-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Micro-Frontend Shell</title>
  </head>
  <body>
  </body>
</html>
```

```JavaScript
//index.js
const h1 = document.createElement("h1");
h1.innerText = "Micro-Frontend Shell";
document.getElementsByTagName("body")[0].append(h1);
```

5. removed `"main"` entry from package.json
6. added `build` script in package.json: `"build": "webpack"`. We can run `npm run build` to bundle the project now. It creates a dist folder after that with the bundled project.
7. webpack.config.js file created.

```Javascript
//webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

8. Updated `build` script to use configuration file: `"build": "webpack --config webpack.config.js"`
9. Install style loader dependencies: `npm install --save-dev style-loader css-loader`
10. Install html loader dependencies: `npm install --save-dev html-loader`
11. update webpack to configure style and assets loaders

```JavaScript
//webpack.config.js
module.exports = {
  //... entry
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ],
  },
  //... output
};
```

12. Install HtmlWebpackPlugin to generate the index.html file in the dist folder: `npm install --save-dev html-webpack-plugin`
13. update webpack.config.js to use the HtmlWebpackPlugin:

```JavaScript
//webpack.config.js
//...
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //... entry, modules
  plugins: [
    new HtmlWebpackPlugin({
      title: "Micro-Frontend Shell",
      template: "./src/index.html"
    }),
  ],
  //... outpput
};
```

14. clean dist folder before building again, by adding the `clean` option to output configuration: `clean: true`
15. add `mode: 'development'` to webpack.config.js
16. add `devtool: "source-map"` to webpack.config.js
17. install webpack-dev-server to serve the project in a dev environment: `npm install --save-dev webpack-dev-server`
18. update webpack.config.js with dev-server configuration:

```JavaScript
module.exports = {
  // ...
  devServer: {
    static: "./dist",
  },
  // ...
};
```

19. update package.json with script to start the dev server: `"start": "webpack serve"`. Now we should have a dev server running by the command "npm start". It will build and serve the files in localhost:8080. It will also listen for file changes, rebuild and reload the page dinamically. To automatically open the application in the brouser, run `npm start -- --open`
20. install webpack-merge: `npm install webpack-merge --save-dev`
21. create files webpack.common.js and webpack.dev.js, and update webpack.config.js

```Javascript
//webpack.common.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Micro-Frontend Shell",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

```JavaScript
//webpack.dev.js
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
});
```

```JavaScript
//webpack.config.js
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
});
```

22. update `start` script in package.json to consider new config file: `"start": "webpack serve --config webpack.dev.js"`
23. moved output config from webpack.common.js to webpack.dev.js and webpack.config.js
24. updated output config in webpack.config.js and added optimizations configuration

```JavaScript
module.exports = merge(common, {
  // ...
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  }
});
```

25. install typescript and typescript loader `npm install --save-dev typescript ts-loader`
26. create tsconfig.json file

```JSON
{
  "ts-node": {
    "transpileOnly": true,
    "compilerOptions": {
      "module": "CommonJS"
    }
  },
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": false,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "esnext",
    "target": "es2015",
    "allowJs": true,
    "moduleResolution": "node",
    "typeRoots": ["node_modules/@types"],
    "resolveJsonModule": true,
    "baseUrl": "./"
  }
}

```

27. update webpack.common.js to include the ts loader and resolve configuration

```JavaScript
//webpack.common.js
//...

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // ... other modules
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // ....
};
```

28. rename index.js to index.ts, and update `entry` value in webpack.common.js
29. install mini-css-extract-plugin `npm install --save-dev mini-css-extract-plugin`
30. update webpack.common.js css `module.rules` to use the `mini-css-extract-plugin`. This will extract any css imported in a js/ts file into its own css file.

```JavaScript
// webpacl.common.js
// ...

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const styleLoader = "style-loader";
const styleLoader = MiniCssExtractPlugin.loader;

module.exports = {
  // ...
  module: {
    rules: [
      // ... other modules
      {
        test: /\.css$/i,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // ... other modules
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // ....
};

```

29. install sass and sass-loader `npm install --save-dev sass sass-loader`
30. update webpack.common.js and add rule to load sass file

```JavaScript
// webpack.common.js
// ...

module.exports = {
  // ...
  module: {
    rules: [
      // ... other modules
      {
        test: /\.s[ac]ss$/i,
        use: [
          styleLoader,
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
        exclude: /(node_modules|style.s[ac]ss$)/,
      },
      // ... other modules
    ],
  },
  // ....
};
```

31. install `lit` `npm install --save-dev lit`
32. create folder `my-component` and `index.ts`, `my-component.ts` files

```TypeScript
// my-component/my-component.ts
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = css`
    :host {
      color: green;
    }
  `;

  @property() value?: string = "";

  protected render() {
    return html`<h1>${this.value}</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-component": MyComponent;
  }
}
```

```TypeScript
// my-component/index.ts
export * from './my-component';
```

33. update src/index.ts to use MyComponent

```TypeScript
// src/index.ts
// export it to be included in the bundle
export { MyComponent } from "./my-component";

const myComponent = document.createElement('my-component');
myComponent.myProp = "Lit Web Component Lib";
document.getElementsByTagName("body")[0].appendChild(myComponent);
```

34. install `lit-scss-loader` and `extract-loader` so we can put component styles in a different file. `npm install --save-dev extract-loader lit-scss-loader`
35. create my-component/my-component.style.scss, and types/types.d.ts files
36. move style from my-component.ts static attribute to my-component.style.scss file
37. update webpack.common.js to use lit-scss-loader and extract-loader for `*.style.scss` files

```TypeScript
// types.d.ts
declare module "*.scss" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.sass" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}

declare module "*.css" {
  import { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}
```

```scss
/*my-component.style.scss*/
:host {
  color: green;
}
```

```TypeScript
//my-component.ts
//..

import style from "./my-component.style.scss";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = [style];

  //...
}
```

```JavaScript
// webpack.common.js
// ...

module.exports = {
  // ...
  module: {
    rules: [
      // ... other modules
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
      // ... other modules
    ],
  },
  // ....
};
```

**IMPORTANT** to note that `*.scss` files and `*.style.scss` files are going to be loaded differently. The first one is intended to be used generically in the application for any scss file. The second one is intend to be used only for lit components.
Do not name style files with the sufix `.style.scss` if they are not intend to be used as lit component styles.

38. Lets change webpack.config.js file to compile `my-component` as a library.
39. create a tsconfig.lib.json file
40. add script to package.json: `"build-types": "tsc --project tsconfig.lib.json"`
41. add script to package.json: `"build-lib": "webpack --config webpack.config.js"`
42. update script `build` to: `"build": "npm run build-lib && npm run build-types"`

```JavaScript
// webpack.common.js
//webpack.config.js
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  entry: {
    "my-component": {
      import: path.resolve(__dirname, "src/my-component/index.ts"),
      library: {
        name: {
          root: [nameSpace, 'myComponent'],
          amd: `@${namespace}/'my-component'`,
          commonjs: `@${namespace}/'my-component'`,
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
```

## Testing configuration

1. Install test dependencies: `npm install --save-dev karma jasmine coverage-istanbul-loader @types/jasmine @types/node karma-chrome-launcher karma-cli karma-coverage-istanbul-reporter karma-html-reporter karma-jasmine karma-json-reporter karma-junit-reporter karma-spec-reporter karma-webpack`
2. create karma.conf.js and webpack.spec.js files

```JavaScript
// karma.conf.js
// Karma configuration
const path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["webpack", "jasmine"],
    plugins: [
      "karma-jasmine",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-junit-reporter",
      "karma-html-reporter",
      "karma-json-reporter",
      "karma-coverage-istanbul-reporter",
    ],
    files: ["src/**/!(*.e2e).spec.ts"],
    preprocessors: {
      "src/**/*.ts": ["webpack"],
    },
    webpack: require(path.join(__dirname, "./webpack.spec.js")),
    coverageIstanbulReporter: {
      reports: ["html", "text-summary", "json-summary", "lcovonly"],
      dir: path.join(__dirname, "./reports/coverage"),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      "report-config": {
        "json-summary": {
          file: "coverage.json",
        },
      },
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 80,
          branches: 70,
          functions: 80,
          lines: 80,
        },
      },
    },
    junitReporter: {
      outputDir: path.join(__dirname, "./reports"),
      useBrowserName: false,
      outputFile: "results.xml",
    },
    jsonReporter: {
      stdout: false,
      outputFile: path.join(
        __dirname,
        "./reports/results.json"
      ),
    },
    htmlReporter: {
      outputDir: path.join(__dirname, "./reports"),
      namedFiles: true,
      reportName: "results",
    },
    reporters: ["progress", "junit", "html", "json", "coverage-istanbul"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
  });
};

```

```JavaScript
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

```

3. create a spec file to test the component: my-component/my-component.spec.ts

```Typescript
//my-component.spec.ts
import { MyComponent } from "./my-component";

describe("My Component", () => {
  it("should create component", () => {
    const component = new MyComponent();
    expect(component).toBeDefined();
  });
});

```

4. add/update `test` script in package.json: `"test": "karma start karma.conf.js"`.
5. test karma runner by executing `npm run test`. It will keep listening for file changes to re-trigger the test. Press `CTRL + C` to stop the test.
6. run `npm run test -- --single-run` to execute the test just once.
7. test reports were created and stored under the `/reports` folder.

## Instaling lint and prettier

1. install dependencies: `npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier prettier-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
2. create files .eslintignore and .eslintrc

```.eslintignore
node_modules/
dist/
coverage/
reports/
package.json
package-lock.json
**/tsconfig.**.json
**/karma.conf.js
**/tslint.json
*.spec.ts
*.js
```

```JSON
// .eslintrc
{
  "root": true,
  "parser": "@typescript-eslint/parser", // Specifies the ESLint parser
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  "parserOptions": {
    "ecmaVersion": 2020, // Allows for the parsing of modern ECMAScript features
    "sourceType": "module" // Allows for the use of imports
  },
  // TODO change no-console property
  "rules": {
    "no-var": "error",
    "@typescript-eslint/no-explicit-any": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": ["error", { "args": "after-used" }],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["error"],
    "@typescript-eslint/no-this-alias": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "prettier/prettier": ["error"],
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}

/*
Off - 0
Warn - 1
Error - 2
*/

```

3. update package.json with the following scripts:

- `"lint": "tsc --noEmit && eslint ./src --ext ts --quiet"` - runs eslint to check code quality
- `"pretty-check": "prettier --check src/**/*.ts"` - runs pretty to check code style
- `"pretty-fix": "prettier --write src/**/*.ts"` - runs pretty and fix code style if possible

## Component and End-2-End test

1. install dependencies: `npm install --save-dev @cucumber/cucumber @playwright/test ts-node`
2. `npx playwright install`
3. create files cucumber.js, playwright.config.ts, features/types.ts, features/test.setup.ts
4. create files my-component.feature, my-component.steps.ts, my-component.e2e.spec.ts
5. add scripts to package.json
   - "test:e2e": "playwright test --config=playwright.config.ts"
   - "bdd": "cucumber-js"

## References

[Webpack Guides](https://webpack.js.org/guides/)

[PlayWright](https://playwright.dev/docs/test-reporters)
