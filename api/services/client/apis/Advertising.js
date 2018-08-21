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
	})("Advertising", function(Parent) {
		function Advertising(arg) {
			if (!(this instanceof Advertising)) {
				if (!Advertising.instance) {
					var args = Array.prototype.slice.call(arguments);
					Advertising.instance = new Advertising(args[0]);
				}

				return Advertising.instance;
			}
		}

		Advertising.prototype = Object.create(Parent.prototype);

		Advertising.prototype.funcTags = {
			NOTICE_LIST : 10002007,
			PLAY_LIST : 10002006,
			GET_EVENT_NEWSLIST:20070001
		};
		
		/**
		 * 获取活动列表
		 * @see http://10.0.0.55/mediawiki/index.php/IndexFunctions.getActivityList
		 */
		Advertising.prototype.getPlayList = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.PLAY_LIST;
			//parameter.isTop = typeof args.parameter === "object" ? args.parameter.isTop : args.parameter;
			parameter.isTop = parameter.isTop || 1;
			parameter._cache = this.CACHE_CATALOG.M1440;
			
			return this.request(parameter, cb);
		};
		
		/**
		 * 获取通告列表
		 * @see http://10.0.0.55/mediawiki/index.php/IndexFunctions.getNoticeList
		 */
		Advertising.prototype.getNoticeList = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.NOTICE_LIST;
			parameter._cache = this.CACHE_CATALOG.M3;
			
			return this.request(parameter, cb);
		};

		/**
		 * 获取赛事新闻通告列表
		 * @see http://10.0.0.55/mediawiki/index.php/EventNewsFunction.getEventNewsList
		 */
		Advertising.prototype.getEventNewsList = function(parameter, cb) {
			var args = this.mixArguments.apply(this, arguments);
			cb = args.cb;
			parameter = args.parameter;
			parameter.FuncTag = this.funcTags.GET_EVENT_NEWSLIST;
			parameter._cache = this.CACHE_CATALOG.M3;

			return this.request(parameter, cb);
		};


		return Advertising;
	});
})();