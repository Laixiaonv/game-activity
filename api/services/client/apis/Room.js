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
    })("Room", function (Parent) {
        function Room(arg) {
            if (!(this instanceof Room)) {
                return new Room(arg);
            }

            if(arg) {
                this._userId = arg.userId;
                this._token = arg.token;
            }

            if (SERVER && SERVER.ROOM_API_SERVER) {
                this.API_URL = SERVER.ROOM_API_SERVER;
            }
        }

        Room.prototype = Object.create(Parent.prototype);

        Room.prototype.funcTags = {
            GET_ACTOR_AND_USER_TOP_LIST: 88008800, /*排行榜*/
            GET_ACTIVITY_INFO: 88009000,
            READ_ACTIVITY_INFO:88009001
        };

        Room.prototype.getActorAndUserTopList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.GET_ACTOR_AND_USER_TOP_LIST;
            parameter.start =  parameter.start || 0;
            parameter.offset =  parameter.offset || 0;

            return this.request(parameter, cb);
        };

        Room.prototype.getActivityInfo = function(parameter, cb) {
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

        Room.prototype.readActivityInfo = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            parameter = args.parameter;
            cb = args.cb;
            parameter.FuncTag = this.funcTags.READ_ACTIVITY_INFO;
            this._userId && 100000 !== this._userId && (parameter.userId = parameter.userId || this._userId);
            this._token && 'unknow' !== this._token && (parameter.token = parameter.token || this._token);
            parameter.type = parameter.type || 1;
            parameter.a = parameter.a || 2;
            parameter.c = parameter.c || 100101;

            return this.request(parameter, cb);
        };

        return Room;
    });
})();
