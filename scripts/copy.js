/*
 * @Author: tim huang
 * @Date: 2019-01-02 21:41:55
 * @Last Modified by: stevensh
 * @Last Modified time: 2019-07-19 15:09:57
 */

const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");

const srcDir = path.resolve(__dirname, "../../../src");
const outDir = path.resolve(__dirname, "../../../lib");

function copyFiles(enptyDir, outputDir) {
  const files = fs.readdirSync(enptyDir);
  files.forEach(function(item) {
    const stat = fs.lstatSync(enptyDir + "/" + item);
    if (item === "style") {
      fs.copy(`${enptyDir}/${item}`, `${outputDir}/${item}`);
      return;
    }
    if (stat.isDirectory()) {
      const comFiles = fs.readdirSync(enptyDir + "/" + item);

      comFiles.forEach(function(comItem) {
        const comItemSrcDir = `${enptyDir}/${item}/${comItem}`;
        const comItemOutDir = `${outputDir}/${item}/${comItem}`;
        if (
          comItem.lastIndexOf(".jpg") > 0 ||
          comItem.lastIndexOf(".png") > 0
        ) {
          fs.copyFileSync(
            `${enptyDir}/${item}/${comItem}`,
            `${outputDir}/${item}/${comItem}`
          );
        }
        try {
          if (comItem === "style") {
            copyStyleFiles(comItemSrcDir, comItemOutDir);
          }
          if (comItem === "components") {
            copyFiles(comItemSrcDir, comItemOutDir);
          }
        } catch (error) {}
      });
    }
  });
}

function copyStyleFiles(enptyDir, outputDir) {
  fs.copy(enptyDir, outputDir).then(() => {
    fs.pathExists(`${outputDir}/index.js`, (err, exists) => {
      if (!exists) {
        // 创建 index.js
        fs.outputFile(`${outputDir}/index.js`, `require('./index.less');\n`);
      }
    });
  });
}

fs.stat(srcDir, err => {
  if (err) {
    console.log(chalk.cyan(`  deploy directory not exists, cloning...\n`));
    return;
  }
  //const files = fs.readdirSync(srcDir);

  copyFiles(srcDir, outDir);
});
