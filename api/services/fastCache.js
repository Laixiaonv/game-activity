var defaultConfig = {
  host: '127.0.0.1',
  port: 6379,
  ttl: 60 * 60, // 1 hour
  prefix: 'fastCache:',
  mkktv5Prefix: sails.config.environment === "development" ? 'fastCache:dev:' : 'fastCache:'
};

var fastCacheConfig = extend({}, defaultConfig, sails.config.fastCache);
var redis = require("redis"), client, pingSi;

function connect() {
  client = redis.createClient(fastCacheConfig.port, fastCacheConfig.host);
  fastCacheConfig.pass && client.auth(fastCacheConfig.pass);

  client.on("error", reConnect);

  pingSi && clearInterval(pingSi);

  pingSi = setInterval(function () {
    client.ping();
  }, 60 * 1000);
}

function reConnect(e) {
  sails.log.error("redis error:", e);
  try {
    client.end();
  } catch (e) {
  }
  client = null;
  connect();
}

connect();

var fastCache = {
  get: function (key, cb) {
    if (key === undefined) {
      return setImmediate(function () {
        cb(new Error("missing key"));
      });
    }

    cb = cb instanceof Function ? cb : undefined;
    if (key instanceof Array) {
      key = key.map(function (k) {
        return fastCacheConfig.prefix && k.indexOf('_') !== 0 ? fastCacheConfig.prefix + k : k;
      });
      client.MGET(key, cb);
    } else {
      key = fastCacheConfig.prefix && key.indexOf('_') !== 0 ? fastCacheConfig.prefix + key : key;
      client.get(key, cb);
    }

  },
  set: function (key, val, ttl, cb) {
    cb = cb instanceof Function ? cb : new Function;
    ttl = ttl > 30 && process.env.NODE_ENV === 'production' ? ttl : 30;

    if (val === undefined || key === undefined) {
      return setImmediate(function () {
        cb(new Error("missing key or value"));
      });
    }
    key = fastCacheConfig.prefix && key.indexOf('_') !== 0 ? fastCacheConfig.prefix + key : key;
    if (Object.prototype.toString.call(val) === "[object Object]") {
      val = JSON.stringify(val);
    }
    client.setex(key, ttl || fastCacheConfig.ttl, val, cb);
  },
  remove: function (key, cb) {
    if (key === undefined) {
      return setImmediate(function () {
        cb(new Error("missing key"));
      });
    }

    key = fastCacheConfig.prefix && key.indexOf('_') !== 0 ? fastCacheConfig.prefix + key : key;

    client.del(key, cb);
  },
  keys: function (likeKey, cb) {
    likeKey = likeKey ? "*" + likeKey + "*" : "*";
    likeKey = fastCacheConfig.prefix && likeKey.indexOf('_') !== 0 ? fastCacheConfig.prefix + likeKey : likeKey;
    client.keys(likeKey, function name(err, data) {
      if (err) {
        return cb(err);
      }
      if (fastCacheConfig.prefix && data) {
        data = data.map(function (d) {
          return d.replace(fastCacheConfig.prefix, '');
        });
      }
      cb(null, data);
    });

  },
  has: function (key, cb) {
    if (key === undefined) {
      return setImmediate(function () {
        cb(new Error("missing key"));
      });
    }

    key = fastCacheConfig.prefix && key.indexOf('_') !== 0 ? fastCacheConfig.prefix + key : key;

    client.exists(key, cb);
  },
  hgetAll: function (key, cb,isMkktv5) {
    if (key === undefined) {
      return setImmediate(function () {
        cb(new Error("missing key"));
      });
    }

    cb = cb instanceof Function ? cb : undefined;
    if (key instanceof Array) {
      cb(new Error("key can not be array"));
    } else {
      if(isMkktv5){
        key = fastCacheConfig.mkktv5Prefix && key.indexOf('_') !== 0 ? fastCacheConfig.mkktv5Prefix + key : key;
      }else{
        key = fastCacheConfig.prefix && key.indexOf('_') !== 0 ? fastCacheConfig.prefix + key : key;
      }
      console.log('fastCache key is : ', key);
      client.hgetall(key, cb);
    }
  }
};

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  });
  return target;
}

module.exports = fastCache;
