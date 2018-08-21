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
	})("My", function(Parent) {
		function My(arg) {
			if (!(this instanceof My)) {
				return new My(arg);
			}

			this._userId = arg.userId;
			this._token = arg.token;
		}

		My.prototype = Object.create(Parent.prototype);

		My.prototype.funcTags = {
			USER_INFO : 10005001,
			USER_SET_STEALTH : 10005057,
			CHANGE_ROOM_THEME : 10005055,
			FOLLOWED_LIST : 10003003,
            USER_PROFILE:10006000,
			UPDATE_USER_PROFILE:10006001,
			CHANGE_PWD:10001005,
			LOTTERY_TIME:10005040,
			LOTTERY_HISTORY:10005039,
			GUESS_TIME:20050006,
			GUESS_HISTORY:20050005

		};

		/**
		 * 获得用户信息
		 * @see http://10.0.0.55/mediawiki/index.php/ProfileFunctions.getUserInfo
		 */
		My.prototype.info = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_INFO;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * 神秘人状态设置
		 * @see http://10.0.0.55/mediawiki/index.php/ProfileFunctions.getUserInfo
		 */
		My.prototype.userSetStealth = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.USER_SET_STEALTH;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};
		
		/**
		 * 获取用户关注列表
		 * @see http://10.0.0.55/mediawiki/index.php/UserRelationFunctions.getUserFollowedList
		 */
		My.prototype.followedList = function(pageIndex, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.FOLLOWED_LIST;
			parameter.userId = this._userId;
			parameter.pageIndex = typeof args.parameter === "object" ? args.parameter.pageIndex : args.parameter;
			parameter.pageIndex = parameter.pageIndex || 1;
			
			return this.request(parameter, cb);
		};

		/**
		 * 修改房间主题
		 * @see http://10.0.0.55/mediawiki/index.php/ProfileFunctions.changeRoomTheme
		 */
		My.prototype.changeRoomTheme = function(newTheme, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			var parameter = {};
			parameter.FuncTag = this.funcTags.CHANGE_ROOM_THEME;
			parameter.userId = this._userId;
			parameter.token = this._token;
			parameter.roomTheme = typeof args.parameter === "object" ? args.parameter.roomTheme : args.parameter;

			return this.request(parameter, cb);
		};

        /**
         * 获得用户信息
         * @see http://10.0.0.55/mediawiki/index.php/ProfileFunction.getUserProfile
         */
        My.prototype.getUserProfile = function(parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.USER_PROFILE;
            parameter.userId = this._userId;
            parameter.token = this._token;

            return this.request(parameter, cb);
        };

		/**
		 * 获得用户信息
		 * @see http://10.0.0.55/mediawiki/index.php/ProfileFunction.updateUserProfile
		 */
		My.prototype.updateUserProfile = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.UPDATE_USER_PROFILE;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * 修改用户密码
		 * @see http://10.0.0.55/mediawiki/index.php/UserFunctions.changePwd
		 */
		My.prototype.changePwd = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.CHANGE_PWD;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * get Lottery info
		 * @see http://10.0.0.55/mediawiki/index.php/LotteryFunction.getLotteryTimes
		 */
		My.prototype.lotteryTimes = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.LOTTERY_TIME;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * get Lottery History
		 * @see http://10.0.0.55/mediawiki/index.php/LotteryFunction.queryLotteryHistory
		 */
		My.prototype.queryLotteryHistory = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.LOTTERY_HISTORY;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * get guess info
		 * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.getGambleResult
		 */
		My.prototype.guessTimes = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.GUESS_TIME;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

		/**
		 * get guess History
		 * @see http://10.0.0.55/mediawiki/index.php/GamblingFunction.getUserGamble
		 */
		My.prototype.queryGuessHistory = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.GUESS_HISTORY;
			parameter.userId = this._userId;
			parameter.token = this._token;

			return this.request(parameter, cb);
		};

        return My;
	});
})();