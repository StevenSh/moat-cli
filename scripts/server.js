/*
 * @Author: tim huang
 * @Date: 2019-01-10 00:40:16
 * @Last Modified by: stevensh
 * @Last Modified time: 2019-03-10 20:30:03
 */

const express = require("express");
const path = require("path");
const proxyMiddleware = require("http-proxy-middleware");
const connectHistoryApiFallback = require("connect-history-api-fallback");
const proxyTable = require("../.storybook/proxyTable.conf");
const app = express();
const opn = require("opn");
const port = 9001;

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context];
  if (typeof options === "string") {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

app.use(connectHistoryApiFallback());

app.use(express.static(path.resolve(__dirname, "../.book/")));
// http://pahf-fangchan.st.anhouse.com.cn/web/api/estate/community/trend

app.listen(port, () => {
  console.log("server is running at " + port);
  // opn("http://localhost:" + port);
});
