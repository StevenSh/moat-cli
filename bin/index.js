#!/usr/bin/env node
"use strict";
// var fs = require("fs");
// var path = require("path");
// var minimist = require("minimist");
//var argv = minimist(process.argv.slice(2));
var argv = process.argv.slice(2);

const shell = require("shelljs");
switch (argv[0]) {
  case "start":
    shell.exec(
      "rimraf lib && babel ./src -d lib && node ./copy.js && start-storybook -p 9001 -c .storybook"
    );
    break;
  case "build":
    shell.exec(
      'rimraf lib && babel -x ".js,.ts,.tsx" ./src -d lib && node ./copy.js'
    );
    break;
  case "build-book":
    shell.exec("rimraf .book && build-storybook -c .storybook -o .book ");
    break;
  default:
    console.log("暂不支持此命令 T_T");
    break;
}
