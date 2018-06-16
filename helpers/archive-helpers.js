var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};



// Used for stubbing paths for tests, do not modify
exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function (callback) {
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      data = data + '';
      data = data.split('\n');
      callback(data);
    }
  });
};

exports.isUrlInList = function (url, callback) {
  exports.readListOfUrls(function (data) {
    var result = false;
    if (data.includes(url)) {
      result = true;
    }
    return callback(result);
  });
};

exports.addUrlToList = function (url, callback) {
  // console.log(url); someurl.com
  exports.isUrlInList(url, function (result) {
    // console.log('result', result);
    if (!result) {
      fs.appendFile(exports.paths.list, url + '\n', function (err, data) {
        if (err) {
          return console.log(err);
        } else {
          callback();
        }
      });
    }
  });
};

exports.isUrlArchived = function (url, callback) {
  // console.log('url', exports.paths.archivedSites + '/' + url);
  fs.exists(exports.paths.archivedSites + '/' + url, function (exists) {
    // console.log('exist', exists);
    var result = false;
    if (exists) {
      result = true;
    }
    return callback(result);
  });
};

exports.downloadUrls = function (urls) {
  for (let i = 0; i < urls.length; i++) {
    request('https://' + urls[i], function (error, response, body) {
      fs.writeFile(exports.paths.archivedSites + '/' + urls[i], body, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  }

};

// exports.downloadUrls(['www.google.com', "www.naver.com"])