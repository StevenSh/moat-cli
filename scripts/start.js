/*
 * @Author: tim huang
 * @Date: 2019-01-10 01:05:29
 * @Last Modified by: stevensh
 * @Last Modified time: 2019-03-10 21:20:58
 */

const shell = require("shelljs");

shell.exec("npm run build");
shell.exec("npm run build-book");
shell.exec("npm run server");
