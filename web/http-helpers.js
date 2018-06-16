var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // console.log('res', res);
  // console.log('aeest', asset);
  // console.log('callback', callback);
  
  // // Write some code here that helps serve up your static files!
  // // (Static files are things like html (yours or archived from others...),
  // // css, or anything that doesn't change often.)
  // fs.readFile('/', function (err, data) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   res.writeHead(statusCode, headers);
  //   res.end(archive.paths.list);
  // });
};



// As you progress, keep thinking about what helper functions you can put here!
