var fs = require('fs');
var path = require('path');
var EventProxy = require('eventproxy');

exports.index = function (req, res, next) {	
	var viewFilePath = path.join(__dirname, "../../", "views/activity", req.params.pageName + ".ejs");
	
	if (!fs.existsSync(viewFilePath)) {
		return res.send(404)
	}
		
	res.locals.deviceWidth = res.locals.UA.ipad ? '320' : 'device-width';
	
	res.view("activity/" + req.params.pageName);
};

exports.other = function (req, res, next) {

  // todo
  res.send("dfdsa")
};

exports.imgBox = function (req, res, next) {
  var title = req.query.title;
  var imgUrl = req.query.imgUrl;
  var reg = new RegExp("^https?:\/\/ares\.kktv8\.com\/kktv\/.*\.(gif|jpg|jpeg|png)$", "i");
  
  if (!reg.test(imgUrl)) {
    return res.view(404);
  }

  res.locals.title = title;
  res.locals.imgUrl = imgUrl;
  return res.view("activity/img_box");
}


exports.sendSMSCode = function (req, res, next) {
  if (!req.body) {
    return res.send(404);
  }

  var phoneNum = req.body.phoneNum;
  var smsType = req.body.smsType;
  var ir = req.body.ir || 0;

  var play = KKApi.Client.Play();
  play.setHeaders("Referer", "kktvwebsecurity");
  play.sendSmsForNewUser({phoneNum: phoneNum, smsType: smsType, ir: ir}, function (err, data) {
    res.send({
      err: err, data: data
    });
  });
};

function httpPost(guestUid, roomId, cb) {
  try {
    var postData = queryString.stringify({
      appId: 2,
      type: 3000,
      event: 'init',
      guestUid: guestUid,
      actorId: roomId,
      c: 60138
    });

    var options = {
      hostname: 'u.kktv8.com',
      port: 80,
      path: '/md/Web',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    var req = http.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {

      });
      res.on('end', function () {

      })
    });

    req.on('error', function (e) {

    });

    req.write(postData);
    req.end();
  } catch (e) {
  }
}

function setProfile(req, profile) {
  profile.simple = {
    userId: profile.userId,
    token: profile.token
  };

  req.session.profile = profile;
}



exports.draw = function (req, res, next) {
  var name = req.query.name;

  name = name || "draw_test";

  readFile(name + ".txt", function (result) {
    if (!result.isSuccess) {
      return res.send(404);
    }

    res.locals.fileName = name;
    res.locals.members = result.fileData;
    return res.view("activity/draw/index");
  });
};

exports.draw_join = function (req, res, next) {
  var name = req.query.name;
  var openId = req.query.openId;
  var nickname = req.query.nickname;
  var headImgUrl = req.query.headImgUrl;
  var unionId = req.query.unionId;

  if (openId && nickname && headImgUrl && unionId) {
    var dataJson = {
      openId: openId,
      nickname: nickname,
      headImgUrl: headImgUrl,
      unionId: unionId
    };
    var data = JSON.stringify(dataJson) + '\r\n';
    name = name || "draw_test";

    writeFile(name + ".txt", data, function(result) {
      res.locals.nickname = nickname;
      res.locals.headImgUrl = headImgUrl;
      res.locals.isSuccess = result.isSuccess;
      return res.view("activity/draw/join");
    });
  } else {
    var redirect = req.baseUrl;
    var $urlH5 = (process.env.NODE_ENV === "production" ? "https" : "http") + "://m.kktv5.com/user/third?name=weixin&url=";
    var $url = $urlH5 + encodeURIComponent(redirect + '/activity/draw_join?needDirectBack=true&name=' + name);

    return res.redirect($url);
  }
};

exports.draw_win = function (req, res, next) {
  var name = req.query.name;

  name = name || "draw_test";

  res.locals.fileName = name;
  return res.view("activity/draw/win");
};

exports.postWhiteFile = function (req, res, next) {
  if (req.method === "POST") {
    var fileName = req.body.fileName;
    var fileData = req.body.fileData;
    if (!fileName || !fileData) {
      return res.send(400);
    }

    writeFile(fileName, fileData, function (result) {
      return res.send(result);
    });
  } else {
    res.send(400);
  }
};

