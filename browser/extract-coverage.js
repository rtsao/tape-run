var shoe = require('shoe');

var stream = shoe('/socket-stream');

stream.on('data', function() {
  stream.write(window.__coverage__ || {});
});
