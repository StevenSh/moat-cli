#!/usr/bin/env node
"use strict";
// var fs = require("fs");
// var path = require("path");
// var minimist = require("minimist");
//var argv = minimist(process.argv.slice(2));
var argv = process.argv.slice(2);

const shell = require("shelljs");
if (argv[0] === "start") {
  shell.exec(
    "rimraf lib && babel ./src -d lib && node ./copy.js && start-storybook -p 9001 -c .storybook"
  );
} else if (argv[0] === "build") {
  shell.exec(
    'rimraf lib && babel -x ".js,.ts,.tsx" ./src -d lib && node ./copy.js'
  );
}
