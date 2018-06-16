var path = require('path');
var archive = require('../helpers/archive-helpers');
var assets = require('./http-helpers');
// console.log('serveAssets', assets);
var fetcher = require('../workers/htmlfetcher').fetcher;
var fs = require('fs');
var Promise = require('bluebird');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
      // console.log('data', data);
      if (err) {
        return console.log(err);
      }
      res.writeHead(statusCode, assets.headers);
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/') {
    var postdata = '';
    req.on('data', (data) => {
      postdata += data;
    });
    req.on('end', () => {
      postdata = postdata.slice(4);
      fetcher(postdata, function (site) {
        fs.readFile(archive.paths.archivedSites + '/' + site, function (err, data) {
          console.log('data',data);         
          if (err) {
            return console.log(err);
          }
          res.writeHead(statusCode, assets.headers);
          res.end(data);
        });
      });
    });
  }


  // } else if (request.method === 'OPTIONS') {
  //   statusCode = 201;
  //   response.writeHead(statusCode, headers);
  //   response.end(JSON.stringify(messages.results));
  // } else {
  //   statusCode = 404;
  //   response.writeHead(statusCode, headers);
  //   response.end(JSON.stringify(messages.results));
  // }


};