function writeFile(fileName, fileData, cb) {
  if (!fileName || !fileData) {
    cb && cb({isSuccess: false});
    return false;
  }

  fileData = new Buffer(fileData);
  fs.writeFile(path.join(__dirname, "../../", ".tmp/public/activity/", fileName), fileData, {flag: 'a'}, function (err) {
    if(err) {
      console.error(err);
      cb && cb({isSuccess: false});
      return false;
    }

    console.log('write into ', fileName, 'success!');
    cb && cb({isSuccess: true});
  });
}

exports.postReadFile = function (req, res, next) {
  if (req.method === "POST") {
    var fileName = req.body.fileName;
    if (!fileName) {
      return res.send(400);
    }

    readFile(fileName, function (result) {
      return res.send(result);
    });
  } else {
    res.send(400);
  }
};

function readFile (fileName, cb) {
  if (!fileName) {
    cb && cb({isSuccess: false});
    return false;
  }

  fs.readFile(path.join(__dirname, "../../", ".tmp/public/activity/", fileName), {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) {
      console.error(err);
      cb && cb({isSuccess: false});
      return false;
    }

    cb && cb({isSuccess: true, fileData: data});
  });
}



exports.vote = function (req, res, next) {
  var userId = req.query.userId;
  var token = req.query.token;
  var unionId = req.query.unionId;
  var voteActivityId = req.query.voteActivityId || 1;
  var cid = req.query.cid || 810;

  if(!res.locals.UA.isWeixin){
    return res.redirect('/activity/vote_tip?voteActivityId=' + voteActivityId + '&cid=' + cid);
  }

  if (userId && token && unionId) {
    req.session.unionId = unionId;
    var profile = {
      userId: userId,
      token: token
    };
    setProfile(req, profile);
    return res.redirect('/activity/vote?voteActivityId=' + voteActivityId + '&cid=' + cid);

  } else if (req.isLogin && req.session.unionId) {
    var ep = new EventProxy();
    ep.all("voteActivityInfo", "downloadApp", function (voteActivityInfo, downloadApp) {
      res.locals.voteActivityId = voteActivityId;
      res.locals.voteActivityInfo = voteActivityInfo;
      res.locals.downloadApp = downloadApp;
      res.locals.cid = cid;
      res.locals.unionId = req.session.unionId;
      return res.view("activity/vote/index");
    });

    getVoteInfo(voteActivityId, 1, req, function (err, data){
      if (err) {
        if (err.detail == '30001005'){
          req.session.destroy();
        }
        return ep.emit('error', err);
      }
      var voteActivityInfo = data || [];
      ep.emit('voteActivityInfo', voteActivityInfo);
    });

    checkCID(cid, function (err, downloadApp) {
      if (err) {
        return ep.emit('error', err);
      }
      ep.emit('downloadApp', downloadApp);
    });

  } else {
    var redirect = req.baseUrl;
    var $urlH5 = (process.env.NODE_ENV === "production" ? "https" : "http") + "://m.kktv5.com/user/third?name=weixin&url=";
    var $url = $urlH5 + encodeURIComponent(redirect + '/activity/vote?needBack=true&voteActivityId=' + voteActivityId + '&cid=' + cid);

    return res.redirect($url);
  }
};

