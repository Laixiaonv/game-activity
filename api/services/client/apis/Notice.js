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
    })("Notice", function (Parent) {
        function Notice() {
            if (!(this instanceof Notice)) {
                if (!Notice.instance) {
                    var args = Array.prototype.slice.call(arguments);
                    Notice.instance = new Notice(args[0]);
                }

                return Notice.instance;
            }
        }

        Notice.prototype = Object.create(Parent.prototype);

        Notice.prototype.funcTags = {
            NOTICE_DETAIL: 10002012,
            NOTICE_LIST: 10002007,
            SPORT_LIST: 20070001,
            SPORT_DETAIL: 20070002
        };
        /**
         * 公告内容
         *
         * @param parameter = {"noticeId": }
         */
        Notice.prototype.detail = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;

            parameter.FuncTag = this.funcTags.NOTICE_DETAIL;
            parameter._cache = this.CACHE_CATALOG.M1;

            return this.request(parameter, cb);
        };

        /**
         * 获取公告list
         * @see http://10.0.0.55/mediawiki/index.php/IndexFunctions.getNoticeList
         * @param parameter = {"noticeId": }
         */
        Notice.prototype.getNoticeList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.NOTICE_LIST;
            parameter._cache = this.CACHE_CATALOG.M1440;

            return this.request(parameter, cb);
        };

        /**
         * 获取体育公告列表
         * @see http://10.0.0.55/mediawiki/index.php/EventNewsFunction.getEventNewsList
         * @param
         */
        Notice.prototype.getSportList = function (parameter, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            parameter = args.parameter;
            parameter.FuncTag = this.funcTags.SPORT_LIST;
            parameter._cache = this.CACHE_CATALOG.M3;

            return this.request(parameter, cb);
        };

        /**
         * 获取体育公告详情
         * @see http://10.0.0.55/mediawiki/index.php/EventNewsFunction.getEventNewsById
         * @param
         */
        Notice.prototype.getSportDetail = function (eventId, cb) {
            var args = this.mixArguments.apply(this, arguments);
            cb = args.cb;
            var parameter = {};
            parameter.FuncTag = this.funcTags.SPORT_DETAIL;
            parameter.eventId = typeof args.parameter === "object" ? args.parameter.eventId : args.parameter;
            parameter._cache = this.CACHE_CATALOG.M1;

            return this.request(parameter, cb);
        };

        return Notice;
    });
})();
