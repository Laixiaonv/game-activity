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
    })("Activity", function (Parent) {
        function Activity(arg) {
            if (!(this instanceof Activity)) {
                return new Activity(arg);
            }
        }

        Activity.prototype = Object.create(Parent.prototype);

        Activity.prototype.funcTags = {
            LAST_BARRAGE_CODE: 60020001,
            ADD_BLACK: 60020002,
            SEND_BARRAGE: 60020000,
            NO_USER_MESSAGE: 60020003,
            GET_MEDIA_ADDRESS: 60040000,
            GET_FAMILY_RANK: 88800000,
            HECK_ATTENTION : 10003014,
            ACTOR_ATTENTION : 10003001,
            ACTIVITY_MESSAGE:86000073,
            RANKING_LIST: 86000070,
            POSITION_LIST: 86000071,
            ACTOR_ADD_VOTE: 86000072
        };

        /**
         * 获取最新弹幕块编号
         * @see http://10.0.0.82:9393/kkgame/entrance?parameter={"FuncTag":60020001,userId:7504850,token:"19CD72C957F15938E050007F0100157E"}
         */
        Activity.prototype.getLastBarrageCode = function (cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.LAST_BARRAGE_CODE;

            return this.request(parameter, cb);
        };

        /**
         * 获取赛程说明
         * @see http://10.0.0.82:9393/kkgame/entrance?parameter={%22FuncTag%22:60020002,userId:7504850,duration:60}
         */
        Activity.prototype.addBlack = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;

            parameter.FuncTag = this.funcTags.ADD_BLACK;

            return this.request(parameter, cb);
        };

        /**
         * 游客发弹幕
         * @see http://10.0.0.82:9393/kkgame/entrance?callback=jQuery11110014153996715322137_1438136751585&parameter={"userId":"379a9cc106ad3a4cc3ad331f","message":"aaa","FuncTag":60020003}
         */
        Activity.prototype.sendMessageByVisitor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.NO_USER_MESSAGE;

            return this.request(parameter, cb);
        };

        /**
         * 发送弹幕
         * @see http://10.0.0.82:9393/kkgame/entrance?parameter={"FuncTag":60020000,userId:7504850,token:"19CD72C957F15938E050007F0100157E",message:"hahaha"}
         */
        Activity.prototype.sendBarrage = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.SEND_BARRAGE;

            return this.request(parameter, cb);
        };

        /**
         * 获取播放地址
         * @see http://10.0.0.82:9393/kkgame/entrance?parameter={%22FuncTag%22:60040000,roomId:1000}
         */
        Activity.prototype.getMediaAddress = function (roomId, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.GET_MEDIA_ADDRESS;
            parameter.roomId = typeof args.parameter === "object" ? args.parameter.roomId : args.parameter;
            parameter._cache = this.CACHE_CATALOG.M1;

            return this.request(parameter, cb);
        };
      
        Activity.prototype.getFamilyRank = function(parameter, cb){
          var args = this.mixArguments.apply(this, arguments);
          cb = args.cb;
          parameter.FuncTag = this.funcTags.GET_FAMILY_RANK;
          return this.request(parameter, cb);
        };

        /**
         * @seehttp://10.0.0.55/mediawiki/index.php/UserRelationFunctions.whetherFollowed
         */

        Activity.prototype.checkAttention = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.HECK_ATTENTION;

            return this.request(parameter, cb);
        };

        Activity.prototype.attention = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter.FuncTag = this.funcTags.ACTOR_ATTENTION;
            return this.request(parameter, cb);
        };

        /*http://10.0.0.55/mediawiki/index.php/VoteFunction.activityMessage*/
        Activity.prototype.activityMessage = function(parameter, cb) {
          var args = this.mixArguments.apply(this, arguments);
          cb = args.cb;
          parameter.FuncTag = this.funcTags.ACTIVITY_MESSAGE;
          return this.request(parameter, cb);
        };

        /*http://10.0.0.55/mediawiki/index.php/VoteFunction.rankingList*/
        Activity.prototype.rankingList = function(parameter, cb) {
          var args = this.mixArguments.apply(this, arguments);
          cb = args.cb;
          parameter.FuncTag = this.funcTags.RANKING_LIST;
          return this.request(parameter, cb);
        };

        /*http://10.0.0.55/mediawiki/index.php/VoteFunction.positionList*/
        Activity.prototype.positionList = function(parameter, cb) {
          var args = this.mixArguments.apply(this, arguments);
          cb = args.cb;
          parameter.FuncTag = this.funcTags.POSITION_LIST;
          return this.request(parameter, cb);
        };

        /*http://10.0.0.55/mediawiki/index.php/VoteFunction.actorAddVote*/
        Activity.prototype.actorAddVote = function(parameter, cb) {
          var args = this.mixArguments.apply(this, arguments);
          cb = args.cb;
          parameter.FuncTag = this.funcTags.ACTOR_ADD_VOTE;
          return this.request(parameter, cb);
        };

        return Activity;
    });
})();
