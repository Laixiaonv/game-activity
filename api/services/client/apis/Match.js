(function () {
  !(function (name, definition) {
    // Check exports
    var hasExports = typeof module !== 'undefined' && module.exports;
    if (hasExports) {
      module.exports = definition;
    } else {
      // Assign to common namespaces or simply the global object (window)
      this.apis = this.apis || {};
      this.apis[name] = definition;
    }
  })("Match", function (Parent) {
    function Match(arg) {
      if (!(this instanceof Match)) {
        return new Match(arg);
      }
    }

    Match.prototype = Object.create(Parent.prototype);

    Match.prototype.funcTags = {
      GET_MATCH_INFO_BY_ID: 20020073,
      SAVE_MATCH_APPLY : 20020074,
      GET_EVENT_PREVIEW_LIST: 20060002
      //getEventNewsById: 20020073
    };

    /**
     * 获取比赛赛区详情
     * @see http://10.0.0.55/mediawiki/index.php/GameApiAction.getMatchInfoById
     */
    Match.prototype.getMatchInfo = function (parameter, cb) {
      var args = this.mixArguments.apply(this, arguments);
      cb = args.cb;
      parameter = args.parameter;
      parameter.FuncTag = this.funcTags.GET_MATCH_INFO_BY_ID;
      parameter._cache = this.CACHE_CATALOG.M10;

      return this.request(parameter, cb);
    };

    /**
     *游戏比赛报名接口
     * @see http://10.0.0.55/mediawiki/index.php/GameApiAction.saveMatchApply
     */
    Match.prototype.saveApply = function (parameter, cb) {
      var args = this.mixArguments.apply(this, arguments);
      cb = args.cb;
      parameter = args.parameter;
      parameter.FuncTag = this.funcTags.SAVE_MATCH_APPLY;

      return this.request(parameter, cb);
    };

    /**
     * 获取比赛节目预告列表
     * @see http://10.0.0.55/mediawiki/index.php/EventFunction.getEventPreviewInfoByTime
     */
    Match.prototype.getEventPreviewList = function (parameter, cb) {
      var args = this.mixArguments.apply(this, arguments);
      cb = args.cb;
      parameter = args.parameter;
      parameter.FuncTag = this.funcTags.GET_EVENT_PREVIEW_LIST;
      parameter._cache = this.CACHE_CATALOG.M3;

      return this.request(parameter, cb);
    };

    return Match;
  });
})();

