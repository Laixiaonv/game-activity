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
    })("Nav", function (Parent) {
        function Nav() {
            if (!(this instanceof Nav)) {
                if (!Nav.instance) {
                    var args = Array.prototype.slice.call(arguments);
                    Nav.instance = new Nav(args[0]);
                }

                return Nav.instance;
            }
        }

        Nav.prototype = Object.create(Parent.prototype);

        Nav.prototype.funcTags = {
            GET_LIVE_ROOM_BY_CATAID: 20010309,
            GET_SQUARE_TITLE_LIST:50001004,
            FOLLOWED_LIST : 10003003,
            GET_USER_RELATION_ROOM_LIST:55000001
        };
        /**
         * get Live Room List By CataId
         * @see http://10.0.0.55/mediawiki/index.php/HallFunctions.getLiveRoomListByCataId
         */
        Nav.prototype.getLiveRoom = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;

            parameter.FuncTag = this.funcTags.GET_LIVE_ROOM_BY_CATAID;
            return this.request(parameter, cb);
        };

        /**
         * @see http://10.0.0.55/mediawiki/index.php/HallFunctions.getSquareTitleList
         */
        Nav.prototype.getSquareTitleList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_SQUARE_TITLE_LIST;
            parameter._cache = this.CACHE_CATALOG.M3;

            return this.request(parameter, cb);
        };

        /**
         * 获取用户关注列表
         * @see http://10.0.0.55/mediawiki/index.php/UserRelationFunctions.getUserFollowedList
         */
        Nav.prototype.followedList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.FOLLOWED_LIST;
            parameter.userId = parameter.userId;
            parameter.pageIndex = typeof args.parameter === "object" ? args.parameter.pageIndex : args.parameter;
            parameter.pageIndex = parameter.pageIndex || 1;

            return this.request(parameter, cb);
        };

        /**
         * 获取用户有关的房间列表接口
         * @see http://10.0.0.55/mediawiki/index.php/KKHallFunctions.getKKUserRelationRoomList
         */
        Nav.prototype.getKKUserRelationRoomList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_USER_RELATION_ROOM_LIST;
            parameter.userId = parameter.userId;
            parameter.start = typeof args.parameter === "object" ? args.parameter.start : args.parameter;
            parameter.offset = parameter.offset || 6;

            return this.request(parameter, cb);
        };

        return Nav;
    });
})();
