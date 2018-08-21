(function() {
	!(function(name, definition) {
		// Check exports
		var hasExports = typeof module !== 'undefined' && module.exports;
		if (hasExports) {
			module.exports = definition;
		} else {
			// Assign to common namespaces or simply the global object (window)
			this.apis = this.apis || {};
			this.apis[name] = definition;
		}
	})("User", function(Parent) {
		function User(arg) {
			if (!(this instanceof User)) {
				var args = Array.prototype.slice.call(arguments);
				return new User(args[0]);
			}
		}

		User.prototype = Object.create(Parent.prototype);

		User.prototype.funcTags = {
			USER_INFO : 10005001,
			LUCKYID_TO_USERID : 10005047,
			GET_VIEWED_ROOMLIST : 10002033,
			USER_NAME_VALIDITY : 10001001,
			USER_SECURITY_REGISTER : 40000001,
			USER_SECURITY_LOGIN : 40000015,
			USER_LOGIN_THIRD : 10001013,
			USER_REGISTER_THIRD : 10001006,
            SEND_SMS:10001022,
            BIND_PHONE:10001018
		};

		User.prototype.convertToUserId = function(luckyId, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.LUCKYID_TO_USERID;
			parameter.luckyId = typeof args.parameter === "object" ? args.parameter.luckyId : args.parameter;
      parameter._cache = this.CACHE_CATALOG.M1;

			return this.request(parameter, cb);
		};

		User.prototype.info = function(userId, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.USER_INFO;
			parameter.userId = typeof args.parameter === "object" ? args.parameter.userId : args.parameter;

			return this.request(parameter, cb);
		};

		User.prototype.getViewedRoomList = function(userIds, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.GET_VIEWED_ROOMLIST;
			parameter.userIds = args.parameter.userIds instanceof Array ? args.parameter.userIds : args.parameter;
			parameter.userIds = parameter.userIds instanceof Array ? parameter.userIds.join(',') : parameter.userIds;

			parameter._cache = this.CACHE_CATALOG.M10;

			return this.request(parameter, cb);
		};

		User.prototype.verifyUserName = function(userName, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.USER_NAME_VALIDITY;
			parameter.username = typeof args.parameter === "object" ? args.parameter.userName : args.parameter;

			return this.request(parameter, cb);
		};

		User.prototype.register = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_SECURITY_REGISTER;

			if (parameter.password) {
				parameter.psword = parameter.password;
				delete parameter.password;
			}

			parameter.username = encodeURIComponent(parameter.username);
			parameter.psword = parameter.psword;

			var up = this.up(parameter.username, parameter.psword);

			delete parameter.username;
			delete parameter.psword;

			parameter.up = up;

			return this.securityRequest(parameter, cb);
		};

		User.prototype.login = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_SECURITY_LOGIN;

			if (parameter.password) {
				parameter.psword = parameter.password;
				delete parameter.password;
			}

			parameter.rc = "E52A4_" + parameter.username;
			parameter.username = encodeURIComponent(parameter.username);
			parameter.psword = parameter.psword;

			var up = this.up(parameter.username, parameter.psword);
			parameter.up = parameter.up || up;

			delete parameter.username;
			delete parameter.psword;

			return this.securityRequest(parameter, cb);
		};

		User.prototype.loginThird = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_LOGIN_THIRD;

			return this.request(parameter, cb);
		};

		User.prototype.registerThird = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_REGISTER_THIRD;

			return this.request(parameter, cb);
		};

        /**
         * get send sms
         * @see http://10.0.0.55/mediawiki/index.php/UserFunctions.sendSMS
         */
        User.prototype.sendSMS = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.SEND_SMS;

            return this.request(parameter, cb);
        };

        /**
         * get bind phone
         * @see http://10.0.0.55/mediawiki/index.php/UserFunctions.bindPhone
         */
        User.prototype.bindPhone = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.BIND_PHONE;

            return this.request(parameter, cb);
        };

		User.roomSource = User.prototype.roomSource = {
			SHOW: 1, //秀场直播
			GAME: 2, //游戏直播
			KK_MOBILE:9, // kk唱响手机端直播
			BANG: 10, //棒直播
			ALTERNATE: 8,
			VR: 12, //VR直播
			VR_PRIVATE: 13, //VR 私聊房间,
			PROGRAM: 7, //节目房
			SPRITE:11, //使用直播精灵的娱乐房
			FRIENDS:14
		};

		return User;
	});
})();
