var fs = require("fs");
var path = require("path");
var minimist = require("minimist");
var argv = minimist(process.argv.slice(2));
var defaultPackage = {
  name: "moat-biz",
  version: "0.0.1",
  scripts: {
    book: "static -p 9100 ./.book"
  },
  main: "lib/index.js",
  author:
    "tim huang <HUANGSHANBO215@pingan.com.cn>, xiaoxin <SHENGCHENLING711@pingan.com.cn>",
  files: ["*.md", "docs", "lib", ".book", "package.json"],
  peerDependencies: {
    antd: "^3.11.2",
    react: "^16.7.0",
    "react-dom": "^16.7.0"
  },
  dependencies: {
    "static-server": "^2.2.1"
  }
};

function updatePackage(params) {
  fs.readFile(`${path.resolve(__dirname, "../../..")}/package.json`, function(
    err,
    data
  ) {
    if (err) {
      return console.error(err);
    }
    let srcPackage = data.toString();
    const { peerDependencies = null, dependencies } = JSON.parse(srcPackage);
    let newPackage = {
      ...defaultPackage,
      peerDependencies,
      dependencies: { ...dependencies, ...peerDependencies },
      version: argv.v
    };
    let newPackageStr = JSON.stringify(newPackage);
    console.log(`${path.resolve(__dirname, "../../../..")}/package.json`);
    fs.writeFile(
      `${path.resolve(__dirname, "../../../..")}/package.json`,
      newPackageStr,
      function(err) {
        if (err) {
          console.error(err);
        }
        console.log("生成newpackage");
      }
    );
  });
}

updatePackage(defaultPackage);
