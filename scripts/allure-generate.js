/* eslint-disable import/no-extraneous-dependencies */
const allure = require("allure-commandline");
// const { combineAllure } = require('allure-single-html-file-js');
const commander = require("commander");
const fs = require("fs-extra");
const { execSync } = require("child_process");

commander
  .option("-i, --input <path>", "Path to allure-results folder")
  .option("-o, --output <path>", "Path to allure-report folder")
  .option("-h, --history <path>", "Path to allure-history folder")
  .option(
    "-r, --test-results <path>",
    "Path to the test-results folder that QA Lab uses",
  )
  .option("-u, --uuid <uuid>", "UUID of the test run")
  .parse(process.argv);

const options = commander.opts();

const isExternalRun = !!process.env.IS_EXTERNAL_RUN;
const inputDir = (options.input || "allure-results").replace(/\/$/, "");
const outputDir = (options.output || "./allure-report").replace(/\/$/, "");
const historyDir = (options.history || "./allure-history").replace(/\/$/, "");
const testResultsDir = (options.testResults || "./../test-results").replace(
  /\/$/,
  "",
);
const { createStatsJson } = require("./create-report-stats");

if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir);
}

if (fs.existsSync(historyDir)) {
  fs.cpSync(historyDir, `${inputDir}/history`, { recursive: true });
}

const stats = createStatsJson(inputDir);
console.log(stats);

const generation = allure(["generate", inputDir]);
generation.on("exit", async (exitCode) => {
  if (isExternalRun && fs.existsSync(`${outputDir}/history`)) {
    fs.moveSync(`${outputDir}/history`, historyDir, { overwrite: true });
  }

  const singleFile = allure([
    "generate",
    "--clean",
    `--single-file ${inputDir}`,
    `--output ${outputDir}`,
  ]);
  singleFile.on("exit", async (exitCode) => {
    if (isExternalRun && fs.existsSync(`${testResultsDir}`)) {
      fs.rmdirSync(`${testResultsDir}`, { recursive: true });
    }
    fs.writeFileSync(`${outputDir}/stats.json`, stats);
    if (!isExternalRun) {
      console.log(`report: ${outputDir}/index.html`);
      // execSync(`open ${outputDir}/index.html`);
    }
  });
});
