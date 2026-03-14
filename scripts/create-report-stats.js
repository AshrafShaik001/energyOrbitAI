const { globSync } = require("glob");
const L = require("lodash");
const fs = require("fs");
const moment = require("moment");

const createStatsJson = (allureResultsPath) => {
  const resultJsonFiles = globSync(`${allureResultsPath}/*result.json`);
  const testSuiteXmlFiles = globSync(`${allureResultsPath}/*testsuite.xml`);

  const passedTestHistoryIds = [];
  let failedTestHistoryIds = [];
  const skippedTestHistoryIds = [];
  let numTests = 0;
  let numFailedTests = 0;
  let numPassedTests = 0;
  let numSkippedTests = 0;
  let started = 0;
  let finished = 0;

  if (testSuiteXmlFiles.length > 0) {
    for (const test of testSuiteXmlFiles) {
      let content = fs.readFileSync(test, "utf8");
      content = content.replace(/status='undefined'/g, "status='skipped'");
      fs.writeFileSync(test, content);
      const testCases = content.match(/<test-case[\s\S.]+?<\/name>/g);

      for (const testCase of testCases) {
        let start;
        let status;
        let stop;
        let name;

        try {
          [, start, status, stop, name] = testCase.match(
            /<test-case start='([0-9]+)' status='([a-z]+)' stop='([0-9]+)'>[\s\S.]+?<name>(.*?)<\/name>/,
          );
        } catch (e) {
          try {
            [, start, status, stop, name] = testCase.match(
              /<test-case start='([0-9]+)' status='([a-z]+)'>[\s\S.]+?<name>(.*?)<\/name>/,
            );
          } catch (e) {
            console.log(e);
          }
        }

        if (started === 0 || parseInt(start, 10) < started) {
          started = parseInt(start, 10);
        }
        if (finished === 0 || parseInt(stop, 10) > finished) {
          finished = parseInt(stop, 10);
        }

        if (status === "failed" || status === "broken") {
          failedTestHistoryIds.push(name);
        } else if (status === "passed") {
          passedTestHistoryIds.push(name);
        } else if (
          status === "pending" ||
          status === "skipped" ||
          status === "undefined"
        ) {
          skippedTestHistoryIds.push(name);
        }
      }
    }
    failedTestHistoryIds = L.uniq(
      L.difference(failedTestHistoryIds, passedTestHistoryIds),
    );

    numFailedTests = failedTestHistoryIds.length;
    numPassedTests = passedTestHistoryIds.length;
    numSkippedTests = Math.floor(skippedTestHistoryIds.length / 2); // skipped tests are always doubled???
    numTests = numFailedTests + numPassedTests + numSkippedTests;
  } else if (resultJsonFiles.length > 0) {
    for (const test of resultJsonFiles) {
      let json;
      try {
        json = JSON.parse(fs.readFileSync(test));
      } catch (e) {
        console.log(`${test}: ${e}`);
        continue;
      }

      if (started === 0 || json.start < started) {
        started = json.start;
      }
      if (finished === 0 || json.stop > finished) {
        finished = json.stop;
      }
      const { historyId, status } = json;

      if (status === "failed" || status === "broken") {
        failedTestHistoryIds.push(historyId);
      } else if (status === "passed") {
        passedTestHistoryIds.push(historyId);
      } else if (
        status === "pending" ||
        status === "skipped" ||
        status === "undefined"
      ) {
        skippedTestHistoryIds.push(historyId);
      }
    }
    failedTestHistoryIds = L.uniq(
      L.difference(failedTestHistoryIds, passedTestHistoryIds),
    );

    numFailedTests = failedTestHistoryIds.length;
    numPassedTests = passedTestHistoryIds.length;
    numSkippedTests = Math.floor(skippedTestHistoryIds.length / 2); // skipped tests are always doubled???
    numTests = numFailedTests + numPassedTests + numSkippedTests;
  }

  const duration = moment.duration(
    Math.floor((finished - started) / 1000),
    "seconds",
  );

  const stats = {
    total_scenarios: numTests,
    failed_scenarios: numFailedTests,
    passed_scenarios: numPassedTests,
    skipped_scenarios: numSkippedTests,
    percentage_passed: parseInt((numPassedTests / numTests) * 100, 10),
    percentage_failed: parseInt((numFailedTests / numTests) * 100, 10),
    percentage_skipped: parseInt((numSkippedTests / numTests) * 100, 10),
    started,
    finished,
    total_time: duration.hours()
      ? `${duration.hours()}h${duration.minutes()}m${duration.seconds()}s`
      : `${duration.minutes()}m${duration.seconds()}s`,
  };

  return JSON.stringify(stats);
};

module.exports = {
  createStatsJson,
};
