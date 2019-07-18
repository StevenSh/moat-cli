var fs = require("fs");
var path = require("path");
var minimist = require("minimist");
var argv = minimist(process.argv.slice(2));
var defaultTxt = `# moatjs

## 最新tag：{ver}

## setup  

1. \`npm i git+http://git.ipo.com/huangshanbo215/moat-biz.git#{ver}\`
1. \`yarn add git+http://git.ipo.com/huangshanbo215/moat-biz.git#^{ver}\`

## tips

1. \`git tag -a 0.0.1 -m 'around-map'\``;

function updateReadMe(version) {
  let newRead = defaultTxt.replace(/{ver}/g, version);

  fs.writeFile(
    `${path.resolve(__dirname, "../../../..")}/README.md`,
    newRead,
    function(err) {
      if (err) {
        console.error(err);
      }
      console.log(`${path.resolve(__dirname, "../../../..")}/README.md`);
      console.log("生成newREADME");
    }
  );
}

updateReadMe(argv.v);
