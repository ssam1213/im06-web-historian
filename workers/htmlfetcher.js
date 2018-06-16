// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers');
var readListOfUrls = helpers.readListOfUrls;
var isUrlInList = helpers.isUrlInList;
var addUrlToList = helpers.addUrlToList;
var isUrlArchived = helpers.isUrlArchived;
var downloadUrls = helpers.downloadUrls;

exports.fetcher = function (url, callback) {
  isUrlInList(url, function (result) {
    if (!result) {
      addUrlToList(url, function() {
        isUrlArchived(url, function(result) {  
          if (!result) {
            downloadUrls([url]);
            callback(url);
          }
        });
      });
    } else {
      callback(url);
    }
  });
};