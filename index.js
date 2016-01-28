var fs = require('fs');
var browserRun = require('browser-run')
var finished = require('tap-finished');
var through = require('through');
var throughout = require('throughout');
var combined = require('combined-stream');

module.exports = run;

function run (opts) {
  if (!opts) opts = {};

  var input = combined.create();
  input.append(fs.createReadStream('./static/extract-coverage.js'));
  input.append(through());

  var browser = browserRun(opts);
  var dpl = throughout(input, browser);

  browser
    .pipe(finished(opts, function (results) {

      function end(coverage) {
        browser.stop();
        dpl.emit('results', results);
      }

      if (results.errors.length) {
        end({});
      } else {
        browser.browserSocketStream.write(11);
        browser.browserSocketStream.on('data', end);
      }

    }));

  return dpl;
}
