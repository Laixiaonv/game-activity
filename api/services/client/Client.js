var apis = require('include-all')({
  dirname: __dirname + '/apis',
  filter: /(.+)\.js$/,
  excludeDirs: /^\.(git|svn)$/
});

var util = require('util');
var fs = require('fs');
var SERVER = sails.config.serverConfig;
var securityPlugin = require('./securityPlugin.js');

(function () {
  var browserServerConfigFilePath = __dirname + "/clientServerConfig.js";
  fs.open(browserServerConfigFilePath, 'w', function (err, fd) {
    var config = {
      API_SERVER: SERVER.JS_API_SERVER,
      GAME_API_SERVER: SERVER.GAME_API_SERVER,
      ROOM_API_SERVER: SERVER.ROOM_API_SERVER,
      CDN_SERVER: SERVER.CDN_SERVER
    }

    fs.writeSync(fd, "this.SERVER = " + JSON.stringify(config) + ";this.SERVER_LIFT_TIME = " + sails.LIFT_TIME + ";");
    fs.closeSync(fd);
  });
})();

function definition(Parent) {


  var Client = (function (API_URL) {
    function Client() {
      if (!(this instanceof Client)) {
        throw new Error("The 'new' modifier is missing");
      }
    }

    util.inherits(Client, Parent);

    Client.prototype.API_URL = API_URL;
    securityPlugin(Client.prototype);

    Client.prototype.isCallbackSuccess = function (data) {
      if (!data) {
        return false;
      }
      return data.TagCode === '00000000';
    };

    Client.prototype._requestFromRemoteServer = function (parameter, cacheObj, cb) {

      var onData = function (err, data) {
        if (err) {
          if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            var _e = new APIError(APIError.TIMEOUT_ERROR, parameter.FuncTag);
            _e.pro = err;
            sails.log.error(_e);
            return cb(_e);
          } else {
            var _e = new APIError(APIError.SYSTEM_ERROR, parameter.FuncTag);
            _e.pro = err;
            sails.log.error(_e);
            return cb(_e);
          }
        }

        try {
          var strData = data;
          data = JSON.parse(data);
        } catch (e) {
          var _e = new APIError(APIError.JSON_PARSE_ERROR, parameter.FuncTag);
          _e.data = data;
          sails.log.error(_e);
          return cb(_e);
        }

        if (this.isCallbackSuccess(data)) {
          if (cacheObj && typeof fastCache !== 'undefined') {
            fastCache.set(cacheObj.key, strData, cacheObj.min * 60);
            strData = undefined;
          }

          cb(null, data);
        } else {
          var _e = new APIError(APIError.REQUEST_ERROR, parameter.FuncTag);
          _e.detail = data.TagCode;

          sails.log.error(_e);
          return cb(_e);
        }
      }.bind(this);

      var parameterString = "parameter=" + (JSON.stringify(parameter));
      return this.postDataToServer(this.API_URL, parameterString, onData);
    };

    Client.prototype.request = function (parameter, cb) {

      if (typeof parameter !== 'object') {
        return cb(Error('Illegal Argument Exception'));
      }

      parameter.platform = parameter.platform || this.PLATFORM.WEB;
      parameter.a = parameter.a || this.A;
      parameter.c = parameter.c || this.C;

      var _cache = parameter._cache;
      delete parameter._cache;
      var cacheObj = undefined;
      if (_cache) {
        var cacheKey = "";
        for (var k in parameter) {
          if (parameter.hasOwnProperty(k)) {
            cacheKey += k + parameter[k];
          }
        }
        cacheObj = {
          key: cacheKey,
          min: _cache
        };
      }

      var fn = this._requestFromRemoteServer.bind(this);

      if (_cache && typeof fastCache !== 'undefined') {
        fastCache.get(cacheKey, function (err, reply) {
          if (!err && reply) {
            try {
              reply = JSON.parse(reply);
            } catch (e) {
              sails.log.error(e, reply);
              return fn(parameter, cacheObj, cb);
            }
            return cb(null, reply);
          } else {
            return fn(parameter, cacheObj, cb);
          }
        });
      } else {
        return fn(parameter, cacheObj, cb);
      }
    };

    Client.prototype.mixArguments = function (parameter, cb) {
      if (arguments.length === 1 && parameter instanceof Function) {
        cb = parameter;
        parameter = undefined;
      }

      cb = cb instanceof Function ? cb : undefined;
      parameter = parameter || {};

      return {
        parameter: parameter,
        cb: cb
      };
    };

    Client.prototype.CACHE_CATALOG = {
      M1: 1,
      M3: 3,
      M10: 10,
      M30: 30,
      M180: 180,
      M1440: 1440
    };

    var APIError = (function () {
      function APIError(name, params) {
        if (!(this instanceof  APIError)) {
          return new APIError(name, params);
        }
        this.name = name || APIError.UNKNOWN_ERROR;
        this.params = params;
      }

      util.inherits(APIError, Error);

      APIError.SYSTEM_ERROR = "System Error";
      APIError.TIMEOUT_ERROR = "Timeout Error";
      APIError.REQUEST_ERROR = "Request Error";
      APIError.JSON_PARSE_ERROR = "JSON Parse Error";
      APIError.UNKNOWN_ERROR = "Unknown Error";

      return APIError;
    })();

    Client.APIError = APIError;

    return Client;

  })(SERVER.API_SERVER);

  Object.keys(apis).forEach(function (api) {
    Client[api] = apis[api](Client);
    apis[api] = undefined;
  });
  apis = undefined;
  return Client;
}

module.exports = definition;
