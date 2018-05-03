// Usage: phantomjs scrape.js http://your.url.to.scrape.com
"use strict";
var sys = require("system"),
  page = require("webpage").create(),
  logResources = false,
  url = sys.args[1];

//console.log('fetch from', url);

function printArgs() {
  var i, ilen;
  for (i = 0, ilen = arguments.length; i < ilen; ++i) {
    console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
  }
  console.log("");
}

////////////////////////////////////////////////////////////////////////////////

page.onLoadFinished = function() {
  page.evaluate(function() {
    console.log(document.body.innerHTML);
  });
};
// window.console.log(msg);
page.onConsoleMessage = function() {
  printArgs.apply(this, arguments);
  phantom.exit(0);
};

page.open(url);
