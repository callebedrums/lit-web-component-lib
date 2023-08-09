# lit-web-component-lib

playground to test how to create a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) lib with [lit](https://lit.dev/)

Refer to [Generate Project](GENERATE-PROJECT.md) to understand how this project was generated from ground up

## Quick start

```shell
# clone the project
git clone git@github.com:callebedrums/lit-web-component-lib.git

# change workind directory
cd lit-web-component-lib

# install dependencies
npm install

# build projects
npm run build

# start dev server
npm start -- --open
```

## Component Test

Component test implemented using PlayWright.

In order to execute the component test, we have to run two commands in two different terminals.
The first one is to execute the app.

```shell
npm start
```

The second command to execute is the component test itself.

```shell
# execute
npm run test:e2e
```

One alternative is to serve the component in a docker container, and point the component test to this docker container.

# BDD Test

BDD test uses Cucumber + PlayWright to perform Behavior test.

In order to execute the component test, we have to run two commands in two different terminals.
The first one is to execute the app.

```shell
npm start
```

The second command to execute is the BDD test itself.

```shell
# execute
npm run bdd
```

One alternative is to serve the component in a docker container, and point the component test to this docker container.

```shell
# execute
npm run bdd -- --world-parameters '{"baseUrl":"http://docker-server:docker-port/"}'
```

## Reports

Unit tests and Component tests generate reports, located at:

| Test           | Report   | output type  | location                       |
| -------------- | -------- | ------------ | ------------------------------ |
| Unit Test      | Coverage | html         | reports/coverage/index.html    |
| Unit Test      | Coverage | json-summary | reports/coverage/coverage.json |
| Unit Test      | Coverage | lcovonly     | reports/coverage/lcov.ingo     |
| Unit Test      | Json     | json         | reports/results.xml            |
| Unit Test      | Junit    | xml          | reports/results.xml            |
| Unit Test      | HTML     | html         | reports/results.html           |
| Component Test | HTML     | html         | reports/e2e/index.html         |
| Component Test | Json     | json         | reports/e2e/results.json       |
| Component Test | Junit    | xml          | reports/e2e/results.xml        |
| BDD Test       | HTML     | html         | reports/cucumber/results.html  |
| BDD Test       | Json     | json         | reports/cucumber/results.json  |

## Lint and Prettier

Lint is used to enforce good code quality, while Prettier is use to enforce good code formating.

```shell
# execute the lint tool to check rule violations
npm run lint
```

```shell
# check for code format rules violation
npm run pretty-check
```

```shell
# automatically fix code format.
npm run pretty-fix
```
