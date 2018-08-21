var crypto = require('crypto')
var http = require('http');
var URL = require('url');
var Client = require('./client/Client.js');

var taskObj = {}, memData = {};

function httpGet(url, cb) {
  var req = http.get(url, function (res) {
    sails.log("httpGet url=%s, code=%s, headers=%s", url.href, res.statusCode, url.headers);

    res.setEncoding('utf8');
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      cb(null, data);
      data = undefined;
    });

  });
  req.on('error', function (e) {
    sails.log.error("httpGet", url.href, "Got error: ", e.code);
    cb(e);
  });
  req.setTimeout(6 * 1000, function () {
    req.abort();
  });
}

function sha1sum(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

function memoryCache(key, data) {
  if (key && !data) {
    return memData[key];
  } else if (key && data && !memData[key]) {
    memData[key] = data;

    var delay = Math.floor((15 + Math.random() * 10) * 1000);

    return setTimeout(function () {
      memData[key] = undefined;
      delete memData[key];
    }, delay);
  }
}

function doTask(task) {
  var url = task.host + '?' + (task.parameter || "");
  var urlObj = URL.parse(url);
  urlObj.headers = task.headers;
  if (urlObj.headers) {
    return httpGet(urlObj, task.callback);
  } else {
    var hashParameter = sha1sum(task.parameter || "");

    var memData = memoryCache(hashParameter);
    if (memData) {
      return setImmediate(function () {
        sails.log("%s get data from mem cache: %s", task.parameter,  memData);
        task.callback.apply(null, memData);
      });
    }

    if (!taskObj[hashParameter]) {
      taskObj[hashParameter] = [task.callback];

      var cb = function (err, data) {
        memoryCache(hashParameter, [err, data]);

        var fn;
        while (fn = taskObj[hashParameter].shift()) {
          setImmediate(fn, err, data);
        }
        taskObj[hashParameter] = undefined;
        delete taskObj[hashParameter];
      };
      httpGet(urlObj, cb);
    } else {
      taskObj[hashParameter].push(task.callback);
    }
    sails.log("task queue url: %s, length: %s", task.parameter || "", taskObj[hashParameter].length);
  }
};

function definition() {
  var kktv = (function () {
    function kktv() {
    }

    kktv.prototype.setHeaders = function (key, val) {
      this.headers = this.headers || {};
      this.headers[key] = val;
    }

    kktv.prototype.postDataToServer = function (host, parameterString, callback) {
      if (typeof host !== 'string') {
        throw Error('Illegal Argument Exception');
      }
      if (typeof callback !== 'function') {
        throw Error('Illegal Argument Exception');
      }
      var task = {
        host: host,
        parameter: parameterString,
        callback: callback,
        headers: this.headers
      };
      return doTask(task);
    };

    kktv.prototype.PLATFORM = {
      WEB: 1,
      ANDROID: 2,
      IPHONE: 3,
      IPAD: 4
    };
    kktv.prototype.C = 100101;
    kktv.prototype.A = 2;

    return kktv;
  })();

  kktv.Client = Client(kktv);

  return kktv;
}

var KKApi = definition();
var Client = KKApi.Client;

module.exports = KKApi;

setTimeout(function () {
  var keys = Object.keys(Client);
  _.each(keys, function (k) {
    KKApi.Client[k] = KKApi.Client[k] || Client[k];
  });
});
