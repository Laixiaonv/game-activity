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
    })("Actor", function (Parent) {
        function Actor(arg) {
            if (!(this instanceof Actor)) {
                return new Actor(arg);
            }

            this._actorId = arg.actorId;
        }

        Actor.prototype = Object.create(Parent.prototype);

        Actor.prototype.funcTags = {
            ACTOR_RECOMMEND: 10002014,
            ACTOR_ACTION_REPLY_LIST: 10006007,
            ACTOR_ACTION_LIST: 10006004,// 获取用户动态列表
            ACTOR_GIFT_LIST: 10006001,// 用户收到的礼物列表
            ACTOR_FENS_TOP_LIST: 10003013,
            BROAD_CAST_TO_PUBLIC: 10007000,
            GET_ACTOR_HORN_TIME: 10008000,
            GET_ACTOR_LIVE_FLOW_ADDRESS: 60001002
        };

        /**
         * 获取用户粉丝排行榜
         * @see http://10.0.0.55/mediawiki/index.php/UserRelationFunctions.getFansRankingList
         */
        Actor.prototype.fensTop = function (expired, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.ACTOR_FENS_TOP_LIST;
            parameter.slotType = typeof args.parameter === "object" ? args.parameter.expired : args.parameter;
            parameter.userId = this._actorId;
            parameter._cache = this.CACHE_CATALOG.M10;

            return this.request(parameter, cb);
        };

        /**
         * 获取推荐的直播房间列表
         * @see http://10.0.0.55/mediawiki/index.php/IndexFunctions.getLiveRecommendedList
         */
        Actor.prototype.getRecommend = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.ACTOR_RECOMMEND;
            parameter.count = parameter.count || 1;
            parameter._cache = this.CACHE_CATALOG.M1;

            return this.request(parameter, cb);
        };

        /**
         * broad cast To Public
         * @see http://10.0.0.55/mediawiki/index.php/UserFunction.broadcastToPublic
         */
        Actor.prototype.broadcastToPublic = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.BROAD_CAST_TO_PUBLIC;

            return this.request(parameter, cb);
        };

        /**
         * get actor horn Time in own room
         * @see http://10.0.0.55/mediawiki/index.php/ActorFunction.getActorInfo
         */
        Actor.prototype.getHornTime = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ACTOR_HORN_TIME;

            return this.request(parameter, cb);
        };
        /**
         * get actor LiveFlowAddress
         * @see http://10.0.0.55/mediawiki/index.php/ActorFunction.getActorLiveFlowAddress
         */
        Actor.prototype.getActorLiveFlowAddress = function (cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ACTOR_LIVE_FLOW_ADDRESS;
            parameter.roomId = this._actorId;
            //parameter._cache = this.CACHE_CATALOG.M1;

            return this.request(parameter, cb);
        };

        Actor.Expired = {
            WEEK: 1,
            MONTH: 2,
            SUPPER: 3
        };
        return Actor;
    });
})();
