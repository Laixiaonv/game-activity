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
    })("Game", function (Parent) {
        function Game(arg) {
            if (!(this instanceof Game)) {
                return new Game(arg);
            }

            if(arg) {
                this._userId = arg.userId;
                this._token = arg.token;
            }

            if (SERVER && SERVER.GAME_API_SERVER) {
                this.API_URL = SERVER.GAME_API_SERVER;
            }
        }

        Game.prototype = Object.create(Parent.prototype);

        Game.prototype.funcTags = {
            GET_ACTOR_AND_USER_TOP_LIST: 88008800, /*排行榜*/
            GET_ACTIVITY_INFO: 88009000,
            READ_ACTIVITY_INFO:88009001,
            GET_SUBCATA_ROOM_LIST: 20010302, /*获取主播模块*/
            GET_RECIEVE_PACKAGE_LIST:50010014/*首充礼包领取状态  meshow接口*/
        };

        Game.prototype.getActorAndUserTopList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_ACTOR_AND_USER_TOP_LIST;
            parameter.start =  parameter.start || 0;
            parameter.offset =  parameter.offset || 0;

            return this.request(parameter, cb);
        };

        Game.prototype.getActivityInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_ACTIVITY_INFO;
            this._userId && 100000 !== this._userId && (parameter.userId = parameter.userId || this._userId);
            this._token && 'unknow' !== this._token && (parameter.token = parameter.token || this._token);
            parameter.type = parameter.type || 2;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        Game.prototype.readActivityInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.READ_ACTIVITY_INFO;
            parameter.type = parameter.type || 1;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            if (0 === parameter.userId) {
                delete parameter.userId;
                delete parameter.token;
            } else if (parameter.userId || (this._userId && 100000 !== this._userId)) {                
                parameter.userId = parameter.userId || this._userId;
                parameter.token = parameter.token || this._token;
            }

            return this.request(parameter, cb);
        };

        Game.prototype.getSubList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.GET_SUBCATA_ROOM_LIST;
            parameter.start = parameter.start || 0;
            parameter.offset = parameter.offset || 10;

            return this.request(parameter, cb);
        };

        Game.prototype.getRecievePackageList = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_RECIEVE_PACKAGE_LIST;
            parameter.a = parameter.a || 2;

            if (0 === parameter.userId) {
                delete parameter.userId;
                delete parameter.token;
            } else if (parameter.userId || (this._userId && 100000 !== this._userId)) {                
                parameter.userId = parameter.userId || this._userId;
                parameter.token = parameter.token || this._token;
            }

            return this.request(parameter, cb);
        };

        return Game;
    });
})();