exports.vote_list = function (req, res, next) {
  var userId = req.query.userId;
  var token = req.query.token;
  var voteActivityId = req.query.voteActivityId || 1;
  var cid = req.query.cid || 810;

  if(!res.locals.UA.isWeixin){
    return res.redirect('/activity/vote_tip?voteActivityId=' + voteActivityId + '&cid=' + cid);
  }

  if (userId && token) {

    var profile = {
      userId: userId,
      token: token
    };
    setProfile(req, profile);
    return res.redirect('/activity/vote_list?voteActivityId=' + voteActivityId);

  } else if (req.isLogin) {

    var ep = new EventProxy();
    ep.all("voteActivityInfo", "downloadApp", function (voteActivityInfo, downloadApp) {
      res.locals.voteActivityId = voteActivityId;
      res.locals.voteActivityInfo = voteActivityInfo;
      res.locals.downloadApp = downloadApp;
      res.locals.cid = cid;
      return res.view("activity/vote/list");
    });

    getVoteInfo(voteActivityId, 0, req, function (err, data){
      if (err) {
        if (err.detail == '30001005'){
          req.session.destroy();
        }
        return ep.emit('error', err);
      }
      var voteActivityInfo = data || [];
      ep.emit('voteActivityInfo', voteActivityInfo);
    });

    checkCID(cid, function (err, downloadApp) {
      if (err) {
        return ep.emit('error', err);
      }
      ep.emit('downloadApp', downloadApp);
    });

  } else {
    var redirect = req.baseUrl;
    var $urlH5 = (process.env.NODE_ENV === "production" ? "https" : "http") + "://m.kktv5.com/user/third?name=weixin&url=";
    var $url = $urlH5 + encodeURIComponent(redirect + '/activity/vote_list?needBack=true&voteActivityId=' + voteActivityId + '&cid=' + cid);

    return res.redirect($url);
  }
};

exports.vote_search = function (req, res, next) {
  var userId = req.query.userId;
  var token = req.query.token;
  var unionId = req.query.unionId;
  var voteActivityId = req.query.voteActivityId || 1;
  var p = req.query.p;
  var name = req.query.name;
  var cid = req.query.cid || 810;

  if(!res.locals.UA.isWeixin){
    return res.redirect('/activity/vote_tip?voteActivityId=' + voteActivityId + '&cid=' + cid);
  }

  if (userId && token && unionId) {
    req.session.unionId = unionId;
    var profile = {
      userId: userId,
      token: token
    };
    setProfile(req, profile);
    return res.redirect('/activity/vote_search?voteActivityId=' + voteActivityId);

  } else if (req.isLogin && req.session.unionId) {

    var nameOrP = {
      name: name,
      p: p
    };

    var ep = new EventProxy();
    ep.all("voteActivityInfo", "downloadApp", function (voteActivityInfo, downloadApp) {
      res.locals.voteActivityId = voteActivityId;
      res.locals.nameOrP = nameOrP;
      res.locals.voteActivityInfo = voteActivityInfo;
      res.locals.downloadApp = downloadApp;
      res.locals.cid = cid;
      res.locals.unionId = req.session.unionId;
      return res.view("activity/vote/search");
    });

    getVoteInfo(voteActivityId, 1, req, function (err, data){
      if (err) {
        if (err.detail == '30001005'){
          req.session.destroy();
        }
        return ep.emit('error', err);
      }
      var voteActivityInfo = data || [];
      ep.emit('voteActivityInfo', voteActivityInfo);
    });

    checkCID(cid, function (err, downloadApp) {
      if (err) {
        return ep.emit('error', err);
      }
      ep.emit('downloadApp', downloadApp);
    });

  } else {
    var redirect = req.baseUrl;
    var $urlH5 = (process.env.NODE_ENV === "production" ? "https" : "http") + "://m.kktv5.com/user/third?name=weixin&url=";
    var $url = $urlH5 + encodeURIComponent(redirect + '/activity/vote_search?needBack=true&voteActivityId=' + voteActivityId + '&cid=' + cid);

    return res.redirect($url);
  }
};

exports.vote_tip = function (req, res, next) {
  var voteActivityId = req.query.voteActivityId || 1;
  var cid = req.query.cid || 810;
  if(res.locals.UA.isWeixin){
    return res.redirect('/activity/vote?voteActivityId=' + voteActivityId + '&cid=' + cid);
  } else {
    res.view("activity/vote/tips");
  }
}

function checkCID(cid, cb){
  fastCache.hgetAll('mkktv5:cid',function(err, data){

    if(err){

      sails.log.error('get mkktv5:cid err is ' ,err);

      data = {};

    }

    for(var i in data){

      if(data.hasOwnProperty(i)){

        data[i] = JSON.parse(data[i]);

      }

    }

    /*sails.log('cids is: ', data[cid]);*/

    var downloadApp = false;
    if (data[cid] && data[cid].river && data[cid].downloadApp) {
      downloadApp = true;
    }
    cb && cb(err, downloadApp);

  },true);

}

