const fs = require("fs");
const fse = require("fs-extra");

options = () => {
  const report = `./reports/cucumber/results.html`;
  try {
    if (!fs.existsSync(report)) {
      fse.outputFileSync(report, "");
    }
  } catch {
    fse.outputFileSync(report, "");
  }

  return [
    `src/**/*.feature`,
    `--require-module ts-node/register`,
    `--require features/test.setup.ts`,
    `--require src/**/*.steps.ts`,
    `--format progress-bar`,
    `--format html:reports/cucumber/results.html`,
    `--format message:reports/cucumber/results.json`,
    `--publish-quiet`,
    `--world-parameters '{"baseUrl":"http://localhost:8080/"}'`,
  ];
};

module.exports = {
  default: options().join(" ")
};
