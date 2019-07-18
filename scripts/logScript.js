var fs = require("fs");
var path = require("path");
var minimist = require("minimist");
var moment = require("moment");
var argv = minimist(process.argv.slice(2));
const shell = require("shelljs");
var defaultTxt = "# 更新日志";

function updateReadMe(version) {
  let versionTxt = `## ${version}\n`;
  fs.readFile(
    `${path.resolve(__dirname, "../../../")}/${version}.json`,
    function(err, data) {
      if (err) {
        return console.error(err);
      }
      let newChange = JSON.parse(data.toString());
      let lodMd =
        defaultTxt +
        `\n\n` +
        versionTxt +
        "\n" +
        moment().format("YYYY-MM-DD  HH:mm") +
        "\n" +
        objToMd(newChange);

      fs.readFile(
        `${path.resolve(__dirname, "../../../stories/docs")}/change-log.md`,
        function(err, oldLog) {
          let newMd = oldLog.toString().replace(defaultTxt, lodMd);

          fs.writeFile(
            `${path.resolve(__dirname, "../../../stories/docs")}/change-log.md`,
            newMd,
            function(err) {
              if (err) {
                console.error(err);
              }
              console.log(`${path.resolve(__dirname, "..")}/log.md`);
              console.log("生成log成功.md");
            }
          );
        }
      );
    }
  );
}

function objToMd(obj, time) {
  let mdTxt = "";
  let timeNum = time || 1;
  let spaceTxt = "";
  for (let i = 0; i < timeNum; i++) {
    spaceTxt += `  `;
  }
  for (k in obj) {
    let type = Object.prototype.toString.call(obj[k]);
    if (type === "[object Object]") {
      mdTxt += `${objToMd(obj[k], timeNum + 1)}`;
    } else {
      console.log(timeNum);
      mdTxt += `${spaceTxt}- ${obj[k].toString()}\n`;
    }
  }
  return mdTxt;
}

updateReadMe(argv.v);