function getVoteInfo (voteActivityId, f, req, cb) {
  var activity = KKApi.Client.Activity();

  // if (process.env.NODE_ENV === "production") {} else {
  //   activity.API_URL = 'http://10.0.3.134:9696/kkgame/entrance';
  // }

  var params = {
    voteActivityId: voteActivityId,
    userId: req.session.profile.userId,
    token: req.session.profile.token
  };

  if (f == 1) {
    params.f = 1;
  }

  activity.activityMessage(params, function (err, data) {
    cb && cb (err, data);
  });
}


/**
 * 计算并返回 微信js sdk 需要的signature
 * see http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 */
var https = require('https'),

  http = require('http'),

  sha1 = require('sha1'),

  APP_ID = 'wx45d203253111ab32',

  APP_KEY = '511804219cbf34c7ae72ba531e995c0b';

function weixinSignFn (url,callback){

  url = decodeURIComponent(url);

  var timestamp = parseInt(new Date().getTime() / 1000) + '', //精确到秒

    nonceStr = Math.random().toString(36).substr(2, 15);

  http.get('http://pay.kktv8.com/js_api_ticket', function(resq) {

    var jsapi_ticket = "";

    resq.on('data', function (chunk) {

      jsapi_ticket += chunk;

    });

    resq.on('end', function () {

      try {

        callback({

          nonceStr: nonceStr,

          timestamp: timestamp,

          // url: url,

          // jsapi_ticket: jsapi_ticket,

          signature: sha1('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url)

        });


      } catch (e) {

        sails.log('get jsapi_ticket 错误: ',e);

      }

    });


  }).on('error', function(e) {

    sails.log("get jsapi_ticket 错误：" + e.message);

  });

}


exports.weixinSign = function(req,res,next){

  var url = req.body.url;

  if(!url){

    return res.end(404);

  }

  weixinSignFn(url,function(result){

    res.send(result);

  });

}

exports.play_2132_init = function(req, res, next) {
    loginAccount(req);
    return res.view();
};
exports.play_2132_skip = function(req, res, next) {
    loginAccount(req);
    return res.view();
};
exports.play_2132_topic = function(req, res, next) {
    loginAccount(req);
    return res.view();
};
exports.play_2132_answer = function(req, res, next) {
    loginAccount(req);
    return res.view();
};

function loginAccount (req) {
    var userId = req.query.userId;
    var token = req.query.token;
    if(userId && token) {
        var profile = {
            userId: userId,
            token: token
        };
        setProfile(req, profile);
    }
}


/* 2018年度盛典 */
exports.ceremony_2018 = function (req, res, next) {
  return res.view("activity/ceremony_2018/index");
}
exports.ceremony_2018_m = function (req, res, next) {
  return res.view("activity/ceremony_2018/mobile/index");
}
exports.ceremony_2018_play = function(req, res, next) {
  return res.view("activity/ceremony_2018/play/index");
}
exports.ceremony_2018_play_m = function(req, res, next) {
  return res.view("activity/ceremony_2018/play/mobile");
}
exports.ceremony_2018_room = function(req, res, next) {
  return res.view("activity/ceremony_2018/room/index");
}
exports.ceremony_2018_room_m_n = function(req, res, next) {
  return res.view("activity/ceremony_2018/room/mobile");
}

exports.ceremony_2018_recharge = function (req, res, next) {
  return res.view("activity/ceremony_2018/recharge/index");
}
exports.ceremony_2018_recharge_m = function (req, res, next) {
  return res.view("activity/ceremony_2018/recharge/mobile");
}
exports.ceremony_2018_province = function(req, res, next) {
  return res.view("activity/ceremony_2018/province/index");
}
exports.ceremony_2018_province_m  = function(req, res, next) {
  return res.view("activity/ceremony_2018/province/mobile");
}