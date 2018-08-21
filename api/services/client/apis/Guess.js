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
    })("Guess", function (Parent) {
        function Guess(arg) {
            if (!(this instanceof Guess)) {
                return new Guess(arg);
            }
        }

        Guess.prototype = Object.create(Parent.prototype);

        Guess.prototype.funcTags = {
            GET_GAMBLING_LIST: 20050001,
            USER_BET_IN:20050002,
            GET_ACTOR_GAME_LIST: 20050003,
            GET_GAME_INFO: 20050004,
            ADD_GAMBLE_BY_ANCHOR: 20050007,
            CANCEL_GAMBLE_BY_ANCHOR: 20050008,
            CLEAR_GAMBLE_BY_ANCHOR: 20050009,
            GET_GAMBLING_LIST_FOR_PORTAL:20050010
        };

        /**
         * GET GAMBLING LIST
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.getGamblingList
         */
        Guess.prototype.getGameList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_GAMBLING_LIST;
            parameter.start = parameter.start || 0;
            parameter.offset = parameter.offset || 3;

            return this.request(parameter, cb);
        }

        /**
         * 直播间竞猜列�?
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.getGamblingListInRoom
         */
        Guess.prototype.getActorGameList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_ACTOR_GAME_LIST;
            parameter.start = parameter.start || 0;
            parameter.offset = parameter.offset || 100;
            parameter.roomId = typeof args.parameter === "object" ? args.parameter.roomId : args.parameter;

            return this.request(parameter, cb);
        }

        /**
         * 获取单条竞猜信息
         * @see http://10.0.0.55/mediawiki/index.php?title=GamblingFunction.getGambleInfo
         */
        Guess.prototype.getGambleInfo = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_GAME_INFO;

            return this.request(parameter, cb);
        }

        /**
         * 用户参与下注
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.userBetIn
         */
        Guess.prototype.userBetIn = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.USER_BET_IN;

            return this.request(parameter, cb);
        }

        /**
         * add Gamble By Anchor
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.addGambleByAnchor
         */
        Guess.prototype.addGambleByAnchor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.ADD_GAMBLE_BY_ANCHOR;

            return this.request(parameter, cb);
        }

        /**
         * cancel Gamble By Anchor
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.cancelGambleByAnchor
         */
        Guess.prototype.cancelGambleByAnchor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.CANCEL_GAMBLE_BY_ANCHOR;

            return this.request(parameter, cb);
        }

        /**
         * clear Gamble By Anchor
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.clearGambleByAnchor
         */
        Guess.prototype.clearGambleByAnchor = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.CLEAR_GAMBLE_BY_ANCHOR;

            return this.request(parameter, cb);
        }

        /**
         * GET GAMBLING LIST
         * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.getGamblingListForPortal
         */
        Guess.prototype.getGamblingListForPortal = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_GAMBLING_LIST_FOR_PORTAL;
            parameter.start = parameter.start || 0;
            parameter.offset = parameter.offset || 3;

            return this.request(parameter, cb);
        }

        return Guess;
    });
})();